import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SelectDropdown from "../menus/SelectDropdown";
import { useEffect, useRef, useState } from "react";
import Container90 from "../containers/Container90";
import CourseCard from "../cards/CourseCard";
import { streamsList } from "../data/streamsList";
import BasicPagination from "../other/BasicPagination";
import useGetResources from "../../apiCalls/useGetResources";
import { usePermissions } from "../../hooks/usePermissions";
import { CircularProgress } from "@mui/material";
const NUMBER_OF_COURSES_IN_THE_PAGE = 10;
const NUMBER_OF_DATA = 12;

export default function CoursesPage() {
  const searchRef = useRef();
  const [currentStream, setCurrentStream] = useState();
  const { data, isLoading } = useGetResources("courses");
  const [coursesList, setCoursesList] = useState([]);

  useEffect(() => {
    if (data) {
      setCoursesList(data.data.data);
      setPagination({
        count: data.data.data.length,
        from: 0,
        to: NUMBER_OF_COURSES_IN_THE_PAGE,
      });
    }
  }, [data]);
  const [pagination, setPagination] = useState({
    count: 12,
    // count: 10,
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
  ];
  return (
    <Container90>
      <div>
        <div className="top flex justify-between mx-2 sm:mx-[0rem] my-4">
          <div className="relative flex items-center justify-end w-2/3 ml-1 search sm:w-1/2">
            <input
              placeholder="رياضيات"
              ref={searchRef}
              type="search"
              name="search"
              id="search"
              className="w-full p-1 pr-5 text-gray-900 duration-150 border-2 border-gray-100 rounded-sm outline-none  peer focus:border-2 focus:border-gray-900 sm:border-2"
            />
            <FontAwesomeIcon
              onClick={() => searchRef.current.focus()}
              className="absolute pl-1 text-gray-900 cursor-pointer right-2"
              icon={faMagnifyingGlass}
            />
          </div>
          <div className="flex items-center gap-2 text-gray-700 stream">
            <p className="hidden sm:block">الفرع:</p>
            <SelectDropdown
              title="الفرع"
              list={streamsList}
              stateChanger={setCurrentStream}
            />
          </div>
        </div>
        <div className="grid justify-center grid-flow-row gap-4 mb-2 courses sm:justify-normal">
          {isLoading ? (
            <CircularProgress />
          ) : (
            coursesList.slice(pagination.from, pagination.to).map((course) => {
              return <CourseCard key={course.id} course={course} />;
            })
          )}
          {/* {courses.slice(pagination.from, pagination.to).map((course) => {
            return <CourseCard />;
          })} */}
        </div>
        <div className="flex items-center justify-center my-4 pagination">
          <BasicPagination
            pagination={pagination}
            setPagination={setPagination}
            numberOfItemsInThePage={NUMBER_OF_COURSES_IN_THE_PAGE}
          />
        </div>
      </div>
    </Container90>
  );
}
