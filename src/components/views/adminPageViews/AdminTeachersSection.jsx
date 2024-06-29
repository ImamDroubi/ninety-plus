import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import useGetResources from "../../../apiCalls/useGetResources";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// const first_names = [" أحمد", " محمد", " كامل", " صهيب", " ربحي"];
// const last_names = ["أحمد", "السيد", "الحسن", "حرزالله", "قاروط", "الفار"];
// const emails = [
//   "teacher1@hotmail.com",
//   "teacher2@hotmail.com",
//   "teacher3@hotmail.com",
// ];
// const rates = [3.2, 4.6, 5, 3.7, 2.6, 4];
// const teacherSample = {
//   user_id: 1,
//   first_name: (() => first_names[Math.floor(Math.random() * 5)])(),
//   last_name: (() => last_names[Math.floor(Math.random() * 6)])(),
//   rate: (() => last_names[Math.floor(Math.random() * 6)])(),
//   email: (() => emails[Math.floor(Math.random() * 3)])(),
//   course_count: (() => Math.floor(Math.random() * 12))(),
//   balance: (() => Math.floor(Math.random() * 1245))(),
//   created_at: "26-6-2024",
// };
// const getTeacher = () => {
//   const teacherSample = {
//     user_id: 1,
//     first_name: (() => first_names[Math.floor(Math.random() * 5)])(),
//     last_name: (() => last_names[Math.floor(Math.random() * 6)])(),
//     rate: (() => last_names[Math.floor(Math.random() * 6)])(),
//     email: (() => emails[Math.floor(Math.random() * 3)])(),
//     course_count: (() => Math.floor(Math.random() * 12))(),
//     balance: (() => Math.floor(Math.random() * 1245))(),
//     created_at: "26-6-2024",
//   };
//   return teacherSample;
// };
// const numbers = [1, 2, 3, 4, 5, 6];
const TeachersSection = () => {
  // const [teachers, setTeachers] = useState(numbers.map((item) => getTeacher()));
  const [teachers, setTeachers] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const teachersQuery = useGetResources("users?role=instructor");

  useEffect(() => {
    if (teachersQuery.data) {
      setTeachers(teachersQuery.data.data.data);
    }
  }, [teachersQuery.isSuccess]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const sortData = (field) => {
    let direction = "ascending";
    if (sortConfig.key === field && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    const sortedData = [...teachers].sort((a, b) => {
      if (a[field] < b[field]) return direction === "ascending" ? -1 : 1;
      if (a[field] > b[field]) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    setTeachers(sortedData);
    setSortConfig({ key: field, direction });
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const paginatedTeachers = teachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(teachers.length / itemsPerPage);

  const chartData = {
    labels: teachers.map((teacher) => teacher.name),
    datasets: [
      {
        label: "الدورات",
        data: teachers.map((teacher) => teacher.courses),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "الإيرادات",
        data: teachers.map((teacher) => teacher.revenue),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Teachers Statistics",
      },
    },
  };

  return (
    <div className="container mx-auto px-4" dir="rtl">
      <h1 className="text-2xl font-bold text-center my-6">إحصائيات المعلمين</h1>

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
          <option value={teachers.length}>الكل</option>
        </select>
      </div>

      <table className="table-auto w-full shadow-lg bg-white">
        <thead className=" bg-primary-500 text-warning-100">
          <tr>
            <th className="px-4 py-2">الاسم</th>
            <th className="px-4 py-2">البريد الإلكتروني</th>
            <th className="px-4 py-2">عدد الدورات</th>
            <th className="px-4 py-2">
              <button onClick={() => sortData("revenue")}>الإيرادات</button>
            </th>
            <th className="px-4 py-2">
              <button onClick={() => sortData("rating")}>التقييم</button>
            </th>
            <th className="px-4 py-2">
              <button onClick={() => sortData("registrationDate")}>
                تاريخ التسجيل
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedTeachers.map((teacher) => (
            <tr key={teacher.user_id}>
              <td className="border px-4 py-2">
                {`${teacher.first_name} ${teacher.last_name}`}
              </td>
              <td className="border px-4 py-2">{teacher.email}</td>
              <td className="border px-4 py-2">{teacher.course_count}</td>
              <td className="border px-4 py-2">${teacher.balance}</td>
              <td className="border px-4 py-2">{teacher.rate}</td>
              <td className="border px-4 py-2">{teacher.created_at}</td>
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

      {/* <div className="my-6">
        <Bar data={chartData} options={chartOptions} />
      </div> */}
    </div>
  );
};

export default TeachersSection;
