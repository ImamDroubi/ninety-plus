import React, { useEffect, useState } from "react";
import { HumburgerIcon } from "../../icons/icons";
import NestedList from "../../menus/course-curriculum/NestedList";
import { useCreateCourseContext } from "../../../contexts/CreateCourseContext";
import SelectBookChaptersForm from "../SelectBookChaptersForm";

// const chaptersSample = [
//   {
//     id: 1,
//     name: "حساب التفاضل",
//     lectures: [
//       {
//         id: 1,
//         name: "متوسط التغير الحصة 1",
//         link: "#",
//       },
//       {
//         id: 2,
//         name: "متوسط التغير الحصة 2",
//         link: "#",
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: "حساب التفاضل",
//     lectures: [
//       {
//         id: 1,
//         name: "متوسط التغير الحصة 1",
//         link: "#",
//       },
//       {
//         id: 2,
//         name: "متوسط التغير الحصة 2",
//         link: "#",
//       },
//     ],
//   },
// ];

export default function CreateCourseFormCurriculum() {
  const { chapters, setChapters, module } = useCreateCourseContext();
  const [selectedChapters, setSelectedChapters] = useState(chapters || []);
  const chaptersList = module?.chapters || [];

  useEffect(() => {
    setChapters(selectedChapters);
  }, [selectedChapters]);
  return (
    <>
      <div className="p-3  border-gray-100 my-4 border-b-[2px]">
        <h3 className="font-bold text-lg">المحتوى</h3>
      </div>
      <div className="my-3">
        <h4 className="font-bold text-md my-1">وحدات الكتاب</h4>
        <p className="text-gray-600">وحدات الكتاب المتوقع تغطيتها في الدورة</p>
        <SelectBookChaptersForm
          list={chaptersList}
          selectedOptions={selectedChapters}
          setSelectedOptions={setSelectedChapters}
        />
      </div>

      {/* <p className="text-gray-600">
        الوحدات التي سيتم تغطيتها أثناء الدورة والدروس الخاصة بكل وحدة، يمكنك
        تعديلها أو تعبئتها لاحقاً...
      </p>
      <div className="p-3 text-gray-900">
        <NestedList itemsList={chaptersList} setItemsList={setChaptersList} />
      </div> */}
    </>
  );
}
