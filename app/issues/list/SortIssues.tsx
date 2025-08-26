import { Select } from "@radix-ui/themes";

const SortIssues = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Sort by status..." />
      <Select.Content position="popper">
        <Select.Group>
          <Select.Label>Alphabet</Select.Label>
          <Select.Item value="ascending">A-Z</Select.Item>
        </Select.Group>
        <Select.Separator />
        <Select.Group>
          <Select.Label>Dates</Select.Label>
          <Select.Item value="new">Latest</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default SortIssues;
