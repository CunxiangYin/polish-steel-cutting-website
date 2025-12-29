'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangleIcon, RefreshCwIcon, HomeIcon } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  const isDevelopment = process.env.NODE_ENV === 'development'

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg text-center">
        <CardHeader className="pb-4">
          <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangleIcon className="w-12 h-12 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            出现了一些问题
          </CardTitle>
          <p className="text-gray-600 mt-2">
            抱歉，页面加载时发生了错误。请尝试刷新页面或返回首页。
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {isDevelopment && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left">
              <h3 className="font-semibold text-red-800 mb-2">开发模式错误信息：</h3>
              <p className="text-sm text-red-700 font-mono break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-red-600 mt-2">
                  错误ID: {error.digest}
                </p>
              )}
            </div>
          )}
          
          <div className="space-y-3">
            <Button 
              onClick={reset}
              className="w-full"
              variant="default"
            >
              <RefreshCwIcon className="w-4 h-4 mr-2" />
              重试
            </Button>
            
            <Link href="/zh" className="block">
              <Button className="w-full" variant="outline">
                <HomeIcon className="w-4 h-4 mr-2" />
                返回首页
              </Button>
            </Link>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-gray-500">
              如果问题持续存在，请联系我们的技术支持团队。
            </p>
            <p className="text-xs text-gray-400 mt-1">
              邮箱: support@punaise.com | 电话: +86-755-1234567
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}