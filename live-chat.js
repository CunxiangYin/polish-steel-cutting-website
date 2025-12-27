// 实时在线客服系统
class LiveChat {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.unreadCount = 0;
        this.chatId = this.generateChatId();
        this.autoResponders = this.loadAutoResponders();
        this.init();
    }
    
    init() {
        this.createChatInterface();
        this.bindEvents();
        this.loadChatHistory();
        this.startAutoGreeting();
        this.setupKeyboardShortcuts();
    }
    
    generateChatId() {
        return 'chat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    createChatInterface() {
        const chatHTML = `
            <div class="live-chat-widget" id="liveChatWidget">
                <!-- 聊天按钮 -->
                <div class="chat-toggle-btn" id="chatToggleBtn">
                    <div class="chat-icon">
                        <i class="fas fa-comments"></i>
                        <span class="unread-badge" id="unreadBadge">0</span>
                    </div>
                    <div class="chat-tooltip">
                        <span>在线客服</span>
                        <div class="online-status">
                            <span class="status-dot online"></span>
                            <span>销售顾问在线</span>
                        </div>
                    </div>
                </div>
                
                <!-- 聊天窗口 -->
                <div class="chat-window" id="chatWindow">
                    <div class="chat-header">
                        <div class="agent-info">
                            <div class="agent-avatar">
                                <i class="fas fa-user-tie"></i>
                                <span class="status-indicator online"></span>
                            </div>
                            <div class="agent-details">
                                <div class="agent-name">张工程师</div>
                                <div class="agent-title">设备销售专家</div>
                                <div class="response-time">平均响应时间: 2分钟</div>
                            </div>
                        </div>
                        <div class="chat-controls">
                            <button class="minimize-btn" id="minimizeChat" title="最小化">
                                <i class="fas fa-minus"></i>
                            </button>
                            <button class="close-btn" id="closeChat" title="关闭">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="chat-messages" id="chatMessages">
                        <!-- 欢迎消息 -->
                        <div class="message agent-message welcome-message">
                            <div class="message-avatar">
                                <i class="fas fa-user-tie"></i>
                            </div>
                            <div class="message-content">
                                <div class="message-text">
                                    您好！欢迎咨询深圳普耐斯机电设备！👋<br>
                                    我是您的专属设备顾问张工程师，19年行业经验。<br><br>
                                    <strong>我们专业提供：</strong><br>
                                    🔹 等离子切割机 (精度±0.5mm)<br>
                                    🔹 激光切割系统 (精度±0.03mm)<br>
                                    🔹 火焰切割设备 (厚度6-300mm)<br>
                                    🔹 台湾容华分条机<br><br>
                                    请问您需要什么类型的设备？
                                </div>
                                <div class="message-time">${this.getCurrentTime()}</div>
                            </div>
                        </div>
                        
                        <!-- 快速回复选项 -->
                        <div class="quick-replies" id="quickReplies">
                            <div class="quick-reply" data-text="我需要等离子切割机">等离子切割机</div>
                            <div class="quick-reply" data-text="我需要激光切割设备">激光切割设备</div>
                            <div class="quick-reply" data-text="我需要询价">获取报价</div>
                            <div class="quick-reply" data-text="我要预约参观">预约参观</div>
                        </div>
                    </div>
                    
                    <div class="chat-input-area">
                        <div class="typing-indicator" id="typingIndicator">
                            <span>张工程师正在输入</span>
                            <div class="typing-dots">
                                <span></span><span></span><span></span>
                            </div>
                        </div>
                        
                        <div class="input-container">
                            <div class="attachment-btn" title="发送文件">
                                <i class="fas fa-paperclip"></i>
                                <input type="file" id="fileInput" accept="image/*,.pdf,.doc,.docx" style="display: none;">
                            </div>
                            
                            <div class="emoji-btn" id="emojiBtn" title="表情">
                                <i class="fas fa-smile"></i>
                            </div>
                            
                            <input type="text" 
                                   id="chatInput" 
                                   placeholder="输入您的问题..."
                                   maxlength="500"
                                   autocomplete="off">
                                   
                            <button class="send-btn" id="sendBtn" title="发送 (Enter)">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                        
                        <div class="quick-actions">
                            <button class="action-btn" data-action="request-callback">
                                <i class="fas fa-phone"></i> 电话回拨
                            </button>
                            <button class="action-btn" data-action="send-brochure">
                                <i class="fas fa-file-pdf"></i> 发送资料
                            </button>
                            <button class="action-btn" data-action="schedule-visit">
                                <i class="fas fa-calendar"></i> 预约参观
                            </button>
                        </div>
                    </div>
                    
                    <!-- 客户信息收集 -->
                    <div class="customer-info-modal" id="customerInfoModal" style="display: none;">
                        <div class="modal-content">
                            <h3>完善联系信息</h3>
                            <p>为了更好地为您服务，请留下联系方式：</p>
                            <form id="customerInfoForm">
                                <input type="text" name="name" placeholder="姓名" required>
                                <input type="tel" name="phone" placeholder="手机号" required>
                                <input type="text" name="company" placeholder="公司名称">
                                <select name="interest">
                                    <option value="">感兴趣的产品</option>
                                    <option value="plasma">等离子切割机</option>
                                    <option value="laser">激光切割机</option>
                                    <option value="flame">火焰切割机</option>
                                    <option value="slitting">分条设备</option>
                                </select>
                                <div class="modal-actions">
                                    <button type="button" id="skipInfo">稍后填写</button>
                                    <button type="submit">确认提交</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                
                <!-- 表情选择器 -->
                <div class="emoji-picker" id="emojiPicker" style="display: none;">
                    <div class="emoji-grid">
                        <span class="emoji" data-emoji="😊">😊</span>
                        <span class="emoji" data-emoji="👋">👋</span>
                        <span class="emoji" data-emoji="👍">👍</span>
                        <span class="emoji" data-emoji="👌">👌</span>
                        <span class="emoji" data-emoji="🔥">🔥</span>
                        <span class="emoji" data-emoji="💯">💯</span>
                        <span class="emoji" data-emoji="⚡">⚡</span>
                        <span class="emoji" data-emoji="🎯">🎯</span>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', chatHTML);
    }
    
    bindEvents() {
        const toggleBtn = document.getElementById('chatToggleBtn');
        const closeBtn = document.getElementById('closeChat');
        const minimizeBtn = document.getElementById('minimizeChat');
        const sendBtn = document.getElementById('sendBtn');
        const chatInput = document.getElementById('chatInput');
        const fileInput = document.getElementById('fileInput');
        const emojiBtn = document.getElementById('emojiBtn');
        
        // 切换聊天窗口
        toggleBtn.addEventListener('click', () => {
            this.toggleChat();
        });
        
        // 关闭聊天
        closeBtn.addEventListener('click', () => {
            this.closeChat();
        });
        
        // 最小化聊天
        minimizeBtn.addEventListener('click', () => {
            this.minimizeChat();
        });
        
        // 发送消息
        sendBtn.addEventListener('click', () => {
            this.sendMessage();
        });
        
        // 回车发送
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // 输入事件
        chatInput.addEventListener('input', () => {
            this.handleTyping();
        });
        
        // 快速回复
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-reply')) {
                this.sendQuickReply(e.target.dataset.text);
            }
        });
        
        // 快速操作
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('action-btn') || e.target.parentElement.classList.contains('action-btn')) {
                const btn = e.target.classList.contains('action-btn') ? e.target : e.target.parentElement;
                this.handleQuickAction(btn.dataset.action);
            }
        });
        
        // 文件上传
        document.querySelector('.attachment-btn').addEventListener('click', () => {
            fileInput.click();
        });
        
        fileInput.addEventListener('change', (e) => {
            this.handleFileUpload(e.target.files[0]);
        });
        
        // 表情选择
        emojiBtn.addEventListener('click', () => {
            this.toggleEmojiPicker();
        });
        
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('emoji')) {
                this.insertEmoji(e.target.dataset.emoji);
            }
        });
        
        // 客户信息表单
        const customerForm = document.getElementById('customerInfoForm');
        customerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitCustomerInfo(new FormData(customerForm));
        });
        
        document.getElementById('skipInfo').addEventListener('click', () => {
            this.hideCustomerInfoModal();
        });
    }
    
    toggleChat() {
        const chatWindow = document.getElementById('chatWindow');
        const widget = document.getElementById('liveChatWidget');
        
        this.isOpen = !this.isOpen;
        widget.classList.toggle('open', this.isOpen);
        
        if (this.isOpen) {
            this.markMessagesAsRead();
            this.focusInput();
            
            // 如果是第一次打开，显示客户信息收集
            if (this.messages.length <= 1) {
                setTimeout(() => {
                    this.showCustomerInfoModal();
                }, 3000);
            }
        }
    }
    
    closeChat() {
        const widget = document.getElementById('liveChatWidget');
        this.isOpen = false;
        widget.classList.remove('open');
    }
    
    minimizeChat() {
        this.closeChat();
    }
    
    sendMessage() {
        const input = document.getElementById('chatInput');
        const text = input.value.trim();
        
        if (!text) return;
        
        this.addMessage({
            type: 'user',
            text: text,
            time: this.getCurrentTime()
        });
        
        input.value = '';
        
        // 模拟客服回复
        this.simulateAgentResponse(text);
    }
    
    sendQuickReply(text) {
        this.addMessage({
            type: 'user',
            text: text,
            time: this.getCurrentTime()
        });
        
        // 隐藏快速回复
        const quickReplies = document.getElementById('quickReplies');
        quickReplies.style.display = 'none';
        
        this.simulateAgentResponse(text);
    }
    
    addMessage(message) {
        this.messages.push(message);
        
        const messagesContainer = document.getElementById('chatMessages');
        const messageHTML = this.createMessageHTML(message);
        
        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        this.scrollToBottom();
        
        if (message.type === 'agent' && !this.isOpen) {
            this.incrementUnreadCount();
        }
        
        // 保存聊天历史
        this.saveChatHistory();
    }
    
    createMessageHTML(message) {
        const isAgent = message.type === 'agent';
        const messageClass = isAgent ? 'agent-message' : 'user-message';
        
        return `
            <div class="message ${messageClass}">
                ${isAgent ? '<div class="message-avatar"><i class="fas fa-user-tie"></i></div>' : ''}
                <div class="message-content">
                    <div class="message-text">${message.text}</div>
                    <div class="message-time">${message.time}</div>
                </div>
            </div>
        `;
    }
    
    simulateAgentResponse(userMessage) {
        // 显示正在输入指示器
        this.showTypingIndicator();
        
        setTimeout(() => {
            this.hideTypingIndicator();
            
            const response = this.generateAutoResponse(userMessage);
            this.addMessage({
                type: 'agent',
                text: response,
                time: this.getCurrentTime()
            });
        }, 1000 + Math.random() * 2000);
    }
    
    generateAutoResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // 关键词匹配回复
        for (const responder of this.autoResponders) {
            for (const keyword of responder.keywords) {
                if (message.includes(keyword)) {
                    const responses = responder.responses;
                    return responses[Math.floor(Math.random() * responses.length)];
                }
            }
        }
        
        // 默认回复
        const defaultResponses = [
            "谢谢您的咨询！我马上为您联系专业工程师，请稍等。",
            "我记录了您的需求，我们的技术专家会在5分钟内给您详细解答。",
            "这个问题很专业，让我为您转接到技术部门，请您稍等片刻。",
            "您可以直接拨打我们的热线 135-1099-2218，会有专人为您详细介绍。"
        ];
        
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
    
    loadAutoResponders() {
        return [
            {
                keywords: ['等离子', '等离子切割', 'cnc等离子'],
                responses: [
                    "等离子切割机是我们的主力产品！💪 <br><br>我们有多种型号：<br>🔹 CNC等离子1530 (0-25mm厚度)<br>🔹 重型等离子 (6-80mm厚度)<br>🔹 便携等离子 (现场作业)<br><br>请问您主要切割什么材料？厚度大概多少？",
                    "等离子切割设备我们有19年生产经验！<br><br>✅ 精度可达±0.5mm<br>✅ 切割速度快，热影响小<br>✅ 适合不锈钢、碳钢、铝材<br><br>您的月产量大概多少？我为您推荐最适合的型号。"
                ]
            },
            {
                keywords: ['激光', '激光切割', '光纤激光'],
                responses: [
                    "激光切割机是高精度选择！⚡<br><br>我们代理优质品牌：<br>🔹 光纤激光3015 (±0.03mm精度)<br>🔹 CO2激光1325 (非金属专用)<br>🔹 功率从1000W到6000W<br><br>请问您切割什么材料？对精度有什么要求？",
                    "激光设备我们有专业技术团队！<br><br>优势特点：<br>✅ 精度高、速度快<br>✅ 切缝窄、热变形小<br>✅ 可切割复杂图形<br><br>需要我给您发个详细资料看看吗？"
                ]
            },
            {
                keywords: ['价格', '多少钱', '报价', '询价'],
                responses: [
                    "设备价格需要根据您的具体需求来定！💰<br><br>影响价格的因素：<br>🔹 切割厚度范围<br>🔹 工作台面大小<br>🔹 精度要求<br>🔹 自动化程度<br><br>请告诉我您的需求，我立即为您制定专业方案。",
                    "我们的价格很有竞争力！😊<br><br>参考价格区间：<br>💡 等离子切割：8-50万<br>💡 激光切割：30-80万<br>💡 火焰切割：15-35万<br><br>具体报价我需要了解您的工件要求，请留个电话我详细为您介绍。"
                ]
            },
            {
                keywords: ['参观', '看设备', '工厂'],
                responses: [
                    "欢迎来厂参观考察！🏭<br><br>我们工厂地址：<br>📍 深圳市南山区科技园<br>📍 生产车间1500平米<br>📍 展示设备20多台<br><br>您什么时候方便过来？我安排专车接送！",
                    "现场看设备最直观了！👍<br><br>参观安排：<br>✅ 免费专车接送<br>✅ 现场试切演示<br>✅ 技术工程师讲解<br>✅ 午餐招待<br><br>预约电话：135-1099-2218"
                ]
            },
            {
                keywords: ['厚度', '能切多厚', '切割厚度'],
                responses: [
                    "不同设备切割厚度不同！📏<br><br>设备对应厚度：<br>🔸 激光切割：0-20mm (精度最高)<br>🔸 等离子切割：6-80mm (效率最高)<br>🔸 火焰切割：6-300mm (厚度最大)<br><br>您需要切割多厚的板材？"
                ]
            },
            {
                keywords: ['材料', '不锈钢', '碳钢', '铝材'],
                responses: [
                    "我们设备适用材料很广泛！🔧<br><br>可切割材料：<br>✅ 碳钢 (所有设备)<br>✅ 不锈钢 (激光、等离子)<br>✅ 铝材 (激光、等离子)<br>✅ 铜材 (激光)<br><br>您主要加工什么材料？我为您推荐最适合的工艺。"
                ]
            }
        ];
    }
    
    handleQuickAction(action) {
        switch (action) {
            case 'request-callback':
                this.requestCallback();
                break;
            case 'send-brochure':
                this.sendBrochure();
                break;
            case 'schedule-visit':
                this.scheduleVisit();
                break;
        }
    }
    
    requestCallback() {
        this.addMessage({
            type: 'agent',
            text: `好的，我安排销售工程师给您回电！📞<br><br>
                   请确认您的联系方式：<br>
                   <div class="callback-form">
                       <input type="tel" placeholder="请输入手机号" id="callbackPhone">
                       <select id="callbackTime">
                           <option>请选择回电时间</option>
                           <option>立即回电</option>
                           <option>上午9-12点</option>
                           <option>下午2-6点</option>
                           <option>晚上7-9点</option>
                       </select>
                       <button onclick="liveChatInstance.confirmCallback()">确认回电</button>
                   </div>`,
            time: this.getCurrentTime()
        });
    }
    
    confirmCallback() {
        const phone = document.getElementById('callbackPhone').value;
        const time = document.getElementById('callbackTime').value;
        
        if (!phone || !time) {
            alert('请填写完整信息');
            return;
        }
        
        this.addMessage({
            type: 'agent',
            text: `✅ 回电预约成功！<br><br>联系电话：${phone}<br>回电时间：${time}<br><br>我们会准时联系您，请保持电话畅通。感谢信任！🙏`,
            time: this.getCurrentTime()
        });
        
        // 发送到analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'callback_request', {
                'phone': phone,
                'time': time
            });
        }
    }
    
    sendBrochure() {
        this.addMessage({
            type: 'agent',
            text: `我为您准备了最新产品资料！📋<br><br>
                   包含内容：<br>
                   📄 设备技术参数<br>
                   📄 客户案例介绍<br>
                   📄 工厂实力展示<br>
                   📄 服务流程说明<br><br>
                   请留下邮箱，我立即发送：<br>
                   <div class="email-form">
                       <input type="email" placeholder="请输入邮箱" id="brochureEmail">
                       <button onclick="liveChatInstance.sendBrochureEmail()">发送资料</button>
                   </div>`,
            time: this.getCurrentTime()
        });
    }
    
    sendBrochureEmail() {
        const email = document.getElementById('brochureEmail').value;
        if (!email) {
            alert('请输入邮箱地址');
            return;
        }
        
        this.addMessage({
            type: 'agent',
            text: `✅ 产品资料已发送到 ${email}<br><br>请查收邮件，如未收到请检查垃圾邮件箱。<br><br>有任何问题随时咨询我！📧`,
            time: this.getCurrentTime()
        });
    }
    
    scheduleVisit() {
        this.addMessage({
            type: 'agent',
            text: `太好了！欢迎来厂实地考察！🏭<br><br>
                   参观信息：<br>
                   📍 地址：深圳市南山区科技园<br>
                   🕐 时间：工作日 9:00-18:00<br>
                   🚗 提供免费专车接送<br><br>
                   请预约参观时间：<br>
                   <div class="visit-form">
                       <input type="date" id="visitDate" min="${new Date().toISOString().split('T')[0]}">
                       <select id="visitTime">
                           <option>请选择时间</option>
                           <option>上午 9:00-12:00</option>
                           <option>下午 14:00-17:00</option>
                       </select>
                       <button onclick="liveChatInstance.confirmVisit()">确认预约</button>
                   </div>`,
            time: this.getCurrentTime()
        });
    }
    
    confirmVisit() {
        const date = document.getElementById('visitDate').value;
        const time = document.getElementById('visitTime').value;
        
        if (!date || !time) {
            alert('请选择参观日期和时间');
            return;
        }
        
        this.addMessage({
            type: 'agent',
            text: `🎉 参观预约成功！<br><br>参观时间：${date} ${time}<br><br>我们会提前联系您确认接送地点。期待您的到访！<br><br>联系电话：135-1099-2218`,
            time: this.getCurrentTime()
        });
    }
    
    handleFileUpload(file) {
        if (!file) return;
        
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            alert('文件大小不能超过10MB');
            return;
        }
        
        this.addMessage({
            type: 'user',
            text: `📎 发送文件：${file.name} (${(file.size / 1024).toFixed(1)}KB)`,
            time: this.getCurrentTime()
        });
        
        setTimeout(() => {
            this.addMessage({
                type: 'agent',
                text: `已收到您的文件，我们的工程师会仔细查看并为您提供专业建议。稍后会有技术专家联系您详细讨论。📋`,
                time: this.getCurrentTime()
            });
        }, 1500);
    }
    
    showTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        indicator.style.display = 'flex';
    }
    
    hideTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        indicator.style.display = 'none';
    }
    
    toggleEmojiPicker() {
        const picker = document.getElementById('emojiPicker');
        picker.style.display = picker.style.display === 'block' ? 'none' : 'block';
    }
    
    insertEmoji(emoji) {
        const input = document.getElementById('chatInput');
        input.value += emoji;
        input.focus();
        document.getElementById('emojiPicker').style.display = 'none';
    }
    
    showCustomerInfoModal() {
        const modal = document.getElementById('customerInfoModal');
        modal.style.display = 'block';
    }
    
    hideCustomerInfoModal() {
        const modal = document.getElementById('customerInfoModal');
        modal.style.display = 'none';
    }
    
    submitCustomerInfo(formData) {
        const data = Object.fromEntries(formData);
        
        this.addMessage({
            type: 'agent',
            text: `谢谢 ${data.name} 先生/女士！🤝<br><br>我已记录您的信息：<br>📞 ${data.phone}<br>🏢 ${data.company}<br><br>我们的专业工程师会在30分钟内联系您，为您提供定制化的设备解决方案！`,
            time: this.getCurrentTime()
        });
        
        this.hideCustomerInfoModal();
        
        // 发送数据到后端
        if (typeof gtag !== 'undefined') {
            gtag('event', 'customer_info_submit', {
                'name': data.name,
                'phone': data.phone,
                'company': data.company,
                'interest': data.interest
            });
        }
    }
    
    handleTyping() {
        // 可以添加实时输入提示功能
    }
    
    getCurrentTime() {
        return new Date().toLocaleTimeString('zh-CN', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }
    
    scrollToBottom() {
        const messagesContainer = document.getElementById('chatMessages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    incrementUnreadCount() {
        this.unreadCount++;
        const badge = document.getElementById('unreadBadge');
        badge.textContent = this.unreadCount;
        badge.style.display = this.unreadCount > 0 ? 'block' : 'none';
    }
    
    markMessagesAsRead() {
        this.unreadCount = 0;
        const badge = document.getElementById('unreadBadge');
        badge.style.display = 'none';
    }
    
    focusInput() {
        setTimeout(() => {
            document.getElementById('chatInput').focus();
        }, 300);
    }
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+Enter 发送消息
            if (e.ctrlKey && e.key === 'Enter') {
                this.sendMessage();
            }
            
            // ESC 关闭聊天
            if (e.key === 'Escape' && this.isOpen) {
                this.closeChat();
            }
        });
    }
    
    startAutoGreeting() {
        // 30秒后自动弹出聊天提示
        setTimeout(() => {
            if (!this.isOpen && this.messages.length <= 1) {
                const tooltip = document.querySelector('.chat-tooltip');
                tooltip.classList.add('pulse-animation');
                
                setTimeout(() => {
                    tooltip.classList.remove('pulse-animation');
                }, 3000);
            }
        }, 30000);
    }
    
    saveChatHistory() {
        localStorage.setItem('liveChatHistory', JSON.stringify(this.messages));
    }
    
    loadChatHistory() {
        const history = localStorage.getItem('liveChatHistory');
        if (history) {
            const messages = JSON.parse(history);
            // 只加载最近的消息（避免过多历史消息）
            this.messages = messages.slice(-20);
        }
    }
}

// 样式注入
const liveChatStyles = `
    <style>
    /* 在线客服样式 */
    .live-chat-widget {
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 10000;
        font-family: 'Inter', sans-serif;
    }
    
    .chat-toggle-btn {
        position: relative;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        transition: all 0.3s ease;
        animation: chatPulse 2s infinite;
    }
    
    .chat-toggle-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
    }
    
    .chat-icon {
        position: relative;
        color: white;
        font-size: 24px;
    }
    
    .unread-badge {
        position: absolute;
        top: -8px;
        right: -8px;
        background: #ff4757;
        color: white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
    }
    
    .chat-tooltip {
        position: absolute;
        bottom: 70px;
        right: 0;
        background: white;
        padding: 15px 20px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s ease;
        pointer-events: none;
        min-width: 200px;
    }
    
    .chat-toggle-btn:hover .chat-tooltip {
        opacity: 1;
        transform: translateY(0);
    }
    
    .chat-tooltip span {
        font-weight: 600;
        color: #333;
        display: block;
        margin-bottom: 5px;
    }
    
    .online-status {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #666;
        font-size: 14px;
    }
    
    .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #4caf50;
        animation: statusPulse 2s infinite;
    }
    
    .chat-window {
        position: absolute;
        bottom: 80px;
        right: 0;
        width: 380px;
        height: 500px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
        display: none;
        flex-direction: column;
        overflow: hidden;
        transform: scale(0.8) translateY(20px);
        opacity: 0;
        transition: all 0.3s ease;
    }
    
    .live-chat-widget.open .chat-window {
        display: flex;
        transform: scale(1) translateY(0);
        opacity: 1;
    }
    
    .chat-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .agent-info {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .agent-avatar {
        position: relative;
        width: 50px;
        height: 50px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
    }
    
    .status-indicator {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 12px;
        height: 12px;
        background: #4caf50;
        border: 2px solid white;
        border-radius: 50%;
    }
    
    .agent-details .agent-name {
        font-weight: 600;
        font-size: 16px;
    }
    
    .agent-details .agent-title {
        font-size: 13px;
        opacity: 0.9;
    }
    
    .agent-details .response-time {
        font-size: 11px;
        opacity: 0.8;
        margin-top: 2px;
    }
    
    .chat-controls {
        display: flex;
        gap: 8px;
    }
    
    .chat-controls button {
        background: rgba(255, 255, 255, 0.2);
        border: none;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        cursor: pointer;
        transition: background 0.3s ease;
    }
    
    .chat-controls button:hover {
        background: rgba(255, 255, 255, 0.3);
    }
    
    .chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        background: #f8f9fa;
    }
    
    .message {
        display: flex;
        margin-bottom: 15px;
        gap: 10px;
    }
    
    .message-avatar {
        width: 35px;
        height: 35px;
        background: #667eea;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 14px;
        flex-shrink: 0;
    }
    
    .message-content {
        flex: 1;
    }
    
    .message-text {
        background: white;
        padding: 12px 15px;
        border-radius: 15px 15px 15px 5px;
        color: #333;
        line-height: 1.4;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    .user-message .message-text {
        background: #667eea;
        color: white;
        border-radius: 15px 15px 5px 15px;
        margin-left: auto;
        max-width: 80%;
    }
    
    .user-message {
        justify-content: flex-end;
    }
    
    .message-time {
        font-size: 11px;
        color: #999;
        margin-top: 5px;
        text-align: right;
    }
    
    .agent-message .message-time {
        text-align: left;
    }
    
    .welcome-message .message-text {
        background: #e8f5e8;
        border-left: 4px solid #4caf50;
    }
    
    .quick-replies {
        margin-top: 15px;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }
    
    .quick-reply {
        background: white;
        border: 2px solid #667eea;
        color: #667eea;
        padding: 8px 12px;
        border-radius: 20px;
        font-size: 13px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .quick-reply:hover {
        background: #667eea;
        color: white;
    }
    
    .typing-indicator {
        display: none;
        align-items: center;
        gap: 10px;
        padding: 10px 15px;
        color: #666;
        font-size: 13px;
        font-style: italic;
    }
    
    .typing-dots {
        display: flex;
        gap: 3px;
    }
    
    .typing-dots span {
        width: 6px;
        height: 6px;
        background: #999;
        border-radius: 50%;
        animation: typingDot 1.4s infinite ease-in-out;
    }
    
    .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
    .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
    
    .chat-input-area {
        background: white;
        border-top: 1px solid #e9ecef;
    }
    
    .input-container {
        display: flex;
        align-items: center;
        padding: 15px;
        gap: 10px;
    }
    
    .attachment-btn, .emoji-btn {
        background: none;
        border: none;
        color: #999;
        cursor: pointer;
        font-size: 18px;
        padding: 5px;
        transition: color 0.3s ease;
    }
    
    .attachment-btn:hover, .emoji-btn:hover {
        color: #667eea;
    }
    
    #chatInput {
        flex: 1;
        border: 2px solid #e9ecef;
        border-radius: 25px;
        padding: 10px 15px;
        font-size: 14px;
        outline: none;
        transition: border-color 0.3s ease;
    }
    
    #chatInput:focus {
        border-color: #667eea;
    }
    
    .send-btn {
        background: #667eea;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .send-btn:hover {
        background: #5a6fd8;
        transform: scale(1.05);
    }
    
    .quick-actions {
        padding: 10px 15px;
        display: flex;
        gap: 8px;
        border-top: 1px solid #f1f1f1;
        background: #fafafa;
    }
    
    .action-btn {
        flex: 1;
        background: white;
        border: 1px solid #e9ecef;
        padding: 8px;
        border-radius: 8px;
        font-size: 12px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        transition: all 0.3s ease;
    }
    
    .action-btn:hover {
        background: #f8f9fa;
        border-color: #667eea;
        color: #667eea;
    }
    
    .customer-info-modal {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 20px;
    }
    
    .modal-content {
        background: white;
        padding: 30px;
        border-radius: 15px;
        width: 90%;
        text-align: center;
    }
    
    .modal-content h3 {
        color: #333;
        margin-bottom: 10px;
    }
    
    .modal-content p {
        color: #666;
        margin-bottom: 20px;
    }
    
    .modal-content input,
    .modal-content select {
        width: 100%;
        padding: 10px;
        margin-bottom: 15px;
        border: 2px solid #e9ecef;
        border-radius: 8px;
        font-size: 14px;
    }
    
    .modal-actions {
        display: flex;
        gap: 10px;
        justify-content: center;
        margin-top: 20px;
    }
    
    .modal-actions button {
        padding: 10px 20px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 500;
    }
    
    .modal-actions button[type="submit"] {
        background: #667eea;
        color: white;
    }
    
    .modal-actions button[type="button"] {
        background: #f8f9fa;
        color: #666;
    }
    
    .emoji-picker {
        position: absolute;
        bottom: 60px;
        right: 15px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
        padding: 10px;
        z-index: 1000;
    }
    
    .emoji-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 5px;
    }
    
    .emoji {
        padding: 8px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 18px;
        text-align: center;
        transition: background 0.3s ease;
    }
    
    .emoji:hover {
        background: #f0f0f0;
    }
    
    /* 动画效果 */
    @keyframes chatPulse {
        0%, 100% { box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3); }
        50% { box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5), 0 0 0 10px rgba(102, 126, 234, 0.1); }
    }
    
    @keyframes statusPulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.2); opacity: 0.7; }
    }
    
    @keyframes typingDot {
        0%, 80%, 100% { transform: scale(0); }
        40% { transform: scale(1); }
    }
    
    .pulse-animation {
        animation: chatPulse 1.5s ease-in-out 3;
    }
    
    /* 移动端适配 */
    @media (max-width: 768px) {
        .live-chat-widget {
            bottom: 20px;
            right: 20px;
        }
        
        .chat-toggle-btn {
            width: 55px;
            height: 55px;
        }
        
        .chat-window {
            width: calc(100vw - 40px);
            height: calc(100vh - 120px);
            max-height: 500px;
            bottom: 75px;
            right: -10px;
        }
        
        .chat-tooltip {
            bottom: 65px;
            right: -50px;
            min-width: 150px;
        }
    }
    </style>
`;

// 注入样式
document.head.insertAdjacentHTML('beforeend', liveChatStyles);

// 全局实例
let liveChatInstance;

// 自动初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        liveChatInstance = new LiveChat();
    });
} else {
    liveChatInstance = new LiveChat();
}

// 导出供其他模块使用
window.LiveChat = LiveChat;
window.liveChatInstance = liveChatInstance;