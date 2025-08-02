import { Badge } from "@radix-ui/themes";
import { Status } from "@prisma/client";

const statusMap: Record<
    Status,
    {label: string, color: 'red' | 'violet' | 'green'}
> = {
    OPEN: {label: 'Open', color: 'red'},
    IN_PROGRESS: {label: 'In Progress', color: 'violet'},
    CLOSED: {label: 'Closed', color: 'green'}
};

type Props = {status: Status}

const IssueStatusBadge = ( {status} : Props ) => {
  return (
    <Badge color={statusMap[status].color} >
        {statusMap[status].label}
    </Badge>
  )
}

export default IssueStatusBadge