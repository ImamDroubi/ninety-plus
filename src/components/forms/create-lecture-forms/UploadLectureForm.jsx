import { useState } from "react";
import SingleFormInputContainer from "../../containers/SingleFormInputContainer";
import SelectDropdown from "../../menus/SelectDropdown";
import UploadFileHandler from "../UploadFileHandler";
import { coursesList } from "../../data/coursesList";


export default function UploadLectureForm() {
  const [selectedCourse, setSelectedCourse] = useState();

  const labelBaseStyle = "mb-2 text-base block font-semibold";
  return (
    <form>
      <SingleFormInputContainer extraStyles={"my-2"} error={null}>
        <div className="mb-3 flex items-center gap-1 ">
          <label className={`${labelBaseStyle}`}>اختر الدورة</label>
          <SelectDropdown
            title="الدورة"
            list={coursesList}
            stateChanger={setSelectedCourse}
          />
        </div>
      </SingleFormInputContainer>
      <UploadFileHandler />
    </form>
  );
}
