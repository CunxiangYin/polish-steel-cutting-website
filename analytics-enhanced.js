/**
 * Enhanced Google Analytics 4 Event Tracking
 * Comprehensive user behavior and conversion tracking for Punaise Equipment website
 */

// =============================================================================
// ENHANCED ANALYTICS CONFIGURATION
// =============================================================================

const AnalyticsTracker = {
    // Configuration
    config: {
        trackingId: 'G-RZXQ1MQYS6',
        sessionTimeout: 30000, // 30 seconds
        scrollThresholds: [25, 50, 75, 90],
        timeOnPageThresholds: [30, 60, 180, 300], // seconds
        clickHeatmapEnabled: true,
        userJourneyTracking: true,
        enhancedConversions: true
    },

    // Session data
    session: {
        startTime: Date.now(),
        pageViews: 0,
        scrollDepth: 0,
        interactions: 0,
        formStarts: 0,
        formCompletions: 0,
        downloadAttempts: 0,
        comparisonUsage: 0
    },

    // User behavior patterns
    userBehavior: {
        clickPath: [],
        timeSpentInSections: {},
        mostViewedProducts: [],
        downloadInterests: [],
        searchQueries: []
    },

    // Initialize enhanced tracking
    init() {
        this.setupPageTracking();
        this.setupScrollTracking();
        this.setupEngagementTracking();
        this.setupConversionTracking();
        this.setupUserJourneyTracking();
        this.setupPerformanceTracking();
        this.setupErrorTracking();
        this.setupBusinessMetrics();
        
        console.log('Enhanced Analytics initialized');
    },

    // =============================================================================
    // PAGE BEHAVIOR TRACKING
    // =============================================================================

    setupPageTracking() {
        // Enhanced page view tracking
        this.trackPageView();
        
        // Track time on page at intervals
        this.config.timeOnPageThresholds.forEach(threshold => {
            setTimeout(() => {
                this.trackEvent('engagement', 'time_on_page', {
                    time_threshold: threshold,
                    page_path: window.location.pathname,
                    page_title: document.title
                });
            }, threshold * 1000);
        });

        // Track exit intent
        document.addEventListener('mouseleave', (e) => {
            if (e.clientY <= 0) {
                this.trackEvent('engagement', 'exit_intent', {
                    time_on_page: Math.round((Date.now() - this.session.startTime) / 1000),
                    scroll_depth: this.session.scrollDepth,
                    interactions: this.session.interactions
                });
            }
        });

        // Track page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.trackEvent('engagement', 'page_hidden', {
                    time_visible: Math.round((Date.now() - this.session.startTime) / 1000),
                    scroll_depth: this.session.scrollDepth
                });
            } else {
                this.trackEvent('engagement', 'page_visible', {
                    return_visit: this.session.pageViews > 1
                });
            }
        });
    },

    setupScrollTracking() {
        let maxScrollDepth = 0;
        const trackScrollDepth = this.throttle(() => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );
            
            if (scrollPercent > maxScrollDepth) {
                maxScrollDepth = scrollPercent;
                this.session.scrollDepth = maxScrollDepth;
                
                // Track milestone scroll depths
                this.config.scrollThresholds.forEach(threshold => {
                    if (maxScrollDepth >= threshold && !this[`scrollTracked${threshold}`]) {
                        this[`scrollTracked${threshold}`] = true;
                        this.trackEvent('engagement', 'scroll_depth', {
                            scroll_depth: threshold,
                            page_path: window.location.pathname
                        });
                    }
                });
            }
        }, 1000);

        window.addEventListener('scroll', trackScrollDepth);
    },

    // =============================================================================
    // USER ENGAGEMENT TRACKING
    // =============================================================================

    setupEngagementTracking() {
        // Navigation clicks
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                this.trackEvent('navigation', 'nav_click', {
                    link_text: e.target.textContent.trim(),
                    link_url: e.target.href,
                    section: this.getCurrentSection()
                });
                this.session.interactions++;
                this.userBehavior.clickPath.push({
                    element: 'navigation',
                    text: e.target.textContent.trim(),
                    timestamp: Date.now()
                });
            });
        });

        // CTA button tracking
        document.querySelectorAll('.btn-primary, .btn-secondary, .product-cta, .hero-cta').forEach(button => {
            button.addEventListener('click', (e) => {
                const buttonText = e.target.textContent.trim();
                const product = e.target.getAttribute('data-product') || 'general';
                
                this.trackEvent('conversion', 'cta_click', {
                    button_text: buttonText,
                    product: product,
                    section: this.getCurrentSection(),
                    position: this.getElementPosition(e.target)
                });
                
                this.session.interactions++;
                
                // Track urgency for specific buttons
                if (buttonText.toLowerCase().includes('free') || buttonText.toLowerCase().includes('quote')) {
                    this.trackEvent('conversion', 'urgency_cta', {
                        button_text: buttonText,
                        urgency_level: 'high'
                    });
                }
            });
        });

        // Product interest tracking
        document.querySelectorAll('.product-card').forEach((card, index) => {
            // Hover tracking
            let hoverStartTime;
            card.addEventListener('mouseenter', () => {
                hoverStartTime = Date.now();
            });

            card.addEventListener('mouseleave', () => {
                if (hoverStartTime) {
                    const hoverDuration = Date.now() - hoverStartTime;
                    if (hoverDuration > 2000) { // More than 2 seconds
                        const productName = card.querySelector('h3')?.textContent || `Product ${index + 1}`;
                        this.trackEvent('engagement', 'product_interest', {
                            product_name: productName,
                            hover_duration: Math.round(hoverDuration / 1000),
                            product_position: index + 1
                        });
                        
                        this.userBehavior.mostViewedProducts.push(productName);
                    }
                }
            });

            // Click tracking
            card.addEventListener('click', (e) => {
                const productName = card.querySelector('h3')?.textContent || `Product ${index + 1}`;
                this.trackEvent('engagement', 'product_click', {
                    product_name: productName,
                    product_position: index + 1,
                    click_target: e.target.tagName.toLowerCase()
                });
            });
        });

        // Section view tracking
        this.trackSectionViews();
    },

    // =============================================================================
    // CONVERSION TRACKING
    // =============================================================================

    setupConversionTracking() {
        // Form interaction tracking
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            const formId = form.id || 'unknown_form';
            let formStartTime;
            
            // Form start
            form.addEventListener('focus', () => {
                if (!formStartTime) {
                    formStartTime = Date.now();
                    this.session.formStarts++;
                    this.trackEvent('conversion', 'form_start', {
                        form_id: formId,
                        form_type: this.getFormType(form)
                    });
                }
            }, true);

            // Field interaction tracking
            form.querySelectorAll('input, select, textarea').forEach(field => {
                field.addEventListener('focus', () => {
                    this.trackEvent('conversion', 'form_field_focus', {
                        form_id: formId,
                        field_name: field.name || field.id || 'unknown',
                        field_type: field.type || field.tagName.toLowerCase()
                    });
                });

                // Track field completion
                field.addEventListener('blur', () => {
                    if (field.value.trim()) {
                        this.trackEvent('conversion', 'form_field_complete', {
                            form_id: formId,
                            field_name: field.name || field.id || 'unknown',
                            field_length: field.value.length,
                            completion_rate: this.calculateFormCompletionRate(form)
                        });
                    }
                });
            });

            // Form submission
            form.addEventListener('submit', () => {
                const timeToComplete = formStartTime ? Math.round((Date.now() - formStartTime) / 1000) : null;
                this.session.formCompletions++;
                
                this.trackEvent('conversion', 'form_submit', {
                    form_id: formId,
                    time_to_complete: timeToComplete,
                    completion_rate: 100,
                    form_fields_count: form.querySelectorAll('input, select, textarea').length
                });

                // Enhanced conversion tracking for contact form
                if (formId === 'contactForm') {
                    this.trackContactFormSubmission(form, timeToComplete);
                }
            });
        });

        // Quote request tracking
        document.querySelectorAll('[data-product]').forEach(element => {
            element.addEventListener('click', (e) => {
                const product = e.target.getAttribute('data-product');
                this.trackEvent('conversion', 'quote_request', {
                    product: product,
                    product_section: this.getCurrentSection(),
                    user_session_duration: Math.round((Date.now() - this.session.startTime) / 1000)
                });
            });
        });

        // Download tracking
        document.querySelectorAll('a[href*="download"], .download-specs, .btn-download').forEach(link => {
            link.addEventListener('click', (e) => {
                this.session.downloadAttempts++;
                const fileName = this.extractFileName(link.href) || link.textContent.trim();
                
                this.trackEvent('conversion', 'file_download_attempt', {
                    file_name: fileName,
                    file_type: this.getFileType(fileName),
                    download_source: this.getCurrentSection(),
                    user_intent: this.determineDownloadIntent(link)
                });

                this.userBehavior.downloadInterests.push(fileName);
            });
        });
    },

    setupUserJourneyTracking() {
        // Track user flow through sections
        let currentSection = this.getCurrentSection();
        const sectionChangeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const newSection = entry.target.id || entry.target.className.split(' ')[0];
                    if (newSection !== currentSection) {
                        this.trackEvent('user_journey', 'section_change', {
                            from_section: currentSection,
                            to_section: newSection,
                            time_in_previous: this.userBehavior.timeSpentInSections[currentSection] || 0,
                            scroll_direction: this.getScrollDirection()
                        });
                        currentSection = newSection;
                        this.startSectionTimer(newSection);
                    }
                }
            });
        }, { threshold: 0.5 });

        // Observe all major sections
        document.querySelectorAll('section[id], .hero, .products, .about, .contact').forEach(section => {
            sectionChangeObserver.observe(section);
        });
    },

    // =============================================================================
    // BUSINESS INTELLIGENCE METRICS
    // =============================================================================

    setupBusinessMetrics() {
        // Lead quality scoring
        this.trackLeadQuality();
        
        // Competitive analysis triggers
        this.trackCompetitiveSignals();
        
        // Market research insights
        this.trackMarketInsights();
        
        // Customer journey funnel
        this.trackFunnelStages();
    },

    trackLeadQuality() {
        const leadScoreFactors = {
            timeOnSite: Math.round((Date.now() - this.session.startTime) / 1000),
            sectionsViewed: Object.keys(this.userBehavior.timeSpentInSections).length,
            downloadsAttempted: this.session.downloadAttempts,
            formEngagement: this.session.formStarts > 0,
            productInterest: this.userBehavior.mostViewedProducts.length,
            comparisonUsage: this.session.comparisonUsage,
            returnVisitor: localStorage.getItem('punaise_visitor_id') !== null
        };

        const leadScore = this.calculateLeadScore(leadScoreFactors);
        
        if (leadScore > 50) {
            this.trackEvent('business_intelligence', 'high_quality_lead', {
                lead_score: leadScore,
                scoring_factors: leadScoreFactors,
                lead_type: this.determineLeadType(leadScoreFactors)
            });
        }
    },

    trackCompetitiveSignals() {
        // Track comparison tool usage (competitive research indicator)
        const comparisonElements = document.querySelectorAll('[data-category]');
        comparisonElements.forEach(element => {
            element.addEventListener('click', () => {
                this.session.comparisonUsage++;
                this.trackEvent('business_intelligence', 'competitive_research', {
                    comparison_type: element.getAttribute('data-category'),
                    research_depth: this.session.comparisonUsage,
                    session_engagement: this.session.interactions
                });
            });
        });
    },

    trackMarketInsights() {
        // Geographic insights
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.trackEvent('market_intelligence', 'user_location', {
                    latitude: Math.round(position.coords.latitude * 100) / 100, // Privacy-safe rounding
                    longitude: Math.round(position.coords.longitude * 100) / 100,
                    accuracy: position.coords.accuracy,
                    market_region: this.determineMarketRegion(position.coords)
                });
            });
        }

        // Technology preferences
        const userAgent = navigator.userAgent;
        const deviceInfo = {
            is_mobile: /Mobile|Android|iPhone|iPad/.test(userAgent),
            is_tablet: /Tablet|iPad/.test(userAgent),
            browser_language: navigator.language || navigator.userLanguage,
            screen_resolution: `${screen.width}x${screen.height}`,
            color_depth: screen.colorDepth,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };

        this.trackEvent('market_intelligence', 'user_technology', deviceInfo);
    },

    // =============================================================================
    // PERFORMANCE & ERROR TRACKING
    // =============================================================================

    setupPerformanceTracking() {
        // Page load performance
        window.addEventListener('load', () => {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            const domReady = perfData.domContentLoadedEventEnd - perfData.navigationStart;

            this.trackEvent('performance', 'page_load', {
                load_time_ms: loadTime,
                dom_ready_ms: domReady,
                first_contentful_paint: this.getFirstContentfulPaint(),
                largest_contentful_paint: this.getLargestContentfulPaint()
            });
        });

        // Core Web Vitals tracking
        this.trackCoreWebVitals();
    },

    setupErrorTracking() {
        // JavaScript errors
        window.addEventListener('error', (event) => {
            this.trackEvent('error', 'javascript_error', {
                error_message: event.message,
                error_filename: event.filename,
                error_line: event.lineno,
                error_column: event.colno,
                user_agent: navigator.userAgent
            });
        });

        // Promise rejection errors
        window.addEventListener('unhandledrejection', (event) => {
            this.trackEvent('error', 'promise_rejection', {
                error_reason: event.reason.toString(),
                error_stack: event.reason.stack || 'No stack trace'
            });
        });

        // Resource loading errors
        document.addEventListener('error', (event) => {
            if (event.target !== window) {
                this.trackEvent('error', 'resource_error', {
                    resource_type: event.target.tagName,
                    resource_url: event.target.src || event.target.href,
                    error_type: 'load_failed'
                });
            }
        }, true);
    },

    // =============================================================================
    // UTILITY FUNCTIONS
    // =============================================================================

    trackEvent(category, action, parameters = {}) {
        if (typeof gtag === 'function') {
            gtag('event', action, {
                event_category: category,
                event_timestamp: Date.now(),
                session_id: this.getSessionId(),
                user_id: this.getUserId(),
                page_path: window.location.pathname,
                page_title: document.title,
                ...parameters
            });
        }
        
        // Debug logging in development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log(`Analytics: ${category} - ${action}`, parameters);
        }
    },

    trackPageView() {
        this.session.pageViews++;
        this.trackEvent('page_view', 'page_view', {
            page_views_in_session: this.session.pageViews,
            referrer: document.referrer,
            page_language: document.documentElement.lang || 'en'
        });
    },

    trackContactFormSubmission(form, timeToComplete) {
        const formData = new FormData(form);
        const serviceInterest = formData.get('service') || 'not_specified';
        const hasCompany = !!formData.get('company')?.trim();
        const hasPhone = !!formData.get('phone')?.trim();
        const messageLength = formData.get('message')?.length || 0;

        this.trackEvent('conversion', 'contact_form_submit', {
            service_interest: serviceInterest,
            has_company: hasCompany,
            has_phone: hasPhone,
            message_length: messageLength,
            time_to_complete_seconds: timeToComplete,
            form_quality_score: this.calculateFormQualityScore({
                serviceInterest, hasCompany, hasPhone, messageLength
            }),
            lead_source: this.determineLeadSource(),
            user_journey_length: this.userBehavior.clickPath.length
        });

        // Enhanced conversion for high-value leads
        if (this.isHighValueLead({ serviceInterest, hasCompany, messageLength })) {
            this.trackEvent('conversion', 'high_value_lead', {
                lead_type: 'contact_form',
                estimated_value: this.estimateLeadValue(serviceInterest),
                lead_signals: this.getLeadSignals()
            });
        }
    },

    // Helper functions
    throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    },

    getCurrentSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        for (let i = sections.length - 1; i >= 0; i--) {
            if (sections[i].offsetTop <= scrollPosition) {
                return sections[i].id;
            }
        }
        return 'hero';
    },

    getElementPosition(element) {
        const rect = element.getBoundingClientRect();
        return {
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height,
            viewport_percentage_x: Math.round((rect.left / window.innerWidth) * 100),
            viewport_percentage_y: Math.round((rect.top / window.innerHeight) * 100)
        };
    },

    calculateFormCompletionRate(form) {
        const fields = form.querySelectorAll('input, select, textarea');
        let completed = 0;
        
        fields.forEach(field => {
            if (field.value.trim()) completed++;
        });
        
        return Math.round((completed / fields.length) * 100);
    },

    getSessionId() {
        let sessionId = sessionStorage.getItem('punaise_session_id');
        if (!sessionId) {
            sessionId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('punaise_session_id', sessionId);
        }
        return sessionId;
    },

    getUserId() {
        let userId = localStorage.getItem('punaise_visitor_id');
        if (!userId) {
            userId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('punaise_visitor_id', userId);
        }
        return userId;
    },

    calculateLeadScore(factors) {
        let score = 0;
        score += Math.min(factors.timeOnSite / 10, 30); // Up to 30 points for time on site
        score += factors.sectionsViewed * 5; // 5 points per section viewed
        score += factors.downloadsAttempted * 15; // 15 points per download
        score += factors.formEngagement ? 20 : 0; // 20 points for form engagement
        score += factors.productInterest * 3; // 3 points per product interaction
        score += factors.comparisonUsage * 10; // 10 points for using comparison tool
        score += factors.returnVisitor ? 15 : 0; // 15 points for return visitors
        
        return Math.min(Math.round(score), 100);
    },

    isHighValueLead(formData) {
        return (
            formData.serviceInterest !== 'not_specified' &&
            formData.hasCompany &&
            formData.messageLength > 50
        );
    },

    // Initialize on page load
    startSectionTimer(section) {
        this.userBehavior.timeSpentInSections[section] = Date.now();
    },

    trackSectionViews() {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionName = entry.target.id || entry.target.className.split(' ')[0];
                    this.trackEvent('engagement', 'section_view', {
                        section: sectionName,
                        visibility_percentage: Math.round(entry.intersectionRatio * 100),
                        time_since_page_load: Date.now() - this.session.startTime
                    });
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('section, .hero, .products, .about, .contact').forEach(section => {
            sectionObserver.observe(section);
        });
    },

    trackCoreWebVitals() {
        // Track CLS, FID, LCP when available
        if ('PerformanceObserver' in window) {
            // First Input Delay
            new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    this.trackEvent('performance', 'first_input_delay', {
                        fid_ms: entry.processingStart - entry.startTime,
                        input_type: entry.name
                    });
                }
            }).observe({ type: 'first-input', buffered: true });

            // Largest Contentful Paint
            new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                this.trackEvent('performance', 'largest_contentful_paint', {
                    lcp_ms: lastEntry.startTime,
                    element_type: lastEntry.element?.tagName || 'unknown'
                });
            }).observe({ type: 'largest-contentful-paint', buffered: true });

            // Cumulative Layout Shift
            new PerformanceObserver((list) => {
                let clsValue = 0;
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                }
                this.trackEvent('performance', 'cumulative_layout_shift', {
                    cls_score: clsValue
                });
            }).observe({ type: 'layout-shift', buffered: true });
        }
    }
};

// =============================================================================
// INITIALIZATION
// =============================================================================

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => AnalyticsTracker.init());
} else {
    AnalyticsTracker.init();
}

// Expose for external use
window.AnalyticsTracker = AnalyticsTracker;

// =============================================================================
// BACKWARD COMPATIBILITY
// =============================================================================

// Maintain compatibility with existing tracking functions
window.trackContactFormSubmission = () => {
    AnalyticsTracker.trackEvent('conversion', 'contact_form_legacy', {
        source: 'legacy_function'
    });
};

console.log('Enhanced Analytics loaded successfully');