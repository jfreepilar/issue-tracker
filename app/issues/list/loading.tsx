import { Flex, Table } from "@radix-ui/themes";
import { Skeleton } from "../../components";

const IssuesLoadingPage = () => {
  return (
    <>
      <Flex className="mb-5" justify="between">
        <Flex gap="1.5rem">
          <Skeleton height="2rem" width="3rem" />
          <Skeleton height="2rem" width="5rem" />
        </Flex>
        <Skeleton height="2rem" width="6rem" />
      </Flex>

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {[...Array(3)].map((_, i) => (
              <Table.ColumnHeaderCell key={i}>
                <Skeleton height="1rem" width="5rem" />
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {[...Array(10)].map((_, i) => (
            <Table.Row key={i}>
              <Table.Cell width="620px">
                <Skeleton height="1rem" width="300px" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton height="1rem" width="5rem" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton height="1rem" width="140px" />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default IssuesLoadingPage;
