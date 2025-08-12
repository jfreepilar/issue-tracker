import { Table } from '@radix-ui/themes'
import { Skeleton } from '../components'

const IssuesLoadingPage = () => {
  return (
    <>
      <div className='mb-5'>
        <Skeleton height="2rem" width="6rem" />
      </div>

        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              {[...Array(3)].map((_, i) => (
                <Table.ColumnHeaderCell key={i}>
                  <Skeleton height="1.5rem" width="5rem" />
                </Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {[...Array(3)].map(( _ , i ) => (
              <Table.Row key={i}>
                <Table.Cell >
                  <Skeleton />
                </Table.Cell>
                  <Table.Cell >
                  <Skeleton/>
                </Table.Cell>
                  <Table.Cell >
                  <Skeleton/>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
      </Table.Root>

    </>
  )
}

export default IssuesLoadingPage