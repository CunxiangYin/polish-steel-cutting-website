// 移动端导航优化功能
class MobileNavigation {
    constructor() {
        this.isMenuOpen = false;
        this.currentSection = '';
        this.scrollPosition = 0;
        this.isScrolling = false;
        this.init();
    }
    
    init() {
        this.createMobileNav();
        this.bindEvents();
        this.initScrollDetection();
        this.initTouchOptimizations();
    }
    
    createMobileNav() {
        // 创建底部导航栏
        const bottomNavHTML = `
            <nav class="mobile-bottom-nav" id="mobileBottomNav">
                <div class="mobile-nav-grid">
                    <a href="#home" class="mobile-nav-item" data-section="home">
                        <i class="fas fa-home"></i>
                        <span>首页</span>
                    </a>
                    <a href="#products" class="mobile-nav-item" data-section="products">
                        <i class="fas fa-cogs"></i>
                        <span>产品</span>
                    </a>
                    <a href="#smartQuote" class="mobile-nav-item" data-section="quote">
                        <i class="fas fa-calculator"></i>
                        <span>询价</span>
                    </a>
                    <a href="#about" class="mobile-nav-item" data-section="about">
                        <i class="fas fa-building"></i>
                        <span>关于</span>
                    </a>
                    <a href="#contact" class="mobile-nav-item" data-section="contact">
                        <i class="fas fa-phone"></i>
                        <span>联系</span>
                    </a>
                </div>
            </nav>
        `;
        
        // 创建移动端菜单
        const mobileMenuHTML = `
            <div class="mobile-menu-overlay" id="mobileMenuOverlay"></div>
            <div class="mobile-menu-panel" id="mobileMenuPanel">
                <button class="mobile-menu-close" id="mobileMenuClose">
                    <i class="fas fa-times"></i>
                </button>
                
                <div class="mobile-menu-header">
                    <h3>导航菜单</h3>
                </div>
                
                <ul class="mobile-menu-nav">
                    <li><a href="#home"><i class="fas fa-home"></i>首页</a></li>
                    <li><a href="#about"><i class="fas fa-building"></i>公司介绍</a></li>
                    <li><a href="#products"><i class="fas fa-cogs"></i>产品展示</a></li>
                    <li><a href="/suppliers.html"><i class="fas fa-industry"></i>供应商</a></li>
                    <li><a href="/applications.html"><i class="fas fa-wrench"></i>应用案例</a></li>
                    <li><a href="#smartQuote"><i class="fas fa-calculator"></i>智能询价</a></li>
                    <li><a href="/downloads.html"><i class="fas fa-download"></i>资料下载</a></li>
                    <li><a href="#contact"><i class="fas fa-phone"></i>联系我们</a></li>
                    <li><a href="/blog.html"><i class="fas fa-blog"></i>技术博客</a></li>
                    <li><a href="/local-seo-optimization.html"><i class="fas fa-map-marker-alt"></i>本地服务</a></li>
                </ul>
                
                <div style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 12px;">
                    <h4 style="margin: 0 0 10px 0; color: #333;">快速联系</h4>
                    <a href="tel:+8613510992218" style="display: block; margin-bottom: 10px; color: #667eea;">
                        📞 135-1099-2218
                    </a>
                    <a href="https://wa.me/8613510992218" style="display: block; color: #25d366;">
                        💬 WhatsApp咨询
                    </a>
                </div>
            </div>
        `;
        
        // 创建移动端搜索栏
        const mobileSearchHTML = `
            <div class="mobile-search-bar" id="mobileSearchBar">
                <div class="mobile-search-input-wrapper">
                    <i class="fas fa-search mobile-search-icon"></i>
                    <input type="text" class="mobile-search-input" id="mobileSearchInput" 
                           placeholder="搜索产品、型号、材料...">
                    <button class="mobile-search-clear" id="mobileSearchClear">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `;
        
        // 创建快速操作按钮
        const mobileFabHTML = `
            <div class="mobile-fab-container">
                <button class="mobile-fab tertiary" onclick="this.classList.toggle('active')" title="更多操作">
                    <i class="fas fa-plus"></i>
                </button>
                <button class="mobile-fab secondary" onclick="openWhatsApp()" title="WhatsApp咨询">
                    <i class="fab fa-whatsapp"></i>
                </button>
                <button class="mobile-fab primary" onclick="scrollToQuote()" title="快速询价">
                    <i class="fas fa-calculator"></i>
                </button>
            </div>
        `;
        
        // 插入到页面
        document.body.insertAdjacentHTML('beforeend', bottomNavHTML);
        document.body.insertAdjacentHTML('beforeend', mobileMenuHTML);
        document.body.insertAdjacentHTML('afterbegin', mobileSearchHTML);
        document.body.insertAdjacentHTML('beforeend', mobileFabHTML);
        
        // 为主内容添加底部间距
        const mainContent = document.querySelector('main') || document.body;
        mainContent.style.paddingBottom = '80px';
    }
    
