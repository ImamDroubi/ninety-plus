import { Route, Routes } from "react-router-dom";
import Home from "./components/views/Home";
import MainLayout from "./components/layouts/MainLayout";
import SignIn from "./components/views/SignIn";
import SignUp from "./components/views/SignUp";
import NotFound from "./components/views/NotFound";
import CoursePage from "./components/views/CoursePage";
import Courses from "./components/views/Courses";
import Course from "./components/views/Course";
import Student from "./components/views/Student";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="course-page/:id" element={<CoursePage />} />
          <Route path="courses" element={<Courses />} />
          <Route path="course/:id" element={<Course />} />
          <Route path="student/:id" element={<Student />} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/*" element={<MainLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
