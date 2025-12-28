export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  message: string;
}

export interface QuoteFormData {
  industry: string;
  material: string;
  thickness: number;
  quantity: string;
  budget: string;
  phone: string;
  company?: string;
  urgency?: string;
  additionalInfo?: string;
}

export interface NewsletterFormData {
  email: string;
  preferences: string[];
}

export interface FormSubmissionResult {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}