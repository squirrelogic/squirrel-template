import { z } from "zod";

export const createOrganizationSchema = z.object({
  name: z.string().min(1, "Organization name is required"),
  userId: z.string().uuid("Invalid user ID"),
});

export const inviteUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  organizationId: z.string().uuid("Invalid organization ID"),
});

export const acceptInviteSchema = z.object({
  token: z.string().uuid("Invalid invitation token"),
  userId: z.string().uuid("Invalid user ID").optional(),
});

export const updateOrganizationSchema = z.object({
  organizationId: z.string().uuid("Invalid organization ID"),
  name: z.string().min(1, "Organization name is required"),
});

export type CreateOrganizationSchema = z.infer<typeof createOrganizationSchema>;
export type InviteUserSchema = z.infer<typeof inviteUserSchema>;
export type AcceptInviteSchema = z.infer<typeof acceptInviteSchema>;
export type UpdateOrganizationSchema = z.infer<typeof updateOrganizationSchema>;
