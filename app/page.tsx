'use client' // 标记为客户端组件，因为我们用了 useEffect
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [status, setStatus] = useState('正在连接数据库...')

  useEffect(() => {
    async function checkConnection() {
      // 尝试向 Supabase 发送一个简单的请求
      const { data, error } = await supabase.from('test').select('*').limit(1)
      
      if (error && error.code !== 'PGRST116') { // 忽略表不存在的错误，只要连通就行
        console.error(error)
        setStatus('❌ 连接失败，请检查控制台和 .env.local')
      } else {
        setStatus('✅ Supabase 连接成功！')
      }
    }
    checkConnection()
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
        Hello, Full Stack!
      </h1>
      
      <div className="p-6 bg-gray-800 rounded-xl border border-gray-700 shadow-2xl">
        <p className="text-xl font-mono">
          状态: <span className={status.includes('成功') ? 'text-green-400' : 'text-yellow-400'}>{status}</span>
        </p>
      </div>
      
      <p className="mt-8 text-gray-400">
        技术栈: Next.js + Supabase + Tailwind CSS
      </p>
    </div>
  )
}