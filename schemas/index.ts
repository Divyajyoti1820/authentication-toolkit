import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Please provide correct email" }),
  password: z.string().min(1, { message: "Credential invalid" }),
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
