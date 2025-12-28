/**
 * 多语言配置系统 - 面向东南亚和拉美洲市场
 * Southeast Asia & Latin America Market Localization
 */

const LANGUAGE_CONFIG = {
    // 默认语言
    defaultLanguage: 'en',
    
    // 支持的语言列表
    languages: {
        // 国际语言
        'en': {
            name: 'English',
            flag: '🇺🇸',
            rtl: false,
            currency: 'USD',
            currencySymbol: '$',
            region: 'International'
        },
        
        // === 东南亚语言 Southeast Asia ===
        'id': {
            name: 'Bahasa Indonesia',
            flag: '🇮🇩',
            rtl: false,
            currency: 'IDR',
            currencySymbol: 'Rp',
            region: 'Southeast Asia',
            market: 'Indonesia'
        },
        'th': {
            name: 'ภาษาไทย',
            flag: '🇹🇭',
            rtl: false,
            currency: 'THB',
            currencySymbol: '฿',
            region: 'Southeast Asia',
            market: 'Thailand'
        },
        'vi': {
            name: 'Tiếng Việt',
            flag: '🇻🇳',
            rtl: false,
            currency: 'VND',
            currencySymbol: '₫',
            region: 'Southeast Asia',
            market: 'Vietnam'
        },
        'ms': {
            name: 'Bahasa Melayu',
            flag: '🇲🇾',
            rtl: false,
            currency: 'MYR',
            currencySymbol: 'RM',
            region: 'Southeast Asia',
            market: 'Malaysia'
        },
        'tl': {
            name: 'Filipino',
            flag: '🇵🇭',
            rtl: false,
            currency: 'PHP',
            currencySymbol: '₱',
            region: 'Southeast Asia',
            market: 'Philippines'
        },
        
        // === 拉美洲语言 Latin America ===
        'es': {
            name: 'Español',
            flag: '🇲🇽',
            rtl: false,
            currency: 'MXN',
            currencySymbol: '$',
            region: 'Latin America',
            market: 'Mexico & Central America'
        },
        'pt': {
            name: 'Português',
            flag: '🇧🇷',
            rtl: false,
            currency: 'BRL',
            currencySymbol: 'R$',
            region: 'Latin America',
            market: 'Brazil'
        },
        'es-ar': {
            name: 'Español (Argentina)',
            flag: '🇦🇷',
            rtl: false,
            currency: 'ARS',
            currencySymbol: '$',
            region: 'Latin America',
            market: 'Argentina'
        },
        'es-co': {
            name: 'Español (Colombia)',
            flag: '🇨🇴',
            rtl: false,
            currency: 'COP',
            currencySymbol: '$',
            region: 'Latin America',
            market: 'Colombia'
        },
        'es-cl': {
            name: 'Español (Chile)',
            flag: '🇨🇱',
            rtl: false,
            currency: 'CLP',
            currencySymbol: '$',
            region: 'Latin America',
            market: 'Chile'
        },
        
        // 保留中文 (供应商沟通用)
        'zh': {
            name: '中文',
            flag: '🇨🇳',
            rtl: false,
            currency: 'CNY',
            currencySymbol: '¥',
            region: 'Asia',
            market: 'China (Supplier)'
        }
    },
    
    // 区域分组
    regions: {
        'Southeast Asia': ['id', 'th', 'vi', 'ms', 'tl'],
        'Latin America': ['es', 'pt', 'es-ar', 'es-co', 'es-cl'],
        'Asia': ['zh'],
        'International': ['en']
    },
    
    // 货币转换基准汇率 (相对于USD)
    exchangeRates: {
        'USD': 1,
        'IDR': 15700,    // 印尼卢比
        'THB': 35,        // 泰铢
        'VND': 24000,     // 越南盾
        'MYR': 4.5,       // 马来西亚林吉特
        'PHP': 56,        // 菲律宾比索
        'MXN': 17,        // 墨西哥比索
        'BRL': 5,         // 巴西雷亚尔
        'ARS': 800,       // 阿根廷比索
        'COP': 4000,      // 哥伦比亚比索
        'CLP': 900,       // 智利比索
        'CNY': 7.2        // 人民币
    }
};

