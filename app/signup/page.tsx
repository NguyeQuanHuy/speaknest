"use client"
import { useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState("")
  const supabase = createClient()

  const handleSignup = async () => {
    setLoading(true); setError("")
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: name } }
    })
    if (error) setError(error.message)
    else setDone(true)
    setLoading(false)
  }

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${location.origin}/auth/callback` }
    })
  }

  if (done) return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{background:"linear-gradient(160deg,#EBF4FF,#FFF3F0)"}}>
      <div className="bg-white rounded-3xl p-8 w-full max-w-md text-center border border-gray-200 shadow-xl">
        <div className="text-5xl mb-4">📧</div>
        <h2 className="font-head text-xl font-extrabold mb-2">Kiểm tra email!</h2>
        <p className="text-gray-600 text-sm">Mình đã gửi link xác nhận tới <strong>{email}</strong>. Nhấn vào link để kích hoạt tài khoản!</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{background:"linear-gradient(160deg,#EBF4FF,#FFF3F0)"}}>
      <div className="bg-white rounded-3xl p-8 w-full max-w-md border border-gray-200 shadow-xl">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🪺</div>
          <h1 className="font-head text-2xl font-extrabold">Tạo tài khoản miễn phí</h1>
          <p className="text-gray-400 text-sm mt-1">Bắt đầu hành trình tiếng Anh của bạn!</p>
        </div>
        {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}
        <button onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-gray-200 font-bold text-sm mb-4 cursor-pointer bg-white hover:bg-gray-50 transition-colors">
          <img src="https://www.google.com/favicon.ico" width={18} height={18} alt="Google" />
          Đăng ký bằng Google
        </button>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">hoặc</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <input placeholder="Họ tên của bạn" value={name} onChange={e => setName(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm mb-3 outline-none focus:border-[#4A90E2]" />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm mb-3 outline-none focus:border-[#4A90E2]" />
        <input type="password" placeholder="Mật khẩu (ít nhất 6 ký tự)" value={password} onChange={e => setPassword(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm mb-5 outline-none focus:border-[#4A90E2]" />
        <button onClick={handleSignup} disabled={loading}
          className="w-full py-3.5 rounded-xl text-white font-bold text-sm cursor-pointer border-none"
          style={{background:"linear-gradient(135deg,#4A90E2,#2563EB)"}}>
          {loading ? "Đang tạo tài khoản..." : "Đăng ký miễn phí 🚀"}
        </button>
        <p className="text-center text-sm text-gray-400 mt-5">
          Đã có tài khoản?{" "}
          <Link href="/login" className="text-[#2563EB] font-bold no-underline">Đăng nhập</Link>
        </p>
      </div>
    </div>
  )
}