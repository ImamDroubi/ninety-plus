import { useState } from "react";
import SingleFormInputContainer from "../../containers/SingleFormInputContainer";
import { subjectsList } from "../../data/subjectsList";
import SelectDropdown from "../../menus/SelectDropdown";
import DoubleFormInputContainer from "../../containers/DoubleFormInputContainer";

export default function CreateCourseFormBasic() {
  const [currentSubject, setCurrentSubject] = useState();
  const [currentLecturesPerWeek, SetCurrentLecturesPerWeek] = useState();

  const labelBaseStyle = "mb-2 text-sm block font-semibold";
  const inputBaseStyle =
    "border-[2px] border-gray-100 p-2 w-full focus:border-primary-500 outline-none duration-200";

  return (
    <>
      <div className="p-3  border-gray-100 my-4 border-b-[2px]">
        <h3 className="font-bold text-lg">المعلومات الأساسية</h3>
      </div>
      <form className="text-gray-900 text-sm space-y-5" action="">
        <SingleFormInputContainer error={null}>
          <label className={`${labelBaseStyle}`}>العنوان</label>
          <input
            className={`${inputBaseStyle}`}
            type="text"
            placeholder="عنوان الدورة"
            name=""
            id=""
          />
        </SingleFormInputContainer>
        <SingleFormInputContainer error={null}>
          <label className={`${labelBaseStyle}`}>المادة المشمولة</label>
          <input
            className={`${inputBaseStyle}`}
            type="text"
            placeholder="الفصل الأول، الفصل الثاني، المادة كاملة، ...الخ"
            name=""
            id=""
          />
        </SingleFormInputContainer>
        <div className="flex justify-between">
          <SingleFormInputContainer error={null}>
            <div className="mb-3 flex items-center gap-1">
              <label className={`${labelBaseStyle}`}>المادة</label>
              <SelectDropdown
                title="المادة"
                list={subjectsList}
                stateChanger={setCurrentSubject}
              />
            </div>
          </SingleFormInputContainer>
          <SingleFormInputContainer error={null}>
            <div className="mb-3 flex items-center gap-1">
              <label className={`${labelBaseStyle}`}>عدد الحصص الأسبوعية</label>
              <SelectDropdown
                title="الحصص"
                list={[1, 2, 3, 4, 5]}
                stateChanger={SetCurrentLecturesPerWeek}
              />
            </div>
          </SingleFormInputContainer>
        </div>
      </form>
    </>
  );
}
