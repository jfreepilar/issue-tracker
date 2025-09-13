import { Skeleton } from "@/app/components";
import { Card, Flex, Grid, Table } from "@radix-ui/themes";

const DashBoardSkeleton = () => {
  return (
    <Grid columns={{ initial: "1", md: "1fr 1fr" }} gap="5">
      <Card className="min-w-fit">
        <Skeleton width="160px" height="22px" />
        <Table.Root>
          <Table.Body>
            {[...Array(5)].map((_, i) => (
              <Table.Row key={i}>
                <Table.Cell>
                  <Flex gap="236px">
                    <Flex direction="column" align="start" gap="2">
                      <Skeleton width="236px" height="22px" />
                      <Skeleton width="104px" height="14px" />
                      <Skeleton width="74px" height="20px" />
                    </Flex>
                    <Skeleton circle={true} width="40px" height="40px" />
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Card>

      <Flex gap="4" direction="column" className="w-full">
        <Flex gap="4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} width="111px" height="80px" />
          ))}
        </Flex>
        <Card>
          <Flex gap="110px" px="3rem">
            {[...Array(3)].map((_, i) => (
              <Flex key={i} direction="column" gap="1">
                <Skeleton width="60px" height="210px" />
                <Skeleton width="60px" height="24px" />
              </Flex>
            ))}
          </Flex>
        </Card>
      </Flex>
    </Grid>
  );
};

export default DashBoardSkeleton;
