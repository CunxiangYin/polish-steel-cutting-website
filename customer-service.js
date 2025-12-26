/**
 * Customer Service Chat System
 * Professional live chat widget for Punaise Equipment website
 */

class CustomerServiceChat {
    constructor() {
        this.isOpen = false;
        this.isMinimized = false;
        this.messages = [];
        this.operatorStatus = 'online'; // online, busy, offline
        this.chatId = this.generateChatId();
        this.autoResponders = this.initAutoResponders();
        this.init();
    }

    init() {
        this.createChatWidget();
        this.setupEventListeners();
        this.loadChatHistory();
        this.initOperatorPresence();
        console.log('Customer Service Chat initialized');
    }

    generateChatId() {
        return `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    createChatWidget() {
        // Create chat bubble button
        const chatBubble = document.createElement('div');
        chatBubble.id = 'customer-service-bubble';
        chatBubble.innerHTML = `
            <div class="chat-bubble">
                <div class="chat-icon">
                    <i class="fas fa-comments"></i>
                </div>
                <div class="chat-badge" id="chatBadge" style="display: none;">
                    <span>1</span>
                </div>
                <div class="chat-pulse"></div>
            </div>
        `;

        // Create chat window
        const chatWindow = document.createElement('div');
        chatWindow.id = 'customer-service-window';
        chatWindow.innerHTML = `
            <div class="chat-window">
                <div class="chat-header">
                    <div class="chat-header-info">
                        <div class="operator-avatar">
                            <i class="fas fa-user-circle"></i>
                        </div>
                        <div class="operator-details">
                            <div class="operator-name">Manager Fu</div>
                            <div class="operator-status">
                                <span class="status-indicator ${this.operatorStatus}"></span>
                                <span class="status-text">${this.getStatusText()}</span>
                            </div>
                        </div>
                    </div>
                    <div class="chat-controls">
                        <button class="chat-minimize" title="Minimize">
                            <i class="fas fa-minus"></i>
                        </button>
                        <button class="chat-close" title="Close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                
                <div class="chat-messages" id="chatMessages">
                    <div class="welcome-message">
                        <div class="message operator-message">
                            <div class="message-avatar">
                                <i class="fas fa-user-circle"></i>
                            </div>
                            <div class="message-content">
                                <div class="message-text">
                                    Welcome to Punaise Equipment! I'm Manager Fu. How can I help you with your steel cutting equipment needs today?
                                </div>
                                <div class="message-time">${this.getCurrentTime()}</div>
                            </div>
                        </div>
                        <div class="quick-actions">
                            <button class="quick-action" data-action="quote">Get Quote</button>
                            <button class="quick-action" data-action="specs">Equipment Specs</button>
                            <button class="quick-action" data-action="support">Technical Support</button>
                        </div>
                    </div>
                </div>
                
                <div class="chat-input-area">
                    <div class="typing-indicator" id="typingIndicator" style="display: none;">
                        <span>Manager Fu is typing</span>
                        <div class="typing-dots">
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                        </div>
                    </div>
                    <div class="chat-input-container">
                        <input type="text" class="chat-input" id="chatInput" placeholder="Type your message..." maxlength="500">
                        <button class="chat-send" id="chatSend">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                    <div class="chat-footer">
                        <span class="powered-by">Powered by Punaise Customer Service</span>
                        <div class="chat-options">
                            <button class="option-btn" title="Attach file">
                                <i class="fas fa-paperclip"></i>
                            </button>
                            <button class="option-btn" title="Emoji">
                                <i class="fas fa-smile"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add CSS styles
        this.addChatStyles();

        // Append to body
        document.body.appendChild(chatBubble);
        document.body.appendChild(chatWindow);

        // Initialize elements
        this.chatBubble = chatBubble;
        this.chatWindow = chatWindow;
        this.chatInput = document.getElementById('chatInput');
        this.chatSend = document.getElementById('chatSend');
        this.chatMessages = document.getElementById('chatMessages');
    }

