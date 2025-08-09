import dynamic from "next/dynamic"
import IssueFormSkeleton from "../_components/IssueFormSkeleton"

const IssueForm = dynamic(
  () => import('@/app/issues/_components/IssueForm'),
  {
    loading: () => <IssueFormSkeleton/>
  }
)

const NewIssuePage = () => {

  return (
    <IssueForm />
  )
}

export default NewIssuePage