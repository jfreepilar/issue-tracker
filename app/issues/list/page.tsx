import { IssueStatusBadge, Link } from "@/app/components";
import { searchParamsSchema } from "@/app/validationIssueSchema";
import { prisma } from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Button, Flex, Table } from "@radix-ui/themes";
import NextLink from "next/link";
import z from "zod";
import FilterIssueStatus from "./FilterIssueStatus";
import SortIssues from "./SortIssues";

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    status: Status | "ALL";
    orderField: string;
    orderValue: string;
  }>;
}) => {
  const columnHeaderCellStyle: string = "hidden md:table-cell";
  const parsed = searchParamsSchema.safeParse(await searchParams);
  let safeParams: z.infer<typeof searchParamsSchema>;
  if (!parsed.success) {
    safeParams = searchParamsSchema.parse({});
  } else {
    safeParams = parsed.data;
  }

  const issues = await prisma.issue.findMany({
    where: safeParams.status !== "ALL" ? { status: safeParams.status } : {},
    orderBy: { [safeParams.orderField]: safeParams.orderValue },
  });

  const columns: {
    label: string;
    value: keyof Issue;
    columnHeaderStyling?: string;
  }[] = [
    {
      label: "Issue",
      value: "title",
    },
    {
      label: "Status",
      value: "status",
      columnHeaderStyling: columnHeaderCellStyle,
    },
    {
      label: "Created",
      value: "createdAt",
      columnHeaderStyling: columnHeaderCellStyle,
    },
  ];

  return (
    <>
      <Flex className="mb-5" justify="between">
        <Flex gap="1.5rem">
          <FilterIssueStatus />
          <SortIssues />
        </Flex>
        <Button>
          <NextLink href="/issues/new">New Issue</NextLink>
        </Button>
      </Flex>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.columnHeaderStyling}
              >
                {column.label}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export const dynamic = "force-dynamic";
export default IssuesPage;
