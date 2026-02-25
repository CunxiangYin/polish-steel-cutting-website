"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone, Menu, X } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslations } from '@/contexts/TranslationContext';

// Mobile menu toggle
export function MobileMenuButton({ 
  isOpen, 
  onToggle 
}: { 
  isOpen: boolean; 
  onToggle: () => void;
}) {
  return (
    <Button
      variant="outline"
      size="sm"
      className="md:hidden"
      onClick={onToggle}
    >
      {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
    </Button>
  );
}

// Mobile navigation wrapper with state
export function MobileNav({ 
  children, 
  phone 
}: { 
  children: React.ReactNode;
  phone: string;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { t } = useTranslations();

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>
      {isOpen && (
        <div className="md:hidden animate-slide-up absolute top-16 left-0 right-0 px-4">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-lg mt-2 border">
            {['hero', 'products', 'services', 'about', 'contact'].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                {t(`navigation.${section === 'hero' ? 'home' : section}`)}
              </a>
            ))}
            <div className="px-3 py-2">
              <Button variant="outline" size="sm" className="w-full">
                <Phone className="w-4 h-4 mr-2" />
                {phone}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Get Quote button with toast
export function GetQuoteButton({ 
  productName, 
  className,
  children 
}: { 
  productName: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { t } = useTranslations();
  
  const handleClick = () => {
    toast.success(t('products.getQuoteToast') || `正在为您生成 ${productName} 的报价...`);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Button className={className} onClick={handleClick}>
      {children}
    </Button>
  );
}

// Contact form with submission handling
export function ContactForm() {
  const { t } = useTranslations();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t('contact.form.submitSuccess'));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input 
          type="text"
          placeholder={t('contact.form.name')} 
          required 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <input 
          type="tel" 
          placeholder={t('contact.form.phone')} 
          required 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <input 
          type="email" 
          placeholder={t('contact.form.email')} 
          required 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <input 
          type="text"
          placeholder={t('contact.form.company')} 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <textarea 
          placeholder={t('contact.form.message')} 
          rows={4}
          required 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <Button type="submit" className="w-full">
        {t('contact.form.submit')}
      </Button>
    </form>
  );
}

// View all products button
export function ViewAllProductsButton({ count }: { count: number }) {
  const { t } = useTranslations();
  
  return (
    <Button 
      size="lg" 
      variant="outline"
      onClick={() => {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
          servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
        toast.success(t('products.viewAllToast') || '正在展示所有产品信息...');
      }}
    >
      {t('products.viewAll')} ({count} {t('common.products')})
    </Button>
  );
}
