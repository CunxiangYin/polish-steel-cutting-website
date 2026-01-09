'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { isAuthenticated, logAdminAction } from '@/lib/admin/client-auth';
import ImageCropper from '@/components/admin/ImageCropper';
import { getExtensionFromMime, getMimeType } from '@/utils/admin/imageCrop';

interface ImageItem {
  id: string;
  name: string;
  path: string;
  category: string;
  description: string;
  size?: string;
  createdAt: string;
  updatedAt: string;
}

const DEFAULT_IMAGES: ImageItem[] = [
  // Product Images
  { id: 'img-001', name: 'Hydraulic Nut', path: '/images/products/hydraulic-nut.jpg', category: 'products', description: '液压螺母产品图片', size: '800x600', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'img-002', name: 'Hydraulic Puller', path: '/images/products/hydraulic-puller.jpg', category: 'products', description: '液压拉马产品图片', size: '800x600', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'img-003', name: 'Hydraulic Pump', path: '/images/products/hydraulic-pump.jpg', category: 'products', description: '液压泵产品图片', size: '800x600', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'img-004', name: 'Bearing Heater', path: '/images/products/bearing-heater.jpg', category: 'products', description: '轴承加热器产品图片', size: '800x600', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'img-005', name: 'Bolt Tensioner', path: '/images/products/bolt-tensioner.jpg', category: 'products', description: '螺栓拉伸器产品图片', size: '800x600', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  // Hero Images
  { id: 'img-006', name: 'Hero Banner', path: '/images/hero-banner.jpg', category: 'hero', description: '首页横幅图片', size: '1920x800', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  // About Images
  { id: 'img-007', name: 'Factory', path: '/images/about/factory.jpg', category: 'about', description: '工厂图片', size: '1200x800', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'img-008', name: 'Team', path: '/images/about/team.jpg', category: 'about', description: '团队图片', size: '1200x800', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

const CATEGORIES = [
  { id: 'all', name: '全部图片' },
  { id: 'products', name: '产品图片' },
  { id: 'hero', name: '横幅图片' },
  { id: 'about', name: '关于我们' },
  { id: 'services', name: '服务图片' },
  { id: 'other', name: '其他图片' },
];

export default function ImagesManagementPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    path: '',
    category: 'products',
    description: '',
    size: '',
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection - opens cropper
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('请选择图片文件');
        return;
      }

      // Validate file size (max 10MB for cropping)
      if (file.size > 10 * 1024 * 1024) {
        alert('图片文件大小不能超过10MB');
        return;
      }

      setSelectedFile(file);

      // Create URL for cropper
      const url = URL.createObjectURL(file);
      setOriginalImageUrl(url);

      // Auto-fill name if empty
      if (!formData.name) {
        const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        setFormData(prev => ({ ...prev, name: nameWithoutExt }));
      }

      // Show cropper
      setShowCropper(true);
    }
  };

  // Handle crop complete
  const handleCropComplete = (croppedBlob: Blob, dimensions: { width: number; height: number }) => {
    // Clean up original image URL
    if (originalImageUrl) {
      URL.revokeObjectURL(originalImageUrl);
      setOriginalImageUrl(null);
    }

    // Create preview URL from cropped blob
    const croppedUrl = URL.createObjectURL(croppedBlob);
    setPreviewUrl(croppedUrl);

    // Update form data with new dimensions
    setFormData(prev => ({ ...prev, size: `${dimensions.width}x${dimensions.height}` }));

    // Generate suggested path with correct extension
    if (selectedFile) {
      const mimeType = getMimeType(selectedFile);
      const ext = getExtensionFromMime(mimeType);
      const safeName = selectedFile.name
        .replace(/\.[^/.]+$/, '')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-');
      const suggestedPath = `/images/${formData.category}/${safeName}.${ext}`;
      setFormData(prev => ({ ...prev, path: suggestedPath }));
    }

    // Close cropper
    setShowCropper(false);
  };

  // Handle crop cancel
  const handleCropCancel = () => {
    // Clean up original image URL
    if (originalImageUrl) {
      URL.revokeObjectURL(originalImageUrl);
      setOriginalImageUrl(null);
    }
    setShowCropper(false);
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setSelectedFile(null);
  };

  // Cleanup preview URL on unmount or form reset
  const cleanupPreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setSelectedFile(null);
  };

  // Authentication check
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login');
      return;
    }
    loadImages();
  }, [router]);

  const loadImages = () => {
    try {
      const saved = localStorage.getItem('images_content');
      if (saved) {
        setImages(JSON.parse(saved));
      } else {
        setImages(DEFAULT_IMAGES);
        localStorage.setItem('images_content', JSON.stringify(DEFAULT_IMAGES));
      }
    } catch (e) {
      console.error('Failed to load images:', e);
      setImages(DEFAULT_IMAGES);
    }
    setIsLoading(false);
  };

  const saveImages = (newImages: ImageItem[]) => {
    setIsSaving(true);
    try {
      localStorage.setItem('images_content', JSON.stringify(newImages));
      setImages(newImages);
      logAdminAction('save_images', { count: newImages.length });
    } catch (e) {
      console.error('Failed to save images:', e);
      alert('保存失败，请重试');
    }
    setIsSaving(false);
  };

  const handleAddImage = () => {
    if (!formData.name.trim() || !formData.path.trim()) {
      alert('请填写图片名称和路径');
      return;
    }

    const newImage: ImageItem = {
      id: `img-${Date.now()}`,
      name: formData.name,
      path: formData.path,
      category: formData.category,
      description: formData.description,
      size: formData.size,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newImages = [...images, newImage];
    saveImages(newImages);
    logAdminAction('add_image', { name: newImage.name });

    setShowAddModal(false);
    resetForm();
  };

  const handleUpdateImage = () => {
    if (!selectedImage) return;

    const updatedImages = images.map(img =>
      img.id === selectedImage.id
        ? {
            ...img,
            name: formData.name,
            path: formData.path,
            category: formData.category,
            description: formData.description,
            size: formData.size,
            updatedAt: new Date().toISOString(),
          }
        : img
    );

    saveImages(updatedImages);
    logAdminAction('update_image', { name: formData.name });
    setIsEditing(false);
    setSelectedImage(null);
    resetForm();
  };

  const handleDeleteImage = (image: ImageItem) => {
    if (!confirm(`确定要删除图片 "${image.name}" 吗？`)) return;

    const newImages = images.filter(img => img.id !== image.id);
    saveImages(newImages);
    logAdminAction('delete_image', { name: image.name });

    if (selectedImage?.id === image.id) {
      setSelectedImage(null);
      setIsEditing(false);
    }
  };

  const copyToClipboard = (path: string, id: string) => {
    navigator.clipboard.writeText(path).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      path: '',
      category: 'products',
      description: '',
      size: '',
    });
    cleanupPreview();
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openEditModal = (image: ImageItem) => {
    setSelectedImage(image);
    setFormData({
      name: image.name,
      path: image.path,
      category: image.category,
      description: image.description,
      size: image.size || '',
    });
    setIsEditing(true);
  };

  // Filter images
  const filteredImages = images.filter(img => {
    const matchesSearch =
      img.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      img.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
      img.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || img.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">图片管理</h1>
                <p className="text-sm text-gray-500">管理网站图片资源</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              添加图片
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="搜索图片名称、路径或描述..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>

            {/* View Mode Toggle */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-4 pt-4 border-t flex gap-6 text-sm text-gray-500">
            <span>共 {images.length} 张图片</span>
            <span>显示 {filteredImages.length} 张</span>
            {selectedCategory !== 'all' && (
              <span className="text-blue-600">
                分类: {CATEGORIES.find(c => c.id === selectedCategory)?.name}
              </span>
            )}
          </div>
        </div>

        {/* Images Grid/List */}
        {filteredImages.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">没有找到图片</h3>
            <p className="text-gray-500 mb-4">尝试调整搜索条件或添加新图片</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              添加图片
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map(image => (
              <div key={image.id} className="bg-white rounded-xl shadow-sm overflow-hidden group">
                {/* Image Preview */}
                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => openEditModal(image)}
                      className="p-2 bg-white rounded-lg hover:bg-gray-100"
                      title="编辑"
                    >
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => copyToClipboard(image.path, image.id)}
                      className="p-2 bg-white rounded-lg hover:bg-gray-100"
                      title="复制路径"
                    >
                      {copiedId === image.id ? (
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                      )}
                    </button>
                    <button
                      onClick={() => handleDeleteImage(image)}
                      className="p-2 bg-white rounded-lg hover:bg-gray-100"
                      title="删除"
                    >
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  {/* Category Badge */}
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 text-xs font-medium bg-white/90 rounded-full">
                      {CATEGORIES.find(c => c.id === image.category)?.name || image.category}
                    </span>
                  </div>
                </div>
                {/* Image Info */}
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 truncate">{image.name}</h3>
                  <p className="text-sm text-gray-500 truncate mt-1">{image.path}</p>
                  {image.size && (
                    <p className="text-xs text-gray-400 mt-1">{image.size}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">图片</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">名称</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">路径</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">分类</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">尺寸</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredImages.map(image => (
                  <tr key={image.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-16 h-12 bg-gray-100 rounded flex items-center justify-center">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{image.name}</div>
                      <div className="text-xs text-gray-500">{image.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 max-w-xs truncate">{image.path}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 rounded-full">
                        {CATEGORIES.find(c => c.id === image.category)?.name || image.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {image.size || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => copyToClipboard(image.path, image.id)}
                          className="text-gray-600 hover:text-gray-900"
                          title="复制路径"
                        >
                          {copiedId === image.id ? (
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                          )}
                        </button>
                        <button
                          onClick={() => openEditModal(image)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          编辑
                        </button>
                        <button
                          onClick={() => handleDeleteImage(image)}
                          className="text-red-600 hover:text-red-900"
                        >
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Usage Tips */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-4">使用提示</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-blue-800">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <strong>图片路径格式</strong>
                <p className="text-blue-700">使用 /images/xxx.jpg 格式的相对路径</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <strong>复制图片路径</strong>
                <p className="text-blue-700">点击复制按钮可以快速复制图片路径到剪贴板</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              <div>
                <strong>分类管理</strong>
                <p className="text-blue-700">为图片设置分类便于管理和查找</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div>
                <strong>尺寸格式</strong>
                <p className="text-blue-700">使用 宽x高 格式记录图片尺寸，如 800x600</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add/Edit Modal */}
      {(showAddModal || isEditing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={() => { setShowAddModal(false); setIsEditing(false); resetForm(); }}
          />

          {/* Modal Content */}
          <div
            className="relative w-full max-w-md bg-white shadow-xl rounded-xl z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">
                {isEditing ? '编辑图片' : '添加图片'}
              </h3>
            </div>

            <div className="px-6 py-4 space-y-4 max-h-[60vh] overflow-y-auto">
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* File picker section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">选择本地图片</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                  {previewUrl ? (
                    <div className="space-y-3">
                      <div className="relative inline-block">
                        <img
                          src={previewUrl}
                          alt="预览"
                          className="max-h-40 max-w-full rounded-lg mx-auto"
                        />
                        <button
                          onClick={() => {
                            cleanupPreview();
                            if (fileInputRef.current) fileInputRef.current.value = '';
                          }}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                          title="移除图片"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      {selectedFile && (
                        <p className="text-sm text-gray-500">
                          {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                        </p>
                      )}
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        更换图片
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="cursor-pointer py-4"
                    >
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="mt-2 text-sm text-gray-600">
                        <span className="text-blue-600 font-medium">点击选择文件</span>
                        <span className="text-gray-500"> 或拖放图片到此处</span>
                      </p>
                      <p className="mt-1 text-xs text-gray-400">支持 JPG, PNG, GIF, WebP (最大 5MB)</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">图片名称 *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="例如：液压螺母产品图"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">图片路径 *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.path}
                    onChange={(e) => setFormData({ ...formData, path: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="例如：/images/products/hydraulic-nut.jpg"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-1 whitespace-nowrap"
                    title="从本地选择文件"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    选择文件
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">选择本地文件后会自动生成路径</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="图片描述信息"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">尺寸</label>
                <input
                  type="text"
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="例如：800x600"
                  readOnly={!!selectedFile}
                />
                {selectedFile && (
                  <p className="mt-1 text-xs text-gray-500">尺寸已从图片自动获取</p>
                )}
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 rounded-b-xl">
              <button
                onClick={() => { setShowAddModal(false); setIsEditing(false); resetForm(); }}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                取消
              </button>
              <button
                onClick={isEditing ? handleUpdateImage : handleAddImage}
                disabled={isSaving}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {isSaving ? '保存中...' : isEditing ? '更新' : '添加'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Cropper Modal */}
      {showCropper && originalImageUrl && (
        <ImageCropper
          imageSrc={originalImageUrl}
          file={selectedFile}
          category={formData.category}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
        />
      )}
    </div>
  );
}
