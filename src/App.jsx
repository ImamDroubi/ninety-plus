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
import TeacherDashboard from "./components/views/teacherPageViews/TeacherDashboard";
import TeacherCourses from "./components/views/teacherPageViews/TeacherCourses";
import TeacherCreateCourse from "./components/views/teacherPageViews/TeacherCreateCourse";
import TeacherEarnings from "./components/views/teacherPageViews/TeacherEarnings";
import TeacherMessages from "./components/views/teacherPageViews/TeacherMessages";
import TeacherSettings from "./components/views/teacherPageViews/TeacherSettings";
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
          <Route path="dashboard" element={<TeacherDashboard />} />
          <Route path="courses" element={<TeacherCourses />} />
          <Route path="create-course" element={<TeacherCreateCourse />} />
          <Route path="earnings" element={<TeacherEarnings />} />
          <Route path="messages" element={<TeacherMessages />} />
          <Route path="settings" element={<TeacherSettings />} />
        </Route>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/*" element={<MainLayout />}>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
