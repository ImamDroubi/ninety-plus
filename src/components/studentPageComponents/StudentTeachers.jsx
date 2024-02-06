import { Pagination } from "@mui/material";
import { useState } from "react";
import mathBook from "../../assets/images/book-covers/math-scientific.jpg";
import Button from "@mui/material/Button";
import Teacher from "../cards/Teacher";
const NUMBER_OF_TEACHERS_IN_THE_PAGE = 8;
const NUMBER_OF_DATA = 4;

export default function StudentTeachers() {
  const [pagination, setPagination] = useState({
    count: NUMBER_OF_DATA,
    from: 0,
    to: NUMBER_OF_TEACHERS_IN_THE_PAGE,
  });
  const teachers = [
    <Teacher
      name={"محمد حرزالله"}
      major={"رياضيات"}
      preview={
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }
      stars={4.1}
      studentsNo={1324}
    ></Teacher>,
    <Teacher
      name={"محمد حرزالله"}
      major={"رياضيات"}
      preview={
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }
      stars={4.1}
      studentsNo={1324}
    ></Teacher>,
    <Teacher
      name={"محمد حرزالله"}
      major={"رياضيات"}
      preview={
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }
      stars={4.1}
      studentsNo={1324}
    ></Teacher>,
    <Teacher
      name={"محمد حرزالله"}
      major={"رياضيات"}
      preview={
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }
      stars={4.1}
      studentsNo={1324}
    ></Teacher>,
  ];

  return (
    <>
      <section className="mb-4">
        <h2 className="mb-3 text-lg font-semibold">الأساتذة</h2>
        <div className="grid justify-center grid-flow-row gap-3 mb-2 teachers sm:justify-center">
          {teachers.slice(pagination.from, pagination.to).map((course) => {
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
    const from = (page - 1) * NUMBER_OF_TEACHERS_IN_THE_PAGE;
    const to = page * NUMBER_OF_TEACHERS_IN_THE_PAGE;
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
      count={Math.ceil(pagination?.count / NUMBER_OF_TEACHERS_IN_THE_PAGE)}
      onChange={handlePageChange}
      color="primary"
    />
  );
}
