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

const teachersData = [
  {
    id: 1,
    name: "مونكي دي لوفي",
    email: "monkeyDLuffy@example.com",
    courses: 5,
    revenue: 1200,
    rating: 4.5,
    registrationDate: new Date(2021, 0, 10),
  },
  {
    id: 2,
    name: "رورونوا زورو",
    email: "roronoaZoro@example.com",
    courses: 3,
    revenue: 1500,
    rating: 4.7,
    registrationDate: new Date(2021, 1, 15),
  },
  {
    id: 3,
    name: "إدواردو ألريك",
    email: "idward@example.com",
    courses: 8,
    revenue: 2100,
    rating: 4.3,
    registrationDate: new Date(2020, 5, 6),
  },
  {
    id: 4,
    name: "نامي",
    email: "nami@example.com",
    courses: 10,
    revenue: 2200,
    rating: 4.8,
    registrationDate: new Date(2021, 3, 10),
  },
  {
    id: 5,
    name: "سانجي",
    email: "sanji@example.com",
    courses: 11,
    revenue: 1300,
    rating: 4.6,
    registrationDate: new Date(2021, 5, 10),
  },
  {
    id: 6,
    name: "توني توني تشوبر",
    email: "tonyTonyChopper@example.com",
    courses: 12,
    revenue: 1400,
    rating: 4.4,
    registrationDate: new Date(2021, 6, 10),
  },
  {
    id: 7,
    name: "نيكو روبن",
    email: "nicoRobin@example.com",
    courses: 13,
    revenue: 1500,
    rating: 4.9,
    registrationDate: new Date(2021, 7, 10),
  },
  {
    id: 8,
    name: "فرانكي",
    email: "franky@example.com",
    courses: 6,
    revenue: 1800,
    rating: 4.7,
    registrationDate: new Date(2020, 9, 20),
  },
  {
    id: 9,
    name: "بروك",
    email: "brook@example.com",
    courses: 7,
    revenue: 2000,
    rating: 4.8,
    registrationDate: new Date(2021, 10, 25),
  },
  {
    id: 10,
    name: "جيمبي",
    email: "jimbei@example.com",
    courses: 4,
    revenue: 1100,
    rating: 4.5,
    registrationDate: new Date(2021, 11, 30),
  },
];

const TeachersSection = () => {
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
                {teacher.first_name}
                {teacher.last_name}
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
