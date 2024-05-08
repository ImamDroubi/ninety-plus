import React, { useState } from "react";
import SearchInput from "../../other/SearchInput";
import CourseCard from "../../cards/CourseCard";
import SelectDropdown from "../../menus/SelectDropdown";
import BasicPagination from "../../other/BasicPagination";
import { courseFiltersList } from "../../data/courseFiltersList";
import { courseRatingFiltersList } from "../../data/courseRatingFiltersList";
const NUMBER_OF_COURSES_IN_THE_PAGE = 8;
const NUMBER_OF_DATA = 16;

export default function TeacherCoursesPage() {
  const [pagination, setPagination] = useState({
    count: NUMBER_OF_DATA,
    from: 0,
    to: NUMBER_OF_COURSES_IN_THE_PAGE,
  });

  const courses = [
    <CourseCard />,
    <CourseCard />,
    <CourseCard />,
    <CourseCard />,
    <CourseCard />,
    <CourseCard />,
    <CourseCard />,
    <CourseCard />,
    <CourseCard />,
    <CourseCard />,
    <CourseCard />,
    <CourseCard />,
    <CourseCard />,
    <CourseCard />,
    <CourseCard />,
    <CourseCard />,
  ];

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
              <SelectDropdown
                title="التقييم"
                list={courseRatingFiltersList}
              />
            </div>
          </div>
        </div>
      </section>
      <main className="w-full md:w-[90%] m-auto py-2">
        <div className="courses-list flex justify-center md:justify-between gap-2 flex-wrap ">
          {courses.slice(pagination.from, pagination.to).map((course) => {
            return course;
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
