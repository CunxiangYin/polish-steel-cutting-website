"use client";

import React from 'react';
import { useTranslations } from '@/contexts/TranslationContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Factory, Settings, Zap, Truck } from 'lucide-react';
import { toast } from 'sonner';
import LocaleSwitcher from '@/components/LocaleSwitcher';

export default function HomePage() {
  const { t, raw } = useTranslations();
  
  const handleGetQuote = (productName: string) => {
    toast.success(`${t('common.loading')}: ${productName}`);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t('contact.form.submitSuccess'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-32 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">Punaise</span>
                </div>
              </div>
            </div>
            <nav className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#hero" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  {t('navigation.home')}
                </a>
                <a href="#products" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  {t('navigation.products')}
                </a>
                <a href="#about" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  {t('navigation.about')}
                </a>
                <a href="#contact" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  {t('navigation.contact')}
                </a>
              </div>
            </nav>
            <div className="flex items-center space-x-4">
              <LocaleSwitcher />
              <Button variant="outline" size="sm">
                <Phone className="w-4 h-4 mr-2" />
                {t('navigation.phone')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              {t('hero.title')}
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
              {t('hero.subtitle')}
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button size="lg" variant="secondary" onClick={() => handleGetQuote(t('hero.getQuoteButton'))}>
                <Settings className="w-5 h-5 mr-2" />
                {t('hero.getQuoteButton')}
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Phone className="w-5 h-5 mr-2" />
                {t('hero.consultButton')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">{t('stats.experience.number')}</div>
              <div className="text-gray-600">{t('stats.experience.label')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">{t('stats.companies.number')}</div>
              <div className="text-gray-600">{t('stats.companies.label')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">{t('stats.sales.number')}</div>
              <div className="text-gray-600">{t('stats.sales.label')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">{t('stats.support.number')}</div>
              <div className="text-gray-600">{t('stats.support.label')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {t('products.title')}
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              {t('products.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* CNC Plasma */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>{t('products.plasma.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  {t('products.plasma.description')}
                </p>
                <div className="space-y-2">
                  <Badge variant="secondary">{t('products.plasma.thickness')}</Badge>
                  <Badge variant="secondary">{t('products.plasma.accuracy')}</Badge>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  {raw('products.plasma.features')?.map((feature: string, index: number) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={() => handleGetQuote(t('products.plasma.title'))}
                >
                  {t('products.getQuote')}
                </Button>
              </CardFooter>
            </Card>

            {/* Laser Cutting */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Settings className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>{t('products.laser.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  {t('products.laser.description')}
                </p>
                <div className="space-y-2">
                  <Badge variant="secondary">{t('products.laser.thickness')}</Badge>
                  <Badge variant="secondary">{t('products.laser.accuracy')}</Badge>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  {raw('products.laser.features')?.map((feature: string, index: number) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={() => handleGetQuote(t('products.laser.title'))}
                >
                  {t('products.getQuote')}
                </Button>
              </CardFooter>
            </Card>

            {/* Flame Cutting */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Factory className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle>{t('products.flame.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  {t('products.flame.description')}
                </p>
                <div className="space-y-2">
                  <Badge variant="secondary">{t('products.flame.thickness')}</Badge>
                  <Badge variant="secondary">{t('products.flame.economic')}</Badge>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  {raw('products.flame.features')?.map((feature: string, index: number) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={() => handleGetQuote(t('products.flame.title'))}
                >
                  {t('products.getQuote')}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">
                {t('about.title')}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {t('about.description')}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Factory className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold">{t('about.advantages.manufacturing.title')}</div>
                  <div className="text-sm text-gray-600">{t('about.advantages.manufacturing.description')}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Settings className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold">{t('about.advantages.technology.title')}</div>
                  <div className="text-sm text-gray-600">{t('about.advantages.technology.description')}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Truck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold">{t('about.advantages.service.title')}</div>
                  <div className="text-sm text-gray-600">{t('about.advantages.service.description')}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Phone className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold">{t('about.advantages.support.title')}</div>
                  <div className="text-sm text-gray-600">{t('about.advantages.support.description')}</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4">{t('about.serviceTitle')}</h3>
              <ul className="space-y-3">
                {raw('about.servicePoints')?.map((point: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
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
                    <div className="text-gray-600">{t('contact.phone.number')}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <div className="font-medium">{t('contact.email.label')}</div>
                    <div className="text-gray-600">{t('contact.email.address')}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <div className="font-medium">{t('contact.address.label')}</div>
                    <div className="text-gray-600">{t('contact.address.location')}</div>
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
                      <Input 
                        placeholder={t('contact.form.name')} 
                        required 
                      />
                    </div>
                    <div>
                      <Input 
                        type="tel" 
                        placeholder={t('contact.form.phone')} 
                        required 
                      />
                    </div>
                    <div>
                      <Input 
                        type="email" 
                        placeholder={t('contact.form.email')} 
                        required 
                      />
                    </div>
                    <div>
                      <Input 
                        placeholder={t('contact.form.company')} 
                      />
                    </div>
                    <div>
                      <Textarea 
                        placeholder={t('contact.form.message')} 
                        rows={4}
                        required 
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
                <span className="text-white font-bold text-sm">Punaise</span>
              </div>
              <p className="text-gray-400 text-sm">
                {t('footer.company')}<br />
                {t('footer.tagline')}
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t('footer.products')}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {raw('footer.productList')?.map((product: string, index: number) => (
                  <li key={index}>{product}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t('footer.services')}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {raw('footer.serviceList')?.map((service: string, index: number) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t('footer.contactInfo')}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>{t('navigation.phone')}</li>
                <li>{t('contact.email.address')}</li>
                <li>{t('contact.address.location')}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}