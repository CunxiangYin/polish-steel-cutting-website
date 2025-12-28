/**
 * 市场本地化系统 - 东南亚和拉美洲市场适配
 * Market Localization System for Southeast Asia & Latin America
 */

// 市场特定配置
const MARKET_CONFIG = {
    // 东南亚市场
    'Southeast Asia': {
        timezone: 'Asia/Singapore',
        businessHours: '09:00-18:00 GMT+8',
        preferredContact: 'whatsapp',
        culturalNotes: {
            colors: ['#FF6B6B', '#4ECDC4', '#45B7D1'], // 温暖、友好的色彩
            communication: 'direct', // 直接沟通
            decisionMaking: 'group', // 团体决策
            priceDisplay: 'prominent' // 价格显示突出
        },
        paymentMethods: ['T/T', 'L/C', 'Western Union', 'Bank Transfer'],
        shippingPorts: ['Singapore', 'Port Klang', 'Bangkok', 'Ho Chi Minh City', 'Manila']
    },
    
    // 拉美洲市场
    'Latin America': {
        timezone: 'America/Mexico_City',
        businessHours: '08:00-17:00 GMT-6',
        preferredContact: 'whatsapp',
        culturalNotes: {
            colors: ['#FFA726', '#66BB6A', '#42A5F5'], // 活力、自然的色彩
            communication: 'relationship', // 关系导向
            decisionMaking: 'consensus', // 共识决策
            priceDisplay: 'detailed' // 详细价格说明
        },
        paymentMethods: ['T/T', 'L/C', 'D/P', 'Cash Against Documents'],
        shippingPorts: ['Veracruz', 'Santos', 'Cartagena', 'Valparaiso', 'Buenos Aires']
    }
};

// 特定国家的本地化配置
const COUNTRY_SPECIFIC = {
    // === 东南亚国家 ===
    'ID': { // 印尼
        marketName: 'Indonesia',
        capital: 'Jakarta',
        population: '273M',
        gdp: '$1.3T',
        industrialFocus: ['Manufacturing', 'Mining', 'Shipbuilding', 'Automotive'],
        keyIndustries: '制造业、矿业、造船业、汽车工业',
        majorCities: ['Jakarta', 'Surabaya', 'Bandung', 'Medan'],
        businessCulture: {
            greeting: 'Selamat pagi/siang/sore',
            relationship: 'Very important',
            hierarchy: 'Respected',
            timeOrientation: 'Flexible'
        },
        certifications: ['SNI', 'SIRIM', 'ISO'],
        tradeAgreements: ['ASEAN', 'RCEP', 'AANZFTA']
    },
    'TH': { // 泰国
        marketName: 'Thailand',
        capital: 'Bangkok',
        population: '70M',
        gdp: '$543B',
        industrialFocus: ['Automotive', 'Electronics', 'Food Processing', 'Tourism'],
        majorCities: ['Bangkok', 'Chiang Mai', 'Pattaya', 'Hat Yai'],
        businessCulture: {
            greeting: 'สวัสดีครับ/ค่ะ (Sawasdee)',
            relationship: 'Critical',
            hierarchy: 'Very important',
            timeOrientation: 'Relationship-focused'
        }
    },
    'VN': { // 越南
        marketName: 'Vietnam',
        capital: 'Hanoi',
        population: '98M',
        gdp: '$409B',
        industrialFocus: ['Electronics', 'Textiles', 'Shipbuilding', 'Steel'],
        majorCities: ['Ho Chi Minh City', 'Hanoi', 'Da Nang', 'Hai Phong'],
        businessCulture: {
            greeting: 'Xin chào',
            relationship: 'Important',
            hierarchy: 'Respected',
            timeOrientation: 'Punctual'
        }
    },
    'MY': { // 马来西亚
        marketName: 'Malaysia',
        capital: 'Kuala Lumpur',
        population: '33M',
        gdp: '$432B',
        industrialFocus: ['Electronics', 'Palm Oil', 'Petroleum', 'Manufacturing'],
        majorCities: ['Kuala Lumpur', 'George Town', 'Johor Bahru', 'Kuching']
    },
    'PH': { // 菲律宾
        marketName: 'Philippines',
        capital: 'Manila',
        population: '110M',
        gdp: '$394B',
        industrialFocus: ['Electronics', 'Shipbuilding', 'Mining', 'Agriculture'],
        majorCities: ['Manila', 'Quezon City', 'Davao', 'Cebu City']
    },
    
    // === 拉美国家 ===
    'MX': { // 墨西哥
        marketName: 'Mexico',
        capital: 'Mexico City',
        population: '130M',
        gdp: '$1.7T',
        industrialFocus: ['Automotive', 'Electronics', 'Petroleum', 'Mining'],
        majorCities: ['Mexico City', 'Guadalajara', 'Monterrey', 'Puebla'],
        businessCulture: {
            greeting: 'Buenos días/tardes',
            relationship: 'Very important',
            hierarchy: 'Respected',
            timeOrientation: 'Flexible'
        },
        tradeAgreements: ['USMCA', 'CPTPP', 'Pacific Alliance']
    },
    'BR': { // 巴西
        marketName: 'Brazil',
        capital: 'Brasília',
        population: '215M',
        gdp: '$2.1T',
        industrialFocus: ['Automotive', 'Steel', 'Mining', 'Oil & Gas'],
        majorCities: ['São Paulo', 'Rio de Janeiro', 'Salvador', 'Brasília'],
        businessCulture: {
            greeting: 'Bom dia/tarde',
            relationship: 'Critical',
            hierarchy: 'Formal respect',
            timeOrientation: 'Relationship-focused'
        }
    },
    'AR': { // 阿根廷
        marketName: 'Argentina',
        capital: 'Buenos Aires',
        population: '46M',
        gdp: '$491B',
        industrialFocus: ['Agriculture', 'Manufacturing', 'Mining', 'Energy'],
        majorCities: ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza']
    },
    'CO': { // 哥伦比亚
        marketName: 'Colombia',
        capital: 'Bogotá',
        population: '51M',
        gdp: '$314B',
        industrialFocus: ['Oil & Gas', 'Mining', 'Agriculture', 'Manufacturing'],
        majorCities: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla']
    },
    'CL': { // 智利
        marketName: 'Chile',
        capital: 'Santiago',
        population: '19M',
        gdp: '$317B',
        industrialFocus: ['Mining', 'Agriculture', 'Fishing', 'Manufacturing'],
        majorCities: ['Santiago', 'Valparaíso', 'Concepción', 'Antofagasta']
    }
};

