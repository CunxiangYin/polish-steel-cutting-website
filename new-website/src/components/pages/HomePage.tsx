"use client";

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Factory, 
  Settings, 
  Zap, 
  Truck,
  Award,
  Users,
  Target,
  CheckCircle,
  Menu,
  X
} from 'lucide-react';
import { toast } from 'sonner';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import { products, getFeaturedProducts, keyPartners, targetCustomers } from '@/data/products';
import { technicalServices, serviceAdvantages } from '@/data/services';
import { COMPANY_INFO } from '@/lib/constants';
import { useTranslations, useLocale } from '@/contexts/TranslationContext';

export default function HomePage() {
  const { t } = useTranslations();
  const locale = useLocale();
  const featuredProducts = getFeaturedProducts();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Helper function to get localized product data
  const getLocalizedProduct = (product: typeof featuredProducts[0]) => ({
    ...product,
    name: locale !== 'zh' ? product.nameEn || product.name : product.name,
    description: locale !== 'zh' ? product.descriptionEn || product.description : product.description,
    features: locale !== 'zh' ? product.featuresEn || product.features : product.features
  });

  // Helper function to get localized service data
  const getLocalizedServices = () => {
    return technicalServices.map(service => ({
      ...service,
      name: locale !== 'zh' ? service.nameEn || service.name : service.name,
      description: locale !== 'zh' ? service.descriptionEn || service.description : service.description
    }));
  };
  
  const localizedServices = getLocalizedServices();
  
  const handleGetQuote = (productName: string) => {
    toast.success(t('products.getQuoteToast') || `正在为您生成 ${productName} 的报价...`);
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t('contact.form.submitSuccess'));
  };

  const getProductIcon = (categoryOrId: string) => {
    if (categoryOrId.includes('cutting') || categoryOrId.includes('steel')) {
      return <Zap className="w-6 h-6 text-blue-600" />;
    } else if (categoryOrId.includes('conveyor') || categoryOrId.includes('cart')) {
      return <Truck className="w-6 h-6 text-orange-600" />;
    } else if (categoryOrId.includes('auxiliary') || categoryOrId.includes('parts')) {
      return <Settings className="w-6 h-6 text-green-600" />;
    } else if (categoryOrId.includes('ronghua') || categoryOrId.includes('jdc')) {
      return <Award className="w-6 h-6 text-purple-600" />;
    }
    return <Factory className="w-6 h-6 text-gray-600" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-32 bg-gradient-to-r from-blue-600 to-blue-700 rounded flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-sm">普耐斯 PUNAISE</span>
                </div>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-6">
                <a href="#hero" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  {t('navigation.home')}
                </a>
                <a href="#products" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  {t('navigation.products')}
                </a>
                <a href="#services" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  {t('navigation.services')}
                </a>
                <a href="#about" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  {t('navigation.about')}
                </a>
                <a href="#contact" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  {t('navigation.contact')}
                </a>
              </div>
            </nav>
            
            <div className="flex items-center space-x-4">
              <LocaleSwitcher />
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Phone className="w-4 h-4 mr-2" />
                {COMPANY_INFO.contact.phone}
              </Button>
              
              {/* Mobile Menu Button */}
              <Button
                variant="outline"
                size="sm"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden animate-slide-up">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-lg mt-2 border">
                <a
                  href="#hero"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('navigation.home')}
                </a>
                <a
                  href="#products"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('navigation.products')}
                </a>
                <a
                  href="#services"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('navigation.services')}
                </a>
                <a
                  href="#about"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('navigation.about')}
                </a>
                <a
                  href="#contact"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('navigation.contact')}
                </a>
                <div className="px-3 py-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    {COMPANY_INFO.contact.phone}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce-gentle"></div>
        <div className="absolute bottom-20 right-16 w-16 h-16 bg-white/5 rounded-full animate-bounce-gentle" style={{animationDelay: '1s'}}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <div className="mb-6">
              <Badge className="glass-effect text-white px-6 py-2 text-sm animate-scale-in">
                🏭 {t('hero.slogan')}
              </Badge>
            </div>
            <h1 className="text-responsive-h1 font-bold tracking-tight mb-6 animate-slide-up gradient-text">
              {t('hero.title')}
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed animate-slide-up" style={{animationDelay: '0.2s'}}>
              {t('hero.subtitle')}
            </p>
            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6 animate-slide-up" style={{animationDelay: '0.4s'}}>
              <Button 
                size="lg" 
                variant="secondary" 
                className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 py-4 text-lg card-hover-lift"
                onClick={() => handleGetQuote(t('products.categories.steelCutting'))}
              >
                <Settings className="w-6 h-6 mr-3" />
                {t('hero.getQuoteButton')}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-blue-700 font-semibold px-8 py-4 text-lg card-hover-lift"
              >
                <Phone className="w-6 h-6 mr-3" />
                {t('hero.consultButton')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-white rounded-xl shadow-md card-hover-lift animate-fade-in">
              <div className="text-4xl font-bold gradient-text mb-2">{t('stats.heritage.number')}</div>
              <div className="text-gray-600 font-medium">{t('stats.heritage.label')}</div>
              <div className="mt-3 w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full"></div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md card-hover-lift animate-fade-in" style={{animationDelay: '0.1s'}}>
              <div className="text-4xl font-bold gradient-text mb-2">{keyPartners.length}+</div>
              <div className="text-gray-600 font-medium">{t('stats.partners.label')}</div>
              <div className="mt-3 w-12 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full"></div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md card-hover-lift animate-fade-in" style={{animationDelay: '0.2s'}}>
              <div className="text-4xl font-bold gradient-text mb-2">{products.length}+</div>
              <div className="text-gray-600 font-medium">{t('stats.products.label')}</div>
              <div className="mt-3 w-12 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto rounded-full"></div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md card-hover-lift animate-fade-in" style={{animationDelay: '0.3s'}}>
              <div className="text-4xl font-bold gradient-text mb-2">{t('stats.support.number')}</div>
              <div className="text-gray-600 font-medium">{t('stats.support.label')}</div>
              <div className="mt-3 w-12 h-1 bg-gradient-to-r from-purple-500 to-purple-600 mx-auto rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="products" className="py-24 bg-gradient-to-b from-gray-50 to-white relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-slide-up">
            <div className="mb-4">
              <Badge className="bg-blue-100 text-blue-700 px-4 py-2">
                ⚙️ {t('products.badgeText') || '核心产品'}
              </Badge>
            </div>
            <h2 className="text-responsive-h2 font-bold gradient-text mb-6">
              {t('products.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('products.subtitle')}
            </p>
            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
          </div>

          {/* 大型设备单独占一行 */}
          {featuredProducts.filter(p => p.id === 'large-steel-cutting-equipment').map((p) => {
            const product = getLocalizedProduct(p);
            return (
            <Card key={product.id} className="mb-12 bg-white/80 backdrop-blur-sm border-0 shadow-xl card-hover-lift overflow-hidden animate-scale-in">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                {/* 图片部分 - 左侧或上方 */}
                <div>
                  {product.image ? (
                    <div className="w-full h-64 lg:h-80 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const iconDiv = target.parentElement?.querySelector('.fallback-icon') as HTMLElement;
                          if (iconDiv) iconDiv.style.display = 'flex';
                        }}
                      />
                      <div className="fallback-icon w-full h-full bg-blue-100 rounded-lg flex items-center justify-center" style={{display: 'none'}}>
                        {getProductIcon(product.category)}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-64 lg:h-80 bg-blue-100 rounded-lg flex items-center justify-center">
                      {getProductIcon(product.category)}
                    </div>
                  )}
                </div>

                {/* 内容部分 - 右侧或下方 */}
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
                      {product.manufacturer && (
                        <Badge variant="outline" className="mb-2">
                          {product.manufacturer}
                        </Badge>
                      )}
                    </div>

                    <p className="text-gray-600 mb-4">
                      {product.description}
                    </p>

                    <div className="text-sm text-gray-400 mb-4 italic">
                      * {t('products.imageDisclaimer') || '产品图片仅供参考，具体规格请联系我们'}
                    </div>

                    {product.features && (
                      <div className="space-y-2 mb-4">
                        {product.features.slice(0, 4).map((feature, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {product.priceRange && (
                      <Badge variant="secondary" className="mb-4">
                        {product.priceRange}
                      </Badge>
                    )}
                  </div>

                  <Button
                    size="lg"
                    className="w-full lg:w-auto"
                    onClick={() => handleGetQuote(product.name)}
                  >
                    {t('products.getQuote')}
                  </Button>
                </div>
              </div>
            </Card>
          );})}

          {/* 其他产品常规网格布局 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.filter(p => p.id !== 'large-steel-cutting-equipment').map((p, index) => {
              const product = getLocalizedProduct(p);
              return (
              <Card
                key={product.id}
                className="bg-white/80 backdrop-blur-sm border-0 shadow-lg card-hover-lift animate-fade-in overflow-hidden"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <CardHeader>
                  {product.image ? (
                    <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const iconDiv = target.parentElement?.querySelector('.fallback-icon') as HTMLElement;
                          if (iconDiv) iconDiv.style.display = 'flex';
                        }}
                      />
                      <div className="fallback-icon w-full h-full bg-blue-100 rounded-lg flex items-center justify-center" style={{display: 'none'}}>
                        {getProductIcon(product.category)}
                      </div>
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      {getProductIcon(product.category)}
                    </div>
                  )}
                  <CardTitle>{product.name}</CardTitle>
                  {product.manufacturer && (
                    <Badge variant="outline" className="w-fit text-xs">
                      {product.manufacturer}
                    </Badge>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 text-sm">
                    {product.description}
                  </p>
                  <div className="text-xs text-gray-400 mb-4 italic">
                    * {t('products.imageDisclaimer') || '产品图片仅供参考，具体规格请联系我们'}
                  </div>
                  {product.features && (
                    <div className="space-y-2">
                      {product.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-xs text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {product.priceRange && (
                    <div className="mt-4">
                      <Badge variant="secondary" className="text-xs">
                        {product.priceRange}
                      </Badge>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={() => handleGetQuote(product.name)}
                  >
                    {t('products.getQuote')}
                  </Button>
                </CardFooter>
              </Card>
            );})}
          </div>

          {/* View All Products Button */}
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => {
                // Scroll to services section to see more content
                const servicesSection = document.getElementById('services');
                if (servicesSection) {
                  servicesSection.scrollIntoView({ behavior: 'smooth' });
                }
                toast.success(t('products.viewAllToast') || '正在展示所有产品信息...');
              }}
            >
              {t('products.viewAll')} ({products.length} {t('common.products')})
            </Button>
          </div>
        </div>
      </section>

      {/* Technical Services Section */}
      <section id="services" className="py-24 bg-gradient-to-b from-white to-blue-50 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-slide-up">
            <div className="mb-4">
              <Badge className="bg-orange-100 text-orange-700 px-4 py-2">
                🔧 {t('services.title')}
              </Badge>
            </div>
            <h2 className="text-responsive-h2 font-bold gradient-text mb-6">
              {t('services.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('services.subtitle')}
            </p>
            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-orange-500 to-red-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {localizedServices.map((service, index) => (
              <Card 
                key={service.id} 
                className="text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg card-hover-lift animate-fade-in"
                style={{animationDelay: `${index * 0.15}s`}}
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-md">
                    <Settings className="w-8 h-8 text-orange-600" />
                  </div>
                  <CardTitle className="text-xl font-bold gradient-text">{service.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  {service.scope && (
                    <div className="mt-4 flex flex-wrap gap-1 justify-center">
                      {(locale === 'en' ? service.scopeEn || service.scope : service.scope)?.slice(0, 3).map((item, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Service Advantages */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {serviceAdvantages.map((advantage, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold text-sm">
                  {locale !== 'zh' ? (advantage as any).titleEn || advantage.title : advantage.title}
                </div>
                <div className="text-xs text-gray-600">
                  {locale !== 'zh' ? (advantage as any).descriptionEn || advantage.description : advantage.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section with Partners */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {t('about.title')}
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              {t('about.coreValues')}
            </p>
          </div>

          {/* Key Partners */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              {t('about.partnerships')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {keyPartners.slice(0, 6).map((partner, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1 text-sm">{partner.name}</h4>
                        <p className="text-xs text-gray-600 mb-2">{partner.description}</p>
                        <Badge variant="outline" className="text-xs">
                          {partner.partnership}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Target Customers */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              {t('about.customers')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {targetCustomers.map((group, index) => (
                <Card key={index} className="border-l-4 border-l-orange-500">
                  <CardHeader>
                    <CardTitle className="text-lg text-orange-700 flex items-center gap-2">
                      <Factory className="h-5 w-5" />
                      {group.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {group.customers.map((customer, customerIndex) => (
                        <div key={customerIndex} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                          <span className="text-gray-700 text-sm">{customer}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {t('contact.title')}
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-6">{t('contact.info')}</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <div className="font-medium">{t('contact.phone.label')}</div>
                    <div className="text-gray-600">{COMPANY_INFO.contact.phone}</div>
                  </div>
                </div>
                {COMPANY_INFO.contact.fax && (
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <div className="font-medium">{t('contact.fax.label')}</div>
                      <div className="text-gray-600">{COMPANY_INFO.contact.fax}</div>
                    </div>
                  </div>
                )}
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <div className="font-medium">{t('contact.email.label')}</div>
                    <div className="text-gray-600">{COMPANY_INFO.contact.email}</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                  <div>
                    <div className="font-medium">{t('contact.address.label')}</div>
                    <div className="text-gray-600">
                      {COMPANY_INFO.address.city}{COMPANY_INFO.address.street}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h4 className="font-bold mb-2">{t('contact.commitment.title')}</h4>
                <p className="text-sm text-gray-600">
                  {t('contact.commitment.description')}
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>{t('contact.form.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
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
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="h-8 w-32 bg-blue-600 rounded flex items-center justify-center mb-4">
                <span className="text-white font-bold text-sm">普耐斯 PUNAISE</span>
              </div>
              <p className="text-gray-400 text-sm">
                {t('about.companyName')}<br />
                {t('footer.tagline')}
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t('footer.products')}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {products.slice(0, 4).map((product, index) => (
                  <li key={index}>{product.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t('footer.services')}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {technicalServices.map((service, index) => (
                  <li key={index}>{service.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t('footer.contactInfo')}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>{COMPANY_INFO.contact.phone}</li>
                <li>{COMPANY_INFO.contact.email}</li>
                <li>{COMPANY_INFO.address.city}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 {t('about.companyName')}. {t('footer.copyright')}.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}