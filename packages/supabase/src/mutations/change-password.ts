import { createClient } from "../clients/server";
export async function changePassword(newPassword: string) {
  const client = await createClient();

  const { error } = await client.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    throw error;
  }
}
