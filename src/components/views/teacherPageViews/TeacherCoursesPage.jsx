import React, { useEffect, useState } from "react";
import SearchInput from "../../other/SearchInput";
import CourseCard from "../../cards/CourseCard";
import SelectDropdown from "../../menus/SelectDropdown";
import BasicPagination from "../../other/BasicPagination";
import { courseFiltersList } from "../../data/courseFiltersList";
import { courseRatingFiltersList } from "../../data/courseRatingFiltersList";
import { useTeacherProfile } from "../../../contexts/TeacherProfileContext";
import { CircularProgress } from "@mui/material";
import { combineCourses } from "../../../utils/coursesFunctions";
const NUMBER_OF_COURSES_IN_THE_PAGE = 8;
const NUMBER_OF_DATA = 16;

export default function TeacherCoursesPage() {
  const { profileInfo, isLoading } = useTeacherProfile();

  const [courses, setCourses] = useState();
  useEffect(() => {
    if (profileInfo) {
      setCourses(combineCourses(profileInfo.courses));
    }
  }, [profileInfo]);

  const [pagination, setPagination] = useState({
    count: courses?.length || 0,
    from: 0,
    to: NUMBER_OF_COURSES_IN_THE_PAGE,
  });

  if (isLoading || !profileInfo || !courses) return <CircularProgress />;
  return (
    <>
      <section className="w-full px-2 md:px-[0px] md:w-[90%] m-auto">
        <div className="filters flex flex-col md:flex-row gap-2 my-3">
          <div className="flex flex-col  gap-1 flex-grow-[1]">
            <p className="text-gray-600">بحث:</p>
            <SearchInput />
          </div>
          <div className="dropdowns flex gap-4">
            <div className="flex flex-col gap-1  ">
              <p className="text-gray-600">ترتيب حسب:</p>
              {/* TODO : MODIFY THE LIST  */}
              <SelectDropdown title="ترتيب" list={courseFiltersList} />
            </div>
            <div className="flex flex-col gap-1 ">
              <p className="text-gray-600">التقييم:</p>
              <SelectDropdown title="التقييم" list={courseRatingFiltersList} />
            </div>
          </div>
        </div>
      </section>
      <main className="w-full md:w-[90%] m-auto py-2">
        <div className="courses-list flex justify-center md:justify-between gap-2 flex-wrap ">
          {courses.slice(pagination.from, pagination.to).map((course) => {
            return (
              <CourseCard course={course} key={course.id} showOptions={true} />
            );
          })}
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-center my-4 pagination">
          <BasicPagination
            pagination={pagination}
            setPagination={setPagination}
            numberOfItemsInThePage={NUMBER_OF_COURSES_IN_THE_PAGE}
          />
        </div>
      </main>
    </>
  );
}
