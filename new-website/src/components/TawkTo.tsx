'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
  }
}

export default function TawkTo() {
  useEffect(() => {
    // 防止重复加载
    if (window.Tawk_API) {
      return;
    }

    // 初始化 Tawk_API
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // 创建并加载脚本
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://embed.tawk.to/695496a6d5d3bd197b4d7fbd/1jdp6ovkg';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    // 添加到head
    document.head.appendChild(script);

    console.log('Tawk.to script added to page');

    // 清理函数
    return () => {
      if (window.Tawk_API && window.Tawk_API.hideWidget) {
        window.Tawk_API.hideWidget();
      }
    };
  }, []);

  return null;
}