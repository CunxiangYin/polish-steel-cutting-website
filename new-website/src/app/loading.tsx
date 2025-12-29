import { Card, CardContent } from '@/components/ui/card'
import { LoaderIcon } from 'lucide-react'

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="py-12">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <LoaderIcon className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            正在加载...
          </h2>
          
          <p className="text-gray-600 text-sm">
            请稍候，我们正在为您准备内容
          </p>

          {/* Loading progress animation */}
          <div className="mt-6">
            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div className="bg-blue-600 h-1.5 rounded-full animate-pulse w-3/4"></div>
            </div>
          </div>

          {/* Loading dots animation */}
          <div className="flex justify-center items-center space-x-2 mt-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            深圳普耐斯机电设备有限公司
          </p>
        </CardContent>
      </Card>
    </div>
  )
}