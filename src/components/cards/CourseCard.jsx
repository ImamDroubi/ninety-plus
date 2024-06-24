import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import MathBook from "../../assets/images/book-covers/math-scientific.jpg";
import OptionsOverlayButton from "../overlays/OptionsOverlayButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import DeleteObjectPopup from "../popups/DeleteObjectPopup";
import useDeleteResource from "../../apiCalls/useDeleteResource";
import TopAlert from "../alerts/TopAlert";
import { useAlert } from "../../hooks/useAlert";
import PopupLayout from "../layouts/PopupLayout";
import ClosePopupButton from "../buttons/ClosePopupButton";
const sample = {
  id: 1,
  title: "رياضيات توجيهي علمي وصناعي للأستاذ محمد حرزالله",
  category: "علمي",
  price: 400,
  cover_image: MathBook,
  stars: 4.5,
  studentsNo: 120,
};
export default function CourseCard({ course = sample, showOptions = false }) {
  // remove the = sample
  const [currentCourse, setCurrentCourse] = useState({ ...sample, ...course });
  const deleteMutation = useDeleteResource("courses");
  const [deleteCoursePopupOpen, setDeleteCoursePopupOpen] = useState(false);
  const navigate = useNavigate();
  const alertController = useAlert();
  const handleNavigate = () => {
    navigate(`/course-info/${course.id}`);
  };

  const optionsList = [
    {
      text: "عرض الدورة",
      callback: () => {
        navigate(`/courses/${course.id}`);
      },
    },
    {
      text: "تعديل الدورة",
      callback: () => {
        navigate(`${course.id}`);
      },
    },
    {
      text: "حذف الدورة",
      callback: () => {
        setDeleteCoursePopupOpen(true);
      },
    },
  ];

  const handleDeleteCourse = async () => {
    try {
      await deleteMutation.mutateAsync(course?.id);
      alertController.alertSuccessToggle("تم حذف الدورة بنجاح!");
      await new Promise((resolve) => setTimeout(resolve, 500));
      window.location.reload();
    } catch (error) {
      console.log(error);
      alertController.alertErrorToggle("حدث خطأ أثناء عملية الحذف!");
    }
  };

  return (
    <>
      {alertController.showSuccessAlert && (
        <TopAlert
          message={alertController.successAlertMessage}
          type="success"
        />
      )}
      {alertController.showErrorAlert && (
        <TopAlert message={alertController.errorAlertMessage} type="error" />
      )}
      {deleteCoursePopupOpen && (
        <PopupLayout>
          <div className="w-9/12  md:w-5/12 z-20 bg-gray-50 p-4 relative py-5">
            <ClosePopupButton setOpen={setDeleteCoursePopupOpen} />
            <DeleteObjectPopup
              setOpen={setDeleteCoursePopupOpen}
              title="تأكيد حذف الدورة"
              objectId={course.id}
              callback={handleDeleteCourse}
            />
          </div>
        </PopupLayout>
      )}
      <div
        onClick={handleNavigate}
        className="relative group w-[20rem] sm:w-[16rem] min-h-[20rem] bg-gray-white  flex flex-col cursor-pointer border-2 border-gray-100"
      >
        {showOptions && <OptionsOverlayButton optionsList={optionsList} />}
        <div className="preview w-full h-[12rem] object-cover overflow-hidden relative">
          <div className="absolute hidden w-full h-full overlay bg-gray-white opacity-30 group-hover:block"></div>
          <img
            src={currentCourse.cover_image}
            alt="math book"
            className="w-full"
          />
        </div>
        <div className="flex items-center justify-between w-full p-2 info">
          <p className="category font-semibold bg-primary-100 p-[0.3rem] text-primary-700">
            {currentCourse.category}
          </p>
          <p className="font-bold price text-primary-500">
            {currentCourse.price} $
          </p>
        </div>
        <h3
          title={currentCourse.title}
          className="p-2 text-lg font-bold title group-hover:underline"
        >
          {currentCourse.title.length > 45
            ? `${currentCourse.title.slice(0, 42)}...`
            : currentCourse.title}
        </h3>
        <div className="flex justify-between p-2 font-semibold border-t-2 border-gray-100 rating">
          <p className="stars flex items-center gap-[2px] text-gray-700">
            <FontAwesomeIcon className="text-warning-500" icon={faStar} />
            {currentCourse.rate || 0}
          </p>
          <div className="text-gray-500 students">
            <span className="text-gray-700">
              {currentCourse.student_count || 0}
            </span>{" "}
            طالب
          </div>
        </div>
      </div>
    </>
  );
}
