"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { VOCAB_TOPICS, SAMPLE_FLASHCARDS } from "@/lib/data"
import { Flashcard } from "./Flashcard"

export function VocabHome() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)

  if (selectedTopic) {
    return <Flashcard words={SAMPLE_FLASHCARDS} onBack={() => setSelectedTopic(null)} topicName={VOCAB_TOPICS.find(t=>t.id===selectedTopic)?.name ?? ""} />
  }

  return (
    <div className="max-w-6xl mx-auto px-8 py-10">
      <h2 className="font-head text-xl font-extrabold mb-1">Chọn chủ đề từ vựng</h2>
      <p className="text-sm text-gray-400 mb-6">Học theo chủ đề bạn quan tâm, nhớ lâu hơn!</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-10">
        {VOCAB_TOPICS.map((t, i) => (
          <motion.button key={t.id} onClick={() => setSelectedTopic(t.id)}
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.04 }}
            className="bg-white rounded-2xl p-5 text-center border border-gray-200 cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all hover:border-[#B8D9F8]">
            <div className="text-3xl mb-2.5">{t.emoji}</div>
            <div className="font-bold text-sm mb-1">{t.name}</div>
            <div className="text-xs text-gray-400">{t.word_count} từ</div>
          </motion.button>
        ))}
      </div>
      <div className="rounded-2xl p-6 flex items-center justify-between flex-wrap gap-4"
           style={{background:"linear-gradient(135deg,#EBF4FF,#FFF3F0)"}}>
        <div>
          <div className="font-head text-lg font-extrabold mb-1">📊 Chế độ ôn tập thông minh</div>
          <div className="text-sm text-gray-600">Spaced Repetition – ôn đúng từ sắp quên, nhớ lâu gấp 3 lần!</div>
        </div>
        <button onClick={() => setSelectedTopic("sports")}
          className="text-white font-bold px-6 py-3 rounded-2xl cursor-pointer border-none"
          style={{background:"linear-gradient(135deg,#4A90E2,#2563EB)",boxShadow:"0 4px 18px rgba(74,144,226,0.4)"}}>
          Bắt đầu ôn tập →
        </button>
      </div>
    </div>
  )
}
