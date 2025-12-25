// Language Translation System for Punaise Website
const translations = {
    en: {
        // Navigation
        nav: {
            home: "Home",
            about: "About",
            products: "Products",
            features: "Features",
            contact: "Contact"
        },
        
        // Hero Section
        hero: {
            title: "Professional <span class='highlight'>Steel Cutting</span> Equipment Manufacturer",
            subtitle: "Shenzhen Punaise Mechanical and Electrical Equipment Co., Ltd. - Since 2005, specializing in steel plates, steel plate processing equipment, auxiliary equipment and Taiwan Ronghua precision machinery for global metal fabrication industries.",
            getQuote: "Get Quote",
            watchDemo: "Watch Demo",
            stats: {
                partners: "Regional Partners",
                experience: "Years Experience",
                quality: "Quality Assurance"
            },
            scrollDown: "Scroll Down"
        },
        
        // About Section
        about: {
            title: "Leading Steel Cutting Technology Since 2005",
            description: "Shenzhen Punaise Mechanical and Electrical Equipment Co., Ltd. specializes in sales of steel plates, steel plate processing equipment, auxiliary equipment, parts, and peripheral materials. We provide technical maintenance and consulting services, featuring Taiwan Ronghua precision machinery for metal fabrication industries worldwide.",
            features: {
                quality: {
                    title: "Quality Equipment",
                    desc: "Professional steel processing equipment sourced from reliable manufacturers including Taiwan Ronghua machinery."
                },
                service: {
                    title: "Professional Service",
                    desc: "Comprehensive sales support with technical consulting, maintenance guidance and spare parts supply."
                },
                support: {
                    title: "Local Support",
                    desc: "Based in Shenzhen with deep understanding of regional market needs and quick response capabilities."
                }
            }
        },
        
        // Products Section
        products: {
            title: "Steel Processing Equipment Portfolio",
            subtitle: "Comprehensive range of precision cutting systems, Taiwan Ronghua slitting machines, and steel processing equipment for metal fabrication and industrial applications",
            items: {
                steelPlate: {
                    title: "Steel Plate Processing Equipment",
                    desc: "Complete range of steel plate processing equipment including cutting machines, auxiliary equipment and spare parts.",
                    features: ["Various steel plate thicknesses", "Professional technical support", "Quality assured equipment"]
                },
                conveyor: {
                    title: "Conveyor Belts & Mobile Platforms",
                    desc: "Industrial conveyor systems, steel coil tipping machines, and mobile platform cars for material handling.",
                    features: ["Heavy-duty construction", "Customizable configurations", "Reliable operation"]
                },
                ronghua: {
                    title: "Taiwan Ronghua Slitting Machines",
                    desc: "Professional steel coil slitting equipment and flying shears for precision material processing and continuous steel operations.",
                    features: ["High-speed slitting capability", "Precision steel strip cutting", "Taiwan quality assurance"]
                }
            },
            learnMore: "Learn More"
        },
        
        // Features Section
        features: {
            title: "Why Choose Punaise Equipment Solutions?",
            subtitle: "Our commitment to quality equipment distribution and professional service has made us a trusted partner for steel processing companies throughout Guangdong region.",
            items: {
                partnership: {
                    title: "Trusted Partnership",
                    desc: "Authorized distributor of Taiwan Ronghua equipment with comprehensive technical support and warranty coverage."
                },
                coverage: {
                    title: "Regional Coverage",
                    desc: "Efficient delivery throughout Guangdong Province and neighboring regions with local technical support."
                },
                consulting: {
                    title: "Technical Consulting",
                    desc: "Professional maintenance and consulting services with Manager Fu's expertise in steel processing equipment."
                }
            },
            stats: {
                quality: "Equipment Quality",
                satisfaction: "Customer Satisfaction",
                coverage: "Regional Coverage"
            }
        },
        
        // Testimonials Section
        testimonials: {
            title: "What Our Clients Say",
            subtitle: "Trusted by industry leaders worldwide"
        },
        
        // Contact Section
        contact: {
            title: "Get In Touch",
            subtitle: "Ready to upgrade your steel processing capabilities? Contact Punaise experts for professional steel plate processing equipment and Taiwan Ronghua machinery solutions. Serving clients since 2005.",
            form: {
                name: "Full Name *",
                email: "Email Address *",
                company: "Company Name",
                phone: "Phone Number",
                service: "Service Interest",
                selectProduct: "Select a product",
                message: "Message *",
                messagePlaceholder: "Please describe your requirements...",
                submit: "Send Message",
                services: {
                    plasma: "CNC Plasma Cutting",
                    laser: "Laser Cutting Systems",
                    flame: "Flame Cutting Equipment",
                    consultation: "Technical Consultation",
                    support: "Support & Maintenance"
                }
            },
            info: {
                address: "Company Address",
                phone: "Phone",
                email: "Email"
            }
        },
        
        // Footer
        footer: {
            sections: {
                products: "Products",
                services: "Services",
                company: "Company",
                resources: "Resources"
            },
            productLinks: ["CNC Plasma Cutting", "Laser Cutting Systems", "Flame Cutting Equipment", "Cutting Accessories", "Custom Solutions"],
            serviceLinks: ["Technical Support", "Installation", "Maintenance", "Training", "Consulting"],
            companyLinks: ["About Us", "Careers", "News & Events", "Case Studies", "Contact"],
            resourceLinks: ["Documentation", "Downloads", "White Papers", "Webinars", "FAQ"],
            copyright: "© 2024 Shenzhen Punaise Mechanical and Electrical Equipment Co., Ltd. All rights reserved. | Unified Social Credit Code: 914403007703327657",
            legal: {
                privacy: "Privacy Policy",
                terms: "Terms of Service",
                cookie: "Cookie Policy"
            }
        }
    },
    
    zh: {
        // 导航
        nav: {
            home: "首页",
            about: "关于我们",
            products: "产品中心",
            features: "服务特色",
            contact: "联系我们"
        },
        
        // 首屏
        hero: {
            title: "专业<span class='highlight'>钢板切割</span>设备供应商",
            subtitle: "深圳市普耐斯机电设备有限公司 - 自2005年成立以来，专注于钢板、钢板加工设备、辅助设备及台湾荣华精密机械的销售与服务，为全球金属加工行业提供优质解决方案。",
            getQuote: "获取报价",
            watchDemo: "观看演示",
            stats: {
                partners: "区域合作伙伴",
                experience: "年行业经验",
                quality: "品质保证"
            },
            scrollDown: "向下滚动"
        },
        
        // 关于我们
        about: {
            title: "自2005年以来领先的钢板切割技术",
            description: "深圳市普耐斯机电设备有限公司专业从事钢板、钢板加工设备、辅助设备、零配件及周边材料的销售。我们提供技术维护和咨询服务，特别是台湾荣华精密机械，为全球金属加工行业服务。",
            features: {
                quality: {
                    title: "优质设备",
                    desc: "专业钢板加工设备，来自可靠制造商，包括台湾荣华机械设备。"
                },
                service: {
                    title: "专业服务",
                    desc: "提供全面的销售支持，包括技术咨询、维护指导和备件供应。"
                },
                support: {
                    title: "本地支持",
                    desc: "立足深圳，深入了解区域市场需求，提供快速响应服务。"
                }
            }
        },
        
        // 产品中心
        products: {
            title: "钢板加工设备产品线",
            subtitle: "提供全系列精密切割系统、台湾荣华分条机和钢板加工设备，满足金属加工和工业应用需求",
            items: {
                steelPlate: {
                    title: "钢板加工设备",
                    desc: "全系列钢板加工设备，包括切割机、辅助设备和备件。",
                    features: ["适用各种钢板厚度", "专业技术支持", "品质保证设备"]
                },
                conveyor: {
                    title: "输送带和移动平台",
                    desc: "工业输送系统、钢卷翻转机和移动平台车，用于物料搬运。",
                    features: ["重型结构设计", "可定制配置", "运行可靠稳定"]
                },
                ronghua: {
                    title: "台湾荣华分条机",
                    desc: "专业钢卷分条设备和飞剪，用于精密材料加工和连续钢材作业。",
                    features: ["高速分条能力", "精密钢带切割", "台湾品质保证"]
                }
            },
            learnMore: "了解更多"
        },
        
        // 服务特色
        features: {
            title: "为什么选择普耐斯设备方案？",
            subtitle: "我们对优质设备分销和专业服务的承诺，使我们成为广东地区钢材加工企业值得信赖的合作伙伴。",
            items: {
                partnership: {
                    title: "值得信赖的伙伴",
                    desc: "台湾荣华设备授权经销商，提供全面的技术支持和保修服务。"
                },
                coverage: {
                    title: "区域覆盖",
                    desc: "高效配送覆盖广东省及周边地区，提供本地技术支持。"
                },
                consulting: {
                    title: "技术咨询",
                    desc: "傅经理凭借在钢板加工设备领域的专业知识，提供专业维护和咨询服务。"
                }
            },
            stats: {
                quality: "设备质量",
                satisfaction: "客户满意度",
                coverage: "区域覆盖率"
            }
        },
        
        // 客户评价
        testimonials: {
            title: "客户评价",
            subtitle: "深受行业领导者信赖"
        },
        
        // 联系我们
        contact: {
            title: "联系我们",
            subtitle: "准备升级您的钢板加工能力？联系普耐斯专家，获取专业的钢板加工设备和台湾荣华机械解决方案。自2005年以来为客户服务。",
            form: {
                name: "姓名 *",
                email: "电子邮箱 *",
                company: "公司名称",
                phone: "联系电话",
                service: "服务需求",
                selectProduct: "选择产品",
                message: "留言 *",
                messagePlaceholder: "请描述您的需求...",
                submit: "发送消息",
                services: {
                    plasma: "CNC等离子切割",
                    laser: "激光切割系统",
                    flame: "火焰切割设备",
                    consultation: "技术咨询",
                    support: "支持与维护"
                }
            },
            info: {
                address: "公司地址",
                phone: "联系电话",
                email: "电子邮箱"
            }
        },
        
        // 页脚
        footer: {
            sections: {
                products: "产品中心",
                services: "服务项目",
                company: "关于公司",
                resources: "资源中心"
            },
            productLinks: ["CNC等离子切割", "激光切割系统", "火焰切割设备", "切割配件", "定制方案"],
            serviceLinks: ["技术支持", "安装服务", "设备维护", "操作培训", "技术咨询"],
            companyLinks: ["关于我们", "人才招聘", "新闻动态", "案例研究", "联系方式"],
            resourceLinks: ["技术文档", "资料下载", "白皮书", "网络研讨会", "常见问题"],
            copyright: "© 2024 深圳市普耐斯机电设备有限公司 版权所有 | 统一社会信用代码：914403007703327657",
            legal: {
                privacy: "隐私政策",
                terms: "服务条款",
                cookie: "Cookie政策"
            }
        }
    }
};

