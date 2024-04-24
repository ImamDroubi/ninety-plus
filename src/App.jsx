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
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/forgot-password-email" element={<ForgotPasswordEmailPage />} />
          <Route path="course-page/:id" element={<CourseContentPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="course/:id" element={<CourseInfoPage />} />
          <Route path="student/:id" element={<StudentPage />} />
        </Route>
        <Route path="/teacher/:id/" element={<TeacherPageLayout />}>
          <Route path="dashboard" element={<TeacherDashboardPage />} />
          <Route path="courses" element={<TeacherCoursesPage />} />
          <Route path="create-course" element={<TeacherCreateCoursePage />} />
          <Route path="earnings" element={<TeacherEarningsPage />} />
          <Route path="messages" element={<TeacherMessagesPage />} />
          <Route path="settings" element={<TeacherSettingsPage />} />
        </Route>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/*" element={<MainLayout />}>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