    addChatStyles() {
        const styles = document.createElement('style');
        styles.textContent = `
            /* Chat Bubble Styles */
            #customer-service-bubble {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 1000;
                cursor: pointer;
            }

            .chat-bubble {
                width: 60px;
                height: 60px;
                background: var(--gradient-primary, linear-gradient(135deg, #2563eb, #1e40af));
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
                transition: all 0.3s ease;
                position: relative;
            }

            .chat-bubble:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
            }

            .chat-icon {
                color: white;
                font-size: 24px;
            }

            .chat-badge {
                position: absolute;
                top: -5px;
                right: -5px;
                background: #ef4444;
                color: white;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                font-size: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
            }

            .chat-pulse {
                position: absolute;
                width: 60px;
                height: 60px;
                border: 2px solid rgba(37, 99, 235, 0.6);
                border-radius: 50%;
                animation: chatPulse 2s infinite;
            }

            @keyframes chatPulse {
                0% { transform: scale(1); opacity: 1; }
                70% { transform: scale(1.4); opacity: 0; }
                100% { transform: scale(1.4); opacity: 0; }
            }

            /* Chat Window Styles */
            #customer-service-window {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 350px;
                height: 500px;
                z-index: 1001;
                transform: translateY(100%) scale(0.8);
                opacity: 0;
                transition: all 0.3s ease;
                pointer-events: none;
            }

            #customer-service-window.open {
                transform: translateY(0) scale(1);
                opacity: 1;
                pointer-events: auto;
            }

            #customer-service-window.minimized {
                height: 60px;
                transform: translateY(calc(100% - 80px)) scale(1);
            }

            .chat-window {
                background: white;
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                overflow: hidden;
                height: 100%;
                display: flex;
                flex-direction: column;
                border: 1px solid #e5e7eb;
            }

            /* Chat Header */
            .chat-header {
                background: var(--gradient-primary, linear-gradient(135deg, #2563eb, #1e40af));
                color: white;
                padding: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .chat-header-info {
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .operator-avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.2);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
            }

            .operator-name {
                font-weight: 600;
                font-size: 14px;
            }

            .operator-status {
                display: flex;
                align-items: center;
                gap: 5px;
                font-size: 12px;
                opacity: 0.9;
            }

            .status-indicator {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #10b981;
            }

            .status-indicator.busy { background: #f59e0b; }
            .status-indicator.offline { background: #ef4444; }

            .chat-controls {
                display: flex;
                gap: 8px;
            }

            .chat-controls button {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                padding: 5px;
                border-radius: 4px;
                transition: background-color 0.2s ease;
            }

            .chat-controls button:hover {
                background: rgba(255, 255, 255, 0.1);
            }

            /* Chat Messages */
            .chat-messages {
                flex: 1;
                overflow-y: auto;
                padding: 15px;
                background: #f9fafb;
            }

            .message {
                display: flex;
                gap: 10px;
                margin-bottom: 15px;
            }

            .user-message {
                flex-direction: row-reverse;
            }

            .message-avatar {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background: var(--primary-color, #2563eb);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                flex-shrink: 0;
            }

            .user-message .message-avatar {
                background: #6b7280;
            }

            .message-content {
                max-width: 80%;
            }

            .message-text {
                padding: 10px 15px;
                border-radius: 18px;
                background: white;
                border: 1px solid #e5e7eb;
                line-height: 1.4;
                font-size: 14px;
            }

            .user-message .message-text {
                background: var(--primary-color, #2563eb);
                color: white;
                border: none;
            }

            .message-time {
                font-size: 11px;
                color: #6b7280;
                margin-top: 5px;
                text-align: left;
            }

            .user-message .message-time {
                text-align: right;
            }

            /* Quick Actions */
            .quick-actions {
                display: flex;
                gap: 8px;
                margin-top: 10px;
                flex-wrap: wrap;
            }

            .quick-action {
                padding: 6px 12px;
                border: 1px solid var(--primary-color, #2563eb);
                background: white;
                color: var(--primary-color, #2563eb);
                border-radius: 15px;
                cursor: pointer;
                transition: all 0.2s ease;
                font-size: 12px;
            }

            .quick-action:hover {
                background: var(--primary-color, #2563eb);
                color: white;
            }

            /* Typing Indicator */
            .typing-indicator {
                padding: 10px 15px;
                font-size: 12px;
                color: #6b7280;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .typing-dots {
                display: flex;
                gap: 2px;
            }

            .typing-dots .dot {
                width: 4px;
                height: 4px;
                border-radius: 50%;
                background: #6b7280;
                animation: typingDot 1.4s infinite ease-in-out;
            }

            .typing-dots .dot:nth-child(1) { animation-delay: -0.32s; }
            .typing-dots .dot:nth-child(2) { animation-delay: -0.16s; }

            @keyframes typingDot {
                0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
                40% { transform: scale(1); opacity: 1; }
            }

            /* Chat Input */
            .chat-input-area {
                border-top: 1px solid #e5e7eb;
                background: white;
            }

            .chat-input-container {
                display: flex;
                padding: 10px 15px;
                gap: 10px;
                align-items: center;
            }

            .chat-input {
                flex: 1;
                border: 1px solid #d1d5db;
                border-radius: 20px;
                padding: 8px 15px;
                font-size: 14px;
                outline: none;
                transition: border-color 0.2s ease;
            }

            .chat-input:focus {
                border-color: var(--primary-color, #2563eb);
            }

            .chat-send {
                width: 36px;
                height: 36px;
                border-radius: 50%;
                background: var(--primary-color, #2563eb);
                color: white;
                border: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
            }

            .chat-send:hover {
                background: var(--secondary-color, #1e40af);
                transform: scale(1.05);
            }

            .chat-send:disabled {
                background: #d1d5db;
                cursor: not-allowed;
                transform: none;
            }

            .chat-footer {
                padding: 8px 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: #f9fafb;
                border-top: 1px solid #f3f4f6;
            }

            .powered-by {
                font-size: 11px;
                color: #9ca3af;
            }

            .chat-options {
                display: flex;
                gap: 5px;
            }

            .option-btn {
                background: none;
                border: none;
                color: #6b7280;
                cursor: pointer;
                padding: 3px;
                border-radius: 3px;
                transition: color 0.2s ease;
            }

            .option-btn:hover {
                color: var(--primary-color, #2563eb);
            }

            /* Mobile Responsiveness */
            @media (max-width: 768px) {
                #customer-service-window {
                    width: 100%;
                    height: 100%;
                    bottom: 0;
                    right: 0;
                    border-radius: 0;
                }

                .chat-window {
                    border-radius: 0;
                }

                #customer-service-bubble {
                    bottom: 80px;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    setupEventListeners() {
        // Chat bubble click
        this.chatBubble.addEventListener('click', () => {
            this.toggleChat();
        });

        // Chat controls
        this.chatWindow.querySelector('.chat-close').addEventListener('click', () => {
            this.closeChat();
        });

        this.chatWindow.querySelector('.chat-minimize').addEventListener('click', () => {
            this.minimizeChat();
        });

        // Message input
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        this.chatSend.addEventListener('click', () => {
            this.sendMessage();
        });

        // Quick actions
        document.querySelectorAll('.quick-action').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.getAttribute('data-action');
                this.handleQuickAction(action);
            });
        });

        // Show typing indicator when user types
        let typingTimeout;
        this.chatInput.addEventListener('input', () => {
            clearTimeout(typingTimeout);
            typingTimeout = setTimeout(() => {
                // Simulate operator response after user stops typing
                this.simulateOperatorTyping();
            }, 1000);
        });
    }

    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        this.isOpen = true;
        this.isMinimized = false;
        this.chatWindow.classList.add('open');
        this.chatWindow.classList.remove('minimized');
        this.hideBadge();
        this.focusInput();
        this.trackEvent('chat_opened');
    }

    closeChat() {
        this.isOpen = false;
        this.isMinimized = false;
        this.chatWindow.classList.remove('open', 'minimized');
        this.trackEvent('chat_closed');
    }

    minimizeChat() {
        this.isMinimized = true;
        this.chatWindow.classList.add('minimized');
        this.trackEvent('chat_minimized');
    }

    sendMessage() {
        const text = this.chatInput.value.trim();
        if (!text) return;

        this.addMessage(text, 'user');
        this.chatInput.value = '';
        this.scrollToBottom();
        
        // Simulate operator response
        this.handleUserMessage(text);
        this.trackEvent('message_sent', { message_length: text.length });
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-user-circle"></i>';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const textDiv = document.createElement('div');
        textDiv.className = 'message-text';
        textDiv.textContent = text;
        
        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = this.getCurrentTime();
        
        contentDiv.appendChild(textDiv);
        contentDiv.appendChild(timeDiv);
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        this.chatMessages.appendChild(messageDiv);
        
        // Store message
        this.messages.push({
            text,
            sender,
            timestamp: Date.now()
        });
        
        this.scrollToBottom();
    }

    handleUserMessage(text) {
        const lowerText = text.toLowerCase();
        
        // Simulate operator typing
        this.showTypingIndicator();
        
        setTimeout(() => {
            this.hideTypingIndicator();
            
            let response = this.getAutoResponse(lowerText);
            this.addMessage(response, 'operator');
        }, 1000 + Math.random() * 2000); // Random delay 1-3 seconds
    }

    getAutoResponse(text) {
        for (const [keywords, responses] of this.autoResponders) {
            if (keywords.some(keyword => text.includes(keyword))) {
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }
        
        return "Thank you for your message! I'll connect you with our technical team for detailed assistance. Meanwhile, you can download our technical specifications or request a quote through our website.";
    }

    initAutoResponders() {
        return new Map([
            [
                ['price', 'cost', 'quote', 'how much'],
                [
                    "I'd be happy to provide pricing information! Our equipment prices vary based on specifications and requirements. Would you like me to connect you with our sales team for a personalized quote?",
                    "For accurate pricing, I'll need to know your specific requirements. Our CNC plasma cutting systems start from competitive rates. Shall I arrange a technical consultation?",
                    "Equipment pricing depends on cutting capacity, materials, and specifications. I can arrange a free consultation with Manager Fu to discuss your needs and provide accurate quotes."
                ]
            ],
            [
                ['specs', 'specification', 'technical', 'details', 'cutting capacity'],
                [
                    "You can find detailed specifications in our download center! Our CNC plasma systems cut steel plates from 3-200mm thickness. What specific application do you have in mind?",
                    "Technical specifications vary by model. Are you interested in plasma cutting, laser cutting, or Taiwan Ronghua slitters? I can guide you to the right documentation.",
                    "I recommend checking our technical comparison tool to see detailed specs for different cutting technologies. What thickness range are you working with?"
                ]
            ],
            [
                ['delivery', 'shipping', 'installation', 'timeline'],
                [
                    "Standard delivery is 2-4 weeks across Guangdong Province. We also provide installation and training services. What's your location and timeline requirements?",
                    "We offer fast delivery across China with professional installation support. Our team typically schedules installation within 1-2 weeks of delivery. Where will the equipment be installed?",
                    "Delivery times depend on equipment model and customization. Standard systems ship within 2-4 weeks. We include installation training with all major equipment purchases."
                ]
            ],
            [
                ['support', 'maintenance', 'service', 'training'],
                [
                    "We provide comprehensive 24/7 technical support and maintenance services. Our team has 19+ years experience with steel cutting equipment. What kind of support do you need?",
                    "Our support includes preventive maintenance schedules, technical training, and troubleshooting assistance. We maintain strong relationships with Taiwan Ronghua for specialized support.",
                    "Technical support is available around the clock. We offer on-site maintenance, remote diagnostics, and comprehensive training programs for your operators."
                ]
            ],
            [
                ['hello', 'hi', 'good morning', 'good afternoon'],
                [
                    "Hello! Welcome to Punaise Equipment. I'm here to help you find the perfect steel cutting solution for your needs.",
                    "Hi there! I'm Manager Fu from Punaise Equipment. How can I assist you with your steel processing requirements today?",
                    "Good to meet you! I'm here to help with any questions about our CNC cutting equipment and Taiwan Ronghua machinery."
                ]
            ],
            [
                ['taiwan ronghua', 'ronghua', 'slitter', 'slitting'],
                [
                    "We're an authorized distributor of Taiwan Ronghua slitting equipment! These precision machines are perfect for steel strip processing. What width and thickness are you working with?",
                    "Taiwan Ronghua slitters are among the best in the industry for precision steel coil processing. We provide full support including installation, training, and maintenance.",
                    "Our Taiwan Ronghua partnership spans many years. These slitters offer exceptional precision for steel strip production. Would you like detailed specifications?"
                ]
            ]
        ]);
    }

    handleQuickAction(action) {
        let message = '';
        switch (action) {
            case 'quote':
                message = "I'd like to get a quote for steel cutting equipment";
                break;
            case 'specs':
                message = "Can you show me technical specifications?";
                break;
            case 'support':
                message = "I need technical support information";
                break;
        }
        
        if (message) {
            this.addMessage(message, 'user');
            this.handleUserMessage(message);
        }
    }

    showTypingIndicator() {
        document.getElementById('typingIndicator').style.display = 'flex';
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        document.getElementById('typingIndicator').style.display = 'none';
    }

    simulateOperatorTyping() {
        if (Math.random() < 0.3) { // 30% chance to show typing indicator
            this.showTypingIndicator();
            setTimeout(() => {
                this.hideTypingIndicator();
            }, 2000);
        }
    }

    showBadge() {
        const badge = document.getElementById('chatBadge');
        if (badge) {
            badge.style.display = 'flex';
        }
    }

    hideBadge() {
        const badge = document.getElementById('chatBadge');
        if (badge) {
            badge.style.display = 'none';
        }
    }

    focusInput() {
        setTimeout(() => {
            this.chatInput.focus();
        }, 300);
    }

    scrollToBottom() {
        setTimeout(() => {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }, 100);
    }

    getCurrentTime() {
        return new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        });
    }

    getStatusText() {
        switch (this.operatorStatus) {
            case 'online': return 'Online now';
            case 'busy': return 'Usually responds quickly';
            case 'offline': return 'Will respond soon';
            default: return 'Available';
        }
    }

    loadChatHistory() {
        const savedHistory = localStorage.getItem(`punaise_chat_${this.chatId}`);
        if (savedHistory) {
            this.messages = JSON.parse(savedHistory);
            this.messages.forEach(msg => {
                this.addMessage(msg.text, msg.sender);
            });
        }
    }

    saveChatHistory() {
        localStorage.setItem(`punaise_chat_${this.chatId}`, JSON.stringify(this.messages));
    }

    initOperatorPresence() {
        // Simulate operator presence changes
        setInterval(() => {
            const statuses = ['online', 'busy', 'offline'];
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            this.updateOperatorStatus(randomStatus);
        }, 300000); // Change status every 5 minutes

        // Show proactive message after 30 seconds of inactivity
        setTimeout(() => {
            if (!this.isOpen && Math.random() < 0.3) {
                this.showBadge();
                this.trackEvent('proactive_message_shown');
            }
        }, 30000);
    }

    updateOperatorStatus(status) {
        this.operatorStatus = status;
        const statusIndicator = document.querySelector('.status-indicator');
        const statusText = document.querySelector('.status-text');
        
        if (statusIndicator && statusText) {
            statusIndicator.className = `status-indicator ${status}`;
            statusText.textContent = this.getStatusText();
        }
    }

    trackEvent(eventName, data = {}) {
        // Track chat interactions with analytics
        if (typeof window.AnalyticsTracker !== 'undefined') {
            window.AnalyticsTracker.trackEvent('customer_service', eventName, {
                chat_id: this.chatId,
                operator_status: this.operatorStatus,
                messages_count: this.messages.length,
                ...data
            });
        }
    }

    // Public API methods
    open() {
        this.openChat();
    }

    close() {
        this.closeChat();
    }

    sendAutomatedMessage(text) {
        this.addMessage(text, 'operator');
        this.showBadge();
    }
}

// Initialize customer service chat
document.addEventListener('DOMContentLoaded', () => {
    window.customerServiceChat = new CustomerServiceChat();
    
    // Initialize after a short delay to ensure page is fully loaded
    setTimeout(() => {
        console.log('Customer Service Chat ready');
    }, 1000);
});

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CustomerServiceChat;
}