export type UserRole = 'student' | 'tutor' | 'admin'

export interface Profile {
  id: string // UUID, matches auth.users.id
  full_name: string | null
  email: string | null
  phone: string | null
  avatar_url: string | null
  role: UserRole
  status: 'active' | 'inactive' | 'suspended'
  created_at: string
  updated_at: string
}

export interface StudentProfile {
  id: string // UUID, FK to profiles.id
  profile_id: string
  student_id: string | null
  grade_level: string | null
  date_of_birth: string | null
  address: string | null
  created_at: string
  updated_at: string
}

export interface TutorProfile {
  id: string
  profile_id: string
  tutor_id: string | null
  bio: string | null
  specialization: string | null
  qualification: string | null
  experience_years: number | null
  hourly_rate: number | null
  is_verified: boolean
  created_at: string
  updated_at: string
}

export type CourseStatus = 'draft' | 'published' | 'archived' | 'pending_review' | 'unpublished'
export type ModuleStatus = 'draft' | 'published'
export type LessonType = 'video' | 'text' | 'interactive' | 'mixed' | 'recorded' | 'live' | 'recorded_and_live' | 'reading'

export interface CourseCategory {
  id: string
  name: string
  slug: string
  description: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Course {
  id: string
  title: string
  slug: string
  description: string | null
  thumbnail_url: string | null
  category_id: string | null
  tutor_id: string
  price: number | null
  is_free: boolean
  status: CourseStatus
  enrollment_count: number
  duration_hours: number | null
  level: 'beginner' | 'intermediate' | 'advanced' | null
  prerequisites: string | null
  learning_outcomes: string[] | null
  created_at: string
  updated_at: string
}

export interface Module {
  id: string
  course_id: string
  title: string
  description: string | null
  order: number
  status: ModuleStatus
  created_at: string
  updated_at: string
}

export interface Lesson {
  id: string
  module_id: string
  title: string
  description: string | null
  order: number
  lesson_type: LessonType
  youtube_video_url: string | null
  youtube_video_id: string | null
  duration_minutes: number | null
  is_preview: boolean
  is_published: boolean
  created_at: string
  updated_at: string
}

export type EnrollmentStatus = 'active' | 'completed' | 'cancelled' | 'expired'

export interface CourseEnrollment {
  id: string
  course_id: string
  student_id: string
  enrollment_date: string
  completion_date: string | null
  progress_percentage: number
  status: EnrollmentStatus
  created_at: string
  updated_at: string
}

export type MaterialType =
  | 'lecture_note'
  | 'practice_questions'
  | 'solution'
  | 'presentation'
  | 'additional_resource'

export interface LessonMaterial {
  id: string
  lesson_id: string
  title: string
  type: MaterialType
  google_drive_url: string
  order: number
  is_published: boolean
  created_at: string
  updated_at: string
}

export type LiveClassPlatform = 'youtube_live' | 'google_meet' | 'zoom'
export type LiveClassStatus = 'scheduled' | 'live' | 'completed' | 'cancelled'

export interface LiveClass {
  id: string
  lesson_id: string | null
  course_id: string | null
  title: string
  description: string | null
  platform: LiveClassPlatform
  meeting_url: string
  scheduled_date: string
  start_time: string | null
  end_time: string | null
  instructions: string | null
  status: LiveClassStatus
  tutor_id: string
  max_participants: number | null
  recording_url: string | null
  created_at: string
  updated_at: string
}

export interface LessonProgress {
  id: string
  lesson_id: string
  student_id: string
  is_completed: boolean
  completed_at: string | null
  watch_time_minutes: number
  last_accessed_at: string
  created_at: string
  updated_at: string
}

export type NotificationType = 'info' | 'success' | 'warning' | 'error'

export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  type: NotificationType
  is_read: boolean
  action_url: string | null
  created_at: string
}

export interface Announcement {
  id: string
  title: string
  content: string
  is_published: boolean
  target_roles: UserRole[] | null
  course_id: string | null
  published_at: string | null
  created_by: string
  created_at: string
  updated_at: string
}

export interface AuditLog {
  id: string
  user_id: string | null
  action: string
  table_name: string | null
  record_id: string | null
  old_values: Record<string, unknown> | null
  new_values: Record<string, unknown> | null
  ip_address: string | null
  user_agent: string | null
  created_at: string
}

export type QuestionType = 'multiple_choice' | 'true_false'
export type QuizStatus = 'draft' | 'published' | 'archived'
export type AttemptStatus = 'in_progress' | 'submitted'

export interface Quiz {
  id: string
  title: string
  description: string | null
  course_id: string | null
  module_id: string | null
  lesson_id: string | null
  tutor_id: string
  total_marks: number
  passing_marks: number | null
  time_limit_minutes: number | null
  attempts_allowed: number | null
  status: QuizStatus
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface QuizQuestion {
  id: string
  quiz_id: string
  question_text: string
  question_type: QuestionType
  options: string[] | null
  correct_answer: string
  marks: number
  explanation: string | null
  order: number
  created_at: string
  updated_at: string
}

export interface QuizAttempt {
  id: string
  quiz_id: string
  student_id: string
  attempt_number: number
  started_at: string
  submitted_at: string | null
  score: number | null
  total_marks: number | null
  percentage: number | null
  status: AttemptStatus
  created_at: string
  updated_at: string
}

export interface QuizAnswer {
  id: string
  attempt_id: string
  question_id: string
  selected_answer: string | null
  is_correct: boolean | null
  marks_awarded: number | null
  created_at: string
  updated_at: string
}