// 根据语言获取市场信息
function getMarketInfo(language) {
    const countryCode = language.split('-')[0].toUpperCase();
    const region = LANGUAGE_CONFIG.languages[language]?.region || 'International';
    
    return {
        country: COUNTRY_SPECIFIC[countryCode] || {},
        region: MARKET_CONFIG[region] || {},
        language: LANGUAGE_CONFIG.languages[language] || {}
    };
}

// 生成本地化的价格显示
function generateLocalizedPricing(basePrice, language) {
    const marketInfo = getMarketInfo(language);
    const formattedPrice = formatCurrency(basePrice, language);
    
    // 根据地区调整价格展示方式
    if (marketInfo.region.culturalNotes?.priceDisplay === 'prominent') {
        return `<div class="price-prominent">${formattedPrice}</div>`;
    } else if (marketInfo.region.culturalNotes?.priceDisplay === 'detailed') {
        return `
            <div class="price-detailed">
                <div class="base-price">${formattedPrice}</div>
                <div class="price-note">Includes shipping to major ports</div>
            </div>
        `;
    }
    return `<span class="price-standard">${formattedPrice}</span>`;
}

// 生成本地化的联系方式
function generateLocalizedContact(language) {
    const marketInfo = getMarketInfo(language);
    const config = marketInfo.language;
    
    const contactMethods = [
        {
            type: 'phone',
            label: translate('contact.phone', language),
            value: '+86 135-1099-2218',
            primary: true
        },
        {
            type: 'whatsapp',
            label: 'WhatsApp',
            value: '+86 135-1099-2218',
            primary: marketInfo.region.preferredContact === 'whatsapp'
        },
        {
            type: 'email',
            label: translate('contact.email', language),
            value: '466904802@qq.com',
            primary: false
        }
    ];
    
    return contactMethods.sort((a, b) => b.primary - a.primary);
}

// 本地化营业时间显示
function getLocalizedBusinessHours(language) {
    const marketInfo = getMarketInfo(language);
    const timezone = marketInfo.region.timezone || 'Asia/Shanghai';
    const businessHours = marketInfo.region.businessHours || '08:30-18:00 GMT+8';
    
    return {
        timezone,
        hours: businessHours,
        localTime: new Intl.DateTimeFormat(language.replace('-', '_'), {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        }).format(new Date())
    };
}

// 生成市场特定的证书和认证信息
function getMarketCertifications(language) {
    const marketInfo = getMarketInfo(language);
    const certifications = marketInfo.country.certifications || ['ISO', 'CE'];
    
    return certifications.map(cert => ({
        name: cert,
        description: getCertificationDescription(cert, language),
        required: isRequiredInMarket(cert, language)
    }));
}

