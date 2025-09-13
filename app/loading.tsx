import { Flex } from "@radix-ui/themes";
import { Roller } from "react-css-spinners";

const loading = () => {
  return (
    <Flex justify="center" pt="184px" position="relative">
      <Roller color="var(--violet-11)" size={100} />
      <p className="absolute top-55 font-bold text-[14px]">Loading...</p>
    </Flex>
  );
};

export default loading;
