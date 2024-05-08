import { useState } from "react";
import NestedList from "../../menus/course-curriculum/NestedList";
import { Button } from "@mui/material";


const COURSE = {
  title: "دورة شاملة في منهج الرياضيات للأستاذ محمد حرزالله",
};
const CHAPTERS_LIST = [
  {
    id: 1,
    name: "الوحدة الأولى",
    lectures: [
      {
        id: 1,
        name: "الحصة الأولى",
        link : "link_to_the_video.com"
      },
      {
        id: 2,
        name: "الحصة الثانية",
      },
    ],
  },
  {
    id: 2,
    name: "الوحدة الثانية",
    lectures: [
      {
        id: 1,
        name: "الحصة الأولى",
      },
      {
        id: 2,
        name: "الحصة الثانية",
      },
    ],
  },
];
export default function TeacherEditCoursePage() {
  const [course, setCourse] = useState(COURSE);
  const [chaptersList, setChaptersList] = useState(CHAPTERS_LIST);

  

  return (
    <div className="my-4 w-[90%] m-auto">
      <div className=" border-gray-100 my-4 border-b-[2px]">
        <h3 className="font-semibold text-lg">{course.title}</h3>
      </div>
      <p className="text-gray-600">
        الوحدات والدروس المغطاة في الدورة ، يمكنك إضافة وحدات أو دروس أو رفع
        محاضرة جديدة إلى الوحدات الموجودة من قبل
      </p>
      <div className=" text-gray-900">
        <NestedList itemsList={chaptersList} setItemsList={setChaptersList} />
      </div>

      <div className="flex justify-end py-3 w-full">
        <Button variant="contained" disableElevation sx={{borderRadius : "0px"}}>حفظ التغييرات</Button>
      </div>
    </div>
  );
}
