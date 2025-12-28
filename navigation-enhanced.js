// Enhanced Navigation JavaScript
// 处理导航交互、滚动效果和移动端菜单

(function() {
    'use strict';
    
    // DOM元素
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 初始化导航功能
    function initNavigation() {
        setupScrollEffect();
        setupMobileMenu();
        setupActiveLinks();
        setupSmoothScroll();
        setupKeyboardNavigation();
    }
    
    // 滚动效果
    function setupScrollEffect() {
        let lastScrollTop = 0;
        let scrollTimer = null;
        
        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // 添加滚动样式
                if (scrollTop > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                
                // 滚动时隐藏/显示导航栏 (可选)
                if (scrollTop > lastScrollTop && scrollTop > 200) {
                    // 向下滚动时隐藏
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    // 向上滚动时显示
                    navbar.style.transform = 'translateY(0)';
                }
                
                lastScrollTop = scrollTop;
            }, 10);
        });
    }
    
    // 移动端菜单
    function setupMobileMenu() {
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function() {
                toggleMobileMenu();
            });
            
            // 点击菜单项时关闭移动菜单
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    if (navMenu.classList.contains('active')) {
                        closeMobileMenu();
                    }
                });
            });
            
            // 点击外部区域关闭菜单
            document.addEventListener('click', function(e) {
                if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
                    closeMobileMenu();
                }
            });
            
            // ESC键关闭菜单
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                    closeMobileMenu();
                }
            });
        }
    }
    
    function toggleMobileMenu() {
        const isActive = navMenu.classList.contains('active');
        
        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
    
    function openMobileMenu() {
        navMenu.classList.add('active');
        hamburger.classList.add('active');
        document.body.style.overflow = 'hidden'; // 防止背景滚动
        
        // 动画效果
        navMenu.style.opacity = '0';
        navMenu.style.transform = 'translateY(-20px)';
        
        requestAnimationFrame(() => {
            navMenu.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            navMenu.style.opacity = '1';
            navMenu.style.transform = 'translateY(0)';
        });
    }
    
    function closeMobileMenu() {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = ''; // 恢复背景滚动
        
        // 重置样式
        setTimeout(() => {
            navMenu.style.opacity = '';
            navMenu.style.transform = '';
            navMenu.style.transition = '';
        }, 300);
    }
    
    // 活跃链接高亮
    function setupActiveLinks() {
        const sections = document.querySelectorAll('section[id]');
        
        function updateActiveLink() {
            const scrollPos = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                
                if (correspondingLink) {
                    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                        // 移除所有活跃类
                        navLinks.forEach(link => link.classList.remove('active'));
                        // 添加当前活跃类
                        correspondingLink.classList.add('active');
                    }
                }
            });
        }
        
        window.addEventListener('scroll', debounce(updateActiveLink, 10));
        updateActiveLink(); // 初始调用
    }
    
    // 平滑滚动
    function setupSmoothScroll() {
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        const offsetTop = targetElement.offsetTop - navbar.offsetHeight - 20;
                        
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                        
                        // 更新URL (可选)
                        history.pushState(null, null, href);
                    }
                });
            }
        });
    }
    
    // 键盘导航
    function setupKeyboardNavigation() {
        navLinks.forEach((link, index) => {
            link.addEventListener('keydown', function(e) {
                const isLast = index === navLinks.length - 1;
                const isFirst = index === 0;
                
                switch(e.key) {
                    case 'ArrowRight':
                        e.preventDefault();
                        if (!isLast) {
                            navLinks[index + 1].focus();
                        } else {
                            navLinks[0].focus();
                        }
                        break;
                        
                    case 'ArrowLeft':
                        e.preventDefault();
                        if (!isFirst) {
                            navLinks[index - 1].focus();
                        } else {
                            navLinks[navLinks.length - 1].focus();
                        }
                        break;
                        
                    case 'Home':
                        e.preventDefault();
                        navLinks[0].focus();
                        break;
                        
                    case 'End':
                        e.preventDefault();
                        navLinks[navLinks.length - 1].focus();
                        break;
                }
            });
        });
    }
    
    // 工具函数：防抖
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // 响应式检测
    function setupResponsiveDetection() {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        
        function handleViewportChange(e) {
            if (!e.matches) {
                // 桌面端视图，确保移动菜单是关闭的
                closeMobileMenu();
            }
        }
        
        mediaQuery.addListener(handleViewportChange);
        handleViewportChange(mediaQuery); // 初始检测
    }
    
    // 性能优化：预加载链接
    function setupLinkPreloading() {
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('tel:') && !href.startsWith('mailto:')) {
                link.addEventListener('mouseenter', function() {
                    const linkElement = document.createElement('link');
                    linkElement.rel = 'prefetch';
                    linkElement.href = href;
                    document.head.appendChild(linkElement);
                }, { once: true });
            }
        });
    }
    
    // 初始化错误处理
    function safeInit() {
        try {
            initNavigation();
            setupResponsiveDetection();
            setupLinkPreloading();
            
            // 添加加载完成标识
            navbar.classList.add('nav-loaded');
            
            console.log('Navigation enhanced successfully');
        } catch (error) {
            console.error('Navigation initialization error:', error);
        }
    }
    
    // DOM加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', safeInit);
    } else {
        safeInit();
    }
    
    // 导出函数供外部使用
    window.NavigationEnhancer = {
        openMobileMenu,
        closeMobileMenu,
        toggleMobileMenu
    };
    
})();