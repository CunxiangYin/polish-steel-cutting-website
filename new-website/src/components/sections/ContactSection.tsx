import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ContactForm from '@/components/forms/ContactForm';
import QuoteForm from '@/components/forms/QuoteForm';
import { MapPin, Phone, Mail, Clock, Award, Users, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/constants';

export default function ContactSection() {
  const contactMethods = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: '电话咨询',
      description: '工作时间内即时响应',
      primary: COMPANY_INFO.contact.phone,
      secondary: `${COMPANY_INFO.contact.mobile} (${COMPANY_INFO.contact.manager})`,
      action: () => window.open(`tel:${COMPANY_INFO.contact.phone.replace(/\s+/g, '')}`, '_self'),
      color: 'text-blue-600 bg-blue-50'
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: '邮件联系',
      description: '24小时内必回复',
      primary: COMPANY_INFO.contact.email,
      secondary: '支持中英文咨询',
      action: () => window.open(`mailto:${COMPANY_INFO.contact.email}`, '_self'),
      color: 'text-green-600 bg-green-50'
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: '在线客服',
      description: '即时沟通解决方案',
      primary: '微信客服',
      secondary: '扫码添加微信',
      action: () => {
        // This would open WeChat QR code or similar
        alert('微信客服功能即将开放');
      },
      color: 'text-orange-600 bg-orange-50'
    }
  ];

  const officeHours = [
    { day: '周一至周五', hours: '08:30 - 18:00' },
    { day: '周六', hours: '09:00 - 17:00' },
    { day: '周日', hours: '休息' }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-blue-100 text-blue-700 px-4 py-2 mb-4">
            联系我们
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            专业团队随时为您服务
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            准备升级您的钢板加工能力？联系普耐斯专家，获取专业的钢板加工设备和台湾荣华机械解决方案。自2005年起为客户服务。
          </p>
        </div>

        {/* Quick Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={method.action}>
              <CardHeader className="text-center">
                <div className={`w-16 h-16 rounded-full ${method.color} flex items-center justify-center mx-auto mb-3`}>
                  {method.icon}
                </div>
                <CardTitle className="text-lg">{method.title}</CardTitle>
                <p className="text-sm text-gray-600">{method.description}</p>
              </CardHeader>
              <CardContent className="text-center">
                <p className="font-semibold text-gray-900">{method.primary}</p>
                <p className="text-sm text-gray-600 mt-1">{method.secondary}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Contact Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Company Info */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  公司信息
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{COMPANY_INFO.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{COMPANY_INFO.nameEn}</p>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p>{COMPANY_INFO.address.street}</p>
                    <p>{COMPANY_INFO.address.city}, {COMPANY_INFO.address.region}</p>
                    <p>{COMPANY_INFO.address.country} {COMPANY_INFO.address.postalCode}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h5 className="font-medium text-gray-900 mb-2">联系方式</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-blue-600" />
                      <span>{COMPANY_INFO.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-green-600" />
                      <span>{COMPANY_INFO.contact.mobile} ({COMPANY_INFO.contact.manager})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-orange-600" />
                      <span>{COMPANY_INFO.contact.email}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h5 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    营业时间
                  </h5>
                  <div className="space-y-1 text-sm">
                    {officeHours.map((time, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-gray-600">{time.day}:</span>
                        <span className="font-medium text-gray-900">{time.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-2">
                    <Award className="h-6 w-6 text-blue-600" />
                    <h4 className="font-semibold text-gray-900">为什么选择我们</h4>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">500+</div>
                      <div className="text-xs text-gray-600">满意客户</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">19+</div>
                      <div className="text-xs text-gray-600">年经验</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">98%</div>
                      <div className="text-xs text-gray-600">满意度</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">24h</div>
                      <div className="text-xs text-gray-600">响应时间</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Award className="h-4 w-4 text-green-500" />
                      <span>台湾荣华授权经销商</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Users className="h-4 w-4 text-green-500" />
                      <span>专业技术团队支持</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock className="h-4 w-4 text-green-500" />
                      <span>24小时快速响应</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <CardContent className="p-6 text-center">
                <h4 className="font-bold text-lg mb-2">紧急技术支持</h4>
                <p className="text-orange-100 mb-4 text-sm">
                  设备故障需要紧急维修？我们提供7×24小时紧急技术支持服务
                </p>
                <Button 
                  variant="secondary"
                  className="bg-white text-orange-600 hover:bg-gray-100"
                  onClick={() => window.open(`tel:${COMPANY_INFO.contact.mobile.replace(/\s+/g, '')}`, '_self')}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  紧急联系
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Forms */}
          <div className="lg:col-span-2 space-y-12">
            {/* Quick Quote Form */}
            <div>
              <QuoteForm />
            </div>

            {/* Detailed Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>

        {/* Map Section Placeholder */}
        <div className="mt-16">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                我们的位置
              </CardTitle>
              <p className="text-gray-600">
                深圳市南山区，便利的交通位置，欢迎预约参观我们的展厅和设备演示
              </p>
            </CardHeader>
            <CardContent className="p-0">
              {/* Map placeholder - would integrate with Google Maps or similar */}
              <div className="h-64 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                  <p className="font-medium">交互地图</p>
                  <p className="text-sm">显示公司位置和交通信息</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}