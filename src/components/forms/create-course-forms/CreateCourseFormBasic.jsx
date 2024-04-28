import { useEffect, useState } from "react";
import SingleFormInputContainer from "../../containers/SingleFormInputContainer";
import { subjectsList } from "../../data/subjectsList";
import { weeklyLecturesList } from "../../data/weeklyLecturesList";
import SelectDropdown from "../../menus/SelectDropdown";

import { useCreateCourseContext } from "../../../contexts/CreateCourseContext";

export default function CreateCourseFormBasic() {
  const {
    register,
    errors,
    setSubject,
    setWeeklyLectures,
    subject,
    weekly_lectures,
  } = useCreateCourseContext();

  const [currentSubject, setCurrentSubject] = useState(subject);
  const [currentLecturesPerWeek, SetCurrentLecturesPerWeek] =
    useState(weekly_lectures);

  // These change the value in the context according to the value in the page
  useEffect(() => {
    setSubject(currentSubject);
  }, [currentSubject]);
  useEffect(() => {
    setWeeklyLectures(currentLecturesPerWeek);
  }, [currentLecturesPerWeek]);

  const labelBaseStyle = "mb-2 text-sm block font-semibold";
  const inputBaseStyle =
    "border-[2px] border-gray-100 p-2 w-full focus:border-primary-500 outline-none duration-200";

  return (
    <>
      <div className="p-3  border-gray-100 my-4 border-b-[2px]">
        <h3 className="font-bold text-lg">المعلومات الأساسية</h3>
      </div>
      <form className="text-gray-900 text-sm space-y-5">
        {/* Title */}
        <SingleFormInputContainer error={errors?.title?.message}>
          <label className={`${labelBaseStyle}`}>العنوان</label>
          <input
            className={`${inputBaseStyle}`}
            type="text"
            placeholder="عنوان الدورة"
            {...register("title")}
          />
        </SingleFormInputContainer>

        {/* Coverage */}
        <SingleFormInputContainer error={errors?.coverage?.message}>
          <label className={`${labelBaseStyle}`}>المادة المشمولة</label>
          <input
            className={`${inputBaseStyle}`}
            type="text"
            placeholder="الفصل الأول، الفصل الثاني، المادة كاملة، ...الخ"
            {...register("coverage")}
          />
        </SingleFormInputContainer>

        {/* Subject and Weekly Lectures */}
        <div className="flex justify-between">
          <SingleFormInputContainer error={null}>
            <div className="mb-3 flex items-center gap-1">
              <label className={`${labelBaseStyle}`}>المادة</label>
              <SelectDropdown
                title="المادة"
                list={subjectsList}
                stateChanger={setCurrentSubject}
                defaultState={subject}
              />
            </div>
          </SingleFormInputContainer>
          <SingleFormInputContainer error={null}>
            <div className="mb-3 flex items-center gap-1">
              <label className={`${labelBaseStyle}`}>عدد الحصص الأسبوعية</label>
              <SelectDropdown
                title="الحصص"
                list={weeklyLecturesList}
                stateChanger={SetCurrentLecturesPerWeek}
                defaultState={weekly_lectures}
              />
            </div>
          </SingleFormInputContainer>
        </div>
      </form>
    </>
  );
}
