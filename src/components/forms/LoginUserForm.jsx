import { Button } from "@mui/material";
import SingleFormInputContainer from "../containers/SingleFormInputContainer";

import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import TopAlert from "../alerts/TopAlert";
import loginSchema from "./schemas/loginSchema";
import { useAlert } from "../../hooks/useAlert";
import useLogin from "../../apiCalls/authCalls/useLogin";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext"
export default function LoginUserForm() {
  const navigate = useNavigate();
  const alertController = useAlert();
  const {login,setAccessToken} = useAuth();
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
  const mutation = useLogin();
  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Send to backend
    try {
      const response = await mutation.mutateAsync(data);
      const user = response.data.data.user; 
      const token = response.data.data.access_token;
      alertController.alertSuccessToggle("تم تسجيل الدخول!");
      await new Promise((resolve) => setTimeout(resolve, 500));
      if(!user.email_verified){
        navigate("/verify-email");
      }else{
        login(user);
        setAccessToken(token);
        navigate("/");
      }
    } catch (error) {
      alertController.alertErrorToggle("البيانات غير صحيحة!");
    }
  };

  const labelBaseStyle = "mb-2 text-base block font-semibold";
  const inputBaseStyle =
    "border-[2px] border-gray-100 p-2 w-full focus:border-primary-500 outline-none duration-200";

  return (
    <>
      {alertController.showSuccessAlert && (
        <TopAlert
          message={alertController.successAlertMessage}
          type="success"
        />
      )}
      {alertController.showErrorAlert && (
        <TopAlert message={alertController.errorAlertMessage} type="error" />
      )}
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
          {isSubmitting ? "جاري التسجيل" : "تسجيل الدخول"}
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
