import dynamic from "next/dynamic"
import IssueFormSkeleton from "../_components/IssueFormSkeleton"

const IssueForm = dynamic(
  () => import('@/app/issues/_components/IssueForm'),
)

const NewIssuePage = () => {

  return (
    <IssueForm />
  )
}

export default NewIssuePage