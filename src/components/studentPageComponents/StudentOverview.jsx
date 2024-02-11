import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faSpinner,
  faTrophy,
  faChalkboardUser,
} from "@fortawesome/free-solid-svg-icons";
import CourseCard from "../cards/CourseCard";
import MathBook from "../../assets/images/book-covers/math-scientific.jpg";
import { Button } from "@mui/material";
export default function StudentOverview({ student }) {
  const icons = {
    enrolled: <FontAwesomeIcon icon={faVideo} />,
    active: <FontAwesomeIcon icon={faSpinner} />,
    completed: <FontAwesomeIcon icon={faTrophy} />,
    instructors: <FontAwesomeIcon icon={faChalkboardUser} />,
  };
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
              <h3 className="text-2xl text-gray-900">
                {student.enrolledCourses}
              </h3>
              <p className="text-sm text-gray-700">دورة مسجلة</p>
            </div>
          </div>

          <div className="box bg-secondary-100 p-2 flex w-full sm:w-[15rem] items-center gap-3">
            <div className="flex items-center justify-center w-6 h-6 text-xl logo bg-gray-white text-secondary-500">
              {icons.active}
            </div>
            <div className="flex flex-col text">
              <h3 className="text-2xl text-gray-900">
                {student.activeCourses}
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
                {student.completedCourses}
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
                {student.coursesInstructors}
              </h3>
              <p className="text-sm text-gray-700">معلم</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <h2 className="mb-3 text-lg font-semibold">
          أكمل متابعة الدورات, {student.name.split(" ")[0]}
        </h2>
        <div className="flex justify-between lectures flex-col gap-2 sm:flex-row flex-wrap">
          <div className="lecture w-full sm:w-[15rem] h-[20rem] border-2 border-gray-100">
            <div className="preview w-full h-[12rem] overflow-clip">
              <img src={MathBook} alt="" className="" />
            </div>
            <div className="p-1 border-b-2 info border-b-gray-100">
              <p className="mb-1 text-sm text-gray-600">
                رياضيات التوجيهي العلمي والصناعي
              </p>
              <h4 className="font-semibold text-gray-900">
                2. المصفوفات والمحددات
              </h4>
            </div>
            <div className="p-1 click">
              <Button
                variant="contained"
                disableElevation
                sx={{
                  backgroundColor: "rgb(255 238 232)",
                  color: "rgb(255 102 54)",
                  width: "100%",
                  borderRadius: "0px",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "rgb(255 102 54)",
                    color: "#fff",
                  },
                }}
              >
                مشاهدة الحصة
              </Button>
            </div>
          </div>
          <div className="lecture w-full sm:w-[15rem] h-[20rem] border-2 border-gray-100">
            <div className="preview w-full h-[12rem] overflow-clip">
              <img src={MathBook} alt="" className="" />
            </div>
            <div className="p-1 border-b-2 info border-b-gray-100">
              <p className="mb-1 text-sm text-gray-600">
                رياضيات التوجيهي العلمي والصناعي
              </p>
              <h4 className="font-semibold text-gray-900">
                2. المصفوفات والمحددات
              </h4>
            </div>
            <div className="p-1 click">
              <Button
                variant="contained"
                disableElevation
                sx={{
                  backgroundColor: "rgb(255 238 232)",
                  color: "rgb(255 102 54)",
                  width: "100%",
                  borderRadius: "0px",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "rgb(255 102 54)",
                    color: "#fff",
                  },
                }}
              >
                مشاهدة الحصة
              </Button>
            </div>
          </div>
          <div className="lecture w-full sm:w-[15rem] h-[20rem] border-2 border-gray-100">
            <div className="preview w-full h-[12rem] overflow-clip">
              <img src={MathBook} alt="" className="" />
            </div>
            <div className="p-1 border-b-2 info border-b-gray-100">
              <p className="mb-1 text-sm text-gray-600">
                رياضيات التوجيهي العلمي والصناعي
              </p>
              <h4 className="font-semibold text-gray-900">
                2. المصفوفات والمحددات
              </h4>
            </div>
            <div className="p-1 click">
              <Button
                variant="contained"
                disableElevation
                sx={{
                  backgroundColor: "rgb(255 238 232)",
                  color: "rgb(255 102 54)",
                  width: "100%",
                  borderRadius: "0px",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "rgb(255 102 54)",
                    color: "#fff",
                  },
                }}
              >
                مشاهدة الحصة
              </Button>
            </div>
          </div>
          <div className="lecture w-full sm:w-[15rem] h-[20rem] border-2 border-gray-100">
            <div className="preview w-full h-[12rem] overflow-clip">
              <img src={MathBook} alt="" className="" />
            </div>
            <div className="p-1 border-b-2 info border-b-gray-100">
              <p className="mb-1 text-sm text-gray-600">
                رياضيات التوجيهي العلمي والصناعي
              </p>
              <h4 className="font-semibold text-gray-900">
                2. المصفوفات والمحددات
              </h4>
            </div>
            <div className="p-1 click">
              <Button
                variant="contained"
                disableElevation
                sx={{
                  backgroundColor: "rgb(255 238 232)",
                  color: "rgb(255 102 54)",
                  width: "100%",
                  borderRadius: "0px",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "rgb(255 102 54)",
                    color: "#fff",
                  },
                }}
              >
                مشاهدة الحصة
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
