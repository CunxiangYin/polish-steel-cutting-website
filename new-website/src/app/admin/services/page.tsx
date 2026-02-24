'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, logAdminAction } from '@/lib/admin/client-auth';
import { getContent, saveAndDeploy } from '@/lib/admin/api';

interface Service {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
  features: string[];
  featuresEn: string[];
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

const ICON_OPTIONS = [
  { value: 'wrench', label: '扳手', icon: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z' },
  { value: 'cog', label: '齿轮', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z' },
  { value: 'truck', label: '卡车', icon: 'M1 3a1 1 0 0 0-1 1v10a2 2 0 0 0 2 2h1a2 2 0 0 0 4 0h6a2 2 0 0 0 4 0h1a2 2 0 0 0 2-2V8a2 2 0 0 0-.586-1.414l-3-3A2 2 0 0 0 14 3H1zm13 1.5L16.5 8H14V4.5zM5 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z' },
  { value: 'phone', label: '电话', icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
  { value: 'clipboard', label: '剪贴板', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
  { value: 'shield', label: '盾牌', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { value: 'chart', label: '图表', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { value: 'globe', label: '地球', icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9' },
];

const defaultService: Omit<Service, 'id' | 'createdAt' | 'updatedAt'> = {
  title: '新服务',
  titleEn: 'New Service',
  description: '',
  descriptionEn: '',
  icon: 'wrench',
  features: [''],
  featuresEn: [''],
  isActive: true,
  sortOrder: 0,
};

export default function ServicesEditor() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'zh' | 'en'>('zh');
  const [services, setServices] = useState<Service[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login');
      return;
    }

    // Load saved services from API
    getContent<Service[]>('services').then(data => {
      if (data) setServices(data);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, [router]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage(null);

    try {
      const { saved, deployed } = await saveAndDeploy('services', services);
      if (saved) {
        logAdminAction('save_services', { count: services.length });
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

  const handleServiceChange = (id: string, field: keyof Service, value: any) => {
    setServices(prev =>
      prev.map(service =>
        service.id === id
          ? { ...service, [field]: value, updatedAt: new Date().toISOString() }
          : service
      )
    );
  };

  const handleFeatureChange = (id: string, index: number, value: string, lang: 'zh' | 'en') => {
    setServices(prev =>
      prev.map(service => {
        if (service.id === id) {
          const key = lang === 'zh' ? 'features' : 'featuresEn';
          const newFeatures = [...service[key]];
          newFeatures[index] = value;
          return { ...service, [key]: newFeatures, updatedAt: new Date().toISOString() };
        }
        return service;
      })
    );
  };

  const addFeature = (id: string, lang: 'zh' | 'en') => {
    setServices(prev =>
      prev.map(service => {
        if (service.id === id) {
          const key = lang === 'zh' ? 'features' : 'featuresEn';
          return { ...service, [key]: [...service[key], ''] };
        }
        return service;
      })
    );
  };

  const removeFeature = (id: string, index: number, lang: 'zh' | 'en') => {
    setServices(prev =>
      prev.map(service => {
        if (service.id === id) {
          const key = lang === 'zh' ? 'features' : 'featuresEn';
          const newFeatures = service[key].filter((_, i) => i !== index);
          return { ...service, [key]: newFeatures.length > 0 ? newFeatures : [''] };
        }
        return service;
      })
    );
  };

  const addService = () => {
    const newService: Service = {
      ...defaultService,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sortOrder: services.length,
    };
    setServices([newService, ...services]);
    setEditingId(newService.id);
    logAdminAction('add_service', { serviceId: newService.id });
  };

  const deleteService = (id: string) => {
    const service = services.find(s => s.id === id);
    setServices(services.filter(s => s.id !== id));
    setShowDeleteConfirm(null);
    setEditingId(null);
    logAdminAction('delete_service', { serviceId: id, serviceTitle: service?.title });
  };

  const duplicateService = (id: string) => {
    const service = services.find(s => s.id === id);
    if (service) {
      const newService: Service = {
        ...service,
        id: Date.now().toString(),
        title: `${service.title} (副本)`,
        titleEn: `${service.titleEn} (Copy)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setServices([newService, ...services]);
      setEditingId(newService.id);
      logAdminAction('duplicate_service', { sourceId: id, newId: newService.id });
    }
  };

  const getIconPath = (iconName: string) => {
    const icon = ICON_OPTIONS.find(i => i.value === iconName);
    return icon?.icon || ICON_OPTIONS[0].icon;
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
                <h1 className="text-xl font-bold text-gray-900">服务管理</h1>
                <p className="text-sm text-gray-500">共 {services.length} 个服务</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {saveMessage && (
                <span className={`text-sm ${saveMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                  {saveMessage.text}
                </span>
              )}
              <button
                onClick={addService}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                添加服务
              </button>
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
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {services.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">没有服务项目</h3>
              <p className="mt-1 text-gray-500">点击"添加服务"开始创建新服务</p>
            </div>
          ) : (
            services.map((service) => (
              <div
                key={service.id}
                className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all ${
                  editingId === service.id ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                {/* Service Header */}
                <div className="px-6 py-4 bg-gray-50 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${service.isActive ? 'bg-amber-100 text-amber-600' : 'bg-gray-200 text-gray-400'}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getIconPath(service.icon)} />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{service.title}</h3>
                      <p className="text-sm text-gray-500">{service.titleEn}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${service.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {service.isActive ? '已启用' : '已禁用'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => duplicateService(service.id)}
                      className="px-3 py-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors text-sm"
                    >
                      复制
                    </button>
                    <button
                      onClick={() => setEditingId(editingId === service.id ? null : service.id)}
                      className={`px-3 py-1.5 rounded-lg transition-colors text-sm ${
                        editingId === service.id
                          ? 'bg-gray-600 text-white'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {editingId === service.id ? '收起' : '编辑'}
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(service.id)}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
                    >
                      删除
                    </button>
                  </div>
                </div>

                {/* Edit Form */}
                {editingId === service.id && (
                  <div className="p-6">
                    {/* Language Tabs */}
                    <div className="flex gap-2 mb-6">
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

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Left Column - Basic Info */}
                      <div className="lg:col-span-2 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {activeTab === 'zh' ? '服务名称' : 'Service Name'}
                            </label>
                            <input
                              type="text"
                              value={activeTab === 'zh' ? service.title : service.titleEn}
                              onChange={(e) => handleServiceChange(
                                service.id,
                                activeTab === 'zh' ? 'title' : 'titleEn',
                                e.target.value
                              )}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              服务图标
                            </label>
                            <select
                              value={service.icon}
                              onChange={(e) => handleServiceChange(service.id, 'icon', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              {ICON_OPTIONS.map(icon => (
                                <option key={icon.value} value={icon.value}>
                                  {icon.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {activeTab === 'zh' ? '服务描述' : 'Service Description'}
                          </label>
                          <textarea
                            value={activeTab === 'zh' ? service.description : service.descriptionEn}
                            onChange={(e) => handleServiceChange(
                              service.id,
                              activeTab === 'zh' ? 'description' : 'descriptionEn',
                              e.target.value
                            )}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                          />
                        </div>

                        {/* Features */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-gray-700">
                              {activeTab === 'zh' ? '服务特点' : 'Service Features'}
                            </label>
                            <button
                              onClick={() => addFeature(service.id, activeTab)}
                              className="px-3 py-1 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg text-sm transition-colors"
                            >
                              + 添加
                            </button>
                          </div>
                          <div className="space-y-2">
                            {(activeTab === 'zh' ? service.features : service.featuresEn).map((feature, index) => (
                              <div key={index} className="flex gap-2">
                                <input
                                  type="text"
                                  value={feature}
                                  onChange={(e) => handleFeatureChange(service.id, index, e.target.value, activeTab)}
                                  placeholder={activeTab === 'zh' ? '输入服务特点...' : 'Enter feature...'}
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <button
                                  onClick={() => removeFeature(service.id, index, activeTab)}
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

                      {/* Right Column - Settings */}
                      <div className="space-y-4">
                        {/* Icon Preview */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            图标预览
                          </label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex items-center justify-center">
                            <div className="w-16 h-16 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
                              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getIconPath(service.icon)} />
                              </svg>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            排序
                          </label>
                          <input
                            type="number"
                            value={service.sortOrder}
                            onChange={(e) => handleServiceChange(service.id, 'sortOrder', parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm font-medium text-gray-700">启用状态</span>
                          <button
                            onClick={() => handleServiceChange(service.id, 'isActive', !service.isActive)}
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              service.isActive ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                          >
                            <span
                              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                service.isActive ? 'translate-x-6' : ''
                              }`}
                            />
                          </button>
                        </div>

                        <div className="text-xs text-gray-500 space-y-1">
                          <p>创建时间: {new Date(service.createdAt).toLocaleString('zh-CN')}</p>
                          <p>更新时间: {new Date(service.updatedAt).toLocaleString('zh-CN')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">确认删除</h3>
                <p className="text-sm text-gray-500">此操作无法撤销</p>
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              确定要删除服务 <strong>{services.find(s => s.id === showDeleteConfirm)?.title}</strong> 吗？
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                取消
              </button>
              <button
                onClick={() => deleteService(showDeleteConfirm)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
