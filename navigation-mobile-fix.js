// 简单的移动导航修复
(function() {
    'use strict';
    
    function initMobileNav() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!hamburger || !navMenu) {
            console.log('Mobile nav elements not found');
            return;
        }
        
        // 汉堡菜单点击事件
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = navMenu.classList.contains('active');
            
            if (isActive) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            } else {
                navMenu.classList.add('active');
                hamburger.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
        
        // 点击菜单项关闭菜单
        const navLinks = document.querySelectorAll('.nav-menu .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
        
        // 点击外部关闭菜单
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
        
        // 窗口大小变化时关闭移动菜单
        window.addEventListener('resize', function() {
            if (window.innerWidth > 1000) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // ESC键关闭菜单
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        console.log('Mobile navigation initialized successfully');
    }
    
    // 等待DOM加载完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileNav);
    } else {
        initMobileNav();
    }
    
})();