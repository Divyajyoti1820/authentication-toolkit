import { UserRole } from "@prisma/client";
import * as z from "zod";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    { message: "New password is required", path: ["newPassword"] }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    { message: "password is required", path: ["newPassword"] }
  );

export const LoginSchema = z.object({
  email: z.string().email({ message: "Please provide correct email" }),
  password: z.string().min(1, { message: "Credential invalid" }),
  code: z.optional(z.string()),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "Please provide correct email" }),
});

export const RegisterSchema = z.object({
  name: z.string().min(3, { message: "Please provide correct name" }),
  email: z.string().email({ message: "Please provide correct email" }),
  password: z.string().min(6, { message: "min 6 characters required " }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, { message: "min 6 characters required " }),
});
