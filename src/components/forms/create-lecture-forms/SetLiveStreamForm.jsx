import { useState } from "react";
import SingleFormInputContainer from "../../containers/SingleFormInputContainer";
import SelectDropdown from "../../menus/SelectDropdown";
import UploadFileHandler from "../UploadFileHandler";
import { coursesList } from "../../data/coursesList";
import { Button } from "@mui/material";

export default function SetLiveStreamForm() {
  const [selectedCourse, setSelectedCourse] = useState();
  const [isSubmitting, setIsSubmitting] = useState();
  const labelBaseStyle = "mb-2 text-base block font-semibold";
  const inputBaseStyle =
    "border-[2px] border-gray-100 p-2 w-full focus:border-primary-500 outline-none duration-200";
  return (
    <form>
      <p>لا يمكن بدء البث المباشر إلى بعد تحديد موعده مسبقاً</p>
      {/* Select Course Dropdown */}
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

      {/* Set Title */}
      <SingleFormInputContainer error={null}>
        <label className={`${labelBaseStyle}`}>عنوان البث المباشر</label>
        <input
          className={`${inputBaseStyle}`}
          type="text"
          placeholder="حل أسئلة الوحدة الأولى"
        />
      </SingleFormInputContainer>

      {/* Date and Time */}
      <SingleFormInputContainer extraStyles={"w-1/2"} error={null}>
        <label className={`${labelBaseStyle}`}>التاريخ والوقت</label>
        <input className={`${inputBaseStyle}`} type="datetime-local" />
      </SingleFormInputContainer>

      <Button
        type="submit"
        variant="contained"
        sx={{ borderRadius: "0px", fontSize: "1rem" }}
        fullWidth
        disableElevation
        disabled={isSubmitting}
      >
        {isSubmitting ? "جاري الإنشاء..." : "إنشاء الموعد"}
      </Button>
    </form>
  );
}
