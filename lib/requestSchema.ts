import { z } from "zod";

export const requestSchema = z.object({
  email: z.string().email({ message: "enter valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});
