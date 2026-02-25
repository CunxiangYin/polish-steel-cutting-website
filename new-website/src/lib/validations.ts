import * as z from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "姓名至少需要2个字符",
  }),
  email: z.string().email({
    message: "请输入有效的邮箱地址",
  }),
  company: z.string().optional(),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, {
    message: "留言至少需要10个字符",
  }),
});

export const quoteFormSchema = z.object({
  industry: z.string().min(1, {
    message: "请选择您的行业",
  }),
  material: z.string().min(1, {
    message: "请选择切割材料",
  }),
  thickness: z.number().min(1).max(300, {
    message: "厚度必须在1-300mm之间",
  }),
  quantity: z.string().min(1, {
    message: "请选择月产量范围",
  }),
  budget: z.string().min(1, {
    message: "请选择预算范围",
  }),
  phone: z.string().min(11, {
    message: "请输入有效的手机号码",
  }),
  company: z.string().optional(),
  urgency: z.string().optional(),
  additionalInfo: z.string().optional(),
});

export const newsletterFormSchema = z.object({
  email: z.string().email({
    message: "请输入有效的邮箱地址",
  }),
  preferences: z.array(z.string()).optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type QuoteFormData = z.infer<typeof quoteFormSchema>;
export type NewsletterFormData = z.infer<typeof newsletterFormSchema>;