import { prisma } from "@/prisma/client";
import { Card, Table, Flex, Heading, Text, Avatar } from "@radix-ui/themes";
import Link from "next/link";
import { IssueStatusBadge } from "./components";
import { string } from "zod";

const LatestIssueComponent = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  const issueTitle = await prisma.issue.findMany({
    select: { title: true },
  });

  return (
    <Card>
      <Heading> Latest Issues</Heading>
      <Table.Root>
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
      {issueTitle.map((issue) => (
        <p>{issue.title}</p>
      ))}
    </Card>
  );
};

export default LatestIssueComponent;