// 格式化货币显示
function formatCurrency(amount, language) {
    const config = LANGUAGE_CONFIG.languages[language];
    if (!config) return `$${amount}`;
    
    const localAmount = amount * LANGUAGE_CONFIG.exchangeRates[config.currency];
    
    // 特殊货币格式处理
    switch(config.currency) {
        case 'IDR':
        case 'VND':
            // 印尼和越南货币通常不显示小数
            return `${config.currencySymbol} ${Math.round(localAmount).toLocaleString()}`;
        case 'CLP':
        case 'COP':
        case 'ARS':
            // 这些货币通常显示为整数
            return `${config.currencySymbol} ${Math.round(localAmount).toLocaleString()}`;
        default:
            return `${config.currencySymbol} ${localAmount.toFixed(2).toLocaleString()}`;
    }
}

// 获取用户地理位置推荐语言
async function detectUserLanguage() {
    try {
        // 首先检查浏览器语言
        const browserLang = navigator.language.toLowerCase();
        
        // 语言映射
        const langMap = {
            'en': 'en',
            'id': 'id',
            'th': 'th',
            'vi': 'vi',
            'ms': 'ms',
            'fil': 'tl',
            'tl': 'tl',
            'es': 'es',
            'es-mx': 'es',
            'es-ar': 'es-ar',
            'es-co': 'es-co',
            'es-cl': 'es-cl',
            'pt': 'pt',
            'pt-br': 'pt',
            'zh': 'zh',
            'zh-cn': 'zh'
        };
        
        // 检查精确匹配
        if (langMap[browserLang]) {
            return langMap[browserLang];
        }
        
        // 检查语言前缀
        const langPrefix = browserLang.split('-')[0];
        if (langMap[langPrefix]) {
            return langMap[langPrefix];
        }
        
        // 默认返回英语
        return 'en';
    } catch (error) {
        console.error('Language detection error:', error);
        return 'en';
    }
}

// 初始化语言选择器
function initializeLanguageSelector() {
    const savedLang = localStorage.getItem('preferredLanguage');
    const selector = document.getElementById('language');
    
    if (selector) {
        // 清空现有选项
        selector.innerHTML = '';
        
        // 按区域分组添加选项
        Object.entries(LANGUAGE_CONFIG.regions).forEach(([region, languages]) => {
            const optgroup = document.createElement('optgroup');
            optgroup.label = region;
            
            languages.forEach(lang => {
                const config = LANGUAGE_CONFIG.languages[lang];
                const option = document.createElement('option');
                option.value = lang;
                option.textContent = `${config.flag} ${config.name}`;
                optgroup.appendChild(option);
            });
            
            selector.appendChild(optgroup);
        });
        
        // 设置当前语言
        if (savedLang && LANGUAGE_CONFIG.languages[savedLang]) {
            selector.value = savedLang;
        } else {
            // 自动检测语言
            detectUserLanguage().then(detectedLang => {
                selector.value = detectedLang;
                localStorage.setItem('preferredLanguage', detectedLang);
                applyLanguage(detectedLang);
            });
        }
    }
}

// 应用语言切换
function applyLanguage(language) {
    const config = LANGUAGE_CONFIG.languages[language];
    if (!config) return;
    
    // 设置HTML语言属性
    document.documentElement.lang = language;
    document.documentElement.dir = config.rtl ? 'rtl' : 'ltr';
    
    // 更新货币显示
    document.querySelectorAll('[data-price]').forEach(element => {
        const usdPrice = parseFloat(element.dataset.price);
        element.textContent = formatCurrency(usdPrice, language);
    });
    
    // 触发语言切换事件
    document.dispatchEvent(new CustomEvent('languageChanged', {
        detail: { language, config }
    }));
    
    // 保存语言偏好
    localStorage.setItem('preferredLanguage', language);
    localStorage.setItem('preferredCurrency', config.currency);
}

// 导出配置
window.LANGUAGE_CONFIG = LANGUAGE_CONFIG;
window.formatCurrency = formatCurrency;
window.detectUserLanguage = detectUserLanguage;
window.initializeLanguageSelector = initializeLanguageSelector;
window.applyLanguage = applyLanguage;