import { prisma } from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueChart from "./IssueChart";
import IssueSummaryPage from "./IssueSummaryPage";
import LatestIssueComponent from "./LatestIssueComponent";

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
      <LatestIssueComponent />

      <Flex direction="column" gap="5">
        <IssueSummaryPage dashBoardProps={dashBoardProps} />
        <IssueChart dashBoardProps={dashBoardProps} />
      </Flex>
    </Grid>
  );
};

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "Get an overview of all project issues in one place.",
};

export default Home;
