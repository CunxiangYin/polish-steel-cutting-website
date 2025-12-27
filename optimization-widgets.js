// 优化组件JavaScript文件

// 1. WhatsApp浮动按钮功能
function initWhatsAppWidget() {
    // 创建WhatsApp按钮
    const whatsappHTML = `
        <a href="https://wa.me/8613510992218?text=你好，我对贵公司的钢板切割设备感兴趣，想了解更多信息。" 
           class="whatsapp-float" 
           target="_blank"
           aria-label="Contact us on WhatsApp">
            <i class="fab fa-whatsapp"></i>
        </a>
        <div class="whatsapp-tooltip">
            <strong>需要帮助？</strong><br>
            点击直接WhatsApp咨询！
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', whatsappHTML);
    
    // 显示提示框
    const tooltip = document.querySelector('.whatsapp-tooltip');
    setTimeout(() => {
        tooltip.classList.add('show');
        setTimeout(() => {
            tooltip.classList.remove('show');
        }, 5000);
    }, 3000);
    
    // 定期显示提示
    setInterval(() => {
        tooltip.classList.add('show');
        setTimeout(() => {
            tooltip.classList.remove('show');
        }, 5000);
    }, 30000);
}

// 2. 紧急联系横幅
function initEmergencyBanner() {
    const bannerHTML = `
        <div class="emergency-banner" id="emergencyBanner">
            <div class="banner-text">
                <span class="hot-icon">🔥</span>
                <span>24小时服务热线：</span>
                <span class="phone-number">135-1099-2218</span>
                <span>|</span>
                <a href="tel:+8613510992218" class="cta-button">立即致电</a>
            </div>
            <span class="close-banner" onclick="closeEmergencyBanner()">×</span>
        </div>
    `;
    
    // 检查是否已经关闭过
    const bannerClosed = localStorage.getItem('emergencyBannerClosed');
    const closedTime = localStorage.getItem('emergencyBannerClosedTime');
    const currentTime = new Date().getTime();
    
    // 如果没有关闭过，或者关闭超过24小时，显示横幅
    if (!bannerClosed || (closedTime && currentTime - closedTime > 24 * 60 * 60 * 1000)) {
        document.body.insertAdjacentHTML('afterbegin', bannerHTML);
        document.body.classList.add('has-banner');
        
        // 调整页面顶部间距
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.style.top = '50px';
        }
    }
}

// 关闭横幅功能
function closeEmergencyBanner() {
    const banner = document.getElementById('emergencyBanner');
    if (banner) {
        banner.style.animation = 'slideUp 0.5s ease';
        setTimeout(() => {
            banner.remove();
            document.body.classList.remove('has-banner');
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                navbar.style.top = '0';
            }
        }, 500);
        
        // 记录关闭时间
        localStorage.setItem('emergencyBannerClosed', 'true');
        localStorage.setItem('emergencyBannerClosedTime', new Date().getTime());
    }
}

// 3. A/B测试CTA文案
function initABTesting() {
    const ctaVariants = [
        { text: '立即获取报价', class: 'variant-a' },
        { text: '免费咨询方案', class: 'variant-b' },
        { text: '预约产品演示', class: 'variant-c' }
    ];
    
    // 获取或设置用户的测试组
    let testGroup = localStorage.getItem('ctaTestGroup');
    if (!testGroup) {
        testGroup = Math.floor(Math.random() * ctaVariants.length);
        localStorage.setItem('ctaTestGroup', testGroup);
    }
    
    const selectedVariant = ctaVariants[testGroup];
    
    // 更新所有主要CTA按钮
    document.querySelectorAll('.btn-primary, .cta-btn').forEach(btn => {
        if (!btn.classList.contains('no-test')) {
            btn.textContent = selectedVariant.text;
            btn.classList.add(selectedVariant.class);
            
            // 跟踪点击
            btn.addEventListener('click', () => {
                trackABTest('cta_click', selectedVariant.class);
            });
        }
    });
}

// A/B测试跟踪
function trackABTest(action, variant) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'ab_test', {
            'test_name': 'cta_text',
            'variant': variant,
            'action': action
        });
    }
    
    // 本地存储转化数据
    const conversions = JSON.parse(localStorage.getItem('abTestConversions') || '{}');
    conversions[variant] = (conversions[variant] || 0) + 1;
    localStorage.setItem('abTestConversions', JSON.stringify(conversions));
}

// 4. 客户Logo墙
function initClientLogos() {
    const clientLogosHTML = `
        <section class="client-logos-section">
            <div class="client-logos-container">
                <div class="client-logos-header">
                    <h3>500+企业的共同选择</h3>
                    <p>19年来，我们服务了众多知名企业</p>
                </div>
                <div class="logo-scroll-wrapper">
                    <div class="logo-scroll">
                        <!-- 第一组Logo -->
                        <div class="client-logo-item">
                            <span class="client-logo-text">广州重工</span>
                        </div>
                        <div class="client-logo-item">
                            <span class="client-logo-text">深圳汽车</span>
                        </div>
                        <div class="client-logo-item">
                            <span class="client-logo-text">东莞钢铁</span>
                        </div>
                        <div class="client-logo-item">
                            <span class="client-logo-text">佛山机械</span>
                        </div>
                        <div class="client-logo-item">
                            <span class="client-logo-text">中山造船</span>
                        </div>
                        <div class="client-logo-item">
                            <span class="client-logo-text">珠海能源</span>
                        </div>
                        <!-- 复制一组实现无缝滚动 -->
                        <div class="client-logo-item">
                            <span class="client-logo-text">广州重工</span>
                        </div>
                        <div class="client-logo-item">
                            <span class="client-logo-text">深圳汽车</span>
                        </div>
                        <div class="client-logo-item">
                            <span class="client-logo-text">东莞钢铁</span>
                        </div>
                        <div class="client-logo-item">
                            <span class="client-logo-text">佛山机械</span>
                        </div>
                        <div class="client-logo-item">
                            <span class="client-logo-text">中山造船</span>
                        </div>
                        <div class="client-logo-item">
                            <span class="client-logo-text">珠海能源</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
    
    // 在about部分后插入
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        aboutSection.insertAdjacentHTML('afterend', clientLogosHTML);
    }
}

