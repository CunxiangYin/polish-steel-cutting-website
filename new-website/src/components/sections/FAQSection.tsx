"use client";
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HelpCircle, Phone, Mail, MessageCircle, Search } from 'lucide-react';

export default function FAQSection() {
  const faqs = [
    {
      id: 'equipment-types',
      question: '普耐斯提供哪些类型的钢材切割设备？',
      answer: '普耐斯提供全面的钢材切割设备，包括CNC等离子切割系统、激光切割机、火焰切割设备和台湾荣华分条机。我们还提供辅助设备、零配件和各种厚度钢板的完整加工解决方案。',
      category: 'product'
    },
    {
      id: 'technical-support',
      question: '你们提供技术支持和维护服务吗？',
      answer: '是的，我们提供全面的技术支持，包括安装指导、操作员培训、维护咨询和零配件供应。我们经验丰富的团队由付经理带领，在广东省及邻近地区提供现场和远程技术援助。',
      category: 'service'
    },
    {
      id: 'delivery-time',
      question: '设备的典型交货时间是多长？',
      answer: '交货时间因设备类型和定制要求而异。标准设备通常在2-4周内发货，而定制解决方案可能需要4-8周。我们在广东地区保持热销型号和零配件库存以便更快交货。',
      category: 'logistics'
    },
    {
      id: 'ronghua-distributor',
      question: '你们是台湾荣华设备的授权经销商吗？',
      answer: '是的，普耐斯是台湾荣华精密机械的授权经销商。我们提供正宗的荣华分条机、飞剪和钢带切割机，享有完整的制造商保修和技术支持。我们的合作伙伴关系确保正品产品和可靠的售后服务。',
      category: 'certification'
    },
    {
      id: 'industries-served',
      question: '你们为哪些行业服务？',
      answer: '我们主要为大型钢铁企业、钢材加工配送中心服务。主要客户包括宝钢、攀钢、鞍钢、马钢等大型钢铁企业，海尔、长虹、美的等制造业集团下属加工中心，以及日本JFE、三井等国际钢铁集团。',
      category: 'industry'
    },
    {
      id: 'quotation-process',
      question: '如何获取设备报价？',
      answer: '您可以通过我们网站的联系表单、致电+86 755-26443680或发送邮件至466904802@qq.com来申请报价。请提供您的切割要求、材料规格和产量的详细信息以获得准确报价。付经理将亲自协助技术规格制定。',
      category: 'sales'
    },
    {
      id: 'quality-assurance',
      question: '你们如何确保设备质量？',
      answer: '我们是台湾荣华机械厂股份有限公司国内代表处，代理销售60年技术传承的专业设备。同时也是日本JDC合格代理商。所有设备都经过严格的出厂检验，我们提供完善的安装调试和售后服务体系。',
      category: 'quality'
    },
    {
      id: 'payment-terms',
      question: '支付条款和方式是什么？',
      answer: '我们接受多种支付方式，包括银行转账、信用证和分期付款计划。具体的支付条款根据设备类型和订单金额而定。我们的销售团队会为您制定灵活的支付方案。',
      category: 'payment'
    },
    {
      id: 'taiwan-yunghua-partnership',
      question: '你们与台湾荣华机械的关系是什么？',
      answer: '我们是台湾荣华机械厂股份有限公司在中国大陆的国内代表处，负责荣华机械大型分条机、剪板机的销售、安装调试以及售后服务。荣华机械拥有60年的专业技术经验，产品遍及世界各地。',
      category: 'partnership'
    },
    {
      id: 'jdc-products',
      question: '你们的日本JDC皮带张紧器有什么特点？',
      answer: '我们是日本JDC公司合格代理商。JDC皮带张紧器是该公司的专利高技术产品，能够增加卷紧张力，避免钢卷表面擦痕，特别适用于不锈钢、彩涂板、铝板等高表面要求材料的加工。',
      category: 'product'
    },
    {
      id: 'technical-services',
      question: '你们提供哪些技术服务？',
      answer: '我们提供全面的技术服务，包括：1.设备维修、保养、改造（定制月度、季度、年度维护计划）；2.防尘棚制作（针对铝板、不锈钢板、汽车面板加工）；3.圆刀、整平辊研磨及辊子包胶（拥有上海机床厂精密外圆磨床）。',
      category: 'service'
    }
  ];

  const categories = [
    { id: 'all', name: '全部问题', count: faqs.length },
    { id: 'product', name: '产品相关', count: faqs.filter(f => f.category === 'product').length },
    { id: 'service', name: '服务支持', count: faqs.filter(f => f.category === 'service').length },
    { id: 'partnership', name: '合作伙伴', count: faqs.filter(f => f.category === 'partnership').length },
    { id: 'logistics', name: '物流交付', count: faqs.filter(f => f.category === 'logistics').length },
    { id: 'sales', name: '销售咨询', count: faqs.filter(f => f.category === 'sales').length }
  ];

  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-purple-100 text-purple-700 px-4 py-2 mb-4">
            常见问题
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            常见问题解答
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            找到关于我们钢材切割设备和服务的常见问题答案
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Search */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  搜索问题
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="搜索问题..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">问题分类</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "ghost"}
                      className="w-full justify-between"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <span>{category.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Contact */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  还有问题？
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-blue-700">
                  没找到您想要的答案？我们的专业团队随时为您提供帮助。
                </p>
                <div className="space-y-2">
                  <Button 
                    size="sm" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    立即致电
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full border-blue-300 text-blue-600"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    发送邮件
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full border-blue-300 text-blue-600"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    在线客服
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            {filteredFAQs.length > 0 ? (
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <Accordion type="single" collapsible className="w-full">
                    {filteredFAQs.map((faq, index) => (
                      <AccordionItem key={faq.id} value={faq.id} className="border-b border-gray-200">
                        <AccordionTrigger className="text-left hover:no-underline py-6">
                          <div className="flex items-start gap-4 text-left">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                              <span className="text-sm font-semibold text-blue-600">
                                {index + 1}
                              </span>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 pr-4">
                                {faq.question}
                              </h3>
                              <Badge 
                                variant="secondary" 
                                className="mt-2 text-xs"
                              >
                                {categories.find(c => c.id === faq.category)?.name}
                              </Badge>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-6">
                          <div className="ml-12 text-gray-600 leading-relaxed">
                            {faq.answer}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    未找到相关问题
                  </h3>
                  <p className="text-gray-600 mb-6">
                    请尝试调整搜索关键词或选择其他问题分类
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button 
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                      }}
                    >
                      清除筛选
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      直接咨询
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Additional Help */}
            <div className="mt-8 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">
                需要更详细的技术信息？
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                我们的技术专家团队可以为您提供详细的设备规格、安装指导和操作培训。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  下载技术手册
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-gray-900"
                >
                  预约技术咨询
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}