    bindEvents() {
        // 底部导航点击
        document.querySelectorAll('.mobile-nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const target = item.getAttribute('href');
                this.scrollToSection(target);
                this.updateActiveNav(item.dataset.section);
            });
        });
        
        // 汉堡菜单切换
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const menuClose = document.getElementById('mobileMenuClose');
        const menuOverlay = document.getElementById('mobileMenuOverlay');
        
        if (menuToggle) {
            menuToggle.addEventListener('click', () => this.toggleMobileMenu());
        }
        
        if (menuClose) {
            menuClose.addEventListener('click', () => this.closeMobileMenu());
        }
        
        if (menuOverlay) {
            menuOverlay.addEventListener('click', () => this.closeMobileMenu());
        }
        
        // 移动端搜索
        const searchInput = document.getElementById('mobileSearchInput');
        const searchClear = document.getElementById('mobileSearchClear');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleMobileSearch(e.target.value);
            });
            
            searchInput.addEventListener('focus', () => {
                this.showMobileSearch();
            });
        }
        
        if (searchClear) {
            searchClear.addEventListener('click', () => {
                searchInput.value = '';
                this.handleMobileSearch('');
                searchInput.focus();
            });
        }
        
        // 移动端菜单链接点击
        document.querySelectorAll('.mobile-menu-nav a').forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
        
        // 搜索按钮点击
        const searchBtn = document.querySelector('.search-toggle-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.toggleMobileSearch();
            });
        }
        
        // 键盘事件
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        });
        
        // 方向改变事件
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.handleOrientationChange();
            }, 100);
        });
    }
    
    initScrollDetection() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        // 初始化当前活动section
        this.updateCurrentSection();
    }
    
    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollDirection = scrollTop > this.scrollPosition ? 'down' : 'up';
        
        this.scrollPosition = scrollTop;
        
        // 更新当前活动的section
        this.updateCurrentSection();
        
        // 显示/隐藏底部导航
        this.toggleBottomNavVisibility(scrollDirection);
        
        // 显示滚动指示器
        this.showScrollIndicator();
    }
    
    updateCurrentSection() {
        const sections = ['home', 'about', 'products', 'quote', 'contact'];
        const scrollPos = window.scrollY + 100;
        
        let currentSection = 'home';
        
        sections.forEach(sectionId => {
            const element = document.getElementById(sectionId) || 
                           document.querySelector(`[data-section="${sectionId}"]`);
            if (element) {
                const offsetTop = element.offsetTop;
                if (scrollPos >= offsetTop) {
                    currentSection = sectionId;
                }
            }
        });
        
        if (currentSection !== this.currentSection) {
            this.currentSection = currentSection;
            this.updateActiveNav(currentSection);
        }
    }
    
    updateActiveNav(section) {
        // 更新底部导航活动状态
        document.querySelectorAll('.mobile-nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const activeItem = document.querySelector(`[data-section="${section}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }
    }
    
    toggleBottomNavVisibility(direction) {
        const bottomNav = document.getElementById('mobileBottomNav');
        if (!bottomNav) return;
        
        if (direction === 'down' && this.scrollPosition > 200) {
            bottomNav.style.transform = 'translateY(100%)';
        } else {
            bottomNav.style.transform = 'translateY(0)';
        }
    }
    
    scrollToSection(target) {
        const element = document.querySelector(target);
        if (element) {
            const offsetTop = element.offsetTop - 80; // 考虑导航栏高度
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
    
    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        this.updateMenuState();
    }
    
    closeMobileMenu() {
        this.isMenuOpen = false;
        this.updateMenuState();
    }
    
    updateMenuState() {
        const overlay = document.getElementById('mobileMenuOverlay');
        const panel = document.getElementById('mobileMenuPanel');
        
        if (overlay && panel) {
            if (this.isMenuOpen) {
                overlay.classList.add('active');
                panel.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                overlay.classList.remove('active');
                panel.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    }
    
    handleMobileSearch(query) {
        // 触发产品搜索功能
        if (window.productSearch) {
            window.productSearch.handleSearch(query);
        }
        
        // 如果搜索为空，隐藏搜索建议
        if (!query.trim()) {
            this.hideMobileSearch();
        }
    }
    
    showMobileSearch() {
        const searchBar = document.getElementById('mobileSearchBar');
        if (searchBar) {
            searchBar.classList.add('active');
        }
    }
    
    hideMobileSearch() {
        const searchBar = document.getElementById('mobileSearchBar');
        if (searchBar && !document.getElementById('mobileSearchInput').value) {
            searchBar.classList.remove('active');
        }
    }
    
    toggleMobileSearch() {
        const searchBar = document.getElementById('mobileSearchBar');
        if (searchBar) {
            searchBar.classList.toggle('active');
            if (searchBar.classList.contains('active')) {
                document.getElementById('mobileSearchInput').focus();
            }
        }
    }
    
    showScrollIndicator() {
        if (this.isScrolling) return;
        
        this.isScrolling = true;
        
        // 创建滚动指示器
        let indicator = document.querySelector('.mobile-scroll-indicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = 'mobile-scroll-indicator';
            indicator.textContent = `正在浏览: ${this.getSectionName(this.currentSection)}`;
            document.body.appendChild(indicator);
        }
        
        indicator.textContent = `正在浏览: ${this.getSectionName(this.currentSection)}`;
        indicator.classList.add('show');
        
        // 2秒后隐藏
        clearTimeout(this.scrollTimer);
        this.scrollTimer = setTimeout(() => {
            indicator.classList.remove('show');
            this.isScrolling = false;
        }, 2000);
    }
    
    getSectionName(section) {
        const names = {
            'home': '首页',
            'about': '公司介绍',
            'products': '产品展示',
            'quote': '智能询价',
            'contact': '联系我们'
        };
        return names[section] || '首页';
    }
    
    initTouchOptimizations() {
        // 添加触控反馈
        document.querySelectorAll('.touch-feedback').forEach(element => {
            element.addEventListener('touchstart', () => {
                element.style.transform = 'scale(0.95)';
            });
            
            element.addEventListener('touchend', () => {
                setTimeout(() => {
                    element.style.transform = '';
                }, 150);
            });
        });
        
        // 优化滚动性能
        const scrollContainers = document.querySelectorAll('.mobile-scroll-container');
        scrollContainers.forEach(container => {
            container.style.webkitOverflowScrolling = 'touch';
            container.style.scrollBehavior = 'smooth';
        });
        
        // 处理iOS SafeArea
        this.handleSafeArea();
    }
    
    handleSafeArea() {
        // 检测是否为iPhone X及以上设备
        const isIPhoneX = /iPhone/.test(navigator.userAgent) && 
                          window.screen.height >= 812 && 
                          window.devicePixelRatio >= 2;
        
        if (isIPhoneX) {
            document.documentElement.style.setProperty('--safe-area-inset-bottom', 'env(safe-area-inset-bottom)');
        }
    }
    
    handleOrientationChange() {
        // 重新计算布局
        setTimeout(() => {
            this.updateCurrentSection();
            
            // 处理虚拟键盘问题
            if (document.activeElement && 
                (document.activeElement.type === 'text' || 
                 document.activeElement.type === 'email' ||
                 document.activeElement.tagName === 'TEXTAREA')) {
                document.activeElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }, 500);
    }
    
    // 公共方法
    addNavigationBadge(section, count) {
        const navItem = document.querySelector(`[data-section="${section}"]`);
        if (navItem) {
            let badge = navItem.querySelector('.mobile-nav-badge');
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'mobile-nav-badge';
                navItem.appendChild(badge);
            }
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        }
    }
    
    removeNavigationBadge(section) {
        const navItem = document.querySelector(`[data-section="${section}"]`);
        if (navItem) {
            const badge = navItem.querySelector('.mobile-nav-badge');
            if (badge) {
                badge.remove();
            }
        }
    }
    
    showMobileToast(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `mobile-toast mobile-toast-${type}`;
        toast.textContent = message;
        
        toast.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
            color: white;
            padding: 15px 20px;
            border-radius: 25px;
            font-size: 14px;
            font-weight: 500;
            z-index: 10001;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            animation: fadeInOut ${duration}ms ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, duration);
    }
    
    updateConnectionStatus(isOnline) {
        const statusIndicator = document.createElement('div');
        statusIndicator.textContent = isOnline ? '网络已连接' : '网络已断开';
        statusIndicator.style.cssText = `
            position: fixed;
            top: 80px;
            left: 20px;
            right: 20px;
            background: ${isOnline ? '#4caf50' : '#f44336'};
            color: white;
            padding: 10px;
            border-radius: 8px;
            text-align: center;
            font-size: 14px;
            z-index: 10000;
            animation: slideDown 0.5s ease;
        `;
        
        document.body.appendChild(statusIndicator);
        
        setTimeout(() => {
            statusIndicator.style.animation = 'slideUp 0.5s ease forwards';
            setTimeout(() => statusIndicator.remove(), 500);
        }, 2000);
    }
}

// 全局快速操作函数
function openWhatsApp() {
    window.open('https://wa.me/8613510992218?text=您好，我对贵公司的切割设备感兴趣，想了解更多信息。', '_blank');
}

function scrollToQuote() {
    document.querySelector('#smartQuote, #contact')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function openMobilePhone() {
    window.location.href = 'tel:+8613510992218';
}

// 网络状态检测
let mobileNavInstance;
window.addEventListener('online', () => {
    if (mobileNavInstance) {
        mobileNavInstance.updateConnectionStatus(true);
    }
});

window.addEventListener('offline', () => {
    if (mobileNavInstance) {
        mobileNavInstance.updateConnectionStatus(false);
    }
});

// CSS动画定义
const mobileAnimationStyles = `
    <style>
    @keyframes fadeInOut {
        0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        10%, 90% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
    
    @keyframes slideDown {
        from { transform: translateY(-100%); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes slideUp {
        from { transform: translateY(0); opacity: 1; }
        to { transform: translateY(-100%); opacity: 0; }
    }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', mobileAnimationStyles);

// 自动初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // 只在移动设备上初始化
        if (window.innerWidth <= 768) {
            mobileNavInstance = new MobileNavigation();
        }
    });
} else {
    if (window.innerWidth <= 768) {
        mobileNavInstance = new MobileNavigation();
    }
}

// 响应式检测
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768 && !mobileNavInstance) {
        mobileNavInstance = new MobileNavigation();
    } else if (window.innerWidth > 768 && mobileNavInstance) {
        // 可以选择销毁移动端导航
        // mobileNavInstance = null;
    }
});

// 导出供其他模块使用
window.MobileNavigation = MobileNavigation;
window.mobileNavInstance = mobileNavInstance;