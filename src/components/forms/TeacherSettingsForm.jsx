import { Button } from "@mui/material";
import DoubleFormInputContainer from "../containers/DoubleFormInputContainer";
import SingleFormInputContainer from "../containers/SingleFormInputContainer";
import { useState } from "react";
import SelectDropdown from "../menus/SelectDropdown";
import { subjectsList } from "../data/subjectsList";

export default function TeacherSettingsForm() {
  const [currentSubject, setCurrentSubject] = useState();

  const labelBaseStyle = "mb-2 text-base block font-semibold";
  const inputBaseStyle =
    "border-[2px] border-gray-100 p-2 w-full focus:border-primary-500 outline-none duration-200";

  return (
    <form className="text-gray-900 text-sm" action="">
      {/* FullName  */}
      <SingleFormInputContainer>
        <label className={`${labelBaseStyle}`}>الاسم الكامل</label>
        <DoubleFormInputContainer>
          <SingleFormInputContainer extraStyles={"w-1/2"} error={null}>
            <input
              className={`${inputBaseStyle}`}
              type="text"
              placeholder="الاسم الأول"
              name=""
              id=""
            />
          </SingleFormInputContainer>
          <SingleFormInputContainer extraStyles={"w-1/2"} error={null}>
            <input
              className={`${inputBaseStyle}`}
              type="text"
              placeholder="الاسم الأخير"
              name=""
              id=""
            />
          </SingleFormInputContainer>
        </DoubleFormInputContainer>
      </SingleFormInputContainer>

      {/* username & phone number */}
      <DoubleFormInputContainer>
        <SingleFormInputContainer extraStyles={"w-1/2"} error={null}>
          <label className={`${labelBaseStyle}`}>اسم الحساب</label>
          <input
            className={`${inputBaseStyle}`}
            type="text"
            placeholder="اسم الحساب"
            name=""
            id=""
          />
        </SingleFormInputContainer>
        <SingleFormInputContainer extraStyles={"w-1/2"} error={null}>
          <label className={`${labelBaseStyle}`}>رقم الجوال</label>
          <input
            className={`${inputBaseStyle}`}
            type="tel"
            placeholder="05XX-XXX-XXX"
            name=""
            id=""
          />
        </SingleFormInputContainer>
      </DoubleFormInputContainer>

      {/* Email */}
      <SingleFormInputContainer error={null}>
        <label className={`${labelBaseStyle}`}>البريد الإلكتروني</label>
        <input
          className={`${inputBaseStyle}`}
          type="email"
          placeholder="example@example.com"
          name=""
          id=""
        />
      </SingleFormInputContainer>

      {/* Bio  */}
      <SingleFormInputContainer error={null}>
        <label className={`${labelBaseStyle}`}>نبذة</label>
        <textarea
          className={`${inputBaseStyle}`}
          name=""
          id=""
          cols="30"
          rows="5"
          placeholder="نبذة صغيرة عن نفسك..."
        ></textarea>
      </SingleFormInputContainer>

      {/* Subject */}
      <SingleFormInputContainer extraStyles={"w-1/2"} error={null}>
        <div className="mb-3 flex items-center gap-1">
          <label className={`${labelBaseStyle}`}>المادة</label>
          <SelectDropdown
            title="المادة"
            list={subjectsList}
            stateChanger={setCurrentSubject}
          />
        </div>
      </SingleFormInputContainer>
      <Button
        variant="contained"
        sx={{ borderRadius: "0px" }}
        fullWidth
        disableElevation
      >
        حفظ التغييرات
      </Button>
    </form>
  );
}
