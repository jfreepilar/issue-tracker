import { Skeleton } from '@/app/components'
import { Box, Card, Flex, Grid } from '@radix-ui/themes'

const LoadingIssueDetailPage = () => {
  return (
     <Grid columns={{ initial: "1", md: "2",  }} gap="5" >
      <Box className='max-w-xl'>
          <Skeleton/>
          <Flex gap='4' my='2'>
            <Skeleton width='5rem' />
            <Skeleton width='8rem' />
          </Flex>
          <Card className='prose' mt="5">
            <Skeleton count={3}/>
          </Card>
      </Box>

      <Box>
        <Skeleton height="1.75rem" width="7rem" />
      </Box>
    </Grid>   


  )
}

export default LoadingIssueDetailPage