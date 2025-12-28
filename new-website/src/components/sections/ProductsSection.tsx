"use client";

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import ProductCard from '@/components/cards/ProductCard';
import { Search, Filter, Grid, List } from 'lucide-react';
import { PRODUCTS, getFeaturedProducts } from '@/data/products';
import { ProductCategory } from '@/types/product';
import { toast } from 'sonner';

export default function ProductsSection() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');

  const categories = [
    { id: 'all', name: '全部产品', count: PRODUCTS.length },
    { id: ProductCategory.STEEL_PLATE_PROCESSING, name: '钢板加工设备', count: 1 },
    { id: ProductCategory.CONVEYOR_SYSTEMS, name: '输送带系统', count: 1 },
    { id: ProductCategory.TAIWAN_RONGHUA, name: '台湾荣华分条机', count: 1 }
  ];

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleGetQuote = (productId: string) => {
    const product = PRODUCTS.find(p => p.id === productId);
    toast.success(`已为您打开${product?.name}的询价窗口`, {
      description: '我们的销售代表将在24小时内与您联系',
    });
    // Scroll to contact form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadSpecs = (productId: string) => {
    const product = PRODUCTS.find(p => p.id === productId);
    toast.success(`正在下载${product?.name}技术规格书`, {
      description: 'PDF文件将在几秒钟后开始下载',
    });
    // Simulate download
    setTimeout(() => {
      toast.info('下载已完成', { description: '请查看您的下载文件夹' });
    }, 2000);
  };

  return (
    <section id="products" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge className="bg-blue-100 text-blue-700 px-4 py-2 mb-4">
            产品中心
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            钢板加工设备组合
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            全面的精密切割系统、台湾荣华分条机和钢板加工设备，为金属制造和工业应用提供专业解决方案
          </p>
        </div>

        {/* Featured Products Quick View */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">推荐产品</h3>
            <Badge variant="outline" className="border-orange-500 text-orange-600">
              Hot Sale
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getFeaturedProducts().map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onGetQuote={handleGetQuote}
                onDownloadSpecs={handleDownloadSpecs}
              />
            ))}
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="搜索产品名称或描述..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id as ProductCategory | 'all')}
                  className="whitespace-nowrap"
                >
                  {category.name}
                  <Badge 
                    variant="secondary" 
                    className="ml-2 bg-gray-100 text-gray-600"
                  >
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Product Categories Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid grid-cols-2 lg:grid-cols-4 bg-white rounded-lg p-1 shadow-sm">
            <TabsTrigger value="all" className="text-sm">全部产品</TabsTrigger>
            <TabsTrigger value="steel-processing" className="text-sm">钢板加工</TabsTrigger>
            <TabsTrigger value="conveyor" className="text-sm">输送系统</TabsTrigger>
            <TabsTrigger value="ronghua" className="text-sm">台湾荣华</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-8">
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onGetQuote={handleGetQuote}
                  onDownloadSpecs={handleDownloadSpecs}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="steel-processing" className="mt-8">
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts
                .filter(p => p.category === ProductCategory.STEEL_PLATE_PROCESSING)
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onGetQuote={handleGetQuote}
                    onDownloadSpecs={handleDownloadSpecs}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="conveyor" className="mt-8">
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts
                .filter(p => p.category === ProductCategory.CONVEYOR_SYSTEMS)
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onGetQuote={handleGetQuote}
                    onDownloadSpecs={handleDownloadSpecs}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="ronghua" className="mt-8">
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts
                .filter(p => p.category === ProductCategory.TAIWAN_RONGHUA)
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onGetQuote={handleGetQuote}
                    onDownloadSpecs={handleDownloadSpecs}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">未找到相关产品</h3>
            <p className="text-gray-600 mb-4">请尝试调整搜索条件或选择其他产品分类</p>
            <Button onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}>
              清除筛选条件
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">找不到合适的产品？</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            我们提供定制化解决方案，根据您的具体需求设计和制造专业设备
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => handleGetQuote('custom')}
            >
              定制咨询
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              查看更多产品
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}