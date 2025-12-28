"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Send, CheckCircle, Phone, Mail, MessageSquare } from 'lucide-react';
import { contactFormSchema, type ContactFormData } from '@/lib/validations';
import { toast } from 'sonner';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      service: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Contact Form Data:', data);
      
      // Show success message
      toast.success('消息发送成功！', {
        description: '我们会在24小时内回复您的咨询',
        duration: 5000,
      });
      
      setIsSubmitted(true);
      form.reset();
      
      // Reset success state after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
      
    } catch (error) {
      toast.error('发送失败', {
        description: '请稍后重试或直接联系我们的客服',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceOptions = [
    { value: 'plasma-cutting', label: 'CNC等离子切割' },
    { value: 'laser-cutting', label: '激光切割系统' },
    { value: 'flame-cutting', label: '火焰切割设备' },
    { value: 'taiwan-ronghua', label: '台湾荣华分条机' },
    { value: 'conveyor-systems', label: '输送带系统' },
    { value: 'consultation', label: '技术咨询' },
    { value: 'maintenance', label: '维修保养' },
    { value: 'parts', label: '零配件采购' },
    { value: 'other', label: '其他服务' },
  ];

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">消息发送成功！</h3>
            <p className="text-gray-600">
              感谢您的咨询，我们已收到您的消息。我们的销售代表会在24小时内与您联系。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={() => setIsSubmitted(false)}
                variant="outline"
              >
                发送另一条消息
              </Button>
              <Button 
                onClick={() => window.open(`tel:${'+86-755-2644-3680'}`, '_self')}
              >
                <Phone className="h-4 w-4 mr-2" />
                立即致电
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader className="text-center bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="flex items-center justify-center gap-2 mb-2">
          <MessageSquare className="h-6 w-6 text-blue-600" />
          <Badge className="bg-blue-600 hover:bg-blue-700 text-white">
            专业咨询
          </Badge>
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">
          获取专业设备咨询
        </CardTitle>
        <p className="text-gray-600 mt-2">
          请填写以下信息，我们的技术专家将为您提供定制化解决方案
        </p>
      </CardHeader>
      
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      姓名 <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="请输入您的姓名" 
                        {...field} 
                        className="h-11"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      邮箱地址 <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="email"
                        placeholder="example@company.com" 
                        {...field}
                        className="h-11"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>公司名称</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="您的公司名称" 
                        {...field}
                        className="h-11"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      联系电话
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="tel"
                        placeholder="您的手机号码" 
                        {...field}
                        className="h-11"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Service Interest */}
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>服务需求</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="请选择您感兴趣的产品或服务" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {serviceOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Message */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    留言内容 <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="请详细描述您的需求，包括：
• 切割材料类型和厚度
• 加工量和精度要求  
• 预算范围
• 交付时间要求
• 其他特殊需求..."
                      className="min-h-[120px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    发送中...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    发送消息
                  </>
                )}
              </Button>
              
              <Button 
                type="button"
                variant="outline"
                className="h-12"
                onClick={() => window.open(`tel:${'+86-755-2644-3680'}`, '_self')}
              >
                <Phone className="mr-2 h-4 w-4" />
                直接致电
              </Button>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
              <div className="flex flex-col sm:flex-row gap-4 text-center sm:text-left">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-600" />
                  <span>+86 755-2644-3680</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <span>466904802@qq.com</span>
                </div>
                <div className="text-blue-600 font-medium">
                  付经理: +86 135-1099-2218
                </div>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}