// 5. 信任徽章
function initTrustBadges() {
    const trustBadgesHTML = `
        <div class="trust-badges">
            <div class="trust-badge">
                <div class="trust-badge-icon">
                    <i class="fas fa-certificate"></i>
                </div>
                <div class="trust-badge-text">
                    <div class="trust-badge-title">ISO 9001</div>
                    <div class="trust-badge-desc">质量认证</div>
                </div>
            </div>
            <div class="trust-badge">
                <div class="trust-badge-icon">
                    <i class="fas fa-shield-alt"></i>
                </div>
                <div class="trust-badge-text">
                    <div class="trust-badge-title">19年</div>
                    <div class="trust-badge-desc">行业经验</div>
                </div>
            </div>
            <div class="trust-badge">
                <div class="trust-badge-icon">
                    <i class="fas fa-users"></i>
                </div>
                <div class="trust-badge-text">
                    <div class="trust-badge-title">500+</div>
                    <div class="trust-badge-desc">服务企业</div>
                </div>
            </div>
            <div class="trust-badge">
                <div class="trust-badge-icon">
                    <i class="fas fa-headset"></i>
                </div>
                <div class="trust-badge-text">
                    <div class="trust-badge-title">24/7</div>
                    <div class="trust-badge-desc">技术支持</div>
                </div>
            </div>
        </div>
    `;
    
    // 在产品部分前插入
    const productsSection = document.getElementById('products');
    if (productsSection) {
        const container = document.createElement('div');
        container.className = 'container';
        container.innerHTML = trustBadgesHTML;
        productsSection.insertBefore(container, productsSection.firstChild);
    }
}

// 6. 表单优化
function optimizeForms() {
    // 为所有表单添加实时验证
    document.querySelectorAll('form').forEach(form => {
        // 添加进度指示器
        const inputs = form.querySelectorAll('input, textarea, select');
        let progressBar = document.createElement('div');
        progressBar.className = 'form-progress';
        progressBar.innerHTML = '<div class="progress-bar"></div>';
        form.insertBefore(progressBar, form.firstChild);
        
        // 实时验证
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateInput(this);
                updateProgress(form);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateInput(this);
                }
                updateProgress(form);
            });
        });
        
        // 表单提交动画
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 验证所有字段
            let isValid = true;
            inputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // 显示成功动画
                showSuccessAnimation(form);
                
                // 跟踪表单提交
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submit', {
                        'form_name': form.id || 'unknown'
                    });
                }
            }
        });
    });
}

// 输入验证函数
function validateInput(input) {
    let isValid = true;
    let errorMsg = '';
    
    // 移除之前的错误信息
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    if (input.hasAttribute('required') && !input.value.trim()) {
        isValid = false;
        errorMsg = '此字段为必填项';
    } else if (input.type === 'email' && input.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
            isValid = false;
            errorMsg = '请输入有效的邮箱地址';
        }
    } else if (input.type === 'tel' && input.value) {
        const phoneRegex = /^1[3-9]\d{9}$/;
        if (!phoneRegex.test(input.value.replace(/\D/g, ''))) {
            isValid = false;
            errorMsg = '请输入有效的手机号码';
        }
    }
    
    if (!isValid) {
        input.classList.add('error');
        input.classList.remove('success');
        const error = document.createElement('span');
        error.className = 'error-message';
        error.textContent = errorMsg;
        input.parentElement.appendChild(error);
    } else if (input.value) {
        input.classList.add('success');
        input.classList.remove('error');
    }
    
    return isValid;
}

