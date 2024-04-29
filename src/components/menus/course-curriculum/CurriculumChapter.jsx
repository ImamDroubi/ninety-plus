import CurriculumLecture from "./CurriculumLecture";
import {
  EditIcon,
  HumburgerIcon,
  PlusIcon,
  TrashIcon,
} from "../../icons/icons";
export default function CurriculumChapter({
  chapter,
  deleteChapter,
  editChapter,
}) {
  const newLecture = {
    name: "تمت الإضافة",
  };
  const newChapter = {
    name: "تم التعديل",
  };

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
    let newLectures = chapter.lectures.filter((lecture) => lecture.id !== lectureId);
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
          <PlusIcon onClick={()=>addLecture(newLecture)} className="cursor-pointer hover:bg-gray-300 p-1 rounded-full" />
          <EditIcon
            onClick={() => editChapter(chapter.id, newChapter)}
            className="cursor-pointer hover:bg-gray-300 p-1 rounded-full"
          />
          <TrashIcon
            onClick={() => deleteChapter(chapter.id)}
            className="cursor-pointer hover:bg-gray-300 p-1 rounded-full"
          />
        </div>
      </div>
      <div className="body w-full">
        {chapter.lectures.map((lecture, index) => {
          return <CurriculumLecture lecture={lecture} key={index} deleteLecture={deleteLecture} editLecture={editLecture} />;
        })}
      </div>
    </div>
  );
}
