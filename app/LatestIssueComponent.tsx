import { prisma } from "@/prisma/client";
import { Avatar, Box, Flex, Heading, Table, Text } from "@radix-ui/themes";
import Link from "next/link";
import { IssueStatusBadge, NoIssueCard } from "./components";

const LatestIssueComponent = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  return (
    <Box>
      {issues.length === 0 ? (
        <NoIssueCard />
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
    </Box>
  );
};

export default LatestIssueComponent;
