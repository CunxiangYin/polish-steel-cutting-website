'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, CheckCircle, Download, Share2, Phone } from 'lucide-react';
import { useTranslations } from '@/contexts/TranslationContext';

interface ProductModalProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
  onGetQuote: (productName: string) => void;
}

export default function ProductModal({ product, isOpen, onClose, onGetQuote }: ProductModalProps) {
  const { t } = useTranslations();

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl font-bold gradient-text">
                {product.name}
              </DialogTitle>
              {product.manufacturer && (
                <Badge className="mt-2" variant="outline">
                  {product.manufacturer}
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Image Section */}
          <div className="space-y-4">
            {product.image ? (
              <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                <div className="text-6xl opacity-50">⚙️</div>
              </div>
            )}
            
            {/* Image Gallery Thumbnails (if available) */}
            {product.gallery && product.gallery.length > 0 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.gallery.map((img: string, index: number) => (
                  <div
                    key={index}
                    className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500"
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <DialogDescription className="text-lg text-gray-600 leading-relaxed">
              {product.description}
            </DialogDescription>

            {/* Features */}
            {product.features && (
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">
                  {t('products.features')}
                </h3>
                <div className="space-y-2">
                  {product.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Specifications */}
            {product.specifications && (
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">
                  {t('products.specifications')}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 p-3 rounded-md">
                      <div className="text-sm text-gray-500">{key}</div>
                      <div className="font-medium text-gray-900">{String(value)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Price Range */}
            {product.priceRange && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-blue-600 mb-1">
                  {t('products.priceRange')}
                </div>
                <div className="text-2xl font-bold text-blue-700">
                  {product.priceRange}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="flex-1"
                onClick={() => onGetQuote(product.name)}
              >
                <Phone className="w-5 h-5 mr-2" />
                {t('products.getQuote')}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1"
              >
                <Download className="w-5 h-5 mr-2" />
                {t('products.downloadBrochure')}
              </Button>
              <Button
                size="lg"
                variant="outline"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
              <p className="font-medium text-gray-900 mb-2">
                {t('products.needHelp')}
              </p>
              <p>{t('products.contactSupport')}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}