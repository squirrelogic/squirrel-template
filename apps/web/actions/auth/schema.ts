import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password:
    z.string().min(12, "Password must be at least 12 characters")
  ,
  confirm_password: z.string(),
  name: z.string().min(2, "Name must be at least 2 characters"),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords do not match",
  path: ["confirm_password"],
});
