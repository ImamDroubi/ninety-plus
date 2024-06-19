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

const coursesData = [
  {
    id: 1,
    name: "رياضيات",
    members: 25,
    teacher: "عبدالرحمن شقير",
    cost: 100,
    rating: 4.5,
    status: "Completed",
  },
  {
    id: 2,
    name: "فيزياء",
    members: 30,
    teacher: "صفا أبو صفا",
    cost: 120,
    rating: 4.7,
    status: "Ongoing",
  },
  {
    id: 3,
    name: "تكنولوجيا",
    members: 18,
    teacher: "فرس النبي",
    cost: 130,
    rating: 4.9,
    status: "Completed",
  },
  {
    id: 4,
    name: "أحياء",
    members: 40,
    teacher: "مجاهد بركات",
    cost: 150,
    rating: 4.8,
    status: "Completed",
  },
  {
    id: 5,
    name: "التربية الإسلامية",
    members: 35,
    teacher: "فائد الفرح",
    cost: 90,
    rating: 4.6,
    status: "Ongoing",
  },
  {
    id: 6,
    name: "الدراسات التاريخية",
    members: 28,
    teacher: "رائد الفرح",
    cost: 110,
    rating: 4.4,
    status: "Due",
  },
  {
    id: 7,
    name: "كيمياء",
    members: 20,
    teacher: "أدهم خليلية",
    cost: 80,
    rating: 4.3,
    status: "Due",
  },
  {
    id: 8,
    name: "اللغة العربية",
    members: 22,
    teacher: "أشرف أبوصاع",
    cost: 95,
    rating: 4.7,
    status: "Ongoing",
  },
  {
    id: 9,
    name: "اللغة الإنجليزية",
    members: 26,
    teacher: "نضال الزرعي",
    cost: 115,
    rating: 4.5,
    status: "Due",
  },
  {
    id: 10,
    name: "الدراسات الجغرافية",
    members: 33,
    teacher: "رائد الفرح",
    cost: 105,
    rating: 4.6,
    status: "Completed",
  },
];

const CoursesSection = () => {
  const [courses, setCourses] = useState(coursesData);
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

  const chartData = {
    labels: courses.map((course) => `${course.teacher} (${course.name})`),
    datasets: [
      {
        label: "عدد الأعضاء",
        data: courses.map((course) => course.members),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "تكلفة الدورة",
        data: courses.map((course) => course.cost),
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
        text: "Courses Statistics",
      },
    },
  };

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
              <td className="border px-4 py-2">{course.name}</td>
              <td className="border px-4 py-2">{course.members}</td>
              <td className="border px-4 py-2">{course.teacher}</td>
              <td className="border px-4 py-2">${course.cost}</td>
              <td className="border px-4 py-2">{course.rating}</td>
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

      <div className="my-6">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default CoursesSection;