// 更新表单进度
function updateProgress(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    const filledInputs = Array.from(inputs).filter(input => input.value.trim()).length;
    const progress = (filledInputs / inputs.length) * 100;
    
    const progressBar = form.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
}

// 显示成功动画
function showSuccessAnimation(form) {
    const successHTML = `
        <div class="form-success-overlay">
            <div class="success-icon">✓</div>
            <h3>提交成功！</h3>
            <p>我们会尽快与您联系</p>
        </div>
    `;
    
    form.style.position = 'relative';
    form.insertAdjacentHTML('beforeend', successHTML);
    
    setTimeout(() => {
        form.querySelector('.form-success-overlay').remove();
        form.reset();
        updateProgress(form);
    }, 3000);
}

// 7. 退出意图检测
function initExitIntent() {
    let exitIntentShown = false;
    
    document.addEventListener('mouseout', (e) => {
        // 检测鼠标移出浏览器顶部
        if (e.clientY < 10 && !exitIntentShown) {
            exitIntentShown = true;
            showExitPopup();
            
            // 24小时内不再显示
            localStorage.setItem('exitIntentShown', Date.now());
        }
    });
}

// 显示退出弹窗
function showExitPopup() {
    const popupHTML = `
        <div class="exit-popup-overlay" id="exitPopup">
            <div class="exit-popup">
                <button class="close-popup" onclick="closeExitPopup()">×</button>
                <h2>等等！别错过独家优惠</h2>
                <p>立即咨询可享受：</p>
                <ul>
                    <li>✓ 免费设备选型方案</li>
                    <li>✓ 首次合作9折优惠</li>
                    <li>✓ 免费上门技术指导</li>
                </ul>
                <div class="popup-cta">
                    <a href="tel:+8613510992218" class="btn-call">立即致电</a>
                    <a href="https://wa.me/8613510992218" class="btn-whatsapp">WhatsApp咨询</a>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', popupHTML);
}

// 关闭退出弹窗
function closeExitPopup() {
    const popup = document.getElementById('exitPopup');
    if (popup) {
        popup.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            popup.remove();
        }, 300);
    }
}

// 8. 智能询价表单处理
function initSmartQuoteForm() {
    const form = document.getElementById('smartQuoteForm');
    const thicknessSlider = document.getElementById('thickness');
    const thicknessDisplay = document.getElementById('thicknessDisplay');
    
    if (!form) return;
    
    // 厚度滑块实时更新
    if (thicknessSlider && thicknessDisplay) {
        thicknessSlider.addEventListener('input', function() {
            thicknessDisplay.textContent = this.value + 'mm';
        });
    }
    
    // 智能推荐功能
    const industrySelect = document.getElementById('industry');
    const materialSelect = document.getElementById('material');
    
    if (industrySelect) {
        industrySelect.addEventListener('change', function() {
            showRecommendations(this.value);
        });
    }
    
    // 表单提交处理
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 收集表单数据
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // 生成推荐方案
        const recommendation = generateRecommendation(data);
        
        // 显示推荐结果
        showQuoteResult(recommendation, data);
        
        // 跟踪智能询价
        if (typeof gtag !== 'undefined') {
            gtag('event', 'smart_quote_submit', {
                'industry': data.industry,
                'material': data.material,
                'thickness': data.thickness,
                'quantity': data.quantity
            });
        }
    });
}

// 显示推荐信息
function showRecommendations(industry) {
    const recommendations = {
        'shipbuilding': {
            equipment: '火焰切割机 + 大功率等离子',
            features: '可切割300mm厚板，适合大型构件'
        },
        'automotive': {
            equipment: '激光切割机 + 精密等离子',
            features: '±0.03mm精度，批量生产效率高'
        },
        'construction': {
            equipment: '数控火焰 + 便携等离子',
            features: '多角度切割，适合H型钢加工'
        },
        'machinery': {
            equipment: '中功率激光 + 台式等离子',
            features: '多品种小批量，快速换型'
        },
        'steel-center': {
            equipment: '容华分条机 + 数控等离子',
            features: '钢卷加工一体化解决方案'
        },
        'energy': {
            equipment: '重型火焰 + 高功率等离子',
            features: '特种钢材切割，坡口加工'
        }
    };
    
    const rec = recommendations[industry];
    if (rec) {
        // 可以在页面上显示推荐信息
        console.log('推荐设备:', rec.equipment, '特点:', rec.features);
    }
}

// 生成推荐方案
function generateRecommendation(data) {
    const { industry, material, thickness, quantity, budget } = data;
    
    let recommendedEquipment = [];
    let estimatedPrice = '';
    let additionalNotes = [];
    
    // 根据厚度推荐设备
    if (thickness <= 6) {
        recommendedEquipment.push('激光切割机');
    } else if (thickness <= 50) {
        recommendedEquipment.push('等离子切割机');
        if (thickness > 20) {
            recommendedEquipment.push('火焰切割机');
        }
    } else {
        recommendedEquipment.push('火焰切割机');
        recommendedEquipment.push('重型等离子');
    }
    
    // 根据行业调整推荐
    if (industry === 'automotive' && thickness <= 10) {
        recommendedEquipment = ['高精度激光切割机'];
        additionalNotes.push('推荐IPG光源，确保汽车零部件精度要求');
    } else if (industry === 'steel-center') {
        recommendedEquipment.push('台湾容华分条机');
        additionalNotes.push('建议配套自动收卷系统');
    }
    
    // 价格估算
    const priceRanges = {
        'under-50k': '3-5万元',
        '50k-100k': '8-12万元', 
        '100k-200k': '15-25万元',
        'over-200k': '30-80万元'
    };
    estimatedPrice = priceRanges[budget] || '请电话咨询';
    
    return {
        equipment: recommendedEquipment,
        price: estimatedPrice,
        notes: additionalNotes
    };
}

// 显示询价结果
function showQuoteResult(recommendation, data) {
    const resultHTML = `
        <div class="quote-result-overlay">
            <div class="quote-result">
                <button class="close-result" onclick="closeQuoteResult()">×</button>
                <h2>🎯 为您定制的专业方案</h2>
                <div class="result-content">
                    <div class="result-section">
                        <h3>推荐设备</h3>
                        <div class="equipment-list">
                            ${recommendation.equipment.map(eq => `<span class="equipment-tag">${eq}</span>`).join('')}
                        </div>
                    </div>
                    <div class="result-section">
                        <h3>价格区间</h3>
                        <p class="price-range">${recommendation.price}</p>
                    </div>
                    ${recommendation.notes.length > 0 ? `
                    <div class="result-section">
                        <h3>专业建议</h3>
                        <ul class="notes-list">
                            ${recommendation.notes.map(note => `<li>${note}</li>`).join('')}
                        </ul>
                    </div>
                    ` : ''}
                    <div class="result-section">
                        <h3>您的需求</h3>
                        <div class="requirement-summary">
                            <p><strong>行业:</strong> ${getIndustryName(data.industry)}</p>
                            <p><strong>材料:</strong> ${getMaterialName(data.material)}</p>
                            <p><strong>厚度:</strong> ${data.thickness}mm</p>
                        </div>
                    </div>
                </div>
                <div class="result-cta">
                    <a href="tel:+8613510992218" class="btn-call">
                        <i class="fas fa-phone"></i> 立即致电咨询
                    </a>
                    <a href="https://wa.me/8613510992218?text=我刚完成了智能询价，希望进一步咨询${recommendation.equipment.join('、')}的详细方案" class="btn-whatsapp">
                        <i class="fab fa-whatsapp"></i> WhatsApp详聊
                    </a>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', resultHTML);
}

