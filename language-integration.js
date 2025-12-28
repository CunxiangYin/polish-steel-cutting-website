/**
 * 语言系统整合脚本 - 初始化和事件处理
 * Language System Integration - Initialization and Event Handling
 */

document.addEventListener('DOMContentLoaded', function() {
    // 初始化语言系统
    initializeLanguageSystem();
    
    // 监听语言切换事件
    const languageSelector = document.getElementById('language');
    if (languageSelector) {
        languageSelector.addEventListener('change', handleLanguageChange);
    }
    
    // 监听自定义语言切换事件
    document.addEventListener('languageChanged', handleLanguageChanged);
    
    // 自动检测并应用用户语言
    autoDetectAndApplyLanguage();
});

// 初始化整个语言系统
function initializeLanguageSystem() {
    try {
        // 1. 初始化语言选择器
        if (typeof initializeLanguageSelector === 'function') {
            initializeLanguageSelector();
        }
        
        // 2. 检查保存的语言偏好
        const savedLanguage = localStorage.getItem('preferredLanguage');
        if (savedLanguage && LANGUAGE_CONFIG.languages[savedLanguage]) {
            applyLanguage(savedLanguage);
            applyTranslations(savedLanguage);
            applyMarketLocalization(savedLanguage);
        }
        
        console.log('Language system initialized successfully');
    } catch (error) {
        console.error('Failed to initialize language system:', error);
        // 回退到英语
        applyLanguage('en');
        applyTranslations('en');
    }
}

// 自动检测并应用语言
async function autoDetectAndApplyLanguage() {
    try {
        const savedLanguage = localStorage.getItem('preferredLanguage');
        
        if (!savedLanguage) {
            // 如果没有保存的语言，自动检测
            const detectedLanguage = await detectUserLanguage();
            console.log('Detected language:', detectedLanguage);
            
            // 应用检测到的语言
            switchLanguage(detectedLanguage);
            
            // 显示语言检测提示
            showLanguageDetectionNotification(detectedLanguage);
        }
    } catch (error) {
        console.error('Auto language detection failed:', error);
    }
}

// 处理语言切换
function handleLanguageChange(event) {
    const selectedLanguage = event.target.value;
    switchLanguage(selectedLanguage);
}

// 处理语言切换完成事件
function handleLanguageChanged(event) {
    const { language, config } = event.detail;
    
    // 更新页面标题
    updatePageTitle(language);
    
    // 更新元数据
    updateMetadata(language);
    
    // 发送分析事件
    trackLanguageChange(language);
    
    // 更新货币和价格显示
    updateCurrencyDisplay(language);
    
    console.log(`Language switched to: ${language} (${config.name})`);
}

// 切换语言的主函数
function switchLanguage(language) {
    if (!LANGUAGE_CONFIG.languages[language]) {
        console.warn(`Language ${language} not supported, falling back to English`);
        language = 'en';
    }
    
    try {
        // 1. 应用语言配置
        applyLanguage(language);
        
        // 2. 应用翻译
        applyTranslations(language);
        
        // 3. 应用市场本地化
        applyMarketLocalization(language);
        
        // 4. 更新选择器
        const selector = document.getElementById('language');
        if (selector && selector.value !== language) {
            selector.value = language;
        }
        
        // 5. 保存语言偏好
        localStorage.setItem('preferredLanguage', language);
        
        console.log(`Successfully switched to language: ${language}`);
    } catch (error) {
        console.error(`Failed to switch to language ${language}:`, error);
    }
}

// 更新页面标题
function updatePageTitle(language) {
    const config = LANGUAGE_CONFIG.languages[language];
    if (!config) return;
    
    const titles = {
        'en': 'Professional Steel Cutting Equipment Manufacturer | Shenzhen Punaise',
        'id': 'Produsen Peralatan Pemotongan Baja Profesional | Shenzhen Punaise',
        'th': 'ผู้ผลิตเครื่องตัดเหล็กมืออาชีพ | เซินเจิน ปูไนส์',
        'vi': 'Nhà sản xuất thiết bị cắt thép chuyên nghiệp | Shenzhen Punaise',
        'ms': 'Pengeluar Peralatan Pemotongan Keluli Profesional | Shenzhen Punaise',
        'tl': 'Propesyonal na Tagagawa ng Kagamitan sa Pagputol ng Bakal | Shenzhen Punaise',
        'es': 'Fabricante Profesional de Equipos de Corte de Acero | Shenzhen Punaise',
        'pt': 'Fabricante Profissional de Equipamentos de Corte de Aço | Shenzhen Punaise',
        'zh': '深圳普耐斯机电设备有限公司 - 专业钢板切割设备制造商'
    };
    
    const newTitle = titles[language] || titles['en'];
    document.title = newTitle;
}

