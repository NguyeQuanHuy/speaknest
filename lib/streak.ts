// lib/streak.ts
import { createClient } from "@/lib/supabase"

export async function addXP(xp: number, words: number = 0, lessons: number = 0) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const today = new Date().toISOString().split("T")[0]

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (supabase.from("daily_progress") as any).upsert({
    user_id: user.id,
    date: today,
    xp_earned: xp,
    words_learned: words,
    lessons_completed: lessons,
  }, { onConflict: "user_id,date" })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
await (supabase.rpc as any)("update_streak", { p_user_id: user.id })}

export async function getUserStats() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await (supabase.from("profiles") as any)
    .select("streak, total_xp, level, full_name, last_study_date")
    .eq("id", user.id)
    .single()

  return data
}

export async function getWeeklyProgress() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    .toISOString().split("T")[0]

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await (supabase.from("daily_progress") as any)
    .select("*")
    .eq("user_id", user.id)
    .gte("date", sevenDaysAgo)
    .order("date", { ascending: true })

  return data ?? []
}