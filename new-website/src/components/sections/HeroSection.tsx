"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Phone, Calculator, BookOpen, PlayCircle, Star, Users, Award, TrendingUp } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/constants';

export default function HeroSection() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats = [
    {
      icon: <Users className="h-6 w-6" />,
      number: '500+',
      label: '成功客户',
      description: '服务客户'
    },
    {
      icon: <Award className="h-6 w-6" />,
      number: '19+',
      label: '年经验',
      description: '行业经验'
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      number: '100%',
      label: '质量保证',
      description: '品质承诺'
    },
    {
      icon: <Star className="h-6 w-6" />,
      number: '98%',
      label: '满意度',
      description: '客户满意'
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-blue-100 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute bottom-40 left-20 w-16 h-16 bg-orange-100 rounded-full animate-pulse opacity-60 delay-1000"></div>
      <div className="absolute top-1/3 left-10 w-12 h-12 bg-green-100 rounded-full animate-pulse opacity-60 delay-2000"></div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5">
                <Award className="h-3 w-3 mr-1" />
                台湾荣华授权经销商
              </Badge>
              <Badge variant="outline" className="border-orange-500 text-orange-600 px-4 py-1.5">
                成立于{COMPANY_INFO.founded}年
              </Badge>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                专业
                <span className="text-blue-600 relative">
                  钢板切割
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full"></div>
                </span>
                设备制造商
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                自2005年起，专业从事等离子、激光、火焰切割系统，为全球金属制造行业提供优质设备解决方案
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
                onClick={scrollToContact}
              >
                <Phone className="h-5 w-5 mr-2" />
                免费获取报价
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg"
                onClick={scrollToProducts}
              >
                <Calculator className="h-5 w-5 mr-2" />
                产品对比
              </Button>
              
              <Button 
                variant="ghost" 
                size="lg"
                className="text-gray-600 hover:text-gray-800 px-8 py-6 text-lg"
              >
                <PlayCircle className="h-5 w-5 mr-2" />
                观看视频
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <span className="text-sm text-gray-500">信赖我们的客户:</span>
              <div className="flex items-center space-x-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
                <span className="text-sm text-gray-600 ml-2">4.8/5.0 (156条评价)</span>
              </div>
            </div>
          </div>

          {/* Visual/Stats Section */}
          <div className="space-y-6">
            {/* Main Visual Card */}
            <Card className="relative overflow-hidden border-2 border-blue-100 shadow-xl">
              <CardContent className="p-8">
                <div className="relative h-64 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  {/* Animated Gears */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-4 left-4 w-16 h-16 border-4 border-white/20 rounded-full animate-spin-slow"></div>
                    <div className="absolute bottom-4 right-4 w-12 h-12 border-4 border-white/30 rounded-full animate-spin-reverse"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-4 border-white/40 rounded-full animate-spin-slow"></div>
                  </div>
                  
                  {/* Center Icon */}
                  <div className="relative z-10 text-white text-center">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <div className="w-12 h-12 bg-white/30 rounded-lg"></div>
                    </div>
                    <h3 className="text-xl font-semibold">智能切割系统</h3>
                    <p className="text-blue-100">高精度 · 高效率 · 高品质</p>
                  </div>
                </div>

                {/* Feature Highlights */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">±0.1mm</div>
                    <div className="text-sm text-gray-600">切割精度</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">200mm</div>
                    <div className="text-sm text-gray-600">最大厚度</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-4 text-center">
                    <div className="text-blue-600 mb-2 flex justify-center">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                    <div className="text-sm font-medium text-gray-600">{stat.label}</div>
                    <div className="text-xs text-gray-500">{stat.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <div className="animate-bounce">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-transparent rounded-full mx-auto mb-2"></div>
            <span className="text-sm text-gray-500">向下滚动</span>
          </div>
        </div>
      </div>

      {/* Add custom CSS for animations */}
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin 6s linear infinite reverse;
        }
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </section>
  );
}