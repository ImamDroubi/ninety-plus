import { Button } from "@mui/material";
import SingleFormInputContainer from "../containers/SingleFormInputContainer";

import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import TopAlert from "../alerts/TopAlert";

const loginSchema = z.object({
  email: z.string().email({ message: "الرجاء إدخال بريد إلكتروني صالح" }),
  password: z.string(),
});


export default function LoginUserForm() {
  const [showAlert, setShowAlert] = useState(false);

  // React hook form attributes
  const {
    register,
    handleSubmit,
    setError, // This is to set errors after recieving a response from the backend . example : setError("root" , {message :"something went wrong!"})
    formState: { errors, isSubmitting }, // this errors here is the validation errors from the frontend
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

// ===================================== HANDLE SUBMISSION FUNCTION ========================================================
const onSubmit = async (data) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Send to backend 
  console.log(data);

  // After sucess
  alertToggle();
};

const alertToggle = () => {
  setShowAlert(true);
  setTimeout(() => setShowAlert(false), 6000);
};



  const labelBaseStyle = "mb-2 text-base block font-semibold";
  const inputBaseStyle =
    "border-[2px] border-gray-100 p-2 w-full focus:border-primary-500 outline-none duration-200";

  return (
    <>
    {showAlert && <TopAlert message="تم الدخول" />}
    <form className="text-gray-900  w-9/12" onSubmit={handleSubmit(onSubmit)}>
      {/* Email */}
      <SingleFormInputContainer error={errors.email?.message}>
        <label className={`${labelBaseStyle}`}>البريد الإلكتروني</label>
        <input
          className={`${inputBaseStyle}`}
          type="email"
          placeholder="example@example.com"
          {...register("email")}
        />
      </SingleFormInputContainer>

      {/* Password */}
      <SingleFormInputContainer error={errors.password?.message}>
        <label className={`${labelBaseStyle}`}>كلمة السر</label>
        <input
          className={`${inputBaseStyle}`}
          type="password"
          placeholder="كلمة السر"
          {...register("password")}
        />
      </SingleFormInputContainer>

      <Button
        variant="contained"
        sx={{ borderRadius: "0px", fontSize: "1rem" }}
        fullWidth
        disableElevation
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting? "جاري التسجيل" : "تسجيل الدخول"}
      </Button>

      <Link to={"/forgot-password"}>
        <p className="text-secondary-800 my-2 hover:underline hover:text-secondary-500">
          {" "}
          نسيت كلمة السر؟{" "}
        </p>
      </Link>
    </form>
    </>
  );
}
