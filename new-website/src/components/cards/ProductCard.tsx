"use client";
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Download, Phone, Settings, Truck, Zap } from 'lucide-react';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onGetQuote?: (productId: string) => void;
  onDownloadSpecs?: (productId: string) => void;
}

export default function ProductCard({ product, onGetQuote, onDownloadSpecs }: ProductCardProps) {
  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'cog': <Settings className="h-8 w-8" />,
      'truck': <Truck className="h-8 w-8" />,
      'scissors': <Zap className="h-8 w-8" />,
      'default': <Settings className="h-8 w-8" />
    };
    return icons[iconName] || icons['default'];
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'in-stock':
        return 'bg-green-100 text-green-800';
      case 'made-to-order':
        return 'bg-yellow-100 text-yellow-800';
      case 'discontinued':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'in-stock':
        return '现货供应';
      case 'made-to-order':
        return '按需定制';
      case 'discontinued':
        return '停产';
      default:
        return '咨询库存';
    }
  };

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-0 shadow-lg">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-orange-50/50 opacity-60 group-hover:opacity-80 transition-opacity"></div>
      
      {/* Product Image/Icon Area */}
      <div className="relative h-48 bg-gradient-to-br from-blue-500/10 to-blue-600/20 flex items-center justify-center">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-grid-pattern"></div>
        </div>
        
        {/* Icon Container */}
        <div className="relative z-10 w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-300">
          {getIcon(product.icon)}
        </div>

        {/* Availability Badge */}
        <Badge 
          className={`absolute top-3 right-3 ${getAvailabilityColor(product.availability)}`}
          variant="secondary"
        >
          {getAvailabilityText(product.availability)}
        </Badge>

        {/* Featured Badge */}
        {product.id === 'taiwan-ronghua-01' && (
          <Badge className="absolute top-3 left-3 bg-orange-500 hover:bg-orange-600 text-white">
            推荐产品
          </Badge>
        )}
      </div>

      <CardHeader className="relative">
        <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
          {product.name}
        </CardTitle>
        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>
        
        {/* Price Range */}
        {product.priceRange && (
          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-semibold text-blue-600">
              ¥{product.priceRange}
            </span>
            <span className="text-xs text-gray-500">参考价格</span>
          </div>
        )}
      </CardHeader>

      <CardContent className="relative">
        {/* Features List */}
        <ul className="space-y-2 mb-4">
          {product.features.slice(0, 4).map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
          {product.features.length > 4 && (
            <li className="text-xs text-gray-500 ml-6">
              +{product.features.length - 4} 更多特性...
            </li>
          )}
        </ul>

        {/* Specifications Preview */}
        {product.specs && (
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <h4 className="text-xs font-semibold text-gray-700 mb-2">主要规格</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {Object.entries(product.specs).slice(0, 4).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-gray-600 capitalize">{key}:</span>
                  <span className="font-medium text-gray-800">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="relative gap-2 pt-0">
        <Button 
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => onGetQuote?.(product.id)}
        >
          <Phone className="h-4 w-4 mr-2" />
          获取报价
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="border-blue-600 text-blue-600 hover:bg-blue-50"
          onClick={() => onDownloadSpecs?.(product.id)}
        >
          <Download className="h-4 w-4 mr-2" />
          规格书
        </Button>
      </CardFooter>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </Card>
  );
}