import { useEffect, useState } from "react";
import useGetResources from "../../../apiCalls/useGetResources";

import { CircularProgress } from "@mui/material";


// const first_names = [" أحمد", " محمد", " كامل", " صهيب", " ربحي"];
// const last_names = ["أحمد", "السيد", "الحسن", "حرزالله", "قاروط", "الفار"];
// const emails = [
//   "student1@hotmail.com",
//   "student2@hotmail.com",
//   "student3@hotmail.com",
// ];
// const rates = [3.2, 4.6, 5, 3.7, 2.6, 4];
// const studentSample = {
//   user_id: 1,
//   first_name: (() => first_names[Math.floor(Math.random() * 5)])(),
//   last_name: (() => last_names[Math.floor(Math.random() * 6)])(),
//   rate: (() => last_names[Math.floor(Math.random() * 6)])(),
//   email: (() => emails[Math.floor(Math.random() * 3)])(),
//   course_count: (() => Math.floor(Math.random() * 12))(),
//   balance: (() => Math.floor(Math.random() * 1245))(),
//   created_at: "26-6-2024",
// };
// const getStudent = () => {
//   const studentSample = {
//     user_id: 1,
//     first_name: (() => first_names[Math.floor(Math.random() * 5)])(),
//     last_name: (() => last_names[Math.floor(Math.random() * 6)])(),
//     rate: (() => last_names[Math.floor(Math.random() * 6)])(),
//     email: (() => emails[Math.floor(Math.random() * 3)])(),
//     courses_count: (() => Math.floor(Math.random() * 12))(),
//     total_paid: (() => Math.floor(Math.random() * 1245))(),
//     created_at: "26-6-2024",
//   };
//   return studentSample;
// };
// const numbers = [1, 2, 3, 4, 5, 6];
const StudentsSection = () => {
  // const [students, setStudents] = useState(numbers.map((item) => getStudent()));
  const [students, setStudents] = useState([]);

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const sortData = (field) => {
    let direction = "ascending";
    if (sortConfig.key === field && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    const sortedData = [...students].sort((a, b) => {
      if (a[field] < b[field]) return direction === "ascending" ? -1 : 1;
      if (a[field] > b[field]) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    setStudents(sortedData);
    setSortConfig({ key: field, direction });
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const paginatedStudents = students.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(students.length / itemsPerPage);
  const studentsQuery = useGetResources("users?role=student");
  useEffect(() => {
    if (studentsQuery.data) {
      setStudents(studentsQuery.data.data.data);
    }
  }, [studentsQuery.isSuccess]);

  if (studentsQuery.isLoading) return <CircularProgress />;
  return (
    <div className="container mx-auto px-4" dir="rtl">
      <h1 className="text-2xl font-bold text-center my-6">إحصائيات الطلاب</h1>

      <div className="flex justify-end mb-4">
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="border rounded px-2 py-1"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={students.length}>الكل</option>
        </select>
      </div>

      <table className="table-auto w-full shadow-lg bg-white">
        <thead className="bg-primary-500 text-warning-100">
          <tr>
            <th className="px-4 py-2">الاسم</th>
            <th className="px-4 py-2">البريد الإلكتروني</th>
            <th className="px-4 py-2">عدد الدورات المسجلة</th>
            <th className="px-4 py-2">
              <button onClick={() => sortData("amountPaid")}>
                المبلغ المدفوع
              </button>
            </th>
            <th className="px-4 py-2">
              <button onClick={() => sortData("registrationDate")}>
                تاريخ التسجيل
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedStudents.map((student) => (
            <tr key={student.user_id}>
              <td className="border px-4 py-2">
                {`${student.first_name} ${student.last_name}`}
              </td>
              <td className="border px-4 py-2">{student.email}</td>
              <td className="border px-4 py-2">{student.courses_count || 0}</td>
              <td className="border px-4 py-2">${student.total_paid || 0}</td>
              <td className="border px-4 py-2">
                {student.created_at}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded"
        >
          السابق
        </button>
        <span className="px-4 py-2 mx-1">
          صفحة {currentPage} من {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded"
        >
          التالي
        </button>
      </div>
    </div>
  );
};

export default StudentsSection;
