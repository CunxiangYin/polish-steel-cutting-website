"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Factory, Settings, Zap, Truck } from 'lucide-react';
import { toast } from 'sonner';

export default function SimplePage() {
  const handleGetQuote = (productName: string) => {
    toast.success(`询价请求已发送：${productName}`);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('联系信息已提交，我们会尽快回复！');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-32 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">Punaise</span>
                </div>
              </div>
            </div>
            <nav className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#hero" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">首页</a>
                <a href="#products" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">产品</a>
                <a href="#about" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">关于</a>
                <a href="#contact" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">联系</a>
              </div>
            </nav>
            <Button variant="outline" size="sm">
              <Phone className="w-4 h-4 mr-2" />
              +86 135-1099-2218
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              专业钢板切割设备制造商
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
              深圳普耐斯机电设备有限公司，19年专注CNC等离子、激光、火焰切割设备研发制造
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button size="lg" variant="secondary" onClick={() => handleGetQuote('整体解决方案')}>
                <Settings className="w-5 h-5 mr-2" />
                获取报价
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Phone className="w-5 h-5 mr-2" />
                立即咨询
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">19+</div>
              <div className="text-gray-600">年行业经验</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">500+</div>
              <div className="text-gray-600">服务企业</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">1000+</div>
              <div className="text-gray-600">设备销售</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">24/7</div>
              <div className="text-gray-600">技术支持</div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              专业切割设备产品线
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              提供全系列钢板切割解决方案，满足不同行业需求
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* CNC Plasma */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>CNC等离子切割机</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  高精度数控等离子切割，适用于各种厚度金属材料
                </p>
                <div className="space-y-2">
                  <Badge variant="secondary">切割厚度: 0.5-50mm</Badge>
                  <Badge variant="secondary">精度: ±0.3mm</Badge>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>• 自动调高系统</li>
                  <li>• 套料软件优化</li>
                  <li>• 多火炬配置</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={() => handleGetQuote('CNC等离子切割机')}
                >
                  获取报价
                </Button>
              </CardFooter>
            </Card>

            {/* Laser Cutting */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Settings className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>激光切割设备</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  高功率光纤激光切割，极高精度和切割质量
                </p>
                <div className="space-y-2">
                  <Badge variant="secondary">切割厚度: 0.1-30mm</Badge>
                  <Badge variant="secondary">精度: ±0.03mm</Badge>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>• 光纤激光器</li>
                  <li>• 自动上下料</li>
                  <li>• 智能排料系统</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={() => handleGetQuote('激光切割设备')}
                >
                  获取报价
                </Button>
              </CardFooter>
            </Card>

            {/* Flame Cutting */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Factory className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle>数控火焰切割机</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  大厚度钢板切割的经济型解决方案
                </p>
                <div className="space-y-2">
                  <Badge variant="secondary">切割厚度: 6-300mm</Badge>
                  <Badge variant="secondary">经济高效</Badge>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>• 双火炬配置</li>
                  <li>• 预热自动控制</li>
                  <li>• 大型龙门结构</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={() => handleGetQuote('数控火焰切割机')}
                >
                  获取报价
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">
                关于深圳普耐斯机电设备
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                成立于2005年，我们是一家专业从事钢板切割设备研发、制造、销售和服务的高新技术企业。
                公司位于深圳市南山区，拥有现代化的生产基地和技术研发中心。
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Factory className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold">专业制造</div>
                  <div className="text-sm text-gray-600">19年制造经验</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Settings className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold">技术领先</div>
                  <div className="text-sm text-gray-600">持续技术创新</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Truck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold">全程服务</div>
                  <div className="text-sm text-gray-600">售前售后支持</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Phone className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold">24小时</div>
                  <div className="text-sm text-gray-600">技术热线支持</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4">服务优势</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>专业的技术团队，为客户提供个性化解决方案</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>完善的售后服务体系，全国范围快速响应</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>持续的技术培训支持，确保设备高效运行</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>原厂配件供应保障，设备长期稳定运行</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              联系我们
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              立即联系，获取专业的切割设备解决方案
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-6">联系信息</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <div className="font-medium">24小时服务热线</div>
                    <div className="text-gray-600">+86 135-1099-2218</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <div className="font-medium">邮箱咨询</div>
                    <div className="text-gray-600">info@punaise.com</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <div className="font-medium">公司地址</div>
                    <div className="text-gray-600">深圳市南山区科技园</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h4 className="font-bold mb-2">专业服务承诺</h4>
                <p className="text-sm text-gray-600">
                  我们承诺为每一位客户提供专业、及时、贴心的服务。
                  从咨询、设计、制造到安装调试，全程专业团队跟进。
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>快速咨询</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <Input 
                        placeholder="您的姓名" 
                        required 
                      />
                    </div>
                    <div>
                      <Input 
                        type="tel" 
                        placeholder="联系电话" 
                        required 
                      />
                    </div>
                    <div>
                      <Input 
                        type="email" 
                        placeholder="邮箱地址" 
                        required 
                      />
                    </div>
                    <div>
                      <Input 
                        placeholder="公司名称" 
                      />
                    </div>
                    <div>
                      <Textarea 
                        placeholder="请描述您的需求..." 
                        rows={4}
                        required 
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      提交咨询
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="h-8 w-32 bg-blue-600 rounded flex items-center justify-center mb-4">
                <span className="text-white font-bold text-sm">Punaise</span>
              </div>
              <p className="text-gray-400 text-sm">
                深圳普耐斯机电设备有限公司
                专业钢板切割设备制造商
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">产品系列</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>CNC等离子切割机</li>
                <li>激光切割设备</li>
                <li>数控火焰切割机</li>
                <li>配套设备</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">服务支持</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>技术咨询</li>
                <li>方案设计</li>
                <li>安装调试</li>
                <li>售后维护</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">联系方式</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>电话: +86 135-1099-2218</li>
                <li>邮箱: info@punaise.com</li>
                <li>地址: 深圳市南山区</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 深圳普耐斯机电设备有限公司. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}