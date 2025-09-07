import { Pagination } from "@/app/components";
import { searchParamsSchema } from "@/app/validationIssueSchema";
import { prisma } from "@/prisma/client";
import { Status } from "@prisma/client";
import { Button, Flex } from "@radix-ui/themes";
import NextLink from "next/link";
import z from "zod";
import FilterIssueStatus from "./FilterIssueStatus";
import IssueTable from "./IssueTable";
import SortIssues from "./SortIssues";
import { Metadata } from "next";

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    status: Status | "ALL";
    orderField: string;
    orderValue: string;
    page: string;
  }>;
}) => {
  const parsed = searchParamsSchema.safeParse(await searchParams);
  let safeParams: z.infer<typeof searchParamsSchema>;
  if (!parsed.success) {
    safeParams = searchParamsSchema.parse({});
  } else {
    safeParams = parsed.data;
  }

  const issueCount = await prisma.issue.count({
    where: safeParams.status !== "ALL" ? { status: safeParams.status } : {},
  });

  const page = parseInt(safeParams.page) || 1;
  const pageSize = 10;

  const pageCount = Math.ceil(issueCount / pageSize);
  let safePage = page;
  if (page > pageCount) {
    safePage = 1;
  }

  const issues = await prisma.issue.findMany({
    where: safeParams.status !== "ALL" ? { status: safeParams.status } : {},
    orderBy: { [safeParams.orderField]: safeParams.orderValue },
    skip: (safePage - 1) * pageSize,
    take: pageSize,
  });

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
      <IssueTable issues={issues} />
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={safePage}
      />
    </>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "Browse and manage the complete list of project issues.",
};

export default IssuesPage;
