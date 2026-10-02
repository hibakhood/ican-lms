-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function to get current user role
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (id = auth.uid());

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (id = auth.uid());

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.get_user_role() = 'admin');

CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE USING (public.get_user_role() = 'admin');

-- Student profiles
CREATE POLICY "Students can manage own student profile" ON public.student_profiles
  FOR ALL USING (profile_id = auth.uid()) WITH CHECK (profile_id = auth.uid());

CREATE POLICY "Admins can view all student profiles" ON public.student_profiles
  FOR SELECT USING (public.get_user_role() = 'admin');

-- Tutor profiles
CREATE POLICY "Tutors can manage own tutor profile" ON public.tutor_profiles
  FOR ALL USING (profile_id = auth.uid()) WITH CHECK (profile_id = auth.uid());

CREATE POLICY "Admins can view all tutor profiles" ON public.tutor_profiles
  FOR SELECT USING (public.get_user_role() = 'admin');

-- Course categories - readable by all authenticated, writable by admin
CREATE POLICY "Anyone can view active categories" ON public.course_categories
  FOR SELECT USING (is_active = TRUE OR public.get_user_role() = 'admin');

CREATE POLICY "Admins can manage categories" ON public.course_categories
  FOR ALL USING (public.get_user_role() = 'admin') WITH CHECK (public.get_user_role() = 'admin');

-- Courses
CREATE POLICY "Published courses readable by all authenticated" ON public.courses
  FOR SELECT USING (status = 'published' OR auth.uid() = tutor_id OR public.get_user_role() = 'admin');

CREATE POLICY "Tutors can manage own courses" ON public.courses
  FOR ALL USING (auth.uid() = tutor_id) WITH CHECK (auth.uid() = tutor_id);

CREATE POLICY "Admins can manage all courses" ON public.courses
  FOR ALL USING (public.get_user_role() = 'admin') WITH CHECK (public.get_user_role() = 'admin');

-- Modules
CREATE POLICY "Modules readable with course access" ON public.modules
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.courses c
      WHERE c.id = modules.course_id
      AND (c.status = 'published' OR c.tutor_id = auth.uid() OR public.get_user_role() = 'admin')
    )
  );

CREATE POLICY "Tutors can manage own course modules" ON public.modules
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.courses c WHERE c.id = modules.course_id AND c.tutor_id = auth.uid())
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM public.courses c WHERE c.id = modules.course_id AND c.tutor_id = auth.uid())
  );

CREATE POLICY "Admins can manage all modules" ON public.modules
  FOR ALL USING (public.get_user_role() = 'admin') WITH CHECK (public.get_user_role() = 'admin');

-- Lessons
CREATE POLICY "Lessons readable with access" ON public.lessons
  FOR SELECT USING (
    is_published OR
    EXISTS (SELECT 1 FROM public.modules m JOIN public.courses c ON c.id = m.course_id WHERE m.id = lessons.module_id AND c.tutor_id = auth.uid()) OR
    public.get_user_role() = 'admin' OR
    EXISTS (
      SELECT 1 FROM public.course_enrollments e
      JOIN public.modules m ON m.course_id = e.course_id
      WHERE m.id = lessons.module_id AND e.student_id = auth.uid() AND e.status = 'active'
    )
  );

CREATE POLICY "Tutors can manage own lessons" ON public.lessons
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.modules m JOIN public.courses c ON c.id = m.course_id WHERE m.id = lessons.module_id AND c.tutor_id = auth.uid())
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM public.modules m JOIN public.courses c ON c.id = m.course_id WHERE m.id = lessons.module_id AND c.tutor_id = auth.uid())
  );

CREATE POLICY "Admins can manage all lessons" ON public.lessons
  FOR ALL USING (public.get_user_role() = 'admin') WITH CHECK (public.get_user_role() = 'admin');

