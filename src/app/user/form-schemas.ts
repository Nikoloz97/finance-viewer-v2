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

export const signupFormSchema = z.object({
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
  email: z
    .string()
    .email()
    .min(10, {
      message: "Please enter a valid email",
    })
    .max(50),
  firstName: z
    .string()
    .min(5, {
      message: "First name must be at least 5 characters",
    })
    .max(50),
  lastName: z
    .string()
    .min(5, {
      message: "Last name must be at least 5 characters",
    })
    .max(50),
  occupation: z.string().optional(),
  profileImageFile: z
    .custom(
      (file) => {
        if (!file) return true;
        const allowedExtensions = [".jpeg", ".jpg", ".png"];
        return allowedExtensions.some((extension) =>
          file.name.toLowerCase().endsWith(extension)
        );
      },
      {
        message: "Invalid file type",
      }
    )
    .optional(),
});