// 获取认证描述
function getCertificationDescription(certification, language) {
    const descriptions = {
        'en': {
            'ISO': 'International quality management standard',
            'CE': 'European safety conformity',
            'SNI': 'Indonesian national standard',
            'SIRIM': 'Malaysian certification'
        },
        'id': {
            'ISO': 'Standar manajemen kualitas internasional',
            'SNI': 'Standar Nasional Indonesia',
            'SIRIM': 'Sertifikasi Malaysia'
        },
        'es': {
            'ISO': 'Estándar internacional de gestión de calidad',
            'CE': 'Conformidad de seguridad europea'
        },
        'pt': {
            'ISO': 'Padrão internacional de gestão da qualidade',
            'CE': 'Conformidade de segurança europeia'
        }
    };
    
    return descriptions[language.split('-')[0]]?.[certification] || certification;
}

// 检查认证在特定市场是否必需
function isRequiredInMarket(certification, language) {
    const requiredCerts = {
        'ID': ['SNI'],
        'MY': ['SIRIM'],
        'TH': ['TIS'],
        'VN': ['TCVN'],
        'PH': ['PNS']
    };
    
    const countryCode = language.split('-')[0].toUpperCase();
    return requiredCerts[countryCode]?.includes(certification) || false;
}

// 生成本地化的成功案例
function getLocalizedCaseStudies(language) {
    const marketInfo = getMarketInfo(language);
    const region = marketInfo.region;
    
    // 根据地区返回相关的案例研究
    const caseStudies = {
        'Southeast Asia': [
            {
                company: 'PT Steel Indonesia',
                industry: 'Shipbuilding',
                equipment: 'CNC Plasma Cutting System',
                result: '40% productivity increase',
                location: 'Jakarta, Indonesia'
            },
            {
                company: 'Thai Steel Corporation',
                industry: 'Automotive',
                equipment: 'Laser Cutting System',
                result: '60% waste reduction',
                location: 'Bangkok, Thailand'
            }
        ],
        'Latin America': [
            {
                company: 'Metalúrgica São Paulo',
                industry: 'Construction',
                equipment: 'Flame Cutting Equipment',
                result: '50% cost reduction',
                location: 'São Paulo, Brazil'
            },
            {
                company: 'Acero Mexicano SA',
                industry: 'Manufacturing',
                equipment: 'Taiwan Ronghua Slitter',
                result: '35% efficiency gain',
                location: 'Monterrey, Mexico'
            }
        ]
    };
    
    return caseStudies[marketInfo.language.region] || caseStudies['Southeast Asia'];
}

// 应用市场本地化
function applyMarketLocalization(language) {
    const marketInfo = getMarketInfo(language);
    
    // 更新价格显示
    document.querySelectorAll('[data-price]').forEach(element => {
        const basePrice = parseFloat(element.dataset.price);
        element.innerHTML = generateLocalizedPricing(basePrice, language);
    });
    
    // 更新联系方式
    const contactMethods = generateLocalizedContact(language);
    updateContactDisplay(contactMethods);
    
    // 更新营业时间
    const businessHours = getLocalizedBusinessHours(language);
    updateBusinessHoursDisplay(businessHours);
    
    // 更新认证信息
    const certifications = getMarketCertifications(language);
    updateCertificationsDisplay(certifications);
}

// 更新联系方式显示
function updateContactDisplay(contactMethods) {
    const container = document.querySelector('.contact-methods');
    if (!container) return;
    
    container.innerHTML = contactMethods.map(method => `
        <div class="contact-method ${method.primary ? 'primary' : ''}">
            <div class="contact-label">${method.label}</div>
            <div class="contact-value">${method.value}</div>
        </div>
    `).join('');
}

// 更新营业时间显示
function updateBusinessHoursDisplay(businessHours) {
    const element = document.querySelector('.business-hours');
    if (!element) return;
    
    element.innerHTML = `
        <div class="hours">${businessHours.hours}</div>
        <div class="timezone">${businessHours.timezone}</div>
        <div class="current-time">Current time: ${businessHours.localTime}</div>
    `;
}

// 更新认证信息显示
function updateCertificationsDisplay(certifications) {
    const container = document.querySelector('.certifications');
    if (!container) return;
    
    container.innerHTML = certifications.map(cert => `
        <div class="certification ${cert.required ? 'required' : ''}">
            <div class="cert-name">${cert.name}</div>
            <div class="cert-description">${cert.description}</div>
        </div>
    `).join('');
}

// 导出市场本地化系统
window.MARKET_CONFIG = MARKET_CONFIG;
window.COUNTRY_SPECIFIC = COUNTRY_SPECIFIC;
window.getMarketInfo = getMarketInfo;
window.applyMarketLocalization = applyMarketLocalization;
window.generateLocalizedPricing = generateLocalizedPricing;
window.getLocalizedBusinessHours = getLocalizedBusinessHours;