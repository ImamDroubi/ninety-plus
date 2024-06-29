import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useGetResources from "../../../apiCalls/useGetResources";
import { CircularProgress } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// const titles = [
//   "دورة شاملة في منهج الرياضيات توجيهي علمي",
//   "دورة في الفصل الأول من الفيزياء للتوجيهي العلمي",
//   "دورة في اللغة الإنجليزية توجيهي أدبي",
//   "دورة حل سنوات سابقة في الكيمياء للعلمي",
// ];
// const first_names = [" أحمد", " محمد", " كامل", " صهيب", " ربحي"];
// const last_names = ["أحمد", "السيد", "الحسن", "حرزالله", "قاروط", "الفار"];
// const emails = [
//   "student1@hotmail.com",
//   "student2@hotmail.com",
//   "student3@hotmail.com",
// ];
// const rates = [3.2, 4.6, 5, 3.7, 2.6, 4];
// const statuses = ["جارية", "منقضية", "لم تبدأ"];
// const getCourse = () => {
//   const courseSample = {
//     user_id: 1,
//     instructor: {
//       id: 1,
//       name: `${(() => first_names[Math.floor(Math.random() * 5)])()} ${(() =>
//         last_names[Math.floor(Math.random() * 6)])()}`,
//     },

//     rate: (() => last_names[Math.floor(Math.random() * 6)])(),
//     email: (() => emails[Math.floor(Math.random() * 3)])(),
//     students_count: (() => Math.floor(Math.random() * 40))(),
//     price: (() => Math.floor(Math.random() * 1245) + 70)(),
//     status: (() => statuses[Math.floor(Math.random() * 3)])(),
//     title: (() => titles[Math.floor(Math.random() * 4)])(),
//     created_at: "26-6-2024",
//   };
//   return courseSample;
// };
// const numbers = [1, 2, 3, 4, 5, 6];

const CoursesSection = () => {
  // const [courses, setCourses] = useState(numbers.map((item) => getCourse()));
  const [courses, setCourses] = useState([]);
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
    const sortedData = [...courses].sort((a, b) => {
      if (a[field] < b[field]) return direction === "ascending" ? -1 : 1;
      if (a[field] > b[field]) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    setCourses(sortedData);
    setSortConfig({ key: field, direction });
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const paginatedCourses = courses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(courses.length / itemsPerPage);

  const coursesQuery = useGetResources("courses");
  useEffect(() => {
    if (coursesQuery.data) {
      setCourses(coursesQuery.data.data.data);
    }
  }, [coursesQuery.isSuccess]);

  if (coursesQuery.isLoading) return <CircularProgress />;

  return (
    <div className="container mx-auto px-4" dir="rtl">
      <h1 className="text-2xl font-bold text-center my-6">إحصائيات الدورات</h1>

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
          <option value={courses.length}>الكل</option>
        </select>
      </div>

      <table className="table-auto w-full shadow-lg bg-white">
        <thead className="bg-primary-500 text-warning-100">
          <tr>
            <th className="px-4 py-2">اسم الدورة</th>
            <th className="px-4 py-2">عدد الأعضاء</th>
            <th className="px-4 py-2">المعلم</th>
            <th className="px-4 py-2">
              <button onClick={() => sortData("cost")}>التكلفة</button>
            </th>
            <th className="px-4 py-2">
              <button onClick={() => sortData("rating")}>التقييم</button>
            </th>
            <th className="px-4 py-2">الحالة</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCourses.map((course) => (
            <tr key={course.id}>
              <td className="border px-4 py-2">{course.title}</td>
              <td className="border px-4 py-2">{course.students_count}</td>
              <td className="border px-4 py-2">{course.instructor?.name}</td>
              <td className="border px-4 py-2">${course.price}</td>
              <td className="border px-4 py-2">{course.rate}</td>
              <td className="border px-4 py-2">{course.status}</td>
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

export default CoursesSection;
