import { prisma } from "@/prisma/client";
import LatestIssueComponent from "./LatestIssueComponent";
import IssueSummaryPage from "./IssueSummaryPage";
import IssueChart from "./IssueChart";
import { Grid, Flex } from "@radix-ui/themes";

const Home = async () => {
  const openCount = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgressCount = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closedCount = await prisma.issue.count({ where: { status: "CLOSED" } });

  const dashBoardProps: { open: number; inProgress: number; closed: number } = {
    open: openCount,
    inProgress: inProgressCount,
    closed: closedCount,
  };

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummaryPage dashBoardProps={dashBoardProps} />
        <IssueChart dashBoardProps={dashBoardProps} />
      </Flex>
      <LatestIssueComponent />
    </Grid>
  );
};

export default Home;
