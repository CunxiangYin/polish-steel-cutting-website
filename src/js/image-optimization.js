// 图片优化和懒加载模块
class ImageOptimization {
    constructor() {
        this.isWebPSupported = false;
        this.lazyImages = [];
        this.observer = null;
        this.init();
    }
    
    async init() {
        // 检测WebP支持
        await this.checkWebPSupport();
        
        // 初始化懒加载
        this.initLazyLoading();
        
        // 优化现有图片
        this.optimizeExistingImages();
        
        // 添加性能监控
        this.addPerformanceMonitoring();
    }
    
    // 检测WebP格式支持
    checkWebPSupport() {
        return new Promise((resolve) => {
            const webP = new Image();
            webP.onload = webP.onerror = () => {
                this.isWebPSupported = (webP.height === 2);
                console.log(`WebP支持: ${this.isWebPSupported ? '是' : '否'}`);
                resolve(this.isWebPSupported);
            };
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    }
    
    // 初始化懒加载
    initLazyLoading() {
        // 获取所有需要懒加载的图片
        this.lazyImages = document.querySelectorAll('img[data-src], picture source[data-srcset]');
        
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.1
            });
            
            this.lazyImages.forEach(img => this.observer.observe(img));
        } else {
            // 降级处理：直接加载所有图片
            this.lazyImages.forEach(img => this.loadImage(img));
        }
        
        // 添加懒加载支持到新创建的图片
        this.addLazyLoadToNewImages();
    }
    
    // 加载单个图片
    loadImage(element) {
        if (element.tagName === 'IMG') {
            this.loadImg(element);
        } else if (element.tagName === 'SOURCE') {
            this.loadSource(element);
        }
    }
    
    // 加载img元素
    loadImg(img) {
        const originalSrc = img.dataset.src;
        if (!originalSrc) return;
        
        const optimizedSrc = this.getOptimizedImageUrl(originalSrc);
        
        // 预加载图片
        const imageLoader = new Image();
        
        imageLoader.onload = () => {
            img.src = optimizedSrc;
            img.classList.add('loaded');
            img.removeAttribute('data-src');
            
            // 添加淡入动画
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                img.style.opacity = '1';
            }, 10);
        };
        
        imageLoader.onerror = () => {
            // 如果优化图片加载失败，回退到原始图片
            img.src = originalSrc;
            img.classList.add('loaded', 'fallback');
            console.warn(`优化图片加载失败，回退到原始图片: ${originalSrc}`);
        };
        
        imageLoader.src = optimizedSrc;
    }
    
    // 加载source元素
    loadSource(source) {
        const originalSrcset = source.dataset.srcset;
        if (!originalSrcset) return;
        
        const optimizedSrcset = this.getOptimizedImageUrl(originalSrcset);
        source.srcset = optimizedSrcset;
        source.removeAttribute('data-srcset');
    }
    
    // 获取优化后的图片URL
    getOptimizedImageUrl(originalUrl) {
        // 如果支持WebP，尝试转换格式
        if (this.isWebPSupported && this.shouldConvertToWebP(originalUrl)) {
            const webpUrl = this.convertToWebP(originalUrl);
            return webpUrl;
        }
        
        // 添加压缩参数（如果使用CDN）
        return this.addCompressionParams(originalUrl);
    }
    
    // 检查是否应该转换为WebP
    shouldConvertToWebP(url) {
        const supportedFormats = ['.jpg', '.jpeg', '.png'];
        return supportedFormats.some(format => 
            url.toLowerCase().includes(format)
        );
    }
    
    // 转换为WebP格式
    convertToWebP(url) {
        // 如果有WebP版本的图片，替换扩展名
        const webpUrl = url.replace(/\\.(jpg|jpeg|png)$/i, '.webp');
        
        // 这里可以添加图片服务的WebP转换逻辑
        // 例如: Cloudinary, ImageKit, 或自定义图片服务
        return this.addImageServiceParams(webpUrl);
    }
    
    // 添加图片压缩参数
    addCompressionParams(url) {
        // 如果是外部图片服务，添加压缩参数
        if (url.includes('cloudinary.com')) {
            return url.replace('/upload/', '/upload/q_auto,f_auto/');
        } else if (url.includes('imagekit.io')) {
            return `${url}?tr=q-80,f-auto`;
        }
        
        // 对于本地图片，返回原始URL
        return url;
    }
    
    // 添加图片服务参数
    addImageServiceParams(url) {
        // 添加响应式图片参数
        const devicePixelRatio = window.devicePixelRatio || 1;
        const quality = devicePixelRatio > 1 ? 75 : 85;
        
        // 这里可以根据实际使用的图片服务调整
        return url;
    }
    
    // 优化现有图片
    optimizeExistingImages() {
        const existingImages = document.querySelectorAll('img:not([data-src])');
        
        existingImages.forEach(img => {
            if (img.complete && img.naturalWidth > 0) {
                this.addResponsiveSupport(img);
            } else {
                img.addEventListener('load', () => {
                    this.addResponsiveSupport(img);
                }, { once: true });
            }
        });
    }
    
    // 添加响应式支持
    addResponsiveSupport(img) {
        // 为现有图片添加响应式类
        if (img.naturalWidth > img.naturalHeight) {
            img.classList.add('img-landscape');
        } else {
            img.classList.add('img-portrait');
        }
        
        // 添加加载状态类
        img.classList.add('img-loaded');
    }
    
    // 为新创建的图片添加懒加载
    addLazyLoadToNewImages() {
        if (typeof MutationObserver !== 'undefined') {
            const mutationObserver = new MutationObserver((mutations) => {
                mutations.forEach(mutation => {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1) { // Element node
                            const newImages = node.querySelectorAll ? 
                                node.querySelectorAll('img[data-src]') : [];
                            
                            if (node.tagName === 'IMG' && node.dataset.src) {
                                newImages.push(node);
                            }
                            
                            newImages.forEach(img => {
                                if (this.observer) {
                                    this.observer.observe(img);
                                } else {
                                    this.loadImage(img);
                                }
                            });
                        }
                    });
                });
            });
            
            mutationObserver.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }
    
    // 性能监控
    addPerformanceMonitoring() {
        if ('PerformanceObserver' in window) {
            // 监控图片加载性能
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                    if (entry.initiatorType === 'img') {
                        console.log(`图片加载: ${entry.name}, 耗时: ${entry.duration.toFixed(2)}ms`);
                        
                        // 发送性能数据到分析服务
                        if (typeof gtag !== 'undefined') {
                            gtag('event', 'image_performance', {
                                'image_url': entry.name,
                                'load_time': Math.round(entry.duration),
                                'image_size': entry.transferSize || 0
                            });
                        }
                    }
                });
            });
            
            observer.observe({ entryTypes: ['resource'] });
        }
    }
    
    // 创建响应式图片
    static createResponsiveImage({ src, alt, sizes = '100vw', className = '' }) {
        const picture = document.createElement('picture');
        
        // WebP支持检查
        const isWebPSupported = ImageOptimization.prototype.isWebPSupported;
        
        if (isWebPSupported) {
            const webpSource = document.createElement('source');
            webpSource.type = 'image/webp';
            webpSource.dataset.srcset = ImageOptimization.prototype.convertToWebP(src);
            picture.appendChild(webpSource);
        }
        
        const img = document.createElement('img');
        img.dataset.src = src;
        img.alt = alt;
        img.className = `lazy-image ${className}`;
        img.sizes = sizes;
        img.style.opacity = '0';
        
        // 添加占位符
        img.src = ImageOptimization.generatePlaceholder(300, 200);
        
        picture.appendChild(img);
        return picture;
    }
    
    // 生成占位符
    static generatePlaceholder(width, height, color = '#f0f0f0') {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, width, height);
        
        // 添加加载图标
        ctx.fillStyle = '#ccc';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('⏳', width/2, height/2);
        
        return canvas.toDataURL();
    }
    
    // 批量转换现有图片为懒加载
    convertToLazyLoad() {
        const images = document.querySelectorAll('img:not(.lazy-image):not([data-src])');
        
        images.forEach(img => {
            if (img.src && img.src !== window.location.href) {
                const placeholder = ImageOptimization.generatePlaceholder(
                    img.width || 300, 
                    img.height || 200
                );
                
                img.dataset.src = img.src;
                img.src = placeholder;
                img.classList.add('lazy-image');
                
                if (this.observer) {
                    this.observer.observe(img);
                }
            }
        });
    }
    
    // 预加载关键图片
    preloadCriticalImages() {
        const criticalImages = [
            '/images/hero-banner.jpg',
            '/images/company-logo.png',
            '/logo-main.svg'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = this.getOptimizedImageUrl(src);
            document.head.appendChild(link);
        });
    }
    
    // 销毁观察器
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

