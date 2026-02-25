'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { isAuthenticated, logAdminAction } from '@/lib/admin/client-auth';
import { getContent, saveAndDeploy } from '@/lib/admin/api';

interface HeroContent {
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  description: string;
  descriptionEn: string;
  buttonText: string;
  buttonTextEn: string;
  stats: {
    label: string;
    labelEn: string;
    value: string;
  }[];
}

const defaultContent: HeroContent = {
  title: '专业机电设备制造商',
  titleEn: 'Professional Electromechanical Equipment Manufacturer',
  subtitle: '20年行业经验',
  subtitleEn: '20 Years of Industry Experience',
  description: '我们专注于为全球客户提供高品质的机电设备和完善的解决方案',
  descriptionEn: 'We focus on providing high-quality electromechanical equipment and comprehensive solutions to global customers',
  buttonText: '了解更多',
  buttonTextEn: 'Learn More',
  stats: [
    { label: '年行业经验', labelEn: 'Years Experience', value: '20+' },
    { label: '服务客户', labelEn: 'Clients Served', value: '500+' },
    { label: '产品种类', labelEn: 'Product Types', value: '100+' },
    { label: '技术专利', labelEn: 'Tech Patents', value: '50+' }
  ]
};

export default function HeroEditor() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'zh' | 'en'>('zh');
  const [content, setContent] = useState<HeroContent>(defaultContent);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login');
      return;
    }

    // Load saved content from API
    getContent<HeroContent>('hero').then(data => {
      if (data) setContent({ ...defaultContent, ...data });
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, [router]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage(null);

    try {
      const { saved, deployed } = await saveAndDeploy('hero', content);
      if (saved) {
        logAdminAction('save_hero', { title: content.title });
        setSaveMessage({ type: 'success', text: deployed ? '保存成功，已触发重新部署！' : '保存成功！' });
      } else {
        setSaveMessage({ type: 'error', text: '保存失败，请重试' });
      }
    } catch (error) {
      setSaveMessage({ type: 'error', text: '保存失败，请重试' });
    }

    setIsSaving(false);
    setTimeout(() => setSaveMessage(null), 3000);
  };

  const handleStatChange = (index: number, field: 'label' | 'labelEn' | 'value', value: string) => {
    const newStats = [...content.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setContent({ ...content, stats: newStats });
  };

  const addStat = () => {
    setContent({
      ...content,
      stats: [...content.stats, { label: '新指标', labelEn: 'New Metric', value: '0' }]
    });
  };

  const removeStat = (index: number) => {
    const newStats = content.stats.filter((_, i) => i !== index);
    setContent({ ...content, stats: newStats });
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
              <Link
                href="/admin"
                className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                返回
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">首页编辑</h1>
                <p className="text-sm text-gray-500">编辑首页横幅内容和统计数据</p>
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
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            基本信息
          </h2>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {activeTab === 'zh' ? '主标题' : 'Main Title'}
              </label>
              <input
                type="text"
                value={activeTab === 'zh' ? content.title : content.titleEn}
                onChange={(e) => setContent({
                  ...content,
                  [activeTab === 'zh' ? 'title' : 'titleEn']: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={activeTab === 'zh' ? '请输入主标题' : 'Enter main title'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {activeTab === 'zh' ? '副标题' : 'Subtitle'}
              </label>
              <input
                type="text"
                value={activeTab === 'zh' ? content.subtitle : content.subtitleEn}
                onChange={(e) => setContent({
                  ...content,
                  [activeTab === 'zh' ? 'subtitle' : 'subtitleEn']: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={activeTab === 'zh' ? '请输入副标题' : 'Enter subtitle'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {activeTab === 'zh' ? '描述文字' : 'Description'}
              </label>
              <textarea
                value={activeTab === 'zh' ? content.description : content.descriptionEn}
                onChange={(e) => setContent({
                  ...content,
                  [activeTab === 'zh' ? 'description' : 'descriptionEn']: e.target.value
                })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                placeholder={activeTab === 'zh' ? '请输入描述文字' : 'Enter description'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {activeTab === 'zh' ? '按钮文字' : 'Button Text'}
              </label>
              <input
                type="text"
                value={activeTab === 'zh' ? content.buttonText : content.buttonTextEn}
                onChange={(e) => setContent({
                  ...content,
                  [activeTab === 'zh' ? 'buttonText' : 'buttonTextEn']: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={activeTab === 'zh' ? '请输入按钮文字' : 'Enter button text'}
              />
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              统计数据
            </h2>
            <button
              onClick={addStat}
              className="px-3 py-1.5 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg text-sm transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              添加指标
            </button>
          </div>

          <div className="space-y-3">
            {content.stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="w-full sm:w-24">
                  <label className="block text-xs font-medium text-gray-500 mb-1">数值</label>
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold"
                    placeholder="数值"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    {activeTab === 'zh' ? '标签' : 'Label'}
                  </label>
                  <input
                    type="text"
                    value={activeTab === 'zh' ? stat.label : stat.labelEn}
                    onChange={(e) => handleStatChange(index, activeTab === 'zh' ? 'label' : 'labelEn', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={activeTab === 'zh' ? '标签' : 'Label'}
                  />
                </div>
                {content.stats.length > 1 && (
                  <div className="flex items-end">
                    <button
                      onClick={() => removeStat(index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="删除"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            预览
          </h2>

          <div className="bg-gray-900 rounded-lg p-8 text-white">
            <p className="text-sm text-gray-400 mb-2">
              {activeTab === 'zh' ? content.subtitle : content.subtitleEn}
            </p>
            <h1 className="text-3xl font-bold mb-4">
              {activeTab === 'zh' ? content.title : content.titleEn}
            </h1>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-2xl">
              {activeTab === 'zh' ? content.description : content.descriptionEn}
            </p>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              {activeTab === 'zh' ? content.buttonText : content.buttonTextEn}
            </button>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8 pt-8 border-t border-gray-700">
              {content.stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-2xl sm:text-3xl font-bold text-blue-400">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    {activeTab === 'zh' ? stat.label : stat.labelEn}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
