import { Button } from "@mui/material";
import SingleFormInputContainer from "../containers/SingleFormInputContainer";


import { Link } from "react-router-dom";

export default function ForgotPasswordForm() {

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


      <Link to={"/forgot-password-email"}>
        <Button
          variant="contained"
          sx={{ borderRadius: "0px", fontSize : "1rem" }}
          fullWidth
          disableElevation
        >
        إرسال رابط الاستعادة
        </Button>
      </Link>

    </form>
  );
}
