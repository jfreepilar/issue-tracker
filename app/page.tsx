import { prisma } from "@/prisma/client";
import LatestIssueComponent from "./LatestIssueComponent";
import IssueSummaryPage from "./IssueSummaryPage";

const Home = async () => {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });

  return (
    <div>
      {/* <LatestIssueComponent /> */}
      <IssueSummaryPage open={open} inProgress={inProgress} closed={closed} />
    </div>
  );
};

export default Home;
