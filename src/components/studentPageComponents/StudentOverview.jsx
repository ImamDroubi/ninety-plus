import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faSpinner,
  faTrophy,
  faChalkboardUser,
} from "@fortawesome/free-solid-svg-icons";
import CourseCard from "../cards/CourseCard";
import MathBook from "../../assets/images/book-covers/math-scientific.jpg";
import { Button, CircularProgress } from "@mui/material";
import { useProfileInfo } from "../../hooks/useProfileInfo";
export default function StudentOverview() {
  const { user } = useProfileInfo();
  const icons = {
    enrolled: <FontAwesomeIcon icon={faVideo} />,
    active: <FontAwesomeIcon icon={faSpinner} />,
    completed: <FontAwesomeIcon icon={faTrophy} />,
    instructors: <FontAwesomeIcon icon={faChalkboardUser} />,
  };
  if (!user) return <CircularProgress />;
  return (
    <>
      <section className="mb-4">
        <h2 className="mb-3 text-lg font-semibold">نظرة عامة</h2>
        <div className="flex justify-between boxes flex-col sm:flex-row flex-wrap gap-2">
          <div className="box bg-primary-100 p-2 flex w-full sm:w-[15rem] items-center gap-3">
            <div className="flex items-center justify-center w-6 h-6 text-xl logo bg-gray-white text-primary-500">
              {icons.enrolled}
            </div>
            <div className="flex flex-col text">
              <h3 className="text-2xl text-gray-900">{user.courses?.length}</h3>
              <p className="text-sm text-gray-700">دورة مسجلة</p>
            </div>
          </div>

          <div className="box bg-secondary-100 p-2 flex w-full sm:w-[15rem] items-center gap-3">
            <div className="flex items-center justify-center w-6 h-6 text-xl logo bg-gray-white text-secondary-500">
              {icons.active}
            </div>
            <div className="flex flex-col text">
              <h3 className="text-2xl text-gray-900">{user.activeCourses}</h3>
              <p className="text-sm text-gray-700">دورة حالية</p>
            </div>
          </div>

          <div className="box bg-success-100 p-2 flex w-full sm:w-[15rem] items-center gap-3">
            <div className="flex items-center justify-center w-6 h-6 text-xl logo bg-gray-white text-success-500">
              {icons.completed}
            </div>
            <div className="flex flex-col text">
              <h3 className="text-2xl text-gray-900">
                {user.completedCourses}
              </h3>
              <p className="text-sm text-gray-700">دورة مكتملة</p>
            </div>
          </div>

          <div className="box bg-warning-100 p-2 flex w-full sm:w-[15rem] items-center gap-3">
            <div className="flex items-center justify-center w-6 h-6 text-xl logo bg-gray-white text-warning-500">
              {icons.instructors}
            </div>
            <div className="flex flex-col text">
              <h3 className="text-2xl text-gray-900">
                {user.coursesInstructors}
              </h3>
              <p className="text-sm text-gray-700">معلم</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <h2 className="mb-3 text-lg font-semibold">
          أكمل متابعة الدورات, {user.first_name}
        </h2>
        <div className="flex justify-between lectures flex-col gap-2 sm:flex-row flex-wrap">
          {user.courses?.slice(0, 3).map((course, key) => {
            return <CourseCard course={course} key={key} />;
          })}
        </div>
      </section>
    </>
  );
}
