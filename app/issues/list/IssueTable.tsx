import { IssueStatusBadge, Link, NoIssueCard } from "@/app/components";
import { Issue } from "@prisma/client";
import { Box, Table } from "@radix-ui/themes";

const columnHeaderCellStyle: string = "hidden md:table-cell";
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

const IssueTable = ({ issues }: { issues: Issue[] }) => {
  return (
    <Box>
      {issues.length === 0 ? (
        <NoIssueCard />
      ) : (
        <Table.Root variant="surface" mb="4">
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
      )}
    </Box>
  );
};

export default IssueTable;
