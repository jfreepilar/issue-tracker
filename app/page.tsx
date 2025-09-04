import { Pagination } from "./components";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;

  return (
    <div>
      <Pagination
        itemCount={100}
        pageSize={10}
        currentPage={parseInt(page) || 1}
      />
    </div>
  );
};

export default Home;
