// 产品搜索功能模块
class ProductSearch {
    constructor() {
        this.products = [
            // 等离子切割设备
            {
                id: 'plasma-cnc-1530',
                name: 'CNC等离子切割机 1530',
                category: 'plasma',
                type: '等离子切割',
                thickness: '0-25mm',
                material: ['碳钢', '不锈钢', '铝材'],
                power: '60A-200A',
                workSize: '1500×3000mm',
                keywords: ['等离子', 'cnc', '1530', '中小型', '精密切割'],
                price: '8-15万',
                features: ['±0.5mm精度', '自动编程', '套料优化'],
                image: '/images/plasma-1530.jpg'
            },
            {
                id: 'plasma-heavy-duty',
                name: '重型等离子切割机',
                category: 'plasma',
                type: '等离子切割',
                thickness: '6-80mm',
                material: ['碳钢', '不锈钢', '合金钢'],
                power: '200A-400A',
                workSize: '2000×6000mm',
                keywords: ['重型', '等离子', '厚板', '大功率', '工业级'],
                price: '25-50万',
                features: ['大厚度切割', '高效生产', '稳定可靠'],
                image: '/images/plasma-heavy.jpg'
            },
            
            // 激光切割设备
            {
                id: 'laser-fiber-3015',
                name: '光纤激光切割机 3015',
                category: 'laser',
                type: '激光切割',
                thickness: '0-20mm',
                material: ['碳钢', '不锈钢', '铝材', '铜材'],
                power: '1000W-6000W',
                workSize: '3000×1500mm',
                keywords: ['光纤', '激光', '3015', '高精度', '自动化'],
                price: '30-80万',
                features: ['±0.03mm精度', '高速切割', '自动上下料'],
                image: '/images/laser-3015.jpg'
            },
            {
                id: 'laser-co2-1325',
                name: 'CO2激光切割机 1325',
                category: 'laser',
                type: '激光切割',
                thickness: '0-10mm',
                material: ['亚克力', '木材', '布料', '薄金属'],
                power: '80W-300W',
                workSize: '1300×2500mm',
                keywords: ['co2', '激光', '1325', '非金属', '工艺品'],
                price: '5-15万',
                features: ['非金属专用', '精细切割', '雕刻功能'],
                image: '/images/laser-co2.jpg'
            },
            
            // 火焰切割设备
            {
                id: 'flame-cnc-portal',
                name: 'CNC龙门火焰切割机',
                category: 'flame',
                type: '火焰切割',
                thickness: '6-300mm',
                material: ['碳钢', '低合金钢'],
                power: '丙烷/乙炔',
                workSize: '3000×8000mm',
                keywords: ['火焰', 'cnc', '龙门', '厚板', '大型'],
                price: '15-35万',
                features: ['超厚板切割', '大尺寸加工', '成本经济'],
                image: '/images/flame-portal.jpg'
            },
            {
                id: 'flame-portable',
                name: '便携式火焰切割机',
                category: 'flame',
                type: '火焰切割',
                thickness: '5-100mm',
                material: ['碳钢'],
                power: '乙炔',
                workSize: '便携式',
                keywords: ['便携', '火焰', '现场', '维修', '小型'],
                price: '0.5-2万',
                features: ['现场作业', '轻便灵活', '维修专用'],
                image: '/images/flame-portable.jpg'
            },
            
            // 分条设备
            {
                id: 'slitting-ronghua',
                name: '台湾容华精密分条机',
                category: 'slitting',
                type: '分条切割',
                thickness: '0.2-3mm',
                material: ['冷轧钢板', '不锈钢', '铝板'],
                power: '电动',
                workSize: '1250×C',
                keywords: ['分条', '容华', '精密', '钢卷', '窄带'],
                price: '50-200万',
                features: ['高精度分条', '自动收卷', '废料最小'],
                image: '/images/slitting-ronghua.jpg'
            }
        ];
        
        this.filteredProducts = [...this.products];
        this.init();
    }
    
    init() {
        this.createSearchInterface();
        this.bindEvents();
        this.renderProducts();
    }
    
