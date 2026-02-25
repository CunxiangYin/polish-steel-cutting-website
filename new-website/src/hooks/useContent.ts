'use client';

import { useState, useEffect } from 'react';
import siteContent from '@/data/site-content.json';

export function useContent() {
  const [content, setContent] = useState(siteContent);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load content from localStorage if exists
  useEffect(() => {
    const savedContent = localStorage.getItem('site_content');
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        setContent(parsed);
      } catch (e) {
        console.error('Error loading saved content:', e);
      }
    }
  }, []);

  const saveContent = async (newContent: any) => {
    setIsSaving(true);
    try {
      // Save to localStorage
      localStorage.setItem('site_content', JSON.stringify(newContent));
      
      // Update metadata
      newContent.metadata = {
        lastUpdated: new Date().toISOString(),
        version: newContent.metadata?.version || '1.0.0'
      };
      
      setContent(newContent);
      
      // Create a backup
      const backups = JSON.parse(localStorage.getItem('content_backups') || '[]');
      backups.unshift({
        timestamp: new Date().toISOString(),
        content: newContent
      });
      
      // Keep only last 10 backups
      if (backups.length > 10) {
        backups.length = 10;
      }
      
      localStorage.setItem('content_backups', JSON.stringify(backups));
      
      return true;
    } catch (error) {
      console.error('Error saving content:', error);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const updateSection = async (section: string, data: any) => {
    const newContent = { ...content };
    (newContent as any)[section] = data;
    return saveContent(newContent);
  };

  const resetContent = () => {
    setContent(siteContent);
    localStorage.removeItem('site_content');
  };

  const exportContent = () => {
    const dataStr = JSON.stringify(content, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `site-content-${new Date().toISOString()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return {
    content,
    setContent,
    saveContent,
    updateSection,
    resetContent,
    exportContent,
    isLoading,
    isSaving
  };
}