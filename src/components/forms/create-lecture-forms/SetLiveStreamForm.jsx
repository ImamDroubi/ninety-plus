import { useEffect, useState } from "react";
import SingleFormInputContainer from "../../containers/SingleFormInputContainer";
import SelectDropdown from "../../menus/SelectDropdown";
import UploadFileHandler from "../UploadFileHandler";
import { coursesList } from "../../data/coursesList";
import { Button, CircularProgress } from "@mui/material";
import useGetResources from "../../../apiCalls/useGetResources";
import useCreateResource from "../../../apiCalls/useCreateResource";
import { useAlert } from "../../../hooks/useAlert";
import { useAuth } from "../../../contexts/AuthContext";
import TopAlert from "../../alerts/TopAlert";
import { combineCourses } from "../../../utils/coursesFunctions";
import { useProfileInfo } from "../../../hooks/useProfileInfo";
export default function SetLiveStreamForm() {
  const { currentUser } = useAuth();
  const { user, isLoading } = useProfileInfo();
  const [selectedCourse, setSelectedCourse] = useState({});
  const [selectedChapter, setSelectedChapter] = useState({});
  const [startsAt, setStartsAt] = useState("");
  const [name, setName] = useState("");
  const [coursesList, setCoursesList] = useState([]);
  const [chaptersList, setChaptersList] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const getCoursesQuery = useGetResources("courses");
  const createLecturesMutation = useCreateResource("lectures");

  const alertController = useAlert();
  const handleCreateLecture = async () => {
    if (!selectedCourse || !selectedChapter || !name || !startsAt || name == "")
      return;
    setIsCreating(true);
    const lecture = {
      name: name,
      course_id: selectedCourse.id,
      chapter_id: selectedChapter.id,
      starts_at: startsAt,
    };
    try {
      const response = await createLecturesMutation.mutateAsync({
        ...lecture,
      });
      alertController.alertSuccessToggle("تمت الإضافة بنجاح!");
      setName("");
    } catch (error) {
      console.log(error);
      alertController.alertErrorToggle(`خطأ في الإضافة!`);
    }
    setIsCreating(false);
  };

  useEffect(() => {
    if (selectedCourse)
      setChaptersList(
        selectedCourse.chapters?.map((chapter) => {
          return {
            id: chapter.id,
            name: chapter.title,
          };
        }) || []
      );
  }, [selectedCourse]);

  useEffect(() => {
    if (user) {
      const userCourses = combineCourses(user.courses);
      setCoursesList(
        userCourses?.map((course) => {
          return {
            id: course.id,
            name: course.title,
            chapters: course.chapters,
          };
        }) || []
      );
    }
  }, [user]);

  // useEffect(() => {
  //   if (currentUser) {
  //     const userCourses = combineCourses(currentUser.courses);
  //     setCoursesList(
  //       userCourses.map((course) => {
  //         return {
  //           id: course.id,
  //           name: course.title,
  //           chapters: course.chapters,
  //         };
  //       }) || []
  //     );
  //   }
  // }, [currentUser]);
  const labelBaseStyle = "mb-2 text-base block font-semibold";
  const inputBaseStyle =
    "border-[2px] border-gray-100 p-2 w-full focus:border-primary-500 outline-none duration-200";
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
      <form>
        <p>لا يمكن بدء البث المباشر إلا بعد تحديد موعده مسبقاً</p>
        {/* Select Course Dropdown */}
        <SingleFormInputContainer extraStyles={"my-2"} error={null}>
          <div className="mb-3 flex items-center gap-1 ">
            <label className={`${labelBaseStyle}`}>اختر الدورة</label>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <SelectDropdown
                title="الدورة"
                list={coursesList}
                stateChanger={setSelectedCourse}
              />
            )}
          </div>
        </SingleFormInputContainer>
        {/* Select Chapters Dropdown */}
        <SingleFormInputContainer extraStyles={"my-2"} error={null}>
          <div className="mb-3 flex items-center gap-1 ">
            <label className={`${labelBaseStyle}`}>اختر الوحدة</label>
            <SelectDropdown
              title="الوحدة"
              list={chaptersList}
              stateChanger={setSelectedChapter}
            />
          </div>
        </SingleFormInputContainer>

        {/* Set Title */}
        <SingleFormInputContainer error={null}>
          <label className={`${labelBaseStyle}`}>عنوان البث المباشر</label>
          <input
            className={`${inputBaseStyle}`}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="حل أسئلة الوحدة الأولى"
          />
        </SingleFormInputContainer>

        {/* Date and Time */}
        <SingleFormInputContainer extraStyles={"w-1/2"} error={null}>
          <label className={`${labelBaseStyle}`}>التاريخ والوقت</label>
          <input
            onChange={(e) => setStartsAt(e.target.value)}
            className={`${inputBaseStyle}`}
            value={startsAt}
            type="datetime-local"
          />
        </SingleFormInputContainer>

        <Button
          type="submit"
          variant="contained"
          sx={{ borderRadius: "0px", fontSize: "1rem" }}
          fullWidth
          disableElevation
          onClick={handleCreateLecture}
          disabled={isCreating}
        >
          {isCreating ? "جاري الإنشاء..." : "إنشاء الموعد"}
        </Button>
      </form>
    </>
  );
}