// 更新元数据
function updateMetadata(language) {
    const config = LANGUAGE_CONFIG.languages[language];
    if (!config) return;
    
    // 更新description meta标签
    const descriptions = {
        'en': 'Professional steel cutting equipment manufacturer since 2005. CNC plasma, laser cutting systems with precision engineering for global markets.',
        'id': 'Produsen peralatan pemotongan baja profesional sejak 2005. Sistem pemotongan plasma CNC, laser dengan rekayasa presisi untuk pasar global.',
        'th': 'ผู้ผลิตเครื่องตัดเหล็กมืออาชีพตั้งแต่ปี 2548 ระบบตัดพลาสม่า CNC เลเซอร์ด้วยวิศวกรรมความแม่นยำสำหรับตลาดโลก',
        'vi': 'Nhà sản xuất thiết bị cắt thép chuyên nghiệp từ năm 2005. Hệ thống cắt plasma CNC, laser với kỹ thuật chính xác cho thị trường toàn cầu.',
        'es': 'Fabricante profesional de equipos de corte de acero desde 2005. Sistemas de corte por plasma CNC, láser con ingeniería de precisión para mercados globales.',
        'pt': 'Fabricante profissional de equipamentos de corte de aço desde 2005. Sistemas de corte a plasma CNC, laser com engenharia de precisão para mercados globais.',
        'zh': '深圳普耐斯机电设备有限公司，专业提供等离子切割机、激光切割设备、火焰切割机。19年行业经验，服务全球客户。'
    };
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.content = descriptions[language] || descriptions['en'];
    }
    
    // 更新HTML语言属性
    document.documentElement.lang = language;
}

// 更新货币和价格显示
function updateCurrencyDisplay(language) {
    const config = LANGUAGE_CONFIG.languages[language];
    if (!config) return;
    
    // 更新所有价格元素
    document.querySelectorAll('[data-price]').forEach(element => {
        const basePrice = parseFloat(element.dataset.price);
        if (!isNaN(basePrice)) {
            element.textContent = formatCurrency(basePrice, language);
        }
    });
    
    // 更新货币选择器（如果存在）
    const currencySelector = document.getElementById('currency');
    if (currencySelector) {
        currencySelector.value = config.currency;
    }
}

// 显示语言检测通知
function showLanguageDetectionNotification(language) {
    const config = LANGUAGE_CONFIG.languages[language];
    if (!config || language === 'en') return;
    
    const notification = document.createElement('div');
    notification.className = 'language-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${config.flag}</span>
            <span class="notification-text">
                Website available in ${config.name}
            </span>
            <button class="notification-dismiss" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: white;
        border-radius: 10px;
        padding: 15px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 9999;
        max-width: 300px;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // 5秒后自动消失
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// 发送语言切换分析事件
function trackLanguageChange(language) {
    if (typeof gtag === 'function') {
        gtag('event', 'language_change', {
            'event_category': 'localization',
            'event_label': language,
            'value': 1
        });
    }
}

// 获取当前语言
function getCurrentLanguage() {
    return localStorage.getItem('preferredLanguage') || 'en';
}

// 检查是否为RTL语言
function isRTLLanguage(language) {
    return LANGUAGE_CONFIG.languages[language]?.rtl || false;
}

// 获取语言的区域信息
function getLanguageRegion(language) {
    return LANGUAGE_CONFIG.languages[language]?.region || 'International';
}

// 导出函数
window.switchLanguage = switchLanguage;
window.getCurrentLanguage = getCurrentLanguage;
window.isRTLLanguage = isRTLLanguage;
window.getLanguageRegion = getLanguageRegion;