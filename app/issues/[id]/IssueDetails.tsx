import { IssueStatusBadge } from "@/app/components"
import { Card, Flex, Heading, Text } from "@radix-ui/themes"
import Markdown from "react-markdown"
import { Issue } from "@prisma/client"

const IssueDetails = ({issue}  : {issue: Issue}) => {
  return (
    <>
    <Heading>{issue.title}</Heading>
        <Flex gap='4' my='2'>
            <IssueStatusBadge status={issue.status}></IssueStatusBadge>
            <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
    <Card className='prose max-w-full' mt="5">
        <Markdown>{issue.description}</Markdown>
    </Card>
    </>
  )
}

export default IssueDetails