import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialBranches = [
  { id: 1, name: "الفرع العلمي" },
  { id: 2, name: "الفرع الأدبي" },
];

const initialCities = [
  { id: 1, name: "القدس" },
  { id: 2, name: "رام الله" },
];

const initialCourses = [
  { id: 1, name: "رياضيات", branchId: 1, cityId: 1 },
  { id: 2, name: "فيزياء", branchId: 2, cityId: 2 },
];

const initialChapters = [
  { id: 1, name: "الوحدة الاولى", courseId: 1, cityId: 1 },
  { id: 2, name: "الوحدة الثانية", courseId: 2, cityId: 2 },
];

const GeneralAddingSection = () => {
  const [branches, setBranches] = useState(initialBranches);
  const [courses, setCourses] = useState(initialCourses);
  const [chapters, setChapters] = useState(initialChapters);
  const [cities, setCities] = useState(initialCities);
  const [newItem, setNewItem] = useState({
    type: "",
    name: "",
    relatedId1: null,
    relatedId2: null,
  });

  const handleAdd = () => {
    const id = Math.max(0, ...getList(newItem.type).map((item) => item.id)) + 1;
    const newEntry = { id, name: newItem.name };
    if (newItem.type === "courses") {
      newEntry.branchId = newItem.relatedId1;
      newEntry.cityId = newItem.relatedId2;
    }
    if (newItem.type === "chapters") {
      newEntry.courseId = newItem.relatedId1;
      newEntry.cityId = newItem.relatedId2;
    }

    setList(newItem.type, [...getList(newItem.type), newEntry]);
    setNewItem({ type: "", name: "", relatedId1: null, relatedId2: null });
    toast.success(`تم إضافة ${newItem.type} بنجاح.`);
  };

  const handleDelete = (type, id) => {
    setList(
      type,
      getList(type).filter((item) => item.id !== id)
    );
    toast.error(`تم حذف ${type} بنجاح.`);
  };

  const getList = (type) => {
    switch (type) {
      case "branches":
        return branches;
      case "courses":
        return courses;
      case "chapters":
        return chapters;
      case "cities":
        return cities;
      default:
        return [];
    }
  };

  const setList = (type, list) => {
    switch (type) {
      case "branches":
        setBranches(list);
        break;
      case "courses":
        setCourses(list);
        break;
      case "chapters":
        setChapters(list);
        break;
      case "cities":
        setCities(list);
        break;
      default:
        break;
    }
  };

  const renderTable = (type, relatedFields) => {
    let branchName = "";
    if (type == "branches") {
      branchName = "الفروع";
    } else if (type == "courses") {
      branchName = "المواد";
    } else if (type == "chapters") {
      branchName = "الوحدة";
    } else if (type == "cities") {
      branchName = "المدينة";
    }
    const list = getList(type);
    return (
      <div className="mb-6">
        <h2 className="text-xl font-bold text-center my-4">{`جدول ${branchName}`}</h2>
        <table className="table-auto w-full shadow-lg bg-white mb-4">
          <thead className="bg-primary-500 text-warning-100">
            <tr>
              <th className="px-4 py-2">الرقم</th>
              <th className="px-4 py-2">الاسم</th>
              {relatedFields &&
                relatedFields.map((field, index) => (
                  <th
                    key={index}
                    className="px-4 py-2"
                  >{`مرتبط بـ ${field.label}`}</th>
                ))}
              <th className="px-4 py-2">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.id}</td>
                <td className="border px-4 py-2">{item.name}</td>
                {relatedFields &&
                  relatedFields.map((field, index) => (
                    <td key={index} className="border px-4 py-2">
                      {
                        getList(field.type).find(
                          (relatedItem) => relatedItem.id === item[field.field]
                        )?.name
                      }
                    </td>
                  ))}
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDelete(type, item.id)}
                    className="text-error-500 font-bold py-2 px-4 rounded"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4" dir="rtl">
      <h1 className="text-2xl font-bold text-center my-6">
        قسم الإضافة العامة
      </h1>

      {renderTable("branches")}
      {renderTable("courses", [
        { type: "branches", field: "branchId", label: "الفرع" },
        { type: "cities", field: "cityId", label: "المدينة" },
      ])}
      {renderTable("chapters", [
        { type: "courses", field: "courseId", label: "الدورة" },
        { type: "cities", field: "cityId", label: "المدينة" },
      ])}
      {renderTable("cities")}

      <div className="mb-6">
        <h2 className="text-xl font-bold text-center my-4">إضافة عنصر</h2>
        <div className="flex flex-col items-center mb-4">
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            placeholder="اسم العنصر"
            className="border rounded px-2 py-1 mx-2 mb-2"
          />
          {newItem.type === "courses" && (
            <>
              <select
                value={newItem.relatedId1}
                onChange={(e) =>
                  setNewItem({ ...newItem, relatedId1: Number(e.target.value) })
                }
                className="border rounded px-2 py-1 mx-2 mb-2"
              >
                <option value="">اختر الفرع</option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
              <select
                value={newItem.relatedId2}
                onChange={(e) =>
                  setNewItem({ ...newItem, relatedId2: Number(e.target.value) })
                }
                className="border rounded px-2 py-1 mx-2 mb-2"
              >
                <option value="">اختر المدينة</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </>
          )}
          {newItem.type === "chapters" && (
            <>
              <select
                value={newItem.relatedId1}
                onChange={(e) =>
                  setNewItem({ ...newItem, relatedId1: Number(e.target.value) })
                }
                className="border rounded px-2 py-1 mx-2 mb-2"
              >
                <option value="">اختر الدورة</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
              <select
                value={newItem.relatedId2}
                onChange={(e) =>
                  setNewItem({ ...newItem, relatedId2: Number(e.target.value) })
                }
                className="border rounded px-2 py-1 mx-2 mb-2"
              >
                <option value="">اختر المدينة</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </>
          )}
          <select
            value={newItem.type}
            onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
            className="border rounded px-2 py-1 mx-2 mb-2"
          >
            <option value="">اختر النوع</option>
            <option value="branches">فرع</option>
            <option value="courses">دورة</option>
            <option value="chapters">فصل</option>
            <option value="cities">مدينة</option>
          </select>
          <button
            onClick={handleAdd}
            className="bg-primary-500 text-gray-50 font-bold py-2 px-4 rounded"
          >
            إضافة
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default GeneralAddingSection;
