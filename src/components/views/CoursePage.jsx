import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faPlay,
  faComment,
  faArrowLeft,
  faChevronLeft,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { Button, CircularProgress } from "@mui/material";
import Container90 from "../containers/Container90";
import video from "../../assets/videos/grass.mp4";
import CoursePageTabs from "../menus/CoursePageTabs";
import WatchCourseMenu from "../menus/WatchCourseMenu";
import PopupLayout from "../layouts/PopupLayout";
import { useEffect, useState } from "react";
import WatchMenu from "../popups/watchMenu";
import ClosePopupButton from "../buttons/ClosePopupButton";
import LiveStreamCard from "../cards/LiveStreamCard";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useCourse } from "../../hooks/useCourse";
import { useLesson } from "../../hooks/useLesson";
import lecturePreview from "../../assets/images/lecturePreview.jpg";

// const chaptersSample = [
//   {
//     id: 1,
//     title: "حساب التفاضل",
//     lectures: [
//       {
//         id: 1,
//         title: "متوسط التغير",
//       },
//       {
//         id: 2,
//         title: "قواعد الاشتقاق",
//       },
//       {
//         id: 3,
//         title: "مشتقات الاقترانات المثلثية",
//       },
//       {
//         id: 4,
//         title: "قاعدة لوبيتال ومشتقة الاقتران الأسي واللوغاريتمي",
//       },
//       {
//         id: 5,
//         title: "تطبيقات هندسية وفيزيائية",
//       },
//       {
//         id: 6,
//         title: "قاعدة السلة",
//       },
//       {
//         id: 7,
//         title: "الاشتقاق الضمني",
//       },
//     ],
//   },
//   {
//     id: 2,
//     title: "تطبيقات التفاضل",
//     lectures: [],
//   },
//   {
//     id: 3,
//     title: "المصفوفات والمحددات",
//     lectures: [],
//   },
//   {
//     id: 4,
//     title: "التكامل غير المحدود، وتطبيقاته",
//     lectures: [],
//   },
//   {
//     id: 5,
//     title: "التكامل المحدود وتطبيقاته",
//     lectures: [],
//   },
//   {
//     id: 6,
//     title: "الأعداد المركبة",
//     lectures: [],
//   },
// ];

export default function CoursePage() {
  let { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { lesson, isLoading: lessonLoading } = useLesson(
    searchParams.get("lesson")
  ); // not implemented yet from the backend
  const { course, isLoading: courseLoading } = useCourse(id);
  const [watchPopupOpen, setWatchPopupOpen] = useState(false);
  const [isLiveStreamOn, setIsLiveStreamOn] = useState(false);
  const [currentLecture, setCurrentLecture] = useState();

  useEffect(() => {
    if (lesson) {
      setCurrentLecture(lesson);
    }
  }, [lesson]);
  useEffect(() => {
    if (searchParams.get("lesson") == null) {
      setSearchParams({ lesson: 1 });
    }
  }, []);
  if (!course || courseLoading) return <CircularProgress />;
  if (lessonLoading) return <CircularProgress />;
  return (
    <>
      <div className="px-1 py-2 to bg-gray-50 sm:px-0">
        <Container90>
          <div className="flex justify-between content">
            <div className="flex gap-2 right">
              {/* <button className="flex items-center justify-center w-6 h-6 text-gray-900 rounded-full shadow back shrink-0 bg-gray-white hover:bg-gray-200 focus:bg-gray-200">
                <FontAwesomeIcon icon={faArrowRight} />
              </button> */}
              <div className="info flex flex-col justify-center gap-[0.2rem]">
                <h2 className="font-bold text-gray-900">{course.title}</h2>
                {/* <div className="videos flex items-center gap-[3px]">
                  <div className="icon text-gray-500 w-[1rem] h-[1rem] text-xs border-gray-500 p-1 justify-center items-center flex border-2 rounded-full">
                    <FontAwesomeIcon
                      className="translate-x-[1px]"
                      icon={faPlay}
                    />
                  </div>
                  <p className="text-xs text-gray-700">
                    <span>77</span> محاضرة
                  </p>
                </div> */}
              </div>
            </div>
            <div className="items-center hidden gap-2 left lg:flex">
              {/* <Button variant="outlined" disableElevation sx={{borderRadius:0}}>اترك تعليقاً </Button> */}
              {/* <Button
                variant="contained"
                disableElevation
                sx={{ borderRadius: 0 }}
              >
                <div className="flex items-center gap-1">
                  <p>المحاضرة التالية</p>
                  <div className="flex items-center icon">
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </div>
                </div>
              </Button> */}
            </div>
            <div className="flex items-center gap-1 left lg:hidden ">
              <button
                onClick={() => setWatchPopupOpen(true)}
                className="flex items-center justify-center w-6 h-6 text-xl bg-gray-100 rounded-full text-primary-500 hover:bg-gray-200"
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
              <button className="flex items-center justify-center w-6 h-6 text-xl rounded-full text-gray-white bg-primary-500 hover:bg-primary-700">
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
            </div>
          </div>
        </Container90>
      </div>
      <Container90>
        <div className="flex flex-col gap-2 px-2 my-3 text-gray-900 lg:flex-row main sm:px-0">
          <div className="lg:basis-3/4 content">
            <div className="video">
              {/* <img src={lecturePreview} className="max-w-full" /> */}
              {currentLecture?.record ? (
                <video
                  controls
                  src={currentLecture?.record}
                  className="max-w-full"
                ></video>
              ) : (
                <>
                  <p>لم يتم رفع تسجيل هذه الحصة بعد</p>
                  <p className="my-2">{`البث المباشر محدد بتاريخ ${currentLecture?.starts_at}`}</p>
                  <Link
                    to={`/courses/${course?.id}/live/${currentLecture?.id}`}
                  >
                    <Button
                      disableElevation
                      sx={{ borderRadius: "0px" }}
                      variant="contained"
                    >
                      الانتقال لصفحة البث المباشر
                    </Button>
                  </Link>
                </>
              )}
              <h1 className="my-2 text-2xl font-normal md:font-bold title">
                {`${currentLecture?.id}. ${currentLecture?.name}`}
              </h1>
              {/* <div className="flex justify-between text-sm info md:text-base">
                <p className="text-gray-600">
                  <span className="text-lg font-bold text-gray-900">523 </span>
                  مشاهد
                </p>
                <div className="flex gap-5 statistics">
                  <p className="text-gray-600 date">
                    تاريخ التحميل:{" "}
                    <span className="text-gray-900">Oct/26/2020</span>
                  </p>
                  <p className="text-gray-600 comments">
                    التعليقات: <span className="text-gray-900">154</span>
                  </p>
                </div>
              </div> */}
            </div>
            <hr className="my-2 " />
            <CoursePageTabs lecture={currentLecture} />
          </div>
          <div className="nav h-[60rem] hidden lg:block basis-1/4">
            {isLiveStreamOn && <LiveStreamCard />}
            <WatchCourseMenu
              chapters={course.chapters}
              setSearchParams={setSearchParams}
            />
          </div>
        </div>
      </Container90>
      {watchPopupOpen ? (
        <PopupLayout>
          <div className="relative z-10 w-10/12 py-6 bg-gray-50">
            <ClosePopupButton setOpen={setWatchPopupOpen} />
            {isLiveStreamOn && <LiveStreamCard />}
            <WatchCourseMenu
              // chapters={course.chapters}
              setSearchParams={setSearchParams}
            />
          </div>
        </PopupLayout>
      ) : null}
    </>
  );
}
