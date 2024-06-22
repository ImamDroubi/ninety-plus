import { Button } from "@mui/material";
import SingleFormInputContainer from "../containers/SingleFormInputContainer";
import changePasswordSchema from "../forms/schemas/changePasswordSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAlert } from "../../hooks/useAlert";
import useUpdatePassword from "../../apiCalls/authCalls/useUpdatePassword";
import TopAlert from "../alerts/TopAlert";
export default function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    setError, // This is to set errors after recieving a response from the backend . example : setError("root" , {message :"something went wrong!"})
    formState: { errors, isSubmitting }, // this errors here is the validation errors from the frontend
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });
  const updatePasswordMutation = useUpdatePassword();
  const alertController = useAlert();
  const onSubmit = async (data) => {
    try {
      const response = await updatePasswordMutation.mutateAsync(
        data
      );
      alertController.alertSuccessToggle("تم تعديل البيانات بنجاح!");
      console.log(response);
    } catch (error) {
      console.log(error);
      alertController.alertErrorToggle("يرجى التحقق من البيانات المرسلة!");
    }
  };
  const labelBaseStyle = "mb-2 text-base block font-semibold";
  const inputBaseStyle =
    "border-[2px] border-gray-100 p-2 w-full focus:border-primary-500 outline-none duration-200";
  // patch profiles / change-password
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
        <SingleFormInputContainer error={errors.old_password?.message}>
          <label className={`${labelBaseStyle}`}>كلمة السر الحالية</label>
          <input
            className={`${inputBaseStyle}`}
            type="password"
            placeholder="كلمة السر الحالية"
            {...register("old_password")}
          />
        </SingleFormInputContainer>

        <SingleFormInputContainer error={errors.password?.message}>
          <label className={`${labelBaseStyle}`}>كلمة السر الجديدة</label>
          <input
            className={`${inputBaseStyle}`}
            type="password"
            placeholder="كلمة السر الجديدة"
            {...register("password")}
          />
        </SingleFormInputContainer>

        <SingleFormInputContainer error={errors.password_confirmation?.message}>
          <label className={`${labelBaseStyle}`}>تكرار الكلمة الجديدة</label>
          <input
            className={`${inputBaseStyle}`}
            type="password"
            placeholder="تكرار الكلمة الجديدة"
            {...register("password_confirmation")}
          />
        </SingleFormInputContainer>

        <div className="submit flex justify-end">
          <Button
            variant="contained"
            sx={{ borderRadius: "0px" }}
            disableElevation
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "جاري الحفظ..." : "حفظ التغييرات"}
          </Button>
        </div>
      </form>
    </>
  );
}
