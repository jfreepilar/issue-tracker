import React from 'react'
import { prisma } from '@/prisma/client'
import { notFound } from 'next/navigation'
import { Heading, Text, Flex, Card } from '@radix-ui/themes'
import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import Markdown from 'react-markdown'


interface Props {
    params: {id: string}
}

const IssueDetailPage = async ( {params} : Props) => {

    const issue = await prisma.issue.findUnique({
        where: {id: params.id}
    })

    if (!issue)  notFound();

  return (
    <div>
        <Heading>{issue.title}</Heading>
        <Flex gap='4' my='2'>
          <IssueStatusBadge status={issue.status}></IssueStatusBadge>
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className='prose' mt="5">
          <Markdown>{issue.description}</Markdown>
        </Card>
    </div>
  )
}

export default IssueDetailPage