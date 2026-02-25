"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Wrench, 
  Shield, 
  Cog, 
  CheckCircle, 
  Clock,
  Users,
  Award,
  Target
} from 'lucide-react';
import { technicalServices, serviceAdvantages, serviceProcess, technicalCapabilities } from '@/data/services';

export default function ServicesSection() {
  const getServiceIcon = (serviceId: string) => {
    switch (serviceId) {
      case 'equipment-maintenance':
        return <Wrench className="h-6 w-6" />;
      case 'dust-proof-shed':
        return <Shield className="h-6 w-6" />;
      case 'grinding-processing':
        return <Cog className="h-6 w-6" />;
      default:
        return <CheckCircle className="h-6 w-6" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-orange-100 text-orange-700 px-4 py-2 mb-4">
            技术服务
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            专业技术服务体系
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            以"专业、全面、尽心之服务"为经营方针，为客户提供全方位的技术支持和设备维护服务
          </p>
        </div>

        {/* Technical Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {technicalServices.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-orange-600">
                    {getServiceIcon(service.id)}
                  </div>
                </div>
                <CardTitle className="text-xl text-center">{service.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>

                {service.features && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">服务特点：</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {service.scope && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">服务范围：</h4>
                    <div className="flex flex-wrap gap-1">
                      {service.scope.map((item, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {service.applications && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">应用领域：</h4>
                    <div className="flex flex-wrap gap-1">
                      {service.applications.map((app, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {app}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {service.capabilities && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">技术能力：</h4>
                    <ul className="space-y-1">
                      {service.capabilities.map((capability, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                          <Target className="h-3 w-3 text-blue-500 mt-0.5 flex-shrink-0" />
                          {capability}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Service Advantages */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            服务优势
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceAdvantages.map((advantage, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm border">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{advantage.title}</h4>
                <p className="text-sm text-gray-600">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Service Process */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            服务流程
          </h3>
          <div className="relative">
            {/* Process Timeline */}
            <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-gray-200"></div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {serviceProcess.map((step, index) => (
                <div key={step.step} className="relative">
                  {/* Step Number Circle */}
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                    <span className="text-white font-bold">{step.step}</span>
                  </div>
                  
                  {/* Step Content */}
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                    <Badge variant="outline" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {step.duration}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Capabilities */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            技术能力矩阵
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technicalCapabilities.map((category, index) => (
              <Card key={index} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-700 flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.capabilities.map((capability, capIndex) => (
                      <li key={capIndex} className="text-sm text-gray-600 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        {capability}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            需要专业的设备维护服务？
          </h3>
          <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
            我们的技术团队拥有60年的专业经验，为您提供最可靠的设备维护和技术支持服务
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-50"
            >
              获取服务报价
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-orange-600"
            >
              联系技术专家
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}