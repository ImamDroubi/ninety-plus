import { z } from "zod";

const courseSchema = z.object({
  title: z
    .string()
    .min(10, { message: "العنوان قصير جداً" })
    .max(150, { message: "العنوان طويل جداً" }),
  coverage: z
    .string()
    .min(5, { message: "يرجى تزويد معلومات أكثر" })
    .max(150, { message: "أطول من اللازم" }),
  description: z.string().min(10, { message: "قصير جدا" }),
  starts_at: z.string().date("تاريخ البدء غير صالح"),
  ends_at: z.string().date("تاريخ الانتهاء غير صالح"),
  welcome_message: z.string(),
  ending_message: z.string(),
  price: z.string()
});
export default courseSchema;
