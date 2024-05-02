import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Please provide correct email" }),
  password: z.string().min(1, { message: "Credential invalid" }),
});
