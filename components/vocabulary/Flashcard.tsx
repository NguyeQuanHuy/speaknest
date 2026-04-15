"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { VocabWord } from "@/types"

interface Props { words: VocabWord[]; onBack: () => void; topicName: string }

export function Flashcard({ words, onBack, topicName }: Props) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [known, setKnown] = useState<string[]>([])

  const current = words[index % words.length]
  const progress = ((index % words.length) + 1) / words.length * 100

  const handleAction = (action: "know" | "again" | "skip") => {
    if (action === "know") setKnown(k => [...k, current.id])
    setFlipped(false)
    setTimeout(() => setIndex(i => i + 1), 150)
  }

  return (
    <div className="max-w-xl mx-auto px-8 py-10">
      <div className="flex justify-between items-center mb-3">
        <button onClick={onBack} className="bg-gray-100 border-none px-4 py-2 rounded-xl font-bold cursor-pointer text-sm hover:bg-gray-200 transition-colors">
          ← Quay lại
        </button>
        <span className="text-sm text-gray-400 font-semibold">{topicName} · {(index % words.length) + 1}/{words.length}</span>
      </div>

      {/* Progress */}
      <div className="h-1.5 rounded-full bg-gray-200 mb-6 overflow-hidden">
        <motion.div className="h-full rounded-full" style={{background:"linear-gradient(90deg,#4A90E2,#FF7043)"}}
          animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
      </div>

      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div key={index} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
          onClick={() => !flipped && setFlipped(true)}
          className={`bg-white rounded-3xl p-12 text-center border-2 min-h-52 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-[1.01] ${flipped ? "border-[#4A90E2]" : "border-[#B8D9F8]"}`}
          style={{ boxShadow: "0 8px 40px rgba(74,144,226,0.18)" }}>
          <div className="font-head text-4xl font-extrabold text-[#2563EB] mb-2">{current.word}</div>
          <div className="text-gray-400 text-base mb-3">{current.phonetic} 🔊</div>
          {flipped ? (
            <>
              <div className="text-xl font-semibold text-gray-800 mb-3">{current.meaning_vi}</div>
              <div className="text-sm text-gray-500 italic">💬 {current.example_sentence}</div>
            </>
          ) : (
            <div className="text-sm text-gray-400 mt-3">👆 Nhấn vào thẻ để xem nghĩa</div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Action buttons */}
      {flipped && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="flex gap-3 justify-center mt-5">
          <button onClick={() => handleAction("again")} className="px-6 py-2.5 rounded-xl font-bold text-sm cursor-pointer border-none bg-red-50 text-red-700 hover:bg-red-500 hover:text-white transition-colors">😰 Học lại</button>
          <button onClick={() => handleAction("skip")} className="px-6 py-2.5 rounded-xl font-bold text-sm cursor-pointer border-none bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">⏭ Bỏ qua</button>
          <button onClick={() => handleAction("know")} className="px-6 py-2.5 rounded-xl font-bold text-sm cursor-pointer border-none bg-green-50 text-green-700 hover:bg-green-500 hover:text-white transition-colors">✅ Đã nhớ</button>
        </motion.div>
      )}

      <div className="text-center mt-4 text-xs text-gray-400">✅ Đã nhớ: {known.length} từ</div>
    </div>
  )
}
