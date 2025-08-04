import { Box } from "@radix-ui/themes"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

const NewIssueLoadingPage =  () => {
    
  return (
    <Box className="max-w-xl">
        <Skeleton height="1.75rem" className="mb-2"/>
        <Skeleton className="h-[23rem] mb-8"/>
        <Skeleton height="2rem" width="9rem" />
    </Box>
  )
}

export default NewIssueLoadingPage