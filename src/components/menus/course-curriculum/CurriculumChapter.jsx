import CurriculumLecture from "./CurriculumLecture";
import {
  EditIcon,
  HumburgerIcon,
  PlusIcon,
  TrashIcon,
} from "../../icons/icons";
import { useState } from "react";
import AddLecture from "../../popups/CurriculumPopups/AddLecture";
import PopupLayout from "../../layouts/PopupLayout";
import ClosePopupButton from "../../buttons/ClosePopupButton";
import EditChapter from "../../popups/CurriculumPopups/EditChapter";
import DeleteObjectPopup from "../../popups/DeleteObjectPopup";
export default function CurriculumChapter({
  chapter,
  deleteChapter,
  editChapter,
}) {
  const [editChapterPopupOpen, setEditChapterPopupOpen] = useState(false);
  const [addLecturePopupOpen, setAddLecturePopupOpen] = useState(false);
  const [deleteChapterPopupOpen, setDeleteChapterPopupOpen] = useState(false);


  const addLecture = (newLecture) => {
    const newId = chapter.lectures.length + 1;
    const newLectures = [...chapter.lectures, { ...newLecture, id: newId }];
    const updatedChapter = {
      ...chapter,
      lectures: newLectures,
    };
    editChapter(chapter.id, updatedChapter);
  };
  const editLecture = (lectureId, newLecture) => {
    const newLectures = chapter.lectures.map((lecture) => {
      if (lecture.id !== lectureId) return lecture;
      return {
        ...lecture,
        ...newLecture,
        id: lectureId,
      };
    });

    const updatedChapter = {
      ...chapter,
      lectures: newLectures,
    };
    editChapter(chapter.id, updatedChapter);
  };

  const deleteLecture = (lectureId) => {
    let newLectures = chapter.lectures.filter(
      (lecture) => lecture.id !== lectureId
    );
    newLectures = newLectures.map((lecture, key) => {
      return { ...lecture, id: key + 1 };
    });

    const updatedChapter = {
      ...chapter,
      lectures: newLectures,
    };
    editChapter(chapter.id, updatedChapter);
  };

  return (
    <div className="text-gray-900 bg-gray-50 w-full p-2 mb-3">
      <div className="header flex justify-between p-2">
        <h3>
          <HumburgerIcon className="hidden sm:inline" /> {chapter.name}
        </h3>
        <div className="icons flex  text-gray-600 ">
          <PlusIcon
            onClick={() => setAddLecturePopupOpen(true)}
            className="cursor-pointer hover:bg-gray-300 p-1 rounded-full"
          />
          <EditIcon
            onClick={() => setEditChapterPopupOpen(true)}
            className="cursor-pointer hover:bg-gray-300 p-1 rounded-full"
          />
          <TrashIcon
            onClick={() => setDeleteChapterPopupOpen(true)}
            className="cursor-pointer hover:bg-gray-300 p-1 rounded-full"
          />
        </div>
      </div>
      <div className="body w-full">
        {chapter.lectures.map((lecture, index) => {
          return (
            <CurriculumLecture
              lecture={lecture}
              key={index}
              deleteLecture={deleteLecture}
              editLecture={editLecture}
            />
          );
        })}
      </div>

      {/* POPUP TO ADD LECTURE  */}
      {addLecturePopupOpen ? (
        <PopupLayout>
          <div className="w-9/12  md:w-5/12 z-10 bg-gray-50 p-4 relative py-5">
            <ClosePopupButton setOpen={setAddLecturePopupOpen} />
            <AddLecture
              callback={addLecture}
              setOpen={setAddLecturePopupOpen}
            />
          </div>
        </PopupLayout>
      ) : null}

      {/* POPUP TO EDIT CHAPTER */}
      {editChapterPopupOpen ? (
        <PopupLayout>
          <div className="w-9/12  md:w-5/12 z-10 bg-gray-50 p-4 relative py-5">
            <ClosePopupButton setOpen={setEditChapterPopupOpen} />
            <EditChapter
              callback={editChapter}
              setOpen={setEditChapterPopupOpen}
              chapter={chapter}
            />
          </div>
        </PopupLayout>
      ) : null}

      {/* POPUP DELETE Chapter  */}
      {deleteChapterPopupOpen ? (
        <PopupLayout>
          <div className="w-9/12  md:w-5/12 z-100 bg-gray-50 p-4 relative py-5">
            <ClosePopupButton setOpen={setDeleteChapterPopupOpen} />
            <DeleteObjectPopup
              callback={deleteChapter}
              setOpen={setDeleteChapterPopupOpen}
              objectId={chapter.id}
              title="تأكيد حذف الوحدة"
            />
          </div>
        </PopupLayout>
      ) : null}
    </div>
  );
}
