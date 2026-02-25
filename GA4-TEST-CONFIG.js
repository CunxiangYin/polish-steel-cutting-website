// Google Analytics 4 测试配置文件
// 这个文件展示了如何正确配置GA4追踪

// 1. 基础配置 (替换YOUR_GA4_MEASUREMENT_ID为实际ID)
const GA4_CONFIG = {
    // 测量ID格式: G-XXXXXXXXXX
    measurementId: 'YOUR_GA4_MEASUREMENT_ID',
    
    // 基础配置选项
    config: {
        // 页面标题追踪
        page_title: true,
        
        // 页面位置追踪
        page_location: true,
        
        // 自定义维度
        custom_map: {
            'user_type': 'visitor_type',
            'product_interest': 'product_category'
        }
    }
};

// 2. 事件追踪函数
const trackEvent = (eventName, parameters = {}) => {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            // 默认参数
            timestamp: new Date().toISOString(),
            page_title: document.title,
            page_location: window.location.href,
            
            // 自定义参数
            ...parameters
        });
        
        // 控制台调试信息
        console.log(`GA4 Event Tracked: ${eventName}`, parameters);
    } else {
        console.warn('Google Analytics not loaded');
    }
};

// 3. 预定义事件追踪
const GA4_EVENTS = {
    // 联系表单提交
    contactFormSubmit: (formType = 'contact') => {
        trackEvent('contact_form_submit', {
            event_category: 'engagement',
            event_label: formType,
            value: 1,
            currency: 'USD'
        });
    },
    
    // 产品询价
    getQuoteClick: (productType = 'general') => {
        trackEvent('generate_lead', {
            event_category: 'conversion',
            event_label: `quote_${productType}`,
            value: 5,
            currency: 'USD'
        });
    },
    
    // 观看演示
    watchDemo: (demoType = 'product') => {
        trackEvent('video_start', {
            event_category: 'engagement',
            event_label: `demo_${demoType}`,
            video_title: 'Product Demo',
            video_duration: 0 // 实际时长
        });
    },
    
    // 产品页面访问
    viewProduct: (productName, productCategory) => {
        trackEvent('view_item', {
            event_category: 'ecommerce',
            item_name: productName,
            item_category: productCategory,
            value: 1
        });
    },
    
    // 滚动深度
    scrollDepth: (percentage) => {
        trackEvent('scroll', {
            event_category: 'engagement',
            event_label: `${percentage}%`,
            value: percentage
        });
    },
    
    // 文件下载
    downloadFile: (fileName, fileType) => {
        trackEvent('file_download', {
            event_category: 'engagement',
            event_label: fileName,
            file_extension: fileType,
            value: 1
        });
    }
};

// 4. 电商追踪 (为未来产品扩展准备)
const GA4_ECOMMERCE = {
    // 查看产品列表
    viewItemList: (items, listName = 'Products') => {
        trackEvent('view_item_list', {
            event_category: 'ecommerce',
            item_list_name: listName,
            items: items
        });
    },
    
    // 开始询价流程
    beginCheckout: (items, currency = 'USD') => {
        trackEvent('begin_checkout', {
            event_category: 'ecommerce',
            currency: currency,
            value: items.reduce((sum, item) => sum + item.value, 0),
            items: items
        });
    },
    
    // 完成询价
    purchase: (transactionId, items, currency = 'USD') => {
        trackEvent('purchase', {
            event_category: 'ecommerce',
            transaction_id: transactionId,
            currency: currency,
            value: items.reduce((sum, item) => sum + item.value, 0),
            items: items
        });
    }
};

// 5. 用户属性设置
const setUserProperties = (properties) => {
    if (typeof gtag !== 'undefined') {
        gtag('config', GA4_CONFIG.measurementId, {
            user_properties: properties
        });
    }
};

// 6. 转化追踪
const trackConversion = (conversionName, value = 1) => {
    trackEvent(conversionName, {
        event_category: 'conversion',
        value: value,
        currency: 'USD'
    });
};

// 7. 页面浏览追踪 (单页应用)
const trackPageView = (pagePath, pageTitle) => {
    if (typeof gtag !== 'undefined') {
        gtag('config', GA4_CONFIG.measurementId, {
            page_path: pagePath,
            page_title: pageTitle
        });
    }
};

// 8. 自动初始化（页面加载后）
document.addEventListener('DOMContentLoaded', function() {
    // 设置用户属性
    setUserProperties({
        visitor_type: 'business',
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    });
    
    // 追踪初始页面浏览
    trackPageView(window.location.pathname, document.title);
    
    console.log('GA4 Configuration Loaded Successfully');
});

// 导出给全局使用
window.GA4_EVENTS = GA4_EVENTS;
window.GA4_ECOMMERCE = GA4_ECOMMERCE;
window.trackEvent = trackEvent;
window.setUserProperties = setUserProperties;
window.trackConversion = trackConversion;

// 使用示例：
/*
// 追踪联系表单提交
GA4_EVENTS.contactFormSubmit('main_contact');

// 追踪产品询价
GA4_EVENTS.getQuoteClick('cnc_plasma');

// 追踪文件下载
GA4_EVENTS.downloadFile('product_brochure.pdf', 'pdf');

// 设置用户属性
setUserProperties({
    product_interest: 'cutting_equipment',
    company_size: 'medium'
});
*/