// 图片优化样式注入
const imageOptimizationStyles = `
    <style>
    /* 懒加载图片样式 */
    .lazy-image {
        transition: opacity 0.3s ease;
        background: #f5f5f5;
    }
    
    .lazy-image.loaded {
        opacity: 1;
    }
    
    .lazy-image.fallback {
        opacity: 0.9;
    }
    
    /* 响应式图片 */
    .img-responsive {
        max-width: 100%;
        height: auto;
        display: block;
    }
    
    .img-landscape {
        aspect-ratio: 16/9;
        object-fit: cover;
    }
    
    .img-portrait {
        aspect-ratio: 3/4;
        object-fit: cover;
    }
    
    .img-loaded {
        transition: transform 0.3s ease;
    }
    
    .img-loaded:hover {
        transform: scale(1.02);
    }
    
    /* 图片占位符 */
    .image-placeholder {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: shimmer 2s infinite;
    }
    
    @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
    }
    
    /* WebP支持指示器 */
    .webp-supported::after {
        content: 'WebP';
        position: absolute;
        top: 5px;
        right: 5px;
        background: #4caf50;
        color: white;
        padding: 2px 6px;
        border-radius: 3px;
        font-size: 10px;
        font-weight: bold;
    }
    
    /* 图片加载错误处理 */
    .img-error {
        background: #ffebee;
        border: 2px dashed #f44336;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #f44336;
        font-size: 14px;
    }
    
    .img-error::before {
        content: '❌ 图片加载失败';
    }
    
    /* 图片画廊优化 */
    .gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 15px;
        margin: 20px 0;
    }
    
    .gallery-item {
        position: relative;
        overflow: hidden;
        border-radius: 8px;
        cursor: pointer;
    }
    
    .gallery-item img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        transition: transform 0.3s ease;
    }
    
    .gallery-item:hover img {
        transform: scale(1.1);
    }
    </style>
`;

// 注入样式
document.head.insertAdjacentHTML('beforeend', imageOptimizationStyles);

// 自动初始化
let imageOptimizer;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        imageOptimizer = new ImageOptimization();
    });
} else {
    imageOptimizer = new ImageOptimization();
}

// 导出供其他模块使用
window.ImageOptimization = ImageOptimization;
window.imageOptimizer = imageOptimizer;