-- Enrollments
CREATE POLICY "Students can view own enrollments" ON public.course_enrollments
  FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Students can enroll themselves" ON public.course_enrollments
  FOR INSERT WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students cannot modify enrollment status/fields except own context prevented" ON public.course_enrollments
  FOR UPDATE USING (student_id = auth.uid() AND status IN ('active', 'completed')) WITH CHECK (student_id = auth.uid());

CREATE POLICY "Admins and tutors can view enrollments" ON public.course_enrollments
  FOR SELECT USING (
    public.get_user_role() = 'admin' OR
    EXISTS (SELECT 1 FROM public.courses c WHERE c.id = course_enrollments.course_id AND c.tutor_id = auth.uid())
  );

CREATE POLICY "Admins can manage all enrollments" ON public.course_enrollments
  FOR ALL USING (public.get_user_role() = 'admin') WITH CHECK (public.get_user_role() = 'admin');

-- Lesson materials
CREATE POLICY "Materials readable if lesson accessible" ON public.lesson_materials
  FOR SELECT USING (
    is_published AND (
      EXISTS (
        SELECT 1 FROM public.lessons l
        JOIN public.modules m ON m.id = l.module_id
        JOIN public.courses c ON c.id = m.course_id
        WHERE l.id = lesson_materials.lesson_id
        AND (c.status = 'published' OR c.tutor_id = auth.uid() OR public.get_user_role() = 'admin' OR
             EXISTS (SELECT 1 FROM public.course_enrollments e WHERE e.course_id = c.id AND e.student_id = auth.uid() AND e.status = 'active'))
      )
    ) OR
    EXISTS (SELECT 1 FROM public.lessons l JOIN public.modules m ON m.id = l.module_id JOIN public.courses c ON c.id = m.course_id WHERE l.id = lesson_materials.lesson_id AND c.tutor_id = auth.uid()) OR
    public.get_user_role() = 'admin'
  );

CREATE POLICY "Tutors can manage own lesson materials" ON public.lesson_materials
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.lessons l JOIN public.modules m ON m.id = l.module_id JOIN public.courses c ON c.id = m.course_id WHERE l.id = lesson_materials.lesson_id AND c.tutor_id = auth.uid())
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM public.lessons l JOIN public.modules m ON m.id = l.module_id JOIN public.courses c ON c.id = m.course_id WHERE l.id = lesson_materials.lesson_id AND c.tutor_id = auth.uid())
  );

CREATE POLICY "Admins can manage all materials" ON public.lesson_materials
  FOR ALL USING (public.get_user_role() = 'admin') WITH CHECK (public.get_user_role() = 'admin');

-- Live classes
CREATE POLICY "Live classes readable by enrolled or owner or admin" ON public.live_classes
  FOR SELECT USING (
    auth.uid() = tutor_id OR
    public.get_user_role() = 'admin' OR
    EXISTS (SELECT 1 FROM public.course_enrollments e WHERE e.course_id = live_classes.course_id AND e.student_id = auth.uid() AND e.status = 'active')
  );

CREATE POLICY "Tutors can manage own live classes" ON public.live_classes
  FOR ALL USING (auth.uid() = tutor_id) WITH CHECK (auth.uid() = tutor_id);

CREATE POLICY "Admins can manage all live classes" ON public.live_classes
  FOR ALL USING (public.get_user_role() = 'admin') WITH CHECK (public.get_user_role() = 'admin');

-- Lesson progress
CREATE POLICY "Students manage own progress" ON public.lesson_progress
  FOR ALL USING (student_id = auth.uid()) WITH CHECK (student_id = auth.uid());

CREATE POLICY "Tutors and admins can view progress" ON public.lesson_progress
  FOR SELECT USING (
    public.get_user_role() = 'admin' OR
    EXISTS (
      SELECT 1 FROM public.lessons l
      JOIN public.modules m ON m.id = l.module_id
      JOIN public.courses c ON c.id = m.course_id
      WHERE l.id = lesson_progress.lesson_id AND c.tutor_id = auth.uid()
    )
  );

