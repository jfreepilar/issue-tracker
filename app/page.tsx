import { prisma } from "@/prisma/client";
import LatestIssueComponent from "./LatestIssueComponent";

const Home = () => {
  return (
    <div>
      <LatestIssueComponent />
    </div>
  );
};

export default Home;
