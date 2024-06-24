import { z } from "zod";

const changePasswordSchema = z
  .object({
    current_password: z
      .string()
      .min(8, { message: "كلمة السر قصيرة جداً" })
      .max(30, { message: "كلمة السر طويلة جداً" }),
    password: z
      .string()
      .min(8, { message: "كلمة السر قصيرة جداً" })
      .max(30, { message: "كلمة السر طويلة جداً" }),
    password_confirmation: z
      .string()
      .min(8, { message: "كلمة السر قصيرة جداً" })
      .max(30, { message: "كلمة السر طويلة جداً" }),
  })
  .refine(
    (data) => {
      return data.password === data.password_confirmation;
    },
    {
      message: "يجب أن تتطابق كلمتا السر",
      path: ["password_confirmation"],
    }
  );
export default changePasswordSchema;
