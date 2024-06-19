import { useState } from "react";
import SingleFormInputContainer from "../../containers/SingleFormInputContainer";
import SelectDropdown from "../../menus/SelectDropdown";
import UploadFileHandler from "../UploadFileHandler";
import { coursesList } from "../../data/coursesList";
import { Button } from "@mui/material";
import { liveStreamsList } from "../../data/livestreamsList";

export default function StartLiveStreamForm() {
  const [selectedCourse, setSelectedCourse] = useState();
  const [isSubmitting, setIsSubmitting] = useState();
  const labelBaseStyle = "mb-2 text-base block font-semibold";
  const inputBaseStyle =
    "border-[2px] border-gray-100 p-2 w-full focus:border-primary-500 outline-none duration-200";

  const DATE = "2024/6/25 - PM 3:00"; // delete later, date should be fetched form the backend
  return (
    <form>
      {/* Select Course Dropdown */}
      <SingleFormInputContainer extraStyles={"my-2"} error={null}>
        <div className="mb-3 flex items-center gap-1 ">
          <label className={`${labelBaseStyle}`}>اختر الدورة</label>
          <SelectDropdown
            width={300}
            title="الدورة"
            list={coursesList}
            stateChanger={setSelectedCourse}
          />
        </div>
      </SingleFormInputContainer>

      {/* Select Live Stream Dropdown */}
      <SingleFormInputContainer extraStyles={"my-2"} error={null}>
        <div className="mb-3 flex items-center gap-1 ">
          <label className={`${labelBaseStyle}`}>
            اختر البث المباشر المحدد مسبقا
          </label>
          <SelectDropdown
            width={300}
            title="البث المباشر"
            list={liveStreamsList}
            stateChanger={setSelectedCourse}
          />
        </div>
      </SingleFormInputContainer>

      <p className="my-2">{`تم تحديد موعد البث في ${DATE}`}</p>
      <p className="my-2">
        الرجاء بدء البث قبل الموعد المحدد بخمس دقائق على الأكثر
      </p>

      <Button
        type="submit"
        variant="contained"
        sx={{ borderRadius: "0px", fontSize: "1rem" }}
        fullWidth
        disableElevation
        disabled={isSubmitting}
      >
        {isSubmitting ? "جاري الإنشاء..." : "الانتقال إلى صفحة البث المباشر"}
      </Button>
    </form>
  );
}
