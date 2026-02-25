'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, logAdminAction } from '@/lib/admin/client-auth';
import { getContent, saveAndDeploy } from '@/lib/admin/api';

interface Product {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  categoryEn: string;
  description: string;
  descriptionEn: string;
  features: string[];
  featuresEn: string[];
  price: string;
  image: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

const CATEGORIES = [
  { zh: '切割设备', en: 'Cutting Equipment' },
  { zh: '成型设备', en: 'Forming Equipment' },
  { zh: '辅助设备', en: 'Auxiliary Equipment' },
  { zh: '配件工具', en: 'Parts & Tools' },
];

const defaultProduct: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> = {
  name: '新产品',
  nameEn: 'New Product',
  category: '切割设备',
  categoryEn: 'Cutting Equipment',
  description: '',
  descriptionEn: '',
  features: [''],
  featuresEn: [''],
  price: '询价',
  image: '/images/products/placeholder.jpg',
  isActive: true,
  sortOrder: 0,
};

export default function ProductsEditor() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'zh' | 'en'>('zh');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [filterDateRange, setFilterDateRange] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const [searchInDescription, setSearchInDescription] = useState(true);
  const [searchInFeatures, setSearchInFeatures] = useState(true);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login');
      return;
    }

    // Load saved products from API
    getContent<Product[]>('products').then(data => {
      if (data) setProducts(data);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, [router]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage(null);

    try {
      const { saved, deployed } = await saveAndDeploy('products', products);
      if (saved) {
        logAdminAction('save_products', { count: products.length });
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

  const handleProductChange = (id: string, field: keyof Product, value: any) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id
          ? { ...product, [field]: value, updatedAt: new Date().toISOString() }
          : product
      )
    );
  };

  const handleFeatureChange = (id: string, index: number, value: string, lang: 'zh' | 'en') => {
    setProducts(prev =>
      prev.map(product => {
        if (product.id === id) {
          const key = lang === 'zh' ? 'features' : 'featuresEn';
          const newFeatures = [...product[key]];
          newFeatures[index] = value;
          return { ...product, [key]: newFeatures, updatedAt: new Date().toISOString() };
        }
        return product;
      })
    );
  };

  const addFeature = (id: string, lang: 'zh' | 'en') => {
    setProducts(prev =>
      prev.map(product => {
        if (product.id === id) {
          const key = lang === 'zh' ? 'features' : 'featuresEn';
          return { ...product, [key]: [...product[key], ''] };
        }
        return product;
      })
    );
  };

  const removeFeature = (id: string, index: number, lang: 'zh' | 'en') => {
    setProducts(prev =>
      prev.map(product => {
        if (product.id === id) {
          const key = lang === 'zh' ? 'features' : 'featuresEn';
          const newFeatures = product[key].filter((_, i) => i !== index);
          return { ...product, [key]: newFeatures.length > 0 ? newFeatures : [''] };
        }
        return product;
      })
    );
  };

  const addProduct = () => {
    const newProduct: Product = {
      ...defaultProduct,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sortOrder: products.length,
    };
    setProducts([newProduct, ...products]);
    setEditingId(newProduct.id);
    logAdminAction('add_product', { productId: newProduct.id });
  };

  const deleteProduct = (id: string) => {
    const product = products.find(p => p.id === id);
    setProducts(products.filter(product => product.id !== id));
    setShowDeleteConfirm(null);
    setEditingId(null);
    logAdminAction('delete_product', { productId: id, productName: product?.name });
  };

  const duplicateProduct = (id: string) => {
    const product = products.find(p => p.id === id);
    if (product) {
      const newProduct: Product = {
        ...product,
        id: Date.now().toString(),
        name: `${product.name} (副本)`,
        nameEn: `${product.nameEn} (Copy)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setProducts([newProduct, ...products]);
      setEditingId(newProduct.id);
      logAdminAction('duplicate_product', { sourceId: id, newId: newProduct.id });
    }
  };

  const handleCategoryChange = (id: string, category: string) => {
    const cat = CATEGORIES.find(c => c.zh === category);
    if (cat) {
      setProducts(prev =>
        prev.map(product =>
          product.id === id
            ? { ...product, category: cat.zh, categoryEn: cat.en, updatedAt: new Date().toISOString() }
            : product
        )
      );
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setFilterCategory('');
    setFilterStatus('all');
    setFilterDateRange('all');
  };

  // Check if any filter is active
  const hasActiveFilters = searchTerm !== '' || filterCategory !== '' || filterStatus !== 'all' || filterDateRange !== 'all';

  // Filter products with advanced search
  const filteredProducts = products.filter(product => {
    // Search term matching
    const searchLower = searchTerm.toLowerCase();
    let matchesSearch = searchTerm === '';

    if (!matchesSearch) {
      // Always search in name
      matchesSearch = product.name.toLowerCase().includes(searchLower) ||
        product.nameEn.toLowerCase().includes(searchLower);

      // Optionally search in description
      if (!matchesSearch && searchInDescription) {
        matchesSearch = product.description.toLowerCase().includes(searchLower) ||
          product.descriptionEn.toLowerCase().includes(searchLower);
      }

      // Optionally search in features
      if (!matchesSearch && searchInFeatures) {
        matchesSearch = product.features.some(f => f.toLowerCase().includes(searchLower)) ||
          product.featuresEn.some(f => f.toLowerCase().includes(searchLower));
      }
    }

    // Category filter
    const matchesCategory = filterCategory === '' || product.category === filterCategory;

    // Status filter
    const matchesStatus = filterStatus === 'all' ||
      (filterStatus === 'active' && product.isActive) ||
      (filterStatus === 'inactive' && !product.isActive);

    // Date range filter
    let matchesDateRange = true;
    if (filterDateRange !== 'all') {
      const productDate = new Date(product.updatedAt || product.createdAt);
      const now = new Date();
      const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      if (filterDateRange === 'today') {
        matchesDateRange = productDate >= dayStart;
      } else if (filterDateRange === 'week') {
        const weekStart = new Date(dayStart);
        weekStart.setDate(weekStart.getDate() - 7);
        matchesDateRange = productDate >= weekStart;
      } else if (filterDateRange === 'month') {
        const monthStart = new Date(dayStart);
        monthStart.setMonth(monthStart.getMonth() - 1);
        matchesDateRange = productDate >= monthStart;
      }
    }

    return matchesSearch && matchesCategory && matchesStatus && matchesDateRange;
  });

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
                <h1 className="text-xl font-bold text-gray-900">产品管理</h1>
                <p className="text-sm text-gray-500">共 {products.length} 个产品</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {saveMessage && (
                <span className={`text-sm ${saveMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                  {saveMessage.text}
                </span>
              )}
              <button
                onClick={addProduct}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                添加产品
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

          {/* Search and Filter */}
          <div className="mt-4 space-y-3">
            {/* Main Search Row */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="搜索产品名称、描述或特点..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">全部分类</option>
                {CATEGORIES.map(cat => (
                  <option key={cat.zh} value={cat.zh}>{cat.zh}</option>
                ))}
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">全部状态</option>
                <option value="active">已启用</option>
                <option value="inactive">已禁用</option>
              </select>
              <button
                onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                className={`px-4 py-2 border rounded-lg transition-colors flex items-center gap-2 ${
                  showAdvancedSearch ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                高级
              </button>
            </div>

            {/* Advanced Search Options */}
            {showAdvancedSearch && (
              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-sm font-medium text-gray-700">搜索范围:</span>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={searchInDescription}
                      onChange={(e) => setSearchInDescription(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">产品描述</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={searchInFeatures}
                      onChange={(e) => setSearchInFeatures(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">产品特点</span>
                  </label>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-sm font-medium text-gray-700">更新时间:</span>
                  <div className="flex gap-2">
                    {[
                      { value: 'all', label: '全部' },
                      { value: 'today', label: '今天' },
                      { value: 'week', label: '本周' },
                      { value: 'month', label: '本月' },
                    ].map(option => (
                      <button
                        key={option.value}
                        onClick={() => setFilterDateRange(option.value as 'all' | 'today' | 'week' | 'month')}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          filterDateRange === option.value
                            ? 'bg-blue-600 text-white'
                            : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Search Results Info */}
            {hasActiveFilters && (
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  <span>
                    找到 <strong className="text-blue-600">{filteredProducts.length}</strong> 个产品
                    {searchTerm && <span className="text-gray-500">（搜索: "{searchTerm}"）</span>}
                  </span>
                </div>
                <button
                  onClick={clearFilters}
                  className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  清除筛选
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">没有找到产品</h3>
              <p className="mt-1 text-gray-500">点击&ldquo;添加产品&rdquo;开始创建新产品</p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all ${
                  editingId === product.id ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                {/* Product Header */}
                <div className="px-6 py-4 bg-gray-50 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${product.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                    <div>
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-500">{product.nameEn}</p>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {product.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => duplicateProduct(product.id)}
                      className="px-3 py-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors text-sm"
                      title="复制产品"
                    >
                      复制
                    </button>
                    <button
                      onClick={() => setEditingId(editingId === product.id ? null : product.id)}
                      className={`px-3 py-1.5 rounded-lg transition-colors text-sm ${
                        editingId === product.id
                          ? 'bg-gray-600 text-white'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {editingId === product.id ? '收起' : '编辑'}
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(product.id)}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
                    >
                      删除
                    </button>
                  </div>
                </div>

                {/* Edit Form */}
                {editingId === product.id && (
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
                              {activeTab === 'zh' ? '产品名称' : 'Product Name'}
                            </label>
                            <input
                              type="text"
                              value={activeTab === 'zh' ? product.name : product.nameEn}
                              onChange={(e) => handleProductChange(
                                product.id,
                                activeTab === 'zh' ? 'name' : 'nameEn',
                                e.target.value
                              )}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              产品分类
                            </label>
                            <select
                              value={product.category}
                              onChange={(e) => handleCategoryChange(product.id, e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              {CATEGORIES.map(cat => (
                                <option key={cat.zh} value={cat.zh}>
                                  {cat.zh} / {cat.en}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {activeTab === 'zh' ? '产品描述' : 'Product Description'}
                          </label>
                          <textarea
                            value={activeTab === 'zh' ? product.description : product.descriptionEn}
                            onChange={(e) => handleProductChange(
                              product.id,
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
                              {activeTab === 'zh' ? '产品特点' : 'Product Features'}
                            </label>
                            <button
                              onClick={() => addFeature(product.id, activeTab)}
                              className="px-3 py-1 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg text-sm transition-colors"
                            >
                              + 添加
                            </button>
                          </div>
                          <div className="space-y-2">
                            {(activeTab === 'zh' ? product.features : product.featuresEn).map((feature, index) => (
                              <div key={index} className="flex gap-2">
                                <input
                                  type="text"
                                  value={feature}
                                  onChange={(e) => handleFeatureChange(product.id, index, e.target.value, activeTab)}
                                  placeholder={activeTab === 'zh' ? '输入产品特点...' : 'Enter feature...'}
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <button
                                  onClick={() => removeFeature(product.id, index, activeTab)}
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

                      {/* Right Column - Image & Settings */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            产品图片
                          </label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-3">
                              {product.image ? (
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                                  }}
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                </div>
                              )}
                            </div>
                            <input
                              type="text"
                              value={product.image}
                              onChange={(e) => handleProductChange(product.id, 'image', e.target.value)}
                              placeholder="/images/products/..."
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              价格
                            </label>
                            <input
                              type="text"
                              value={product.price}
                              onChange={(e) => handleProductChange(product.id, 'price', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              排序
                            </label>
                            <input
                              type="number"
                              value={product.sortOrder}
                              onChange={(e) => handleProductChange(product.id, 'sortOrder', parseInt(e.target.value) || 0)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm font-medium text-gray-700">启用状态</span>
                          <button
                            onClick={() => handleProductChange(product.id, 'isActive', !product.isActive)}
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              product.isActive ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                          >
                            <span
                              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                product.isActive ? 'translate-x-6' : ''
                              }`}
                            />
                          </button>
                        </div>

                        <div className="text-xs text-gray-500 space-y-1">
                          <p>创建时间: {new Date(product.createdAt).toLocaleString('zh-CN')}</p>
                          <p>更新时间: {new Date(product.updatedAt).toLocaleString('zh-CN')}</p>
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
              确定要删除产品 <strong>{products.find(p => p.id === showDeleteConfirm)?.name}</strong> 吗？
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                取消
              </button>
              <button
                onClick={() => deleteProduct(showDeleteConfirm)}
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
