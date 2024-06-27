import { useEffect, useState } from "react";
import useGetResources from "../../../apiCalls/useGetResources";
import CourseCard from "../../cards/CourseCard";
import Container90 from "../../containers/Container90";
import { CircularProgress } from "@mui/material";

export default function MostRecentCourses() {
  const { data, isLoading, isError, error } = useGetResources(
    "courses?sort['created_at']='asc'"
  );
  const [coursesList, setCoursesList] = useState([]);
  useEffect(() => {
    if (data) {
      setCoursesList(data.data.data.slice(0, 4));
      console.log(data.data.data);
    }
  }, [data]);
  const numbers = [0, 1, 2, 3];
  return (
    <div className="w-full py-5">
      <Container90>
        <div className="content w-full flex flex-col items-center">
          <h2 className="text-gray-900 font-semibold text-3xl my-5">
            الدورات المضافة حديثاً
          </h2>
          <div className="w-full justify-center grid grid-cols-4 gap-3">
            {isLoading ? (
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
            )}
          </div>
        </div>
      </Container90>
    </div>
  );
}
