import { Route, Routes } from "react-router-dom";
import HomePage from "./components/views/HomePage";
import MainLayout from "./components/layouts/MainLayout";
import SignInPage from "./components/views/SignInPage";
import SignUpPage from "./components/views/SignUpPage";
import NotFoundPage from "./components/views/NotFoundPage";
import CourseInfoPage from "./components/views/CourseInfoPage";
import CoursesPage from "./components/views/CoursesPage";
import CoursePage from "./components/views/CoursePage";
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

import AdminDashboardLayout from "./components/layouts/AdminDashboardLayout";
import AdminTeachersSection from "./components/views/adminPageViews/AdminTeachersSection";
import AdminStudentsSection from "./components/views/adminPageViews/AdminStudentsSection";
import AdminCoursesReviewSections from "./components/views/adminPageViews/AdminCoursesReviewSections";
import AdminCoursesSection from "./components/views/adminPageViews/AdminCoursesSection";
import AdminWithdrawSection from "./components/views/adminPageViews/AdminWithdrawSection";
import AdminAddCourseSection from "./components/views/adminPageViews/AdminAddCourseSection";
import AdminGeneralAddingSection from "./components/views/adminPageViews/AdminGeneralAddingSection";

import LiveStreamPage from "./components/views/LiveStreamPage";
import TeacherCreateLecturePage from "./components/views/teacherPageViews/TeacherCreateLecturePage";
import ProtectedRoute from "./components/other/ProtectedRoute";
import AdminBranchesSection from "./components/views/adminPageViews/AdminBranchesSection";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/not-found" element={<NotFoundPage />} />

          <Route path="course-info/:id" element={<CourseInfoPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="courses/:id" element={<CoursePage />} />
          <Route path="courses/:id/live" element={<LiveStreamPage />} />
          <Route
            path="student/:id"
            element={
              <ProtectedRoute>
                <StudentPage />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path="/teacher/:id/"
          element={
            <ProtectedRoute>
              <TeacherPageLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<TeacherDashboardPage />} />
          <Route path="create-lecture" element={<TeacherCreateLecturePage />} />
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

        <Route
          path="/admin/"
          element={
            <ProtectedRoute>
              <AdminDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="teachers-section" element={<AdminTeachersSection />} />
          <Route path="students-section" element={<AdminStudentsSection />} />
          <Route path="courses-section" element={<AdminCoursesSection />} />
          <Route path="withdraw-section" element={<AdminWithdrawSection />} />
          <Route
            path="general-adding-section"
            element={<AdminGeneralAddingSection />}
          />
          <Route path="branches-section" element={<AdminBranchesSection />} />

          {/* <Route
            path="courses-review-section"
            element={<AdminCoursesReviewSections />}
          /> */}
          {/* <Route path="add-course-section" element={<AdminAddCourseSection />} /> */}
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
