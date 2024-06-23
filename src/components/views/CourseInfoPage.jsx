import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faCartShopping,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import user from "../../assets/images/user.jpg";
import Container90 from "../containers/Container90";
import BuyCourse from "../popups/BuyCourse";
import PopupLayout from "../layouts/PopupLayout";
import { useState } from "react";
import CourseInfoTabs from "../menus/CourseInfoTabs";
import ClosePopupButton from "../buttons/ClosePopupButton";
import { useNavigate, useParams } from "react-router-dom";
import { useCourse } from "../../hooks/useCourse";
import { Button, CircularProgress } from "@mui/material";
import { useUserInfo } from "../../hooks/useUserInfo";
import AddRating from "../popups/AddRating";
import AddComment from "../popups/AddComment";

export default function CourseInfoPage() {
  let { id } = useParams();
  const navigate = useNavigate();
  const {
    course,
    isLoading: courseLoading,
    isError: courseError,
  } = useCourse(id);

  const {
    userInfo: instructor,
    isLoading: instructorLoading,
    isError: instructorError,
  } = useUserInfo(
    course?.instructor?.id,
    course // this is the enable object for the dependent query
    // the query to get the instructo deosn't run until the course is present
  );
  const teacherImage = user;
  const starImage = <FontAwesomeIcon icon={faStar} />;
  const booksImgae =
    "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const [buyModalOpen, setBuyModalOpen] = useState(0);
  const [rateCoursePopupOpen, setRateCoursePopupOpen] = useState(false);
  if (courseLoading || instructorLoading) return <CircularProgress />;
  if (courseError || instructorError) navigate("/not-found");
  if (!course || !instructor) return <CircularProgress />;
  console.log(course);
  return (
    <>
      <div className="absolute hidden lg:block bg-gray-50 top-[7rem] h-[25rem] -z-10 w-full"></div>
      <Container90>
        <div className="flex justify-between gap-4 p-1 mt-2 page">
          <div className="content">
            <div className="header">
              <h2 className="mb-2 text-2xl font-bold text-gray-900 title">
                {course.title}
              </h2>
              {/* <p className="mb-2 text-gray-700 description">
                بثوث مباشرة وحلول أسئلة الكتاب ونماذج سابقة من امتحانات التوجيهي
              </p> */}
              <div className="flex justify-between mb-2 info">
                <div className="flex items-center gap-1 teacher">
                  <div className="object-cover w-5 h-5 rounded-full img">
                    <img
                      src={instructor.profile_image}
                      alt={instructor.first_name}
                      className="w-full h-full rounded-full"
                    />
                  </div>
                  <p className="text-gray-900 name">
                    {instructor.first_name} {instructor.last_name}
                  </p>
                </div>
                <div className="flex items-center gap-1 rating">
                  <Button onClick={() => setRateCoursePopupOpen(true)}>
                    قيم الدورة
                  </Button>
                  <div className="stars text-warning-500">{starImage}</div>
                  <p className="text-gray-900 number">
                    {course.rate}{" "}
                    {/* <span className="text-sm text-gray-600">(3200 طالب)</span> */}
                  </p>
                </div>
              </div>
            </div>
            <div className="object-cover preview">
              <img src={booksImgae} alt="" className="w-full h-full" />
            </div>
            <div className="information">
              <CourseInfoTabs course={course} instructor={instructor} />
            </div>
          </div>
          <div className="sticky hidden w-1/2 shadow-md widget xl:flex bg-gray-white h-fit top-2">
            <BuyCourse course={course} />
          </div>
          <button
            onClick={() => setBuyModalOpen(!buyModalOpen)}
            className="w-[4rem] h-[4rem] rounded-full bg-primary-500 text-gray-white fixed bottom-3 left-1 hover:bg-primary-600 duration-100 xl:hidden "
          >
            <FontAwesomeIcon icon={faCartShopping} />
          </button>
          {buyModalOpen ? (
            <PopupLayout>
              <div className="relative z-10 w-10/12 pt-2 bg-gray-white">
                <ClosePopupButton setOpen={setBuyModalOpen} />
                <BuyCourse course={course} />
              </div>
            </PopupLayout>
          ) : null}
          {rateCoursePopupOpen ? (
            <PopupLayout>
              <div className="relative z-10 w-5/12 pt-2 bg-gray-white">
                <ClosePopupButton setOpen={setRateCoursePopupOpen} />
                <AddRating
                  setOpen={setRateCoursePopupOpen}
                  courseId={course.id}
                />
              </div>
            </PopupLayout>
          ) : null}
        </div>
      </Container90>
    </>
  );
}
