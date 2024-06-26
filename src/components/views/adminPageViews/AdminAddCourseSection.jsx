import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialCoursesData = [
  {
    id: 1,
    name: "رياضيات",
    instructor: "عبدالرحمن شقير",
    fields: ["الفرع العلمي"],
    cost: 100,
    image: null,
  },
  {
    id: 2,
    name: "فيزياء",
    instructor: "صفا أبو صفا",
    fields: ["الفرع العلمي"],
    cost: 120,
    image: null,
  },
  {
    id: 3,
    name: "كيمياء",
    instructor: "أدهم خليلية",
    fields: ["الفرع العلمي"],
    cost: 80,
    image: null,
  },
  {
    id: 4,
    name: "أحياء",
    instructor: "مجاهد بركات",
    fields: ["الفرع العلمي"],
    cost: 150,
    image: null,
  },
  {
    id: 5,
    name: "التربية الإسلامية",
    instructor: "فائد الفرح",
    fields: ["جميع الفروع"],
    cost: 90,
    image: null,
  },
  {
    id: 6,
    name: "تكنولوجيا",
    instructor: "فرس النبي",
    fields: ["جميع الفروع"],
    cost: 110,
    image: null,
  },
];

const AddCourseSection = () => {
  const [courses, setCourses] = useState(initialCoursesData);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [newCourse, setNewCourse] = useState({
    name: "",
    instructor: "",
    fields: [],
    cost: "",
    image: null,
  });
  const [newField, setNewField] = useState("");

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

  const handleAddField = () => {
    setNewCourse((prevCourse) => ({
      ...prevCourse,
      fields: [...prevCourse.fields, newField],
    }));
    setNewField("");
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const validExtensions = ["image/jpeg", "image/png", "image/gif"];

    if (file && validExtensions.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewCourse((prevCourse) => ({
          ...prevCourse,
          image: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      toast.error(
        "Invalid file type. Please select a JPEG, PNG, or GIF image."
      );
    }
  };

  const handleAddCourse = (event) => {
    event.preventDefault();
    const newCourseData = {
      ...newCourse,
      id: courses.length + 1,
      cost: Number(newCourse.cost),
    };
    setCourses([...courses, newCourseData]);
    setNewCourse({
      name: "",
      instructor: "",
      fields: [],
      cost: "",
      image: null,
    });
    toast.success(`Course "${newCourseData.name}" has been added.`);
  };

  return (
    <div className="container mx-auto px-4" dir="rtl">
      <h1 className="text-2xl font-bold text-center my-6">مراجعة الدورات</h1>

      <form className="mb-6" onSubmit={handleAddCourse}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            اسم الدورة:
          </label>
          <input
            type="text"
            value={newCourse.name}
            onChange={(e) =>
              setNewCourse((prevCourse) => ({
                ...prevCourse,
                name: e.target.value,
              }))
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            اسم المعلم:
          </label>
          <input
            type="text"
            value={newCourse.instructor}
            onChange={(e) =>
              setNewCourse((prevCourse) => ({
                ...prevCourse,
                instructor: e.target.value,
              }))
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            الفروع:
          </label>
          <div className="flex">
            <input
              type="text"
              value={newField}
              onChange={(e) => setNewField(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              type="button"
              onClick={handleAddField}
              className="bg-primary-500 text-gray-50 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
            >
              إضافة فرع
            </button>
          </div>
          <ul className="mt-2">
            {newCourse.fields.map((field, index) => (
              <li
                key={index}
                className="inline-block bg-gray-200 rounded px-2 py-1 mr-1 mt-1"
              >
                {field}
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            التكلفة:
          </label>
          <input
            type="number"
            value={newCourse.cost}
            onChange={(e) =>
              setNewCourse((prevCourse) => ({
                ...prevCourse,
                cost: e.target.value,
              }))
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            صورة الدورة:
          </label>
          <input
            type="file"
            accept=".jpeg,.jpg,.png,.gif"
            onChange={handleImageChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-primary-500 text-gray-50 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          إضافة الدورة
        </button>
      </form>

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
            <th className="px-4 py-2">الفروع</th>
            <th className="px-4 py-2">الصورة</th>
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
              <td className="border px-4 py-2">{course.fields.join(", ")}</td>
              <td className="border px-4 py-2">
                {course.image ? (
                  <img
                    src={course.image}
                    alt={course.name}
                    className="w-[120px] h-[120px] object-cover"
                  />
                ) : (
                  "No image"
                )}
              </td>
              <td className="border px-4 py-2">${course.cost}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleApprove(course.id)}
                  className="text-success-500  font-bold py-2 px-4 rounded mr-2"
                >
                  موافقة
                </button>
                <button
                  onClick={() => handleReject(course.id)}
                  className="text-error-500 font-bold py-2 px-3 rounded"
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

export default AddCourseSection;