    createSearchInterface() {
        const searchHTML = `
            <div class="product-search-container">
                <div class="search-header">
                    <h2>🔍 产品智能搜索</h2>
                    <p>快速找到适合您需求的切割设备</p>
                </div>
                
                <div class="search-box-wrapper">
                    <div class="product-search-box">
                        <input type="text" 
                               class="product-search-input" 
                               id="productSearchInput"
                               placeholder="输入产品名称、型号、材料或厚度..."
                               autocomplete="off">
                        <button class="product-search-btn" id="searchBtn">
                            <i class="fas fa-search"></i>
                        </button>
                        <div class="search-suggestions" id="searchSuggestions"></div>
                    </div>
                </div>
                
                <div class="search-filters">
                    <div class="filter-group">
                        <label>设备类型：</label>
                        <div class="filter-chips" data-filter="category">
                            <div class="filter-chip" data-value="">全部</div>
                            <div class="filter-chip" data-value="plasma">等离子切割</div>
                            <div class="filter-chip" data-value="laser">激光切割</div>
                            <div class="filter-chip" data-value="flame">火焰切割</div>
                            <div class="filter-chip" data-value="slitting">分条设备</div>
                        </div>
                    </div>
                    
                    <div class="filter-group">
                        <label>切割厚度：</label>
                        <div class="filter-chips" data-filter="thickness">
                            <div class="filter-chip" data-value="">全部厚度</div>
                            <div class="filter-chip" data-value="thin">薄板 (≤6mm)</div>
                            <div class="filter-chip" data-value="medium">中厚板 (6-25mm)</div>
                            <div class="filter-chip" data-value="thick">厚板 (25-80mm)</div>
                            <div class="filter-chip" data-value="ultra">超厚板 (≥80mm)</div>
                        </div>
                    </div>
                    
                    <div class="filter-group">
                        <label>价格范围：</label>
                        <div class="filter-chips" data-filter="price">
                            <div class="filter-chip" data-value="">全部价格</div>
                            <div class="filter-chip" data-value="low">5万以下</div>
                            <div class="filter-chip" data-value="medium">5-20万</div>
                            <div class="filter-chip" data-value="high">20-50万</div>
                            <div class="filter-chip" data-value="premium">50万以上</div>
                        </div>
                    </div>
                </div>
                
                <div class="search-results">
                    <div class="results-header">
                        <span class="results-count" id="resultsCount">找到 ${this.products.length} 个产品</span>
                        <div class="sort-options">
                            <select id="sortSelect">
                                <option value="relevance">相关度排序</option>
                                <option value="price-low">价格由低到高</option>
                                <option value="price-high">价格由高到低</option>
                                <option value="name">名称排序</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="products-grid" id="productsGrid">
                        <!-- 产品列表将在这里动态生成 -->
                    </div>
                    
                    <div class="no-results" id="noResults" style="display: none;">
                        <div class="no-results-icon">🔍</div>
                        <h3>未找到匹配的产品</h3>
                        <p>请尝试调整搜索条件或联系我们获取定制方案</p>
                        <a href="tel:+8613510992218" class="btn btn-primary">
                            <i class="fas fa-phone"></i> 咨询专家
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        // 在产品部分前插入搜索界面
        const productsSection = document.getElementById('products');
        if (productsSection) {
            const searchSection = document.createElement('section');
            searchSection.className = 'product-search-section';
            searchSection.innerHTML = `<div class="container">${searchHTML}</div>`;
            productsSection.parentNode.insertBefore(searchSection, productsSection);
        }
    }
    
    bindEvents() {
        const searchInput = document.getElementById('productSearchInput');
        const searchBtn = document.getElementById('searchBtn');
        const filterChips = document.querySelectorAll('.filter-chip');
        const sortSelect = document.getElementById('sortSelect');
        
        // 搜索输入事件
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
                this.showSuggestions(e.target.value);
            });
            
            searchInput.addEventListener('focus', () => {
                if (searchInput.value) {
                    this.showSuggestions(searchInput.value);
                }
            });
            
            searchInput.addEventListener('blur', () => {
                setTimeout(() => {
                    this.hideSuggestions();
                }, 200);
            });
        }
        
        // 搜索按钮事件
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.handleSearch(searchInput.value);
            });
        }
        
        // 筛选器事件
        filterChips.forEach(chip => {
            chip.addEventListener('click', () => {
                const filterGroup = chip.parentElement;
                const filterType = filterGroup.dataset.filter;
                
                // 切换选中状态
                filterGroup.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                
                this.applyFilters();
            });
        });
        
        // 排序事件
        if (sortSelect) {
            sortSelect.addEventListener('change', () => {
                this.sortProducts(sortSelect.value);
            });
        }
    }
    
    handleSearch(query) {
        if (!query.trim()) {
            this.filteredProducts = [...this.products];
        } else {
            const keywords = query.toLowerCase().split(/\s+/);
            this.filteredProducts = this.products.filter(product => {
                const searchText = (
                    product.name + ' ' +
                    product.type + ' ' +
                    product.keywords.join(' ') + ' ' +
                    product.material.join(' ') + ' ' +
                    product.thickness + ' ' +
                    product.features.join(' ')
                ).toLowerCase();
                
                return keywords.every(keyword => searchText.includes(keyword));
            });
        }
        
        this.applyFilters();
    }
    
    showSuggestions(query) {
        if (!query.trim()) {
            this.hideSuggestions();
            return;
        }
        
        const suggestions = this.generateSuggestions(query);
        const suggestionsContainer = document.getElementById('searchSuggestions');
        
        if (suggestions.length > 0) {
            const suggestionsHTML = suggestions.map(suggestion => 
                `<div class="suggestion-item" data-suggestion="${suggestion}">
                    <i class="fas fa-search"></i>
                    <span>${this.highlightMatch(suggestion, query)}</span>
                </div>`
            ).join('');
            
            suggestionsContainer.innerHTML = suggestionsHTML;
            suggestionsContainer.style.display = 'block';
            
            // 绑定建议点击事件
            suggestionsContainer.querySelectorAll('.suggestion-item').forEach(item => {
                item.addEventListener('click', () => {
                    const suggestion = item.dataset.suggestion;
                    document.getElementById('productSearchInput').value = suggestion;
                    this.handleSearch(suggestion);
                    this.hideSuggestions();
                });
            });
        } else {
            this.hideSuggestions();
        }
    }
    
    generateSuggestions(query) {
        const suggestions = new Set();
        const queryLower = query.toLowerCase();
        
        this.products.forEach(product => {
            // 添加产品名称建议
            if (product.name.toLowerCase().includes(queryLower)) {
                suggestions.add(product.name);
            }
            
            // 添加关键词建议
            product.keywords.forEach(keyword => {
                if (keyword.includes(queryLower)) {
                    suggestions.add(keyword);
                }
            });
            
            // 添加材料建议
            product.material.forEach(material => {
                if (material.includes(queryLower)) {
                    suggestions.add(material + '切割');
                }
            });
            
            // 添加厚度建议
            if (product.thickness.includes(queryLower)) {
                suggestions.add(product.thickness + '切割');
            }
        });
        
        return Array.from(suggestions).slice(0, 8);
    }
    
    highlightMatch(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<strong>$1</strong>');
    }
    
    hideSuggestions() {
        const suggestionsContainer = document.getElementById('searchSuggestions');
        if (suggestionsContainer) {
            suggestionsContainer.style.display = 'none';
        }
    }
    
    applyFilters() {
        const filters = this.getActiveFilters();
        let filtered = [...this.filteredProducts];
        
        // 应用类别筛选
        if (filters.category) {
            filtered = filtered.filter(product => product.category === filters.category);
        }
        
        // 应用厚度筛选
        if (filters.thickness) {
            filtered = filtered.filter(product => this.matchesThickness(product, filters.thickness));
        }
        
        // 应用价格筛选
        if (filters.price) {
            filtered = filtered.filter(product => this.matchesPrice(product, filters.price));
        }
        
        this.filteredProducts = filtered;
        this.renderProducts();
    }
    
    getActiveFilters() {
        const filters = {};
        document.querySelectorAll('.filter-chips').forEach(group => {
            const filterType = group.dataset.filter;
            const activeChip = group.querySelector('.filter-chip.active');
            if (activeChip && activeChip.dataset.value) {
                filters[filterType] = activeChip.dataset.value;
            }
        });
        return filters;
    }
    
    matchesThickness(product, thicknessFilter) {
        const thickness = product.thickness;
        const maxThickness = this.extractMaxThickness(thickness);
        
        switch (thicknessFilter) {
            case 'thin': return maxThickness <= 6;
            case 'medium': return maxThickness > 6 && maxThickness <= 25;
            case 'thick': return maxThickness > 25 && maxThickness <= 80;
            case 'ultra': return maxThickness > 80;
            default: return true;
        }
    }
    
    extractMaxThickness(thicknessStr) {
        const matches = thicknessStr.match(/(\d+)/g);
        if (matches) {
            return Math.max(...matches.map(Number));
        }
        return 0;
    }
    
    matchesPrice(product, priceFilter) {
        const price = product.price;
        const maxPrice = this.extractMaxPrice(price);
        
        switch (priceFilter) {
            case 'low': return maxPrice < 5;
            case 'medium': return maxPrice >= 5 && maxPrice <= 20;
            case 'high': return maxPrice > 20 && maxPrice <= 50;
            case 'premium': return maxPrice > 50;
            default: return true;
        }
    }
    
    extractMaxPrice(priceStr) {
        const matches = priceStr.match(/(\d+)/g);
        if (matches) {
            return Math.max(...matches.map(Number));
        }
        return 0;
    }
    
    sortProducts(sortBy) {
        switch (sortBy) {
            case 'price-low':
                this.filteredProducts.sort((a, b) => 
                    this.extractMaxPrice(a.price) - this.extractMaxPrice(b.price));
                break;
            case 'price-high':
                this.filteredProducts.sort((a, b) => 
                    this.extractMaxPrice(b.price) - this.extractMaxPrice(a.price));
                break;
            case 'name':
                this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                // 保持相关度排序（当前顺序）
                break;
        }
        this.renderProducts();
    }
    
    renderProducts() {
        const gridContainer = document.getElementById('productsGrid');
        const countElement = document.getElementById('resultsCount');
        const noResultsElement = document.getElementById('noResults');
        
        if (countElement) {
            countElement.textContent = `找到 ${this.filteredProducts.length} 个产品`;
        }
        
        if (this.filteredProducts.length === 0) {
            if (gridContainer) gridContainer.style.display = 'none';
            if (noResultsElement) noResultsElement.style.display = 'block';
            return;
        }
        
        if (gridContainer) gridContainer.style.display = 'grid';
        if (noResultsElement) noResultsElement.style.display = 'none';
        
        const productsHTML = this.filteredProducts.map(product => this.renderProduct(product)).join('');
        if (gridContainer) {
            gridContainer.innerHTML = productsHTML;
        }
        
        // 绑定产品卡片事件
        this.bindProductEvents();
    }
    
    renderProduct(product) {
        return `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image">
                    <div class="product-placeholder">
                        <i class="fas fa-cogs"></i>
                        <div class="product-category">${product.type}</div>
                    </div>
                    <div class="product-badges">
                        ${product.features.slice(0, 2).map(feature => 
                            `<span class="feature-badge">${feature}</span>`
                        ).join('')}
                    </div>
                </div>
                
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-specs">
                        <div class="spec-item">
                            <i class="fas fa-ruler"></i>
                            <span>厚度: ${product.thickness}</span>
                        </div>
                        <div class="spec-item">
                            <i class="fas fa-expand-arrows-alt"></i>
                            <span>工作台: ${product.workSize}</span>
                        </div>
                        <div class="spec-item">
                            <i class="fas fa-bolt"></i>
                            <span>功率: ${product.power}</span>
                        </div>
                    </div>
                    
                    <div class="product-materials">
                        ${product.material.map(material => 
                            `<span class="material-tag">${material}</span>`
                        ).join('')}
                    </div>
                    
                    <div class="product-footer">
                        <div class="product-price">
                            <span class="price-label">参考价格:</span>
                            <span class="price-value">${product.price}</span>
                        </div>
                        
                        <div class="product-actions">
                            <button class="btn-secondary product-details" data-product-id="${product.id}">
                                <i class="fas fa-info-circle"></i> 详情
                            </button>
                            <button class="btn-primary product-quote" data-product-id="${product.id}">
                                <i class="fas fa-calculator"></i> 询价
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    bindProductEvents() {
        // 产品详情按钮
        document.querySelectorAll('.product-details').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.target.dataset.productId;
                this.showProductDetails(productId);
            });
        });
        
        // 产品询价按钮
        document.querySelectorAll('.product-quote').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.target.dataset.productId;
                this.showQuoteModal(productId);
            });
        });
    }
    
    showProductDetails(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;
        
        const detailsHTML = `
            <div class="product-details-overlay">
                <div class="product-details-modal">
                    <button class="close-details">&times;</button>
                    <h2>${product.name}</h2>
                    
                    <div class="details-content">
                        <div class="details-image">
                            <div class="product-placeholder-large">
                                <i class="fas fa-cogs"></i>
                            </div>
                        </div>
                        
                        <div class="details-info">
                            <div class="spec-table">
                                <h3>技术参数</h3>
                                <table>
                                    <tr><td>设备类型</td><td>${product.type}</td></tr>
                                    <tr><td>切割厚度</td><td>${product.thickness}</td></tr>
                                    <tr><td>工作台面</td><td>${product.workSize}</td></tr>
                                    <tr><td>功率规格</td><td>${product.power}</td></tr>
                                    <tr><td>适用材料</td><td>${product.material.join(', ')}</td></tr>
                                    <tr><td>参考价格</td><td>${product.price}</td></tr>
                                </table>
                            </div>
                            
                            <div class="features-list">
                                <h3>产品特点</h3>
                                <ul>
                                    ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                                </ul>
                            </div>
                            
                            <div class="contact-actions">
                                <a href="tel:+8613510992218" class="btn btn-primary">
                                    <i class="fas fa-phone"></i> 立即咨询
                                </a>
                                <a href="https://wa.me/8613510992218?text=我对${product.name}感兴趣，请提供详细报价" 
                                   class="btn btn-success">
                                    <i class="fab fa-whatsapp"></i> WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', detailsHTML);
        
        // 绑定关闭事件
        document.querySelector('.close-details').addEventListener('click', () => {
            document.querySelector('.product-details-overlay').remove();
        });
        
        document.querySelector('.product-details-overlay').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                e.currentTarget.remove();
            }
        });
    }
    
    showQuoteModal(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;
        
        const quoteHTML = `
            <div class="quote-modal-overlay">
                <div class="quote-modal">
                    <button class="close-quote">&times;</button>
                    <h2>📝 ${product.name} 专业询价</h2>
                    
                    <form class="quote-form" id="productQuoteForm">
                        <input type="hidden" name="productId" value="${productId}">
                        <input type="hidden" name="productName" value="${product.name}">
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="quoteCompany">公司名称 *</label>
                                <input type="text" id="quoteCompany" name="company" required>
                            </div>
                            <div class="form-group">
                                <label for="quoteContact">联系人 *</label>
                                <input type="text" id="quoteContact" name="contact" required>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="quotePhone">手机号 *</label>
                                <input type="tel" id="quotePhone" name="phone" required>
                            </div>
                            <div class="form-group">
                                <label for="quoteEmail">邮箱</label>
                                <input type="email" id="quoteEmail" name="email">
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="quoteMaterial">主要切割材料</label>
                                <select id="quoteMaterial" name="material">
                                    ${product.material.map(material => 
                                        `<option value="${material}">${material}</option>`
                                    ).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="quoteQuantity">预计数量</label>
                                <select id="quoteQuantity" name="quantity">
                                    <option value="1">1台</option>
                                    <option value="2-3">2-3台</option>
                                    <option value="4-5">4-5台</option>
                                    <option value="5+">5台以上</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="quoteRequirements">具体需求描述</label>
                            <textarea id="quoteRequirements" name="requirements" rows="3" 
                                      placeholder="请描述您的具体需求，如切割厚度范围、精度要求、生产量等..."></textarea>
                        </div>
                        
                        <div class="form-actions">
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-paper-plane"></i> 提交询价
                            </button>
                            <button type="button" class="btn btn-secondary" onclick="this.closest('.quote-modal-overlay').remove()">
                                取消
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', quoteHTML);
        
        // 绑定表单提交事件
        document.getElementById('productQuoteForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleQuoteSubmit(e.target);
        });
        
        // 绑定关闭事件
        document.querySelector('.close-quote').addEventListener('click', () => {
            document.querySelector('.quote-modal-overlay').remove();
        });
    }
    
    handleQuoteSubmit(form) {
        // 收集表单数据
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // 显示提交成功消息
        const successHTML = `
            <div class="quote-success">
                <div class="success-icon">✅</div>
                <h3>询价提交成功！</h3>
                <p>我们的专业销售工程师会在2小时内联系您</p>
                <p>产品：<strong>${data.productName}</strong></p>
                <p>联系人：<strong>${data.contact}</strong></p>
                
                <div class="quick-contact">
                    <p>着急的话，也可以直接联系我们：</p>
                    <a href="tel:+8613510992218" class="btn btn-primary">
                        <i class="fas fa-phone"></i> 135-1099-2218
                    </a>
                </div>
            </div>
        `;
        
        form.innerHTML = successHTML;
        
        // 3秒后自动关闭
        setTimeout(() => {
            document.querySelector('.quote-modal-overlay').remove();
        }, 5000);
        
        // 发送到 Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'product_quote', {
                'product_id': data.productId,
                'product_name': data.productName,
                'company': data.company
            });
        }
    }
}

// 自动初始化产品搜索功能
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ProductSearch();
    });
} else {
    new ProductSearch();
}