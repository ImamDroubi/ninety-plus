import React, { useEffect, useState } from "react";
import { HumburgerIcon } from "../../icons/icons";
import NestedList from "../../menus/course-curriculum/NestedList";
import { useCreateCourseContext } from "../../../contexts/CreateCourseContext";

const chaptersSample = [
  {
    id: 1,
    name: "حساب التفاضل",
    lectures: [
      {
        id: 1,
        name: "متوسط التغير الحصة 1",
        link: "#",
      },
      {
        id: 2,
        name: "متوسط التغير الحصة 2",
        link: "#",
      },
    ],
  },
  {
    id: 2,
    name: "حساب التفاضل",
    lectures: [
      {
        id: 1,
        name: "متوسط التغير الحصة 1",
        link: "#",
      },
      {
        id: 2,
        name: "متوسط التغير الحصة 2",
        link: "#",
      },
    ],
  },
];

export default function CreateCourseFormCurriculum() {
  
  const {chapters,setChapters} = useCreateCourseContext();
  const [chaptersList, setChaptersList] = useState(chapters);
  useEffect(()=>{
    setChapters(chaptersList);
  },[chaptersList])
  return (
    <>
      <div className="p-3  border-gray-100 my-4 border-b-[2px]">
        <h3 className="font-bold text-lg">المحتوى</h3>
      </div>
      <p className="text-gray-600">
        الوحدات التي سيتم تغطيتها أثناء الدورة والدروس الخاصة بكل وحدة، يمكنك
        تعديلها أو تعبئتها لاحقاً...
      </p>
      <div className="p-3 text-gray-900">
        <NestedList itemsList={chaptersList} setItemsList={setChaptersList} />
      </div>
    </>
  );
}
