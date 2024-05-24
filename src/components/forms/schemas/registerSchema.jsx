import { z } from "zod";
const PHONE_NUMBER_REGEX = /^((\+970)|(\+972)|0)?5[0-9]{8}$/;
const registerSchema = z
.object({
  first_name: z
    .string()
    .min(2, { message: "الاسم قصير" })
    .max(10, { message: "الاسم طويل" }),
  last_name: z
    .string()
    .min(2, { message: "الاسم قصير" })
    .max(10, { message: "الاسم طويل" }),
  email: z.string().email({ message: "الرجاء إدخال بريد إلكتروني صالح" }),
  password: z
    .string()
    .min(8, { message: "كلمة السر قصيرة جداً" })
    .max(30, { message: "كلمة السر طويلة جداً" }),
  birth_date: z.string().date("تاريخ الميلاد غير صالح"),
  password_confirmation: z
    .string()
    .min(8, { message: "كلمة السر قصيرة جداً" })
    .max(30, { message: "كلمة السر طويلة جداً" }),
  phone: z
    .string()
    .regex(PHONE_NUMBER_REGEX, { message: "رقم الجوال غير صالح" }),
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
export default registerSchema;
