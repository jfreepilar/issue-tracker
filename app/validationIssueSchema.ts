import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
  description: z.string().min(1, "Title is required.").max(65535),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255).optional(),
  description: z.string().min(1, "Title is required.").max(65535).optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required")
    .max(55)
    .optional()
    .nullable(),
});

export const searchParamsSchema = z.object({
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED", "ALL"]).default("ALL"),
  orderField: z.enum(["title", "createdAt"]).default("createdAt"),
  orderValue: z.enum(["asc", "desc"]).default("asc"),
});