// Language Manager Class
class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('preferredLanguage') || 'en';
        this.translations = translations;
    }
    
    // Initialize language system
    init() {
        this.updateLanguage(this.currentLang);
        this.bindLanguageSelector();
        this.updateLanguageSelector();
    }
    
    // Update all text content based on selected language
    updateLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('preferredLanguage', lang);
        
        const t = this.translations[lang];
        
        // Update navigation
        this.updateNavigation(t.nav);
        
        // Update hero section
        this.updateHeroSection(t.hero);
        
        // Update about section
        this.updateAboutSection(t.about);
        
        // Update products section
        this.updateProductsSection(t.products);
        
        // Update features section
        this.updateFeaturesSection(t.features);
        
        // Update testimonials section
        this.updateTestimonialsSection(t.testimonials);
        
        // Update contact section
        this.updateContactSection(t.contact);
        
        // Update footer
        this.updateFooter(t.footer);
        
        // Update document language
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
        document.documentElement.setAttribute('data-lang', lang);
        
        // Update page title and meta description
        this.updateMetaData(lang);
    }
    
    // Update navigation menu
    updateNavigation(navTranslations) {
        const navLinks = document.querySelectorAll('.nav-link');
        const navItems = ['home', 'about', 'products', 'features', 'contact'];
        
        navLinks.forEach((link, index) => {
            if (navItems[index]) {
                link.textContent = navTranslations[navItems[index]];
            }
        });
    }
    
    // Update hero section
    updateHeroSection(heroTranslations) {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const buttons = document.querySelectorAll('.hero-buttons .btn');
        const statLabels = document.querySelectorAll('.stat-label');
        const scrollIndicator = document.querySelector('.scroll-indicator span');
        
        if (heroTitle) heroTitle.innerHTML = heroTranslations.title;
        if (heroSubtitle) heroSubtitle.textContent = heroTranslations.subtitle;
        
        if (buttons[0]) buttons[0].textContent = heroTranslations.getQuote;
        if (buttons[1]) {
            buttons[1].innerHTML = '<i class="fas fa-play"></i> ' + heroTranslations.watchDemo;
        }
        
        if (statLabels[0]) statLabels[0].textContent = heroTranslations.stats.partners;
        if (statLabels[1]) statLabels[1].textContent = heroTranslations.stats.experience;
        if (statLabels[2]) statLabels[2].textContent = heroTranslations.stats.quality;
        
        if (scrollIndicator) scrollIndicator.textContent = heroTranslations.scrollDown;
    }
    
    // Update about section
    updateAboutSection(aboutTranslations) {
        const aboutTitle = document.querySelector('#about .section-header h2');
        const aboutDesc = document.querySelector('#about .section-header p');
        const featureCards = document.querySelectorAll('#about .feature-card');
        
        if (aboutTitle) aboutTitle.textContent = aboutTranslations.title;
        if (aboutDesc) aboutDesc.textContent = aboutTranslations.description;
        
        const features = ['quality', 'service', 'support'];
        featureCards.forEach((card, index) => {
            const title = card.querySelector('h3');
            const desc = card.querySelector('p');
            const feature = features[index];
            
            if (title && feature) {
                title.textContent = aboutTranslations.features[feature].title;
            }
            if (desc && feature) {
                desc.textContent = aboutTranslations.features[feature].desc;
            }
        });
    }
    
    // Update products section
    updateProductsSection(productsTranslations) {
        const productsTitle = document.querySelector('#products .section-header h2');
        const productsSubtitle = document.querySelector('#products .section-header p');
        const productCards = document.querySelectorAll('#products .product-card');
        const learnMoreBtns = document.querySelectorAll('#products .btn-outline');
        
        if (productsTitle) productsTitle.textContent = productsTranslations.title;
        if (productsSubtitle) productsSubtitle.textContent = productsTranslations.subtitle;
        
        learnMoreBtns.forEach(btn => {
            btn.textContent = productsTranslations.learnMore;
        });
        
        // Update product cards based on their titles
        productCards.forEach(card => {
            const title = card.querySelector('h3');
            const desc = card.querySelector('.product-info > p');
            const features = card.querySelectorAll('.product-features li');
            
            if (title) {
                let productKey = '';
                if (title.textContent.includes('Steel Plate') || title.textContent.includes('钢板加工')) {
                    productKey = 'steelPlate';
                } else if (title.textContent.includes('Conveyor') || title.textContent.includes('输送带')) {
                    productKey = 'conveyor';
                } else if (title.textContent.includes('Ronghua') || title.textContent.includes('荣华')) {
                    productKey = 'ronghua';
                }
                
                if (productKey) {
                    title.textContent = productsTranslations.items[productKey].title;
                    if (desc) desc.textContent = productsTranslations.items[productKey].desc;
                    
                    features.forEach((feature, idx) => {
                        if (productsTranslations.items[productKey].features[idx]) {
                            feature.innerHTML = '<i class="fas fa-check"></i> ' + productsTranslations.items[productKey].features[idx];
                        }
                    });
                }
            }
        });
    }
    
    // Update features section
    updateFeaturesSection(featuresTranslations) {
        const featuresTitle = document.querySelector('#features h2');
        const featuresSubtitle = document.querySelector('#features .features-text > p');
        const featureItems = document.querySelectorAll('#features .feature-item');
        const chartLabels = document.querySelectorAll('.chart-label');
        
        if (featuresTitle) featuresTitle.textContent = featuresTranslations.title;
        if (featuresSubtitle) featuresSubtitle.textContent = featuresTranslations.subtitle;
        
        const featureKeys = ['partnership', 'coverage', 'consulting'];
        featureItems.forEach((item, index) => {
            const title = item.querySelector('h4');
            const desc = item.querySelector('p');
            const key = featureKeys[index];
            
            if (title && key) {
                title.textContent = featuresTranslations.items[key].title;
            }
            if (desc && key) {
                desc.textContent = featuresTranslations.items[key].desc;
            }
        });
        
        // Update chart labels
        if (chartLabels[0]) chartLabels[0].textContent = featuresTranslations.stats.quality;
        if (chartLabels[1]) chartLabels[1].textContent = featuresTranslations.stats.satisfaction;
        if (chartLabels[2]) chartLabels[2].textContent = featuresTranslations.stats.coverage;
    }
    
    // Update testimonials section
    updateTestimonialsSection(testimonialsTranslations) {
        const testimonialsTitle = document.querySelector('.testimonials .section-header h2');
        const testimonialsSubtitle = document.querySelector('.testimonials .section-header p');
        
        if (testimonialsTitle) testimonialsTitle.textContent = testimonialsTranslations.title;
        if (testimonialsSubtitle) testimonialsSubtitle.textContent = testimonialsTranslations.subtitle;
    }
    
    // Update contact section
    updateContactSection(contactTranslations) {
        const contactTitle = document.querySelector('#contact h2');
        const contactSubtitle = document.querySelector('#contact .contact-info > p');
        
        if (contactTitle) contactTitle.textContent = contactTranslations.title;
        if (contactSubtitle) contactSubtitle.textContent = contactTranslations.subtitle;
        
        // Update form labels
        const formLabels = document.querySelectorAll('#contactForm label');
        const labelKeys = ['name', 'email', 'company', 'phone', 'service', 'message'];
        
        formLabels.forEach((label, index) => {
            if (labelKeys[index]) {
                label.textContent = contactTranslations.form[labelKeys[index]];
            }
        });
        
        // Update placeholder
        const messageTextarea = document.querySelector('#message');
        if (messageTextarea) {
            messageTextarea.placeholder = contactTranslations.form.messagePlaceholder;
        }
        
        // Update submit button
        const submitBtn = document.querySelector('#contactForm button[type="submit"]');
        if (submitBtn) {
            submitBtn.textContent = contactTranslations.form.submit;
        }
        
        // Update service options
        const serviceSelect = document.querySelector('#service');
        if (serviceSelect) {
            serviceSelect.options[0].textContent = contactTranslations.form.selectProduct;
            serviceSelect.options[1].textContent = contactTranslations.form.services.plasma;
            serviceSelect.options[2].textContent = contactTranslations.form.services.laser;
            serviceSelect.options[3].textContent = contactTranslations.form.services.flame;
            serviceSelect.options[4].textContent = contactTranslations.form.services.consultation;
            serviceSelect.options[5].textContent = contactTranslations.form.services.support;
        }
        
        // Update contact info headers
        const contactHeaders = document.querySelectorAll('.contact-text h4');
        if (contactHeaders[0]) contactHeaders[0].textContent = contactTranslations.info.address;
        if (contactHeaders[1]) contactHeaders[1].textContent = contactTranslations.info.phone;
        if (contactHeaders[2]) contactHeaders[2].textContent = contactTranslations.info.email;
    }
    
    // Update footer
    updateFooter(footerTranslations) {
        // Update section headers
        const footerHeaders = document.querySelectorAll('.footer-section h4');
        if (footerHeaders[0]) footerHeaders[0].textContent = footerTranslations.sections.products;
        if (footerHeaders[1]) footerHeaders[1].textContent = footerTranslations.sections.services;
        if (footerHeaders[2]) footerHeaders[2].textContent = footerTranslations.sections.company;
        if (footerHeaders[3]) footerHeaders[3].textContent = footerTranslations.sections.resources;
        
        // Update copyright
        const copyright = document.querySelector('.footer-bottom-content p');
        if (copyright) {
            copyright.textContent = footerTranslations.copyright;
        }
        
        // Update legal links
        const legalLinks = document.querySelectorAll('.footer-links a');
        if (legalLinks[0]) legalLinks[0].textContent = footerTranslations.legal.privacy;
        if (legalLinks[1]) legalLinks[1].textContent = footerTranslations.legal.terms;
        if (legalLinks[2]) legalLinks[2].textContent = footerTranslations.legal.cookie;
    }
    
    // Bind language selector
    bindLanguageSelector() {
        const languageSelector = document.getElementById('language');
        if (languageSelector) {
            languageSelector.addEventListener('change', (e) => {
                const selectedLang = e.target.value;
                this.updateLanguage(selectedLang);
                
                // Show notification
                const message = selectedLang === 'zh' 
                    ? '已切换到中文版' 
                    : 'Switched to English version';
                
                if (typeof showNotification === 'function') {
                    showNotification(message, 'success');
                }
            });
        }
    }
    
    // Update language selector to current language
    updateLanguageSelector() {
        const languageSelector = document.getElementById('language');
        if (languageSelector) {
            // Clear existing options
            languageSelector.innerHTML = '';
            
            // Add EN and ZH options only
            const enOption = document.createElement('option');
            enOption.value = 'en';
            enOption.textContent = 'EN';
            
            const zhOption = document.createElement('option');
            zhOption.value = 'zh';
            zhOption.textContent = '中文';
            
            languageSelector.appendChild(enOption);
            languageSelector.appendChild(zhOption);
            
            // Set current language
            languageSelector.value = this.currentLang;
        }
    }
    
    // Update page metadata
    updateMetaData(lang) {
        const titles = {
            en: "CNC Steel Cutting Equipment Manufacturer | Shenzhen Punaise Mechanical Equipment Co., Ltd.",
            zh: "CNC钢板切割设备制造商 | 深圳市普耐斯机电设备有限公司"
        };
        
        const descriptions = {
            en: "Shenzhen Punaise Mechanical and Electrical Equipment Co., Ltd. - Professional steel plate cutting equipment manufacturer since 2005. CNC plasma, laser cutting systems with precision engineering.",
            zh: "深圳市普耐斯机电设备有限公司 - 自2005年以来专业的钢板切割设备制造商。CNC等离子体、激光切割系统，精密工程技术。"
        };
        
        // Update title
        document.title = titles[lang];
        
        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = descriptions[lang];
        }
        
        // Update Open Graph title and description
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const ogDescription = document.querySelector('meta[property="og:description"]');
        
        if (ogTitle) ogTitle.content = titles[lang];
        if (ogDescription) ogDescription.content = descriptions[lang];
        
        // Update Twitter Card
        const twitterTitle = document.querySelector('meta[property="twitter:title"]');
        const twitterDescription = document.querySelector('meta[property="twitter:description"]');
        
        if (twitterTitle) twitterTitle.content = titles[lang];
        if (twitterDescription) twitterDescription.content = descriptions[lang];
    }
}

// Initialize language manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const langManager = new LanguageManager();
    langManager.init();
});

// Export for use in other scripts
window.LanguageManager = LanguageManager;