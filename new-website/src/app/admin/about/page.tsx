'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, logAdminAction } from '@/lib/admin/client-auth';

interface ContactInfo {
  phone: string;
  email: string;
  fax: string;
  website: string;
}

interface Address {
  zh: string;
  en: string;
}

interface SocialMedia {
  wechat: string;
  qq: string;
  linkedin: string;
}

interface CompanyInfo {
  name: string;
  nameEn: string;
  slogan: string;
  sloganEn: string;
  description: string;
  descriptionEn: string;
  founded: string;
  employees: string;
  contact: ContactInfo;
  address: Address;
  socialMedia: SocialMedia;
  businessHours: string;
  businessHoursEn: string;
  mission: string;
  missionEn: string;
  values: string[];
  valuesEn: string[];
}

const defaultCompanyInfo: CompanyInfo = {
  name: '深圳普耐斯机电设备有限公司',
  nameEn: 'Shenzhen Punaise Mechanical Equipment Co., Ltd.',
  slogan: '专业机电设备制造商',
  sloganEn: 'Professional Electromechanical Equipment Manufacturer',
  description: '',
  descriptionEn: '',
  founded: '2004',
  employees: '100+',
  contact: {
    phone: '+86-755-12345678',
    email: 'contact@punaise.com',
    fax: '+86-755-12345679',
    website: 'https://punaise-equipment.netlify.app',
  },
  address: {
    zh: '广东省深圳市宝安区',
    en: 'Bao\'an District, Shenzhen, Guangdong, China',
  },
  socialMedia: {
    wechat: '',
    qq: '',
    linkedin: '',
  },
  businessHours: '周一至周五 9:00-18:00',
  businessHoursEn: 'Monday - Friday 9:00 AM - 6:00 PM',
  mission: '',
  missionEn: '',
  values: [''],
  valuesEn: [''],
};

