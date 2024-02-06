import { Pagination } from "@mui/material";
import { useState } from "react";
import mathBook from "../../assets/images/book-covers/math-scientific.jpg";
import Button from "@mui/material/Button";
const NUMBER_OF_COURSES_IN_THE_PAGE = 8;
const NUMBER_OF_DATA = 10;

function Lecture() {
  return (
    <div className="lecture w-full sm:w-[15rem] h-[20rem] border-2 border-gray-100">
      <div className="preview w-full h-[12rem] overflow-clip">
        <img src={mathBook} alt="" className="" />
      </div>
      <div className="p-1 border-b-2 info border-b-gray-100">
        <p className="mb-1 text-sm text-gray-600">
          رياضيات التوجيهي العلمي والصناعي
        </p>
        <h4 className="font-semibold text-gray-900">2. المصفوفات والمحددات</h4>
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
          مشاهدة الدورة
        </Button>
      </div>
    </div>
  );
}
export default function StudentCourses() {
  const [pagination, setPagination] = useState({
    count: NUMBER_OF_DATA,
    from: 0,
    to: NUMBER_OF_COURSES_IN_THE_PAGE,
  });
  const courses = [
    <Lecture />,
    <Lecture />,
    <Lecture />,
    <Lecture />,
    <Lecture />,
    <Lecture />,
    <Lecture />,
    <Lecture />,
    <Lecture />,
    <Lecture />,
  ];

  return (
    <>
      <section className="mb-4">
        <h2 className="mb-3 text-lg font-semibold">الدورات</h2>
        <div className="grid justify-center grid-flow-row gap-3 mb-2 courses sm:justify-center">
          {courses.slice(pagination.from, pagination.to).map((course) => {
            return course;
          })}
        </div>
        <div className="flex items-center justify-center my-4 pagination">
          <BasicPagination
            pagination={pagination}
            setPagination={setPagination}
          />
        </div>
      </section>
    </>
  );
}
export function BasicPagination({ pagination, setPagination }) {
  const handlePageChange = (event, page) => {
    const from = (page - 1) * NUMBER_OF_COURSES_IN_THE_PAGE;
    const to = page * NUMBER_OF_COURSES_IN_THE_PAGE;
    setPagination((prev) => {
      return {
        ...prev,
        from: from,
        to: to,
      };
    });
  };
  return (
    <Pagination
      count={Math.ceil(pagination?.count / NUMBER_OF_COURSES_IN_THE_PAGE)}
      onChange={handlePageChange}
      color="primary"
    />
  );
}
