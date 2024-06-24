import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const courseReviewsData = [
  {
    id: 1,
    name: "رياضيات",
    instructor: "عبدالرحمن شقير",
    description: "رياضيات الفرع العلمي",
    cost: 100,
  },
  {
    id: 2,
    name: "فيزياء",
    instructor: "صفا أبو صفا",
    description: "فيزياء للفرع العلمي",
    cost: 120,
  },
  {
    id: 3,
    name: "كيمياء",
    instructor: "أدهم خليلية",
    description: "كيمياء للفرع العلمي",
    cost: 80,
  },
  {
    id: 4,
    name: "أحياء",
    instructor: "مجاهد بركات",
    description: "أحياء للفرع العلمي",
    cost: 150,
  },
  {
    id: 5,
    name: "التربية الإسلامية",
    instructor: "فائد الفرح",
    description: "التربية الإسلامية لجميع الفروع",
    cost: 90,
  },
  {
    id: 6,
    name: "تكنولوجيا",
    instructor: "فرس النبي",
    description: "التكنولوجيا لجميع الفروع",
    cost: 110,
  },
];

const CoursesReviewSections = () => {
  const [courses, setCourses] = useState(courseReviewsData);
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

  const handleApprove = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
    toast.success(`Course with id ${id} has been approved.`);
  };

  const handleReject = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
    toast.error(`Course with id ${id} has been rejected.`);
  };

  return (
    <div className="container mx-auto px-4" dir="rtl">
      <h1 className="text-2xl font-bold text-center my-6">مراجعة الدورات</h1>

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
            <th className="px-4 py-2">المعلم</th>
            <th className="px-4 py-2">الوصف</th>
            <th className="px-4 py-2">
              <button onClick={() => sortData("cost")}>التكلفة</button>
            </th>
            <th className="px-4 py-2">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCourses.map((course) => (
            <tr key={course.id}>
              <td className="border px-4 py-2">{course.name}</td>
              <td className="border px-4 py-2">{course.instructor}</td>
              <td className="border px-1 py-2">{course.description}</td>
              <td className="border px-4 py-2">${course.cost}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleApprove(course.id)}
                  className="bg-green-500 hover:bg-green-700 text-success-600 font-bold py-2 px-4 rounded mr-2"
                >
                  موافقة
                </button>
                <button
                  onClick={() => handleReject(course.id)}
                  className="bg-red-500 hover:bg-red-700 text-error-500 font-bold py-2 px-3 rounded"
                >
                  رفض
                </button>
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

      <ToastContainer />
    </div>
  );
};

export default CoursesReviewSections;
