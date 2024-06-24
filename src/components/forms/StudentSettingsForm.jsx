import { Button, CircularProgress } from "@mui/material";
import DoubleFormInputContainer from "../containers/DoubleFormInputContainer";
import SingleFormInputContainer from "../containers/SingleFormInputContainer";
import { useRef, useState } from "react";
import SelectDropdown from "../menus/SelectDropdown";
import { subjectsList } from "../data/subjectsList";
import { useUserProfile } from "../../contexts/UserProfileContext";
import { useRegistrationMenus } from "../../hooks/useRegistrationMenus";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useUpdateResource from "../../apiCalls/useUpdateResource";
import { useAlert } from "../../hooks/useAlert";
import TopAlert from "../alerts/TopAlert";
import { useAuth } from "../../contexts/AuthContext";
import { useUpdateProfile } from "../../apiCalls/useUpdateProfile";
import updateStudentSchema from "./schemas/updateStudentSchema";

export default function StudentSettingsForm(props) {
  const { currentUser, login } = useAuth();
  const { profileInfo, isLoading } = useUserProfile();

  const {
    register,
    handleSubmit,
    setError, // This is to set errors after recieving a response from the backend . example : setError("root" , {message :"something went wrong!"})
    formState: { errors, isSubmitting }, // this errors here is the validation errors from the frontend
  } = useForm({
    resolver: zodResolver(updateStudentSchema),
  });
  const updatedProfilePayload = new FormData();
  const updateMutation = useUpdateProfile();
  const alertController = useAlert();
  const onSubmit = async (data) => {
    // we have to send form data because we have cover image
    // and useUpdateProfile hook uses post with a _method of put
    // this is because laravel in the backend doesn't support binary files with put
    updatedProfilePayload.append("_method", "put");
    handleDataAppending(data);
    try {
      const response = await updateMutation.mutateAsync(updatedProfilePayload);
      alertController.alertSuccessToggle("تم تعديل البيانات بنجاح!");
      login(response.data.data);
    } catch (error) {
      console.log(error);
      alertController.alertErrorToggle("يرجى التحقق من البيانات المرسلة!");
    }
  };
  const handleDataAppending = (data) => {
    if (data.first_name != currentUser.first_name)
      updatedProfilePayload.append("first_name", data.first_name);
    if (data.last_name != currentUser.last_name)
      updatedProfilePayload.append("last_name", data.last_name);
    if (data.phone != currentUser.phone)
      updatedProfilePayload.append("phone", data.phone);
    if (data.birth_date != currentUser.birth_date)
      updatedProfilePayload.append("birth_date", data.birth_date);
    if (props.profilePicture) {
      updatedProfilePayload.append("profile_image", props.profilePicture);
    }
  };

  const labelBaseStyle = "mb-2 text-base block font-semibold";
  const inputBaseStyle =
    "border-[2px] border-gray-100 p-2 w-full focus:border-primary-500 outline-none duration-200";
  if (isLoading || !profileInfo) return <CircularProgress />;

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
      <form className="text-gray-900 text-sm" onSubmit={handleSubmit(onSubmit)}>
        {/* FullName  */}
        <SingleFormInputContainer>
          <label className={`${labelBaseStyle}`}>الاسم الكامل</label>
          <DoubleFormInputContainer>
            <SingleFormInputContainer
              extraStyles={"w-1/2"}
              error={errors.first_name?.message}
            >
              <input
                className={`${inputBaseStyle}`}
                type="text"
                placeholder="الاسم الأول"
                defaultValue={profileInfo.first_name}
                {...register("first_name")}
              />
            </SingleFormInputContainer>
            <SingleFormInputContainer
              extraStyles={"w-1/2"}
              error={errors.last_name?.message}
            >
              <input
                className={`${inputBaseStyle}`}
                type="text"
                placeholder="الاسم الأخير"
                defaultValue={profileInfo.last_name}
                {...register("last_name")}
              />
            </SingleFormInputContainer>
          </DoubleFormInputContainer>
        </SingleFormInputContainer>

        {/* Email */}
        <SingleFormInputContainer error={null}>
          <label className={`${labelBaseStyle}`}>البريد الإلكتروني</label>
          <input
            className={`${inputBaseStyle} disabled:bg-gray-100`}
            type="email"
            placeholder="example@example.com"
            value={profileInfo.email}
            disabled
            readOnly
          />
        </SingleFormInputContainer>

        {/* birth date & phone number */}
        <DoubleFormInputContainer>
          <SingleFormInputContainer
            extraStyles={"w-1/2"}
            error={errors.birth_date?.message}
          >
            <label className={`${labelBaseStyle}`}>تاريخ الميلاد</label>
            <input
              className={`${inputBaseStyle}`}
              type="date"
              defaultValue={profileInfo.birth_date}
              {...register("birth_date")}
            />
          </SingleFormInputContainer>
          <SingleFormInputContainer
            extraStyles={"w-1/2"}
            error={errors.phone?.message}
          >
            <label className={`${labelBaseStyle}`}>رقم الجوال</label>
            <input
              className={`${inputBaseStyle}`}
              type="tel"
              placeholder="05XX-XXX-XXX"
              defaultValue={profileInfo.phone}
              {...register("phone")}
            />
          </SingleFormInputContainer>
        </DoubleFormInputContainer>

        <Button
          variant="contained"
          sx={{ borderRadius: "0px" }}
          fullWidth
          disableElevation
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "جاري الحفظ..." : "حفظ التغييرات"}
        </Button>
      </form>
    </>
  );
}
