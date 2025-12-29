"use client";

import React, { createContext, useContext, ReactNode } from 'react';

type Messages = Record<string, any>;

interface TranslationContextType {
  messages: Messages;
  locale: string;
  t: (key: string) => string;
  raw: (key: string) => any;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ 
  children, 
  messages, 
  locale 
}: { 
  children: ReactNode; 
  messages: Messages; 
  locale: string 
}) {
  const t = (key: string): string => {
    const keys = key.split('.');
    let value = messages;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return the key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  const raw = (key: string): any => {
    const keys = key.split('.');
    let value = messages;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return null;
      }
    }
    
    return value;
  };

  return (
    <TranslationContext.Provider value={{ messages, locale, t, raw }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslations() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslations must be used within a TranslationProvider');
  }
  return context;
}

export function useLocale() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useLocale must be used within a TranslationProvider');
  }
  return context.locale;
}