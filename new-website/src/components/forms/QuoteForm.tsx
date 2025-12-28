"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Slider } from '@/components/ui/slider';
import { Loader2, Calculator, Zap, Clock } from 'lucide-react';
import { quoteFormSchema, type QuoteFormData } from '@/lib/validations';
import { INDUSTRIES, MATERIALS, BUDGET_RANGES, QUANTITY_RANGES } from '@/lib/constants';
import { toast } from 'sonner';

export default function QuoteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [thickness, setThickness] = useState([10]);

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      industry: '',
      material: '',
      thickness: 10,
      quantity: '',
      budget: '',
      phone: '',
      company: '',
    },
  });

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Quote Form Data:', { ...data, thickness: thickness[0] });
      
      toast.success('询价申请已提交！', {
        description: '专业报价将在30分钟内发送到您的手机',
        duration: 5000,
      });
      
      form.reset();
      setThickness([10]);
      
    } catch (error) {
      toast.error('提交失败', {
        description: '请检查网络连接或稍后重试',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl border-0 overflow-hidden">
      {/* Header */}
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <Zap className="h-6 w-6" />
            <Badge className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1">
              快速询价
            </Badge>
          </div>
          <CardTitle className="text-3xl font-bold">
            30秒获取专业报价
          </CardTitle>
          <p className="text-blue-100 text-lg">
            基于您的需求参数，我们将为您提供最准确的设备报价和解决方案
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-blue-200">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>30分钟内回复</span>
            </div>
            <div className="w-1 h-4 bg-blue-400"></div>
            <div className="flex items-center gap-1">
              <Calculator className="h-4 w-4" />
              <span>AI智能计算</span>
            </div>
            <div className="w-1 h-4 bg-blue-400"></div>
            <div className="flex items-center gap-1">
              <Badge className="bg-green-500 text-white px-2 py-0.5 text-xs">
                免费
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Industry and Material */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold flex items-center gap-2">
                      您的行业 <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 text-base">
                          <SelectValue placeholder="选择您的行业领域" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {INDUSTRIES.map((industry) => (
                          <SelectItem key={industry.value} value={industry.value}>
                            {industry.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="material"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold flex items-center gap-2">
                      切割材料 <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 text-base">
                          <SelectValue placeholder="选择材料类型" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {MATERIALS.map((material) => (
                          <SelectItem key={material.value} value={material.value}>
                            {material.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Material Thickness Slider */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">
                材料厚度: <span className="text-blue-600 font-bold">{thickness[0]}mm</span>
              </Label>
              <div className="px-4">
                <Slider
                  value={thickness}
                  onValueChange={setThickness}
                  max={300}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>1mm</span>
                  <span>50mm</span>
                  <span>100mm</span>
                  <span>200mm</span>
                  <span>300mm</span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[3, 10, 20, 50].map((val) => (
                  <Button
                    key={val}
                    type="button"
                    variant={thickness[0] === val ? "default" : "outline"}
                    size="sm"
                    onClick={() => setThickness([val])}
                    className="h-8"
                  >
                    {val}mm
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity and Budget */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">月产量需求</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 text-base">
                          <SelectValue placeholder="选择月产量范围" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {QUANTITY_RANGES.map((quantity) => (
                          <SelectItem key={quantity.value} value={quantity.value}>
                            {quantity.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">预算范围</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 text-base">
                          <SelectValue placeholder="选择预算范围" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {BUDGET_RANGES.map((budget) => (
                          <SelectItem key={budget.value} value={budget.value}>
                            {budget.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold flex items-center gap-2">
                      联系电话 <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="tel"
                        placeholder="请输入您的手机号码" 
                        {...field}
                        className="h-12 text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">公司名称</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="请输入您的公司名称" 
                        {...field}
                        className="h-12 text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <div className="space-y-4">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    正在提交询价...
                  </>
                ) : (
                  <>
                    <Calculator className="mr-2 h-5 w-5" />
                    立即获取专业报价
                  </>
                )}
              </Button>

              {/* Trust Indicators */}
              <div className="text-center text-sm text-gray-600">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <Badge variant="outline" className="border-green-500 text-green-600">
                    ✓ 100%免费
                  </Badge>
                  <Badge variant="outline" className="border-blue-500 text-blue-600">
                    ✓ 30分钟回复
                  </Badge>
                  <Badge variant="outline" className="border-orange-500 text-orange-600">
                    ✓ 专业建议
                  </Badge>
                </div>
                <p>
                  您的信息将被严格保密，仅用于为您提供准确的产品报价和技术建议
                </p>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}