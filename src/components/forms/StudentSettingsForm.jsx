import { Button } from "@mui/material";
import DoubleFormInputContainer from "../containers/DoubleFormInputContainer";
import SingleFormInputContainer from "../containers/SingleFormInputContainer";
import { useState } from "react";
import SelectDropdown from "../menus/SelectDropdown";
import { streamsList } from "../data/streamsList";
import { citiesList } from "../data/citiesList";

export default function StudentSettingsForm() {
  const [currentStream, setCurrentStream] = useState();
  const [currentCity, setCurrentCity] = useState();
  const [currentGender, setCurrentGender] = useState();

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

      {/* Stream, City, Gender select-dropdown */}
      <div className="flex flex-col md:flex-row justify-between">
        <div className="mb-3 flex items-center gap-1">
          <label className={`${labelBaseStyle}`}>الفرع</label>
          <SelectDropdown
            title="الفرع"
            list={streamsList}
            stateChanger={setCurrentStream}
          />
        </div>
        <div className="mb-3 flex items-center gap-1">
          <label className={`${labelBaseStyle}`}>المحافظة</label>
          <SelectDropdown
            title="المحافظة"
            list={citiesList}
            stateChanger={setCurrentCity}
          />
        </div>
        <div className="mb-3 flex items-center gap-1">
          <label className={`${labelBaseStyle}`}>الجنس</label>
          <SelectDropdown
            title="الجنس"
            list={["ذكر", "أنثى"]}
            stateChanger={setCurrentGender}
          />
        </div>
      </div>

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