// 关闭询价结果
function closeQuoteResult() {
    const result = document.querySelector('.quote-result-overlay');
    if (result) {
        result.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            result.remove();
        }, 300);
    }
}

// 辅助函数
function getIndustryName(value) {
    const names = {
        'shipbuilding': '造船工业',
        'automotive': '汽车制造',
        'construction': '建筑钢结构',
        'machinery': '机械制造',
        'steel-center': '钢材加工中心',
        'energy': '能源设备'
    };
    return names[value] || value;
}

function getMaterialName(value) {
    const names = {
        'carbon-steel': '碳钢',
        'stainless-steel': '不锈钢',
        'aluminum': '铝材',
        'copper': '铜材',
        'alloy': '合金钢'
    };
    return names[value] || value;
}

// 初始化所有优化功能
function initOptimizations() {
    // 检查是否在主页
    const isHomePage = window.location.pathname === '/' || window.location.pathname.includes('index.html');
    
    // 全局功能
    initWhatsAppWidget();
    initEmergencyBanner();
    initABTesting();
    optimizeForms();
    initSmartQuoteForm();
    
    // 仅在主页启用的功能
    if (isHomePage) {
        initClientLogos();
        initTrustBadges();
        
        // 延迟加载退出意图检测
        setTimeout(() => {
            const lastShown = localStorage.getItem('exitIntentShown');
            const now = Date.now();
            // 如果没有显示过或超过24小时
            if (!lastShown || now - lastShown > 24 * 60 * 60 * 1000) {
                initExitIntent();
            }
        }, 10000); // 10秒后启用
    }
}

// DOM加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOptimizations);
} else {
    initOptimizations();
}

// 导出函数供外部使用
window.closeEmergencyBanner = closeEmergencyBanner;
window.closeExitPopup = closeExitPopup;