"use client";

import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

interface SelectItems {
  label: string;
  value: string;
}

const selectItems: SelectItems[] = [
  { label: "A-Z", value: "asc-title" },
  { label: "Z-A", value: "desc-title" },
  { label: "Latest", value: "desc-createdAt" },
  { label: "Oldest", value: "asc-createdAt" },
];

const SortIssues = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select.Root
      defaultValue={searchParams.get("orderValue") || "desc-createdAt"}
      onValueChange={(sort) => {
        const params = new URLSearchParams(searchParams);
        const [orderValue, orderField] = sort.split("-");

        params.set("orderField", orderField);
        params.set("orderValue", orderValue);

        router.push(`/issues/list?${params.toString()}`);
      }}
    >
      <Select.Trigger placeholder="Sort by order..." />
      <Select.Content position="popper">
        <Select.Group>
          <Select.Label>Alphabet</Select.Label>
          {selectItems.slice(0, 2).map((item) => (
            <Select.Item key={item.value} value={item.value}>
              {item.label}
            </Select.Item>
          ))}
        </Select.Group>
        <Select.Separator />
        <Select.Group>
          <Select.Label>Dates</Select.Label>
          {selectItems.slice(2, 4).map((item) => (
            <Select.Item key={item.value} value={item.value}>
              {item.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default SortIssues;
