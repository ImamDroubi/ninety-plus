import { Button } from "@mui/material";
import {
  ArrowDownIcon,
  EditIcon,
  HumburgerIcon,
  TrashIcon,
  VideoIcon,
} from "../../icons/icons";
import DropdownMenu from "../DropdownMenu";
import { useState } from "react";
import PopupLayout from "../../layouts/PopupLayout";
import ClosePopupButton from "../../buttons/ClosePopupButton";
import AddLecture from "../../popups/CurriculumPopups/AddLecture";
import EditLecture from "../../popups/CurriculumPopups/EditLecture";
import DeleteObjectPopup from "../../popups/DeleteObjectPopup";

export default function CurriculumLecture({
  lecture,
  editLecture,
  deleteLecture,
}) {
  const [editLecturePopupOpen, setEditLecturePopupOpen] = useState(false);
  const [deleteLecturePopupOpen, setDeleteLecturePopupOpen] = useState(false);
  const newLecture = {
    name: "تم التعديل",
  };

  return (
    <div className="w-full bg-gray-white my-2 p-2 flex justify-between cursor-pointer hover:bg-gray-100 duration-200">
      <h3 className="text-gray-600 ">
        <HumburgerIcon className="hidden sm:inline" /> {lecture.name}
      </h3>
      <div className="icons flex text-gray-600 text-xs gap-1 items-center">
        {
          // show if there is a video on this lecture or it's empty
          lecture.link ? (
            <p className="text-success-400">يتوفر مقطع فيديو</p>
          ) : (
            <p className="text-error-400">لا يتوفر مقطع فيديو</p>
          )
        }
        <VideoIcon className="cursor-pointer hover:bg-gray-300 p-1 rounded-full" />
        <EditIcon
          onClick={() => setEditLecturePopupOpen(true)}
          className="cursor-pointer hover:bg-gray-300 p-1 rounded-full"
        />
        <TrashIcon
          onClick={() => setDeleteLecturePopupOpen(true)}
          className="cursor-pointer hover:bg-gray-300 p-1 rounded-full"
        />
      </div>
      {/* POPUP TO Edit LECTURE  */}
      {editLecturePopupOpen ? (
        <PopupLayout>
          <div className="w-9/12  md:w-5/12 z-10 bg-gray-50 p-4 relative py-5">
            <ClosePopupButton setOpen={setEditLecturePopupOpen} />
            <EditLecture
              callback={editLecture}
              setOpen={setEditLecturePopupOpen}
              lecture={lecture}
            />
          </div>
        </PopupLayout>
      ) : null}

      {/* POPUP DELETE LECTURE  */}
      {deleteLecturePopupOpen ? (
        <PopupLayout>
          <div className="w-9/12  md:w-5/12 z-100 bg-gray-50 p-4 relative py-5">
            <ClosePopupButton setOpen={setDeleteLecturePopupOpen} />
            <DeleteObjectPopup
              callback={deleteLecture}
              setOpen={setDeleteLecturePopupOpen}
              objectId={lecture.id}
              title="تأكيد حذف المحاضرة"
            />
          </div>
        </PopupLayout>
      ) : null}
    </div>
  );
}
