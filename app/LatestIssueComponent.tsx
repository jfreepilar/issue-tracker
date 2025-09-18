import { prisma } from "@/prisma/client";
import { Card, Table, Flex, Heading, Text, Avatar } from "@radix-ui/themes";
import Link from "next/link";
import { IssueStatusBadge } from "./components";

const LatestIssueComponent = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  return (
    <Card>
      {issues.length === 0 ? (
        <Text>No Issues yet</Text>
      ) : (
        <Table.Root>
          <Heading> Latest Issues</Heading>
          <Table.Body>
            {issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Flex justify="between">
                    <Flex direction="column" align="start" gap="2">
                      <Link href={`/issues/${issue.id}`} className="text-lg">
                        {issue.title}
                      </Link>
                      <Text>{issue.createdAt.toDateString()}</Text>
                      <IssueStatusBadge status={issue.status} />
                    </Flex>
                    {issue.assignedToUser && (
                      <Avatar
                        src={issue.assignedToUser.image!}
                        fallback="?"
                        size="3"
                        radius="full"
                      />
                    )}
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </Card>
  );
};

export default LatestIssueComponent;
