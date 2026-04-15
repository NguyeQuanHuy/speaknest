// ============================================================
// SpeakNest – Global TypeScript Types
// ============================================================

export type Level = "beginner" | "elementary" | "intermediate" | "upper-intermediate" | "advanced";
export type CourseCategory = "conversation" | "ielts" | "toeic" | "business" | "beginner" | "travel";

// ---------- User ----------
export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  level: Level;
  streak: number;
  total_xp: number;
  plan: "free" | "pro";
  plan_expires_at?: string;
  created_at: string;
}

// ---------- Course ----------
export interface Course {
  id: string;
  title: string;
  description: string;
  category: CourseCategory;
  level: Level;
  total_lessons: number;
  thumbnail_emoji: string;
  banner_gradient: string;
  is_free: boolean;
  tags: string[];
}

export interface UserCourse {
  course: Course;
  completed_lessons: number;
  last_accessed: string;
  progress_percent: number;
}

// ---------- Lesson ----------
export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  description: string;
  order: number;
  duration_minutes: number;
  type: "video" | "reading" | "quiz" | "listening" | "speaking";
  is_free: boolean;
  content_url?: string;
}

// ---------- Vocabulary ----------
export interface VocabTopic {
  id: string;
  name: string;
  emoji: string;
  word_count: number;
  color: string;
}

export interface VocabWord {
  id: string;
  topic_id: string;
  word: string;
  phonetic: string;
  meaning_vi: string;       // Vietnamese meaning
  meaning_en: string;       // English definition
  example_sentence: string;
  audio_url?: string;
  image_url?: string;
  level: Level;
}

export interface FlashcardSession {
  words: VocabWord[];
  current_index: number;
  known: string[];    // word ids marked as known
  again: string[];    // word ids to review again
}

// ---------- Progress ----------
export interface DailyProgress {
  date: string;           // YYYY-MM-DD
  xp_earned: number;
  lessons_completed: number;
  words_learned: number;
  minutes_studied: number;
}

export interface UserStats {
  total_words_learned: number;
  total_hours_studied: number;
  total_lessons_completed: number;
  average_quiz_score: number;
  current_streak: number;
  longest_streak: number;
  weekly_progress: DailyProgress[];
}

// ---------- Pricing ----------
export interface PricingPlan {
  id: string;
  name: string;
  price_vnd: number;
  original_price_vnd?: number;
  duration_months: number;
  icon: string;
  description: string;
  features: string[];
  is_popular: boolean;
  badge?: string;
}

// ---------- Blog ----------
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail_url?: string;
  category: "grammar" | "vocabulary" | "tips" | "culture" | "ielts" | "toeic";
  author: string;
  published_at: string;
  read_time_minutes: number;
}

// ---------- Testimonial ----------
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar_initial: string;
  avatar_gradient: string;
  text: string;
  rating: number;
  achievement?: string;   // e.g. "IELTS 7.0"
}
