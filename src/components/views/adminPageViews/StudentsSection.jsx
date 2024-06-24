import { useState } from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const studentsData = [
  {
    id: 1,
    name: "يوسوب",
    email: "usopp@example.com",
    courses: 3,
    amountPaid: 300,
    rating: 4.2,
    registrationDate: new Date(2021, 0, 12),
  },
  {
    id: 2,
    name: "نامي",
    email: "nami@example.com",
    courses: 5,
    amountPaid: 500,
    rating: 4.8,
    registrationDate: new Date(2021, 1, 22),
  },
  {
    id: 3,
    name: "سانجي",
    email: "sanji@example.com",
    courses: 4,
    amountPaid: 400,
    rating: 4.5,
    registrationDate: new Date(2021, 3, 15),
  },
  {
    id: 4,
    name: "توني توني تشوبر",
    email: "tonyTonyChopper@example.com",
    courses: 2,
    amountPaid: 200,
    rating: 4.4,
    registrationDate: new Date(2021, 4, 19),
  },
  {
    id: 5,
    name: "نيكو روبن",
    email: "nicoRobin@example.com",
    courses: 6,
    amountPaid: 600,
    rating: 4.9,
    registrationDate: new Date(2021, 5, 21),
  },
  {
    id: 6,
    name: "فرانكي",
    email: "franky@example.com",
    courses: 4,
    amountPaid: 450,
    rating: 4.7,
    registrationDate: new Date(2021, 6, 28),
  },
  {
    id: 7,
    name: "بروك",
    email: "brook@example.com",
    courses: 5,
    amountPaid: 550,
    rating: 4.6,
    registrationDate: new Date(2021, 7, 25),
  },
  {
    id: 8,
    name: "جيمبي",
    email: "jimbei@example.com",
    courses: 3,
    amountPaid: 300,
    rating: 4.5,
    registrationDate: new Date(2021, 8, 30),
  },
  {
    id: 9,
    name: "زورو",
    email: "zoro@example.com",
    courses: 2,
    amountPaid: 200,
    rating: 4.3,
    registrationDate: new Date(2021, 9, 11),
  },
  {
    id: 10,
    name: "مونكي دي لوفي",
    email: "monkeyDLuffy@example.com",
    courses: 1,
    amountPaid: 150,
    rating: 4.1,
    registrationDate: new Date(2021, 10, 14),
  },
];

const StudentsSection = () => {
  const [students, setStudents] = useState(studentsData);
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

  const chartData = {
    labels: students.map((student) => student.name),
    datasets: [
      {
        label: "عدد الدورات المسجلة",
        data: students.map((student) => student.courses),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "المبالغ المدفوعة",
        data: students.map((student) => student.amountPaid),
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
        text: "Students Statistics",
      },
    },
  };

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
          {paginatedStudents.map((student) => (
            <tr key={student.id}>
              <td className="border px-4 py-2">{student.name}</td>
              <td className="border px-4 py-2">{student.email}</td>
              <td className="border px-4 py-2">{student.courses}</td>
              <td className="border px-4 py-2">${student.amountPaid}</td>
              <td className="border px-4 py-2">{student.rating}</td>
              <td className="border px-4 py-2">
                {student.registrationDate.toLocaleDateString()}
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

      <div className="my-6">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default StudentsSection;
