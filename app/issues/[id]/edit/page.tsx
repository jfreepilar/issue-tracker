import { prisma } from '@/prisma/client'
import { notFound } from 'next/navigation'
import IssueForm from '@/app/issues/_components/IssueForm'


const EditIssuePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const issue = await prisma.issue.findUnique({
    where: { id }
  })

  if (!issue) notFound()

  return <IssueForm issue={issue} />
}

export default EditIssuePage

