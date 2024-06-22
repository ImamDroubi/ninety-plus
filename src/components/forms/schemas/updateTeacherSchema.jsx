import { z } from "zod";
const PHONE_NUMBER_REGEX = /^((\+970)|(\+972)|0)?5[0-9]{8}$/;
const updateTeacherSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: "الاسم قصير" })
    .max(10, { message: "الاسم طويل" }),
  last_name: z
    .string()
    .min(2, { message: "الاسم قصير" })
    .max(10, { message: "الاسم طويل" }),
  birth_date: z.string().date("تاريخ الميلاد غير صالح"),
  phone: z
    .string()
    .regex(PHONE_NUMBER_REGEX, { message: "رقم الجوال غير صالح" }),
});

export default updateTeacherSchema;