-- Notifications
CREATE POLICY "Users view own notifications" ON public.notifications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users update own notifications" ON public.notifications
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Admins can create notifications" ON public.notifications
  FOR INSERT WITH CHECK (public.get_user_role() = 'admin');

-- Announcements
CREATE POLICY "Published announcements readable" ON public.announcements
  FOR SELECT USING (
    is_published OR
    created_by = auth.uid() OR
    public.get_user_role() = 'admin'
  );

CREATE POLICY "Admins and tutors can manage announcements" ON public.announcements
  FOR ALL USING (public.get_user_role() = 'admin' OR public.get_user_role() = 'tutor') WITH CHECK (public.get_user_role() = 'admin' OR public.get_user_role() = 'tutor');

-- Audit logs
CREATE POLICY "Admins can view audit logs" ON public.audit_logs
  FOR SELECT USING (public.get_user_role() = 'admin');

CREATE POLICY "System can insert audit logs" ON public.audit_logs
  FOR INSERT WITH CHECK (true);

-- Quizzes
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_answers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Quizzes readable if published or owner/admin" ON public.quizzes
  FOR SELECT USING (
    is_published OR auth.uid() = tutor_id OR public.get_user_role() = 'admin' OR
    EXISTS (SELECT 1 FROM public.course_enrollments e WHERE e.course_id = quizzes.course_id AND e.student_id = auth.uid() AND e.status = 'active')
  );

CREATE POLICY "Tutors manage own quizzes" ON public.quizzes
  FOR ALL USING (auth.uid() = tutor_id) WITH CHECK (auth.uid() = tutor_id);

CREATE POLICY "Admins manage quizzes" ON public.quizzes
  FOR ALL USING (public.get_user_role() = 'admin') WITH CHECK (public.get_user_role() = 'admin');

CREATE POLICY "Quiz questions readable with quiz access" ON public.quiz_questions
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.quizzes q WHERE q.id = quiz_questions.quiz_id AND (q.is_published OR q.tutor_id = auth.uid() OR public.get_user_role() = 'admin'))
  );

CREATE POLICY "Tutors manage own quiz questions" ON public.quiz_questions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.quizzes q WHERE q.id = quiz_questions.quiz_id AND q.tutor_id = auth.uid())
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM public.quizzes q WHERE q.id = quiz_questions.quiz_id AND q.tutor_id = auth.uid())
  );

CREATE POLICY "Admins manage quiz questions" ON public.quiz_questions
  FOR ALL USING (public.get_user_role() = 'admin') WITH CHECK (public.get_user_role() = 'admin');

CREATE POLICY "Students manage own attempts" ON public.quiz_attempts
  FOR ALL USING (student_id = auth.uid()) WITH CHECK (student_id = auth.uid());

CREATE POLICY "Tutors/admins view attempts for own courses" ON public.quiz_attempts
  FOR SELECT USING (
    public.get_user_role() = 'admin' OR
    EXISTS (SELECT 1 FROM public.quizzes q WHERE q.id = quiz_attempts.quiz_id AND q.tutor_id = auth.uid())
  );

CREATE POLICY "Students manage own answers" ON public.quiz_answers
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.quiz_attempts a WHERE a.id = quiz_answers.attempt_id AND a.student_id = auth.uid())
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM public.quiz_attempts a WHERE a.id = quiz_answers.attempt_id AND a.student_id = auth.uid())
  );

CREATE POLICY "Tutors/admins view answers" ON public.quiz_answers
  FOR SELECT USING (
    public.get_user_role() = 'admin' OR
    EXISTS (SELECT 1 FROM public.quiz_attempts a JOIN public.quizzes q ON q.id = a.quiz_id WHERE a.id = quiz_answers.attempt_id AND q.tutor_id = auth.uid())
  );
