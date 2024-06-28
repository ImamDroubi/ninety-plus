import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faSpinner,
  faTrophy,
  faChalkboardUser,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import CourseCard from "../cards/CourseCard";
import MathBook from "../../assets/images/book-covers/math_book.jpg";
import { Button, CircularProgress } from "@mui/material";
import { useProfileInfo } from "../../hooks/useProfileInfo";
import { useEffect, useState } from "react";
import { combineCourses } from "../../utils/coursesFunctions";
import { useUserProfile } from "../../contexts/UserProfileContext";
export default function StudentOverview() {
  const { profileInfo, isLoading } = useUserProfile();
  const [courses, setCourses] = useState();
  useEffect(() => {
    if (profileInfo) {
      setCourses(combineCourses(profileInfo.courses));
    }
  }, [profileInfo]);
  const icons = {
    enrolled: <FontAwesomeIcon icon={faVideo} />,
    active: <FontAwesomeIcon icon={faSpinner} />,
    completed: <FontAwesomeIcon icon={faTrophy} />,
    draft: <FontAwesomeIcon icon={faClock} />,
  };
  if (isLoading) return <CircularProgress />;
  if (!profileInfo || !courses) return;
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
              <h3 className="text-2xl text-gray-900">{courses.length || 0}</h3>
              <p className="text-sm text-gray-700">دورة مسجلة</p>
            </div>
          </div>

          <div className="box bg-secondary-100 p-2 flex w-full sm:w-[15rem] items-center gap-3">
            <div className="flex items-center justify-center w-6 h-6 text-xl logo bg-gray-white text-secondary-500">
              {icons.active}
            </div>
            <div className="flex flex-col text">
              <h3 className="text-2xl text-gray-900">
                {profileInfo.courses.active?.length || 0}
              </h3>
              <p className="text-sm text-gray-700">دورة حالية</p>
            </div>
          </div>

          <div className="box bg-success-100 p-2 flex w-full sm:w-[15rem] items-center gap-3">
            <div className="flex items-center justify-center w-6 h-6 text-xl logo bg-gray-white text-success-500">
              {icons.completed}
            </div>
            <div className="flex flex-col text">
              <h3 className="text-2xl text-gray-900">
                {profileInfo.courses.over?.length || 0}
              </h3>
              <p className="text-sm text-gray-700">دورة مكتملة</p>
            </div>
          </div>

          <div className="box bg-warning-100 p-2 flex w-full sm:w-[15rem] items-center gap-3">
            <div className="flex items-center justify-center w-6 h-6 text-xl logo bg-gray-white text-warning-500">
              {icons.draft}
            </div>
            <div className="flex flex-col text">
              <h3 className="text-2xl text-gray-900">
                {profileInfo.courses.draft?.length || 0}
              </h3>
              <p className="text-sm text-gray-700">دورة لم تبدأ</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <h2 className="mb-3 text-lg font-semibold">
          أكمل متابعة الدورات, {profileInfo.first_name}
        </h2>
        <div className="flex justify-between lectures flex-col gap-2 sm:flex-row flex-wrap">
          {courses.slice(0, 3).map((course, key) => {
            return <CourseCard course={course} key={key} />;
          })}
        </div>
      </section>
    </>
  );
}
