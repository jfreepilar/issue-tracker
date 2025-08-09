import { prisma } from '@/prisma/client';
import { Box, Grid, Flex } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from './DeleteIssueButton';



const IssueDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const {id} = await params
  const issue = await prisma.issue.findUnique({
      where: { id }
  })

  if (!issue)  notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5",  }} gap="5" >
      <Box className='md:col-span-4'>
        <IssueDetails issue={issue}/>
      </Box>

      <Box>
        <Flex direction='column' gap='4' >
          <EditIssueButton issueId={issue.id}/>
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      </Box>
    </Grid>
  )
}

export const dynamic = 'force-dynamic';
export default IssueDetailPage