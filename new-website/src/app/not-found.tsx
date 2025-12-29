import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { HomeIcon, SearchIcon } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="pb-4">
          <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <SearchIcon className="w-12 h-12 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            页面未找到
          </CardTitle>
          <p className="text-gray-600 mt-2">
            抱歉，您访问的页面不存在或已被移动。
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-6xl font-bold text-gray-300 mb-4">
            404
          </div>
          <div className="space-y-3">
            <Link href="/zh" className="block">
              <Button className="w-full" variant="default">
                <HomeIcon className="w-4 h-4 mr-2" />
                返回首页
              </Button>
            </Link>
            <Link href="/en" className="block">
              <Button className="w-full" variant="outline">
                Go to English Homepage
              </Button>
            </Link>
          </div>
          <div className="pt-4 border-t">
            <p className="text-sm text-gray-500">
              如果您认为这是一个错误，请联系我们的客服团队。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Metadata for the 404 page
export const metadata = {
  title: '页面未找到 - 404 | 深圳普耐斯机电设备有限公司',
  description: '您访问的页面不存在。返回首页或联系我们获取帮助。',
  robots: {
    index: false,
    follow: false,
  },
}