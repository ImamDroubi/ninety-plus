import { Button } from "@mui/material";
import SingleFormInputContainer from "../containers/SingleFormInputContainer";

import { Link } from "react-router-dom";

export default function ResetPasswordForm() {

  const labelBaseStyle = "mb-2 text-base block font-semibold";
  const inputBaseStyle =
    "border-[2px] border-gray-100 p-2 w-full focus:border-primary-500 outline-none duration-200";

  return (
    <form className="text-gray-900  w-9/12" action="">

      {/* Password */}
      <SingleFormInputContainer error={null}>
        <label className={`${labelBaseStyle}`}>كلمة السر الجديدة</label>
        <input
          className={`${inputBaseStyle}`}
          type="password"
          placeholder="كلمة السر"
        />
      </SingleFormInputContainer>

      {/* Reset Password */}
      <SingleFormInputContainer error={null}>
        <label className={`${labelBaseStyle}`}>تأكيد كلمة السر</label>
        <input
          className={`${inputBaseStyle}`}
          type="password"
          placeholder="كلمة السر"
        />
      </SingleFormInputContainer>
      <Button
        variant="contained"
        sx={{ borderRadius: "0px", fontSize : "1rem" }}
        fullWidth
        disableElevation
      >
        تحديث كلمة السر
      </Button>

     
    </form>
  );
}
