"use client";

import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get<User[]>("/api/users");
      return res.data;
    },
    staleTime: 1000 * 60,
    retry: 2,
  });

  if (error) return null;
  if (isLoading) return <Skeleton height="2rem" />;

  return (
    <Select.Root
      defaultValue={issue.assignedToUserId || "null"}
      onValueChange={(userId) => {
        axios.patch("/api/issues/" + issue.id, {
          assignedToUserId: userId === "null" ? null : userId,
        });
      }}
    >
      <Select.Trigger placeholder="Assign..."></Select.Trigger>
      <Select.Content position="popper">
        <Select.Group>
          <Select.Label>Suggestion...</Select.Label>
          <Select.Item value="null">Unassigned</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
