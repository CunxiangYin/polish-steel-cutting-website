import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Award, 
  Users, 
  Target, 
  Shield, 
  Handshake, 
  TrendingUp,
  Factory,
  Globe,
  Phone
} from 'lucide-react';
import { COMPANY_INFO } from '@/lib/constants';

export default function AboutSection() {
  const features = [
    {
      icon: <Award className="h-6 w-6" />,
      title: '质量保证设备',
      description: '从可靠制造商采购的专业钢材加工设备，包括台湾荣华机械。',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: '专业服务',
      description: '全面的销售支持，技术咨询、维修指导和零配件供应。',
      color: 'text-green-600 bg-green-50'
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: '本地支持',
      description: '基地深圳，深入了解区域市场需求和快速响应能力。',
      color: 'text-orange-600 bg-orange-50'
    }
  ];

  const stats = [
    { label: '设备质量', value: 95, description: '客户满意度评分' },
    { label: '客户满意度', value: 92, description: '售后服务评价' },
    { label: '区域覆盖', value: 88, description: '广东省及周边' },
    { label: '技术支持', value: 96, description: '响应及时性' }
  ];

  const achievements = [
    { icon: <Factory className="h-5 w-5" />, text: '500+ 成功安装案例' },
    { icon: <Shield className="h-5 w-5" />, text: '台湾荣华授权代理商' },
    { icon: <Award className="h-5 w-5" />, text: 'ISO质量认证' },
    { icon: <Handshake className="h-5 w-5" />, text: '19年行业经验' }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-green-100 text-green-700 px-4 py-2 mb-4">
            关于我们
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            自2005年起领先钢材切割技术
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            深圳普耐斯机电设备有限公司专业从事钢板、钢板加工设备、辅助设备、零配件及周边材料销售。
            我们提供技术维修和咨询服务，主营台湾荣华精密机械，为全球金属制造行业服务。
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Company Story */}
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-orange-500 rounded-full"></div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    我们的使命
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    为金属制造行业提供最优质的钢板加工设备和专业服务，
                    帮助客户提升生产效率和产品质量。我们致力于成为您可信赖的设备供应伙伴。
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    核心价值观
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-blue-600" />
                      <span>客户至上，提供超预期的服务体验</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span>质量第一，确保设备稳定可靠</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Handshake className="h-4 w-4 text-orange-600" />
                      <span>诚信合作，建立长期伙伴关系</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-purple-600" />
                      <span>持续创新，推动行业技术进步</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">公司资质</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="text-blue-600">
                          {achievement.icon}
                        </div>
                        <span>{achievement.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics and Features */}
          <div className="space-y-8">
            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  服务质量指标
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {stats.map((stat, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">{stat.label}</span>
                      <span className="text-2xl font-bold text-blue-600">{stat.value}%</span>
                    </div>
                    <Progress value={stat.value} className="h-2" />
                    <p className="text-xs text-gray-500">{stat.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">联系我们的团队</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-blue-700 mb-2">
                      想了解更多关于我们的设备和服务？
                    </p>
                    <p className="text-sm text-blue-600">
                      我们的专业团队随时为您提供技术咨询和产品建议。
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Phone className="h-4 w-4 mr-2" />
                      立即联系: {COMPANY_INFO.contact.phone}
                    </Button>
                    <div className="text-center">
                      <p className="text-sm text-blue-600">
                        {COMPANY_INFO.contact.manager}: {COMPANY_INFO.contact.mobile}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className={`w-16 h-16 rounded-full ${feature.color} flex items-center justify-center mx-auto mb-4`}>
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">
              为什么选择普耐斯设备解决方案？
            </h3>
            <p className="text-gray-300 mb-8 max-w-3xl mx-auto text-lg">
              我们对优质设备分销和专业服务的承诺使我们成为整个广东地区钢材加工公司的可信赖合作伙伴。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                查看我们的产品
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                下载公司简介
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}