import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGetResources from "../../../apiCalls/useGetResources";
import useCreateResource from "../../../apiCalls/useCreateResource";
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
  { id: 1, name: "الوحدة الاولى", moduleId: 1, cityId: 1 },
  { id: 2, name: "الوحدة الثانية", moduleId: 2, cityId: 2 },
];

const GeneralAddingSection = () => {
  const [branches, setBranches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [cities, setCities] = useState([]);

  const branchesQuery = useGetResources("branches");
  const branchesMutation = useCreateResource("branches");
  const modulesQuery = useGetResources("modules");
  const modulesMutation = useCreateResource("modules");
  const chaptersQuery = useGetResources("chapters");
  const chaptersMutation = useCreateResource("chapters");
  const citiesQuery = useGetResources("cities");
  const citiesMutation = useCreateResource("cities");

  useEffect(() => {
    if (branchesQuery.data) {
      console.log("branches : ", branchesQuery.data.data.data);
      setBranches(branchesQuery.data.data.data);
    }
  }, [branchesQuery.isSuccess]);
  useEffect(() => {
    if (modulesQuery.data) {
      console.log("modules : ", modulesQuery.data.data.data);
      setModules(modulesQuery.data.data.data);
    }
  }, [modulesQuery.isSuccess]);
  useEffect(() => {
    if (chaptersQuery.data) {
      console.log("chapters : ", chaptersQuery.data.data.data);
      setChapters(chaptersQuery.data.data.data);
    }
  }, [chaptersQuery.isSuccess]);
  useEffect(() => {
    if (citiesQuery.data) {
      console.log("cities : ", citiesQuery.data.data.data);
      setCities(citiesQuery.data.data.data);
    }
  }, [citiesQuery.isSuccess]);

  const [newItem, setNewItem] = useState({
    type: "",
    name: "",
    relatedId1: null,
    relatedId2: null,
  });

  const handleAdd = async () => {
    const id = Math.max(0, ...getList(newItem.type).map((item) => item.id)) + 1;
    const newEntry = { id, name: newItem.name };
    const objectForDb = {};
    if (newItem.type === "modules") {
      newEntry.branchId = newItem.relatedId1;
    }
    if (newItem.type === "chapters") {
      newEntry.moduleId = newItem.relatedId1;
      newEntry.cityId = newItem.relatedId2;
    }
    const currentMutation = getMutation(newItem.type);
    setList(newItem.type, [...getList(newItem.type), newEntry]);
    setNewItem({ type: "", name: "", relatedId1: null, relatedId2: null });
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await currentMutation.mutateAsync(...objectForDb);
      console.log(response);
      toast.success("تمت الإضافة بنجاح!");
    } catch (error) {
      console.log(error);
      toast.error(`حدث خطأ ما!`);
      setList(newItem.type, getList(newItem.type).slice(0, -1));
    }
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
      case "modules":
        return modules;
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
      case "modules":
        setModules(list);
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
    } else if (type == "modules") {
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

  const getMutation = (type) => {
    switch (type) {
      case "branches":
        return branchesMutation;
      case "modules":
        return modulesMutation;
      case "chapters":
        return chaptersMutation;
      case "cities":
        return citiesMutation;
      default:
        return new Error();
    }
  };

  return (
    <div className="container mx-auto px-4" dir="rtl">
      <h1 className="text-2xl font-bold text-center my-6">
        قسم الإضافة العامة
      </h1>

      {renderTable("branches")}
      {renderTable("modules", [
        { type: "branches", field: "branchId", label: "الفرع" },
        { type: "cities", field: "cityId", label: "المدينة" },
      ])}
      {renderTable("chapters", [
        { type: "modules", field: "moduleId", label: "المادة" },
        // { type: "cities", field: "cityId", label: "المدينة" },
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
          {newItem.type === "modules" && (
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
                <option value="">اختر المادة</option>
                {modules.map((module) => (
                  <option key={module.id} value={module.id}>
                    {module.name}
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
            <option value="modules">مادة</option>
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
