import { Button } from "@mui/material";
import {
  ArrowDownIcon,
  EditIcon,
  HumburgerIcon,
  TrashIcon,
} from "../../icons/icons";
import DropdownMenu from "../DropdownMenu";
import { useState } from "react";
import PopupLayout from "../../layouts/PopupLayout";
import ClosePopupButton from "../../buttons/ClosePopupButton";
import AddLecture from "../../popups/AddLecture";

export default function CurriculumLecture({
  lecture,
  editLecture,
  deleteLecture,
}) {

  
  const [editLecturePopupOpen, setEditLecturePopupOpen] = useState(false);
  const newLecture = {
    name: "تم التعديل",
  };




  return (
    <div className="w-full bg-gray-white my-2 p-2 flex justify-between cursor-pointer hover:bg-gray-100 duration-200">
      <h3 className="text-gray-600 ">
        <HumburgerIcon className="hidden sm:inline" /> {lecture.name}
      </h3>
      <div className="icons flex text-gray-600 text-xs gap-1 items-center">
        {/* <DropdownMenu small={true} list={[{ text: "إضافة مقطع فيديو" }]}>
          <Button size="small" variant="outlined" disableElevation>
            <span className="ml-1">المحتويات</span>
            <ArrowDownIcon />
          </Button>
        </DropdownMenu> */}
        {
          // show if there is a video on this lecture or it's empty
          lecture.link ? (
            <p className="text-success-400">يتوفر مقطع فيديو</p>
          ) : (
            <p className="text-error-400">لا يتوفر مقطع فيديو</p>
          )
        }
        <EditIcon
          onClick={() => editLecture(lecture.id, newLecture)}
          className="cursor-pointer hover:bg-gray-300 p-1 rounded-full"
        />
        <TrashIcon
          onClick={() => deleteLecture(lecture.id)}
          className="cursor-pointer hover:bg-gray-300 p-1 rounded-full"
        />
      </div>
      
    </div>
  );
}
