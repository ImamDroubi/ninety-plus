import { z } from "zod";
const loginSchema = z.object({
  email: z.string().email({ message: "الرجاء إدخال بريد إلكتروني صالح" }),
  password: z.string(),
});
export default loginSchema;
