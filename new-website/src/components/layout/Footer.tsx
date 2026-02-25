import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Mail, Clock, Award, Shield } from 'lucide-react';
import { COMPANY_INFO, SOCIAL_LINKS } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const productCategories = [
    { name: '钢板加工设备', href: '#products/steel-processing' },
    { name: '激光切割系统', href: '#products/laser-cutting' },
    { name: '火焰切割设备', href: '#products/flame-cutting' },
    { name: '台湾荣华分条机', href: '#products/taiwan-ronghua' },
    { name: '辅助设备', href: '#products/auxiliary' }
  ];

  const services = [
    { name: '技术支持', href: '#services/support' },
    { name: '设备安装', href: '#services/installation' },
    { name: '维修保养', href: '#services/maintenance' },
    { name: '操作培训', href: '#services/training' },
    { name: '技术咨询', href: '#services/consulting' }
  ];

  const companyLinks = [
    { name: '关于我们', href: '#about' },
    { name: '发展历程', href: '#history' },
    { name: '新闻动态', href: '#news' },
    { name: '成功案例', href: '#case-studies' },
    { name: '联系我们', href: '#contact' }
  ];

  const resources = [
    { name: '产品文档', href: '#downloads' },
    { name: '技术规格', href: '#specifications' },
    { name: '操作手册', href: '#manuals' },
    { name: '常见问题', href: '#faq' },
    { name: '视频教程', href: '#tutorials' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="relative h-12 w-40 mb-4">
                <Image
                  src="/logo-main.svg"
                  alt={COMPANY_INFO.nameEn}
                  fill
                  className="object-contain filter invert"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">{COMPANY_INFO.name}</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {COMPANY_INFO.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="bg-blue-600 hover:bg-blue-700">
                  <Award className="h-3 w-3 mr-1" />
                  成立于{COMPANY_INFO.founded}年
                </Badge>
                <Badge variant="secondary" className="bg-green-600 hover:bg-green-700">
                  <Shield className="h-3 w-3 mr-1" />
                  台湾荣华授权代理
                </Badge>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 mt-1 text-blue-400 flex-shrink-0" />
                <div className="text-sm">
                  <p>{COMPANY_INFO.address.street}</p>
                  <p>{COMPANY_INFO.address.city}, {COMPANY_INFO.address.region}</p>
                  <p>{COMPANY_INFO.address.country} {COMPANY_INFO.address.postalCode}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <div className="text-sm">
                  <p>{COMPANY_INFO.contact.phone}</p>
                  <p>{COMPANY_INFO.contact.mobile} ({COMPANY_INFO.contact.manager})</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <p className="text-sm">{COMPANY_INFO.contact.email}</p>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="h-4 w-4 mt-1 text-blue-400 flex-shrink-0" />
                <div className="text-sm">
                  <p>周一至周五: 08:30-18:00</p>
                  <p>周六: 09:00-17:00</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3">关注我们</h4>
              <div className="flex space-x-4">
                {SOCIAL_LINKS.map((social) => (
                  <Link
                    key={social.platform}
                    href={social.url}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={social.platform}
                  >
                    <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors">
                      {/* Icon placeholder - you would use proper icons here */}
                      <span className="text-xs">{social.platform[0]}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-4">产品中心</h4>
            <ul className="space-y-2">
              {productCategories.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">服务支持</h4>
            <ul className="space-y-2">
              {services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">资源中心</h4>
            <ul className="space-y-2">
              {resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Newsletter */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-2">获取最新资讯</h5>
              <p className="text-xs text-gray-400 mb-3">
                订阅我们的通讯，获取最新产品信息和行业动态
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="输入您的邮箱"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-sm focus:outline-none focus:border-blue-500"
                />
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-r-md transition-colors">
                  订阅
                </button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="mb-4 md:mb-0">
            <p>
              © {currentYear} {COMPANY_INFO.name}. 保留所有权利.
            </p>
            <p className="mt-1">
              统一社会信用代码: 914403007703327657
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Link href="#privacy" className="hover:text-white transition-colors">
              隐私政策
            </Link>
            <Link href="#terms" className="hover:text-white transition-colors">
              服务条款
            </Link>
            <Link href="#sitemap" className="hover:text-white transition-colors">
              网站地图
            </Link>
            <Link href="#cookies" className="hover:text-white transition-colors">
              Cookie政策
            </Link>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
            <span>网站备案号: 粤ICP备xxxxxxxx号</span>
            <span>•</span>
            <span>深圳市市场监督管理局登记</span>
            <span>•</span>
            <span>台湾荣华精密机械授权经销商</span>
          </div>
        </div>
      </div>
    </footer>
  );
}