import { Skeleton } from '@/app/components'
import { Box, Card, Flex, Grid } from '@radix-ui/themes'

const LoadingIssueDetailPage = () => {
  return (
     <Grid columns={{ initial: "1", sm: "5",  }} gap="5" >
      <Box className='md:col-span-4'>
        <Skeleton width="30rem" height="1.25rem" />
        <Flex gap='2' mt='2'>
          <Skeleton width="3rem" />
          <Skeleton width="10rem" />
        </Flex>
        
        <Card className='prose max-w-full' mt="5">
          <Skeleton count={3}/>
        </Card>
      </Box>

      <Box>
        <Flex direction='column' gap='4' >
          {[...Array(2)].map((_, i) => (
            <Skeleton key={i} width="13rem" height="2rem" />
          ))}
        </Flex>
      </Box>
    </Grid>   
  )
}

export default LoadingIssueDetailPage