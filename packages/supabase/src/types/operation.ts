import type { Tables } from "./db";

export type OperationResult<T> = {
  data: T | null;
  error: Error | null;
};

export type UserOperationResult = OperationResult<{
  id: string;
  email: string;
  full_name: string | null;
}>;

export type PostOperationResult = OperationResult<Tables<"posts">>;
export type PostsOperationResult = OperationResult<Tables<"posts">[]>;

export type RegisterResult = OperationResult<{
  id: string;
  email: string;
}>;

export type InvitationOperationResult = OperationResult<Tables<"invitations">>;

export type OrganizationOperationResult = OperationResult<
  Tables<"organizations">
>;
export type OrganizationsOperationResult = OperationResult<
  Tables<"organizations">[]
>;
