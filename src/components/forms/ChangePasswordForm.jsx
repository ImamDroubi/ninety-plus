import { Button } from "@mui/material";
import SingleFormInputContainer from "../containers/SingleFormInputContainer";

export default function ChangePasswordForm() {

  const labelBaseStyle = "mb-2 text-base block font-semibold";
  const inputBaseStyle =
    "border-[2px] border-gray-100 p-2 w-full focus:border-primary-500 outline-none duration-200";

  return (
    <form className="text-gray-900 text-sm" action="">
      <SingleFormInputContainer error={null}>
        <label className={`${labelBaseStyle}`}>كلمة السر الحالية</label>
        <input
          className={`${inputBaseStyle}`}
          type="password"
          placeholder="كلمة السر الحالية"
        />
      </SingleFormInputContainer>

      <SingleFormInputContainer error={null}>
        <label className={`${labelBaseStyle}`}>كلمة السر الجديدة</label>
        <input
          className={`${inputBaseStyle}`}
          type="password"
          placeholder="كلمة السر الجديدة"
        />
      </SingleFormInputContainer>

      <SingleFormInputContainer error={null}>
        <label className={`${labelBaseStyle}`}>تكرار الكلمة الجديدة</label>
        <input
          className={`${inputBaseStyle}`}
          type="password"
          placeholder="تكرار الكلمة الجديدة"
        />
      </SingleFormInputContainer>

      <div className="submit flex justify-end">
        <Button variant="contained" sx={{borderRadius: "0px"}} disableElevation>
          حفظ التغييرات
        </Button>
      </div>
    </form>
  )
}
