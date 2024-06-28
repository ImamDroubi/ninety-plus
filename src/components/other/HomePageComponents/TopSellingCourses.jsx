import { useEffect, useState } from "react";
import useGetResources from "../../../apiCalls/useGetResources";
import CourseCard from "../../cards/CourseCard";
import Container90 from "../../containers/Container90";
import { CircularProgress } from "@mui/material";

export default function TopSellingCourses() {
  const { data, isLoading } = useGetResources(
    "courses?sort['students_count']='desc'"
  );
  const [coursesList, setCoursesList] = useState([]);
  useEffect(() => {
    if (data) {
      setCoursesList(data.data.data.slice(0, 8));
    }
  }, [data]);
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="w-full py-5">
      <Container90>
        <div className="content w-full flex flex-col items-center">
          <h2 className="text-gray-900 font-semibold text-3xl  my-5">
            الدورات الأكثر مبيعاً
          </h2>
          <div className="w-11/12 justify-center grid grid-cols-4 gap-4 ">
            {/* {isLoading ? (
              <CircularProgress />
            ) : (
              coursesList.map((course, id) => {
                return (
                  <div
                    className="col-span-1 flex items-center justify-center"
                    key={id}
                  >
                    <CourseCard key={course.id} course={course} />
                  </div>
                );
              })
            )} */}
            {numbers.map((item) => {
              return <CourseCard />;
            })}
          </div>
        </div>
      </Container90>
    </div>
  );
}
