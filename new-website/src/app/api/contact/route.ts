import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Validation schema for contact form
const contactFormSchema = z.object({
  name: z.string().min(2, '姓名至少需要2个字符').max(50, '姓名不能超过50个字符'),
  email: z.string().email('请输入有效的邮箱地址'),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(5, '主题至少需要5个字符').max(100, '主题不能超过100个字符'),
  message: z.string().min(10, '消息至少需要10个字符').max(1000, '消息不能超过1000个字符'),
  locale: z.string().optional().default('zh'),
})

// Rate limiting (simple in-memory store for demo)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX = 5 // 5 requests per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)
  
  if (!record || now - record.lastReset > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, lastReset: now })
    return true
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return false
  }
  
  record.count++
  return true
}

// Email service function (placeholder - replace with actual email service)
async function sendEmail(data: z.infer<typeof contactFormSchema>) {
  // This is a placeholder - in production, you would integrate with:
  // - SendGrid, Mailgun, AWS SES, or other email service
  // - Company's internal email system
  // - CRM system like HubSpot, Salesforce, etc.
  
  console.log('Email would be sent with data:', {
    to: '466904802@qq.com',
    from: data.email,
    subject: `联系表单: ${data.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3b82f6;">新的联系表单提交</h2>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>姓名:</strong> ${data.name}</p>
          <p><strong>邮箱:</strong> ${data.email}</p>
          ${data.phone ? `<p><strong>电话:</strong> ${data.phone}</p>` : ''}
          ${data.company ? `<p><strong>公司:</strong> ${data.company}</p>` : ''}
          <p><strong>主题:</strong> ${data.subject}</p>
          <p><strong>语言:</strong> ${data.locale}</p>
        </div>
        <div style="background: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h3 style="margin-top: 0;">消息内容:</h3>
          <p style="line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
        </div>
        <div style="margin-top: 20px; padding: 15px; background: #f1f5f9; border-radius: 6px;">
          <small style="color: #64748b;">
            此邮件由 ${process.env.NODE_ENV === 'production' ? 'https://cute-jelly-dc03bf.netlify.app' : 'localhost:3000'} 自动发送<br>
            发送时间: ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}
          </small>
        </div>
      </div>
    `
  })

  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // In production, you'd return the actual result from your email service
  return { success: true, messageId: `msg_${Date.now()}` }
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { 
          error: '请求过于频繁，请稍后再试',
          code: 'RATE_LIMIT_EXCEEDED' 
        },
        { status: 429 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = contactFormSchema.parse(body)

    // Send email (or save to database)
    const emailResult = await sendEmail(validatedData)
    
    if (!emailResult.success) {
      throw new Error('Failed to send email')
    }

    // Log the submission for analytics/monitoring
    console.log(`Contact form submission from ${validatedData.email} (${validatedData.locale})`)

    return NextResponse.json({
      success: true,
      message: '感谢您的联系！我们会尽快回复您。',
      messageId: emailResult.messageId,
    })

  } catch (error) {
    console.error('Contact form error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: '表单数据无效',
          details: error.issues,
          code: 'VALIDATION_ERROR'
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        error: '服务器错误，请稍后再试',
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    )
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production' 
        ? 'https://cute-jelly-dc03bf.netlify.app' 
        : '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  })
}