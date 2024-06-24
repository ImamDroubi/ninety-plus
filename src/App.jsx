import { Route, Routes } from "react-router-dom";
import HomePage from "./components/views/HomePage";
import MainLayout from "./components/layouts/MainLayout";
import SignInPage from "./components/views/SignInPage";
import SignUpPage from "./components/views/SignUpPage";
import NotFoundPage from "./components/views/NotFoundPage";
import CourseContentPage from "./components/views/CourseContentPage";
import CoursesPage from "./components/views/CoursesPage";
import CourseInfoPage from "./components/views/CourseInfoPage";
import StudentPage from "./components/views/StudentPage";
import TeacherPageLayout from "./components/layouts/TeacherPageLayout";
import TeacherDashboardPage from "./components/views/teacherPageViews/TeacherDashboardPage";
import TeacherCoursesPage from "./components/views/teacherPageViews/TeacherCoursesPage";
import TeacherCreateCoursePage from "./components/views/teacherPageViews/TeacherCreateCoursePage";
import TeacherEarningsPage from "./components/views/teacherPageViews/TeacherEarningsPage";
import TeacherMessagesPage from "./components/views/teacherPageViews/TeacherMessagesPage";
import TeacherSettingsPage from "./components/views/teacherPageViews/TeacherSettingsPage";
import VerifyEmailPage from "./components/views/VerifyEmailPage";
import ForgotPasswordEmailPage from "./components/views/ForgotPasswordEmailPage";
import ForgotPasswordPage from "./components/views/ForgotPasswordPage";
import ResetPasswordPage from "./components/views/ResetPasswordPage";
import { CreateCourseContextProvider } from "./contexts/CreateCourseContext";
import TeacherEditCoursePage from "./components/views/teacherPageViews/TeacherEditCoursePage";
import GuestLayout from "./components/layouts/GuestLayout";
import NotVerifiedLayout from "./components/layouts/NotVerifiedLayout";
import AdminDashboard from "./components/layouts/AdminDashboard";
import TeachersSection from "./components/views/adminPageViews/TeachersSection";
import StudentsSection from "./components/views/adminPageViews/StudentsSection";
import CoursesReviewSections from "./components/views/adminPageViews/CoursesReviewSections";
import CoursesSection from "./components/views/adminPageViews/coursesSection";
import WithdrawSection from "./components/views/adminPageViews/WithdrawSection";
import AddCourseSection from "./components/views/adminPageViews/AddCourseSection";
import GeneralAddingSection from "./components/views/adminPageViews/GeneralAddingSection";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/not-found" element={<NotFoundPage />} />

          <Route path="course-page/:id" element={<CourseContentPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="course/:id" element={<CourseInfoPage />} />
          <Route path="student/:id" element={<StudentPage />} />
        </Route>
        <Route path="/teacher/:id/" element={<TeacherPageLayout />}>
          <Route path="dashboard" element={<TeacherDashboardPage />} />
          <Route path="courses" element={<TeacherCoursesPage />} />
          <Route path="courses/:id/" element={<TeacherEditCoursePage />} />
          <Route
            path="create-course"
            element={
              <CreateCourseContextProvider>
                <TeacherCreateCoursePage />
              </CreateCourseContextProvider>
            }
          />
          <Route path="earnings" element={<TeacherEarningsPage />} />
          <Route path="messages" element={<TeacherMessagesPage />} />
          <Route path="settings" element={<TeacherSettingsPage />} />
        </Route>

        <Route path="/admin/" element={<AdminDashboard />}>
          <Route path="teachers-section" element={<TeachersSection />} />
          <Route path="students-section" element={<StudentsSection />} />
          <Route path="courses-section" element={<CoursesSection />} />
          <Route
            path="general-adding-section"
            element={<GeneralAddingSection />}
          />
          <Route
            path="courses-review-section"
            element={<CoursesReviewSections />}
          />
          <Route path="withdraw-section" element={<WithdrawSection />} />
          <Route path="add-course-section" element={<AddCourseSection />} />
        </Route>

        <Route path="/" element={<GuestLayout />}>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>
        <Route path="/" element={<NotVerifiedLayout />}>
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route
            path="/forgot-password-email"
            element={<ForgotPasswordEmailPage />}
          />
        </Route>
        <Route path="/*" element={<MainLayout />}>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
