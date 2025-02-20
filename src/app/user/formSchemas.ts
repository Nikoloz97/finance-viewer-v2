import { z } from "zod";

export const loginFormSchema = z.object({
  username: z
    .string()
    .min(5, {
      message: "Username must be at least 5 characters",
    })
    .max(50),
  password: z
    .string()
    .min(5, {
      message: "Password must be at least 5 characters",
    })
    .max(50),
});
