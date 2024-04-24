import { Button } from "@mui/material";
import SingleFormInputContainer from "../containers/SingleFormInputContainer";

import { Link } from "react-router-dom";

export default function LoginUserForm() {

  const labelBaseStyle = "mb-2 text-base block font-semibold";
  const inputBaseStyle =
    "border-[2px] border-gray-100 p-2 w-full focus:border-primary-500 outline-none duration-200";

  return (
    <form className="text-gray-900  w-9/12" action="">
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

      {/* Password */}
      <SingleFormInputContainer error={null}>
        <label className={`${labelBaseStyle}`}>كلمة السر</label>
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
        تسجيل الدخول
      </Button>

      <Link to={"/forgot-password"}><p className="text-secondary-800 my-2 hover:underline hover:text-secondary-500"> نسيت كلمة السر؟ </p></Link>
    </form>
  );
}