export default function AboutEditor() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'zh' | 'en'>('zh');
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(defaultCompanyInfo);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login');
      return;
    }

    // Load saved company info
    const savedInfo = localStorage.getItem('about_content');
    if (savedInfo) {
      try {
        setCompanyInfo({ ...defaultCompanyInfo, ...JSON.parse(savedInfo) });
      } catch (e) {
        console.error('Failed to load saved company info');
      }
    }
    setIsLoading(false);
  }, [router]);

  const handleSave = () => {
    setIsSaving(true);
    setSaveMessage(null);

    try {
      localStorage.setItem('about_content', JSON.stringify(companyInfo));
      localStorage.setItem('about_content_updated', new Date().toISOString());
      logAdminAction('save_about', { company: companyInfo.name });

      setSaveMessage({ type: 'success', text: '保存成功！' });
    } catch (error) {
      setSaveMessage({ type: 'error', text: '保存失败，请重试' });
    }

    setIsSaving(false);
    setTimeout(() => setSaveMessage(null), 3000);
  };

  const handleValueChange = (index: number, value: string, lang: 'zh' | 'en') => {
    const key = lang === 'zh' ? 'values' : 'valuesEn';
    const newValues = [...companyInfo[key]];
    newValues[index] = value;
    setCompanyInfo({ ...companyInfo, [key]: newValues });
  };

  const addValue = (lang: 'zh' | 'en') => {
    const key = lang === 'zh' ? 'values' : 'valuesEn';
    setCompanyInfo({ ...companyInfo, [key]: [...companyInfo[key], ''] });
  };

  const removeValue = (index: number, lang: 'zh' | 'en') => {
    const key = lang === 'zh' ? 'values' : 'valuesEn';
    const newValues = companyInfo[key].filter((_, i) => i !== index);
    setCompanyInfo({ ...companyInfo, [key]: newValues.length > 0 ? newValues : [''] });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/admin')}
                className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                返回
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">公司信息</h1>
                <p className="text-sm text-gray-500">编辑公司简介和联系方式</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {saveMessage && (
                <span className={`text-sm ${saveMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                  {saveMessage.text}
                </span>
              )}
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                {isSaving ? (
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {isSaving ? '保存中...' : '保存更改'}
              </button>
            </div>
          </div>

          {/* Language Tabs */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setActiveTab('zh')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'zh'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              中文
            </button>
            <button
              onClick={() => setActiveTab('en')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'en'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              English
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            基本信息
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {activeTab === 'zh' ? '公司名称' : 'Company Name'}
              </label>
              <input
                type="text"
                value={activeTab === 'zh' ? companyInfo.name : companyInfo.nameEn}
                onChange={(e) => setCompanyInfo({
                  ...companyInfo,
                  [activeTab === 'zh' ? 'name' : 'nameEn']: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {activeTab === 'zh' ? '公司口号' : 'Company Slogan'}
              </label>
              <input
                type="text"
                value={activeTab === 'zh' ? companyInfo.slogan : companyInfo.sloganEn}
                onChange={(e) => setCompanyInfo({
                  ...companyInfo,
                  [activeTab === 'zh' ? 'slogan' : 'sloganEn']: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                成立年份
              </label>
              <input
                type="text"
                value={companyInfo.founded}
                onChange={(e) => setCompanyInfo({ ...companyInfo, founded: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="2004"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                员工人数
              </label>
              <input
                type="text"
                value={companyInfo.employees}
                onChange={(e) => setCompanyInfo({ ...companyInfo, employees: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="100+"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {activeTab === 'zh' ? '公司简介' : 'Company Description'}
              </label>
              <textarea
                value={activeTab === 'zh' ? companyInfo.description : companyInfo.descriptionEn}
                onChange={(e) => setCompanyInfo({
                  ...companyInfo,
                  [activeTab === 'zh' ? 'description' : 'descriptionEn']: e.target.value
                })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                placeholder={activeTab === 'zh' ? '请输入公司简介...' : 'Enter company description...'}
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            联系方式
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                电话
              </label>
              <input
                type="text"
                value={companyInfo.contact.phone}
                onChange={(e) => setCompanyInfo({
                  ...companyInfo,
                  contact: { ...companyInfo.contact, phone: e.target.value }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="+86-755-12345678"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                邮箱
              </label>
              <input
                type="email"
                value={companyInfo.contact.email}
                onChange={(e) => setCompanyInfo({
                  ...companyInfo,
                  contact: { ...companyInfo.contact, email: e.target.value }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="contact@company.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                传真
              </label>
              <input
                type="text"
                value={companyInfo.contact.fax}
                onChange={(e) => setCompanyInfo({
                  ...companyInfo,
                  contact: { ...companyInfo.contact, fax: e.target.value }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="+86-755-12345679"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                网站
              </label>
              <input
                type="url"
                value={companyInfo.contact.website}
                onChange={(e) => setCompanyInfo({
                  ...companyInfo,
                  contact: { ...companyInfo.contact, website: e.target.value }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://www.company.com"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {activeTab === 'zh' ? '公司地址' : 'Company Address'}
              </label>
              <input
                type="text"
                value={activeTab === 'zh' ? companyInfo.address.zh : companyInfo.address.en}
                onChange={(e) => setCompanyInfo({
                  ...companyInfo,
                  address: {
                    ...companyInfo.address,
                    [activeTab]: e.target.value
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {activeTab === 'zh' ? '营业时间' : 'Business Hours'}
              </label>
              <input
                type="text"
                value={activeTab === 'zh' ? companyInfo.businessHours : companyInfo.businessHoursEn}
                onChange={(e) => setCompanyInfo({
                  ...companyInfo,
                  [activeTab === 'zh' ? 'businessHours' : 'businessHoursEn']: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
            社交媒体
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                微信公众号
              </label>
              <input
                type="text"
                value={companyInfo.socialMedia.wechat}
                onChange={(e) => setCompanyInfo({
                  ...companyInfo,
                  socialMedia: { ...companyInfo.socialMedia, wechat: e.target.value }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="微信号或公众号ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                QQ
              </label>
              <input
                type="text"
                value={companyInfo.socialMedia.qq}
                onChange={(e) => setCompanyInfo({
                  ...companyInfo,
                  socialMedia: { ...companyInfo.socialMedia, qq: e.target.value }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="QQ号码"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                LinkedIn
              </label>
              <input
                type="text"
                value={companyInfo.socialMedia.linkedin}
                onChange={(e) => setCompanyInfo({
                  ...companyInfo,
                  socialMedia: { ...companyInfo.socialMedia, linkedin: e.target.value }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="LinkedIn 链接"
              />
            </div>
          </div>
        </div>

        {/* Mission & Values */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            使命与价值观
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {activeTab === 'zh' ? '企业使命' : 'Company Mission'}
              </label>
              <textarea
                value={activeTab === 'zh' ? companyInfo.mission : companyInfo.missionEn}
                onChange={(e) => setCompanyInfo({
                  ...companyInfo,
                  [activeTab === 'zh' ? 'mission' : 'missionEn']: e.target.value
                })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                placeholder={activeTab === 'zh' ? '请输入企业使命...' : 'Enter company mission...'}
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  {activeTab === 'zh' ? '核心价值观' : 'Core Values'}
                </label>
                <button
                  onClick={() => addValue(activeTab)}
                  className="px-3 py-1 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg text-sm transition-colors"
                >
                  + 添加
                </button>
              </div>
              <div className="space-y-2">
                {(activeTab === 'zh' ? companyInfo.values : companyInfo.valuesEn).map((value, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleValueChange(index, e.target.value, activeTab)}
                      placeholder={activeTab === 'zh' ? '输入价值观...' : 'Enter value...'}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      onClick={() => removeValue(index, activeTab)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Preview Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            预览
          </h2>
          <div className="bg-gray-900 rounded-lg p-6 text-white">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">
                {activeTab === 'zh' ? companyInfo.name : companyInfo.nameEn}
              </h3>
              <p className="text-gray-400">
                {activeTab === 'zh' ? companyInfo.slogan : companyInfo.sloganEn}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{companyInfo.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{companyInfo.contact.email}</span>
              </div>
              <div className="flex items-center gap-2 md:col-span-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{activeTab === 'zh' ? companyInfo.address.zh : companyInfo.address.en}</span>
              </div>
            </div>
            {(activeTab === 'zh' ? companyInfo.values : companyInfo.valuesEn).filter(v => v).length > 0 && (
              <div className="mt-6 pt-4 border-t border-gray-700">
                <div className="flex flex-wrap gap-2">
                  {(activeTab === 'zh' ? companyInfo.values : companyInfo.valuesEn).filter(v => v).map((value, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm">
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
