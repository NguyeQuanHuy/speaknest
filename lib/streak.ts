import { createClient } from "@/lib/supabase"

export async function addXP(xp: number, words: number = 0, lessons: number = 0) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase.from("daily_progress").upsert({
    user_id: user.id,
    date: new Date().toISOString().split("T")[0],
    xp_earned: xp,
    words_learned: words,
    lessons_completed: lessons,
  }, { onConflict: "user_id,date" })

  await supabase.rpc("update_streak", { p_user_id: user.id })
  await supabase.from("profiles")
    .update({ total_xp: xp })
    .eq("id", user.id)
}

export async function getUserStats() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from("profiles")
    .select("streak, total_xp, level, full_name, last_study_date")
    .eq("id", user.id)
    .single()

  return data
}

export async function getWeeklyProgress() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from("daily_progress")
    .select("*")
    .eq("user_id", user.id)
    .gte("date", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0])
    .order("date", { ascending: true })

  return data ?? []
}