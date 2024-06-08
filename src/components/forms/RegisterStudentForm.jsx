import { Button, CircularProgress } from "@mui/material";
import DoubleFormInputContainer from "../containers/DoubleFormInputContainer";
import SingleFormInputContainer from "../containers/SingleFormInputContainer";
import { useEffect, useState } from "react";
import SelectDropdown from "../menus/SelectDropdown";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useRegister from "../../apiCalls/authCalls/useRegister";
import { useAlert } from "../../hooks/useAlert";
import { useRegistrationMenus } from "../../hooks/useRegistrationMenus";
import registerSchema from "./schemas/registerSchema";
import TopAlert from "../alerts/TopAlert";
import { useNavigate } from "react-router-dom";
export default function RegisterStudentForm() {
  const {
    streamList,
    cityList,
    roleList,
    genderList,
    menusIsLoading,
    menusError,
  } = useRegistrationMenus();

  const navigate = useNavigate();

  const alertController = useAlert();
  // React hook form attributes
  const {
    register,
    handleSubmit,
    setError, // This is to set errors after recieving a response from the backend . example : setError("root" , {message :"something went wrong!"})
    formState: { errors, isSubmitting }, // this errors here is the validation errors from the frontend
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  // Select inputs states
  const [currentStream, setCurrentStream] = useState(null);
  const [currentCity, setCurrentCity] = useState(null);
  const [currentRole, setCurrentRole] = useState(null);
  const [currentGender, setCurrentGender] = useState(null);
  const [selectInputsErrors, setSelectInputsErrors] = useState([]);

  const validateSelectInputs = () => {
    let isValid = true;
    let streamError = selectInputsErrors?.stream;
    let cityError = selectInputsErrors?.city;
    let genderError = selectInputsErrors?.gender;
    let roleError = selectInputsErrors?.role;
    if (currentStream == null && currentRole?.name == "طالب") {
      // if there is no stream and the role is student
      streamError = "يرجى اختيار أحد الفروع";
      isValid = false;
    }
    if (currentCity == null) {
      cityError = "يرجى اختيار المحافظة";
      isValid = false;
    }
    if (currentGender == null) {
      genderError = "يرجى اختيار الجنس";
      isValid = false;
    }
    if (currentRole == null) {
      roleError = "يرجى اختيار نوع الحساب";
      isValid = false;
    }
    setSelectInputsErrors({
      stream: streamError,
      city: cityError,
      gender: genderError,
      role: roleError,
    });
    return isValid;
  };

  // This is to delete the error messages once the data is valid
  useEffect(() => {
    let streamError = selectInputsErrors?.stream;
    let cityError = selectInputsErrors?.city;
    let genderError = selectInputsErrors?.gender;
    let roleError = selectInputsErrors?.role;
    if (currentStream != null) {
      streamError = null;
    }
    if (currentCity != null) {
      cityError = null;
    }
    if (currentGender != null) {
      genderError = null;
    }
    if (currentRole != null) {
      roleError = null;
    }
    setSelectInputsErrors({
      stream: streamError,
      city: cityError,
      gender: genderError,
      role: roleError,
    });
  }, [currentStream, currentCity, currentGender, currentRole]);

  const mutation = useRegister();

  // ===================================== HANDLE SUBMISSION FUNCTION ========================================================
  const onSubmit = async (data) => {
    if (!validateSelectInputs()) return;
    // TODO
    const userInformation = {
      // This is the right one, remove the comments
      role_id: currentRole.id,
      city_id: currentCity.id,
      branch_id: currentStream?.id,
      gender: currentGender.id,
      ...data,
    };

    try {
      await mutation.mutateAsync(userInformation);
      alertController.alertSuccessToggle("تم إنشاء الحساب بنجاح!");
      await new Promise((resolve) => setTimeout(resolve, 500));
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
      alertController.alertErrorToggle("يرجى التحقق من البيانات المرسلة!");
    }
  };

  useEffect(() => {
    if (mutation.error) {
    }
  }, [mutation.isError]);

  const labelBaseStyle = "mb-2 text-base block font-semibold";
  const inputBaseStyle =
    "border-[2px] border-gray-100 p-2 w-full focus:border-primary-500 outline-none duration-200";
  if (menusIsLoading) return <CircularProgress />;
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
        {/* First Name and Last Name  */}
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
                {...register("last_name")}
              />
            </SingleFormInputContainer>
          </DoubleFormInputContainer>
        </SingleFormInputContainer>

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
              {...register("phone")}
            />
          </SingleFormInputContainer>
        </DoubleFormInputContainer>

        {/* Role */}
        <SingleFormInputContainer error={selectInputsErrors?.stream}>
          <div className="mb-3 flex items-center gap-1 ">
            <label className={`${labelBaseStyle}`}>نوع الحساب</label>
            <SelectDropdown
              title="الحساب"
              list={roleList}
              stateChanger={setCurrentRole}
              // defaultState={currentRole}
            />
          </div>
        </SingleFormInputContainer>

        {/* Stream, City, Gender select-dropdown */}
        <div className="flex flex-col my-2 md:flex-row justify-between">
          {currentRole?.name == "طالب" && (
            <SingleFormInputContainer error={selectInputsErrors?.stream}>
              <div className="mb-3 flex items-center gap-1 ">
                <label className={`${labelBaseStyle}`}>الفرع</label>
                <SelectDropdown
                  title="الفرع"
                  list={streamList}
                  stateChanger={setCurrentStream}
                />
              </div>
            </SingleFormInputContainer>
          )}
          <SingleFormInputContainer error={selectInputsErrors?.city}>
            <div className="mb-3 flex items-center gap-1">
              <label className={`${labelBaseStyle}`}>المحافظة</label>
              <SelectDropdown
                title="المحافظة"
                list={cityList}
                stateChanger={setCurrentCity}
              />
            </div>
          </SingleFormInputContainer>
          <SingleFormInputContainer error={selectInputsErrors?.gender}>
            <div className="mb-3 flex items-center gap-1">
              <label className={`${labelBaseStyle}`}>الجنس</label>
              <SelectDropdown
                title="الجنس"
                list={genderList}
                stateChanger={setCurrentGender}
              />
            </div>
          </SingleFormInputContainer>
        </div>

        {/* Password and repeat password */}
        <SingleFormInputContainer error={errors.password?.message}>
          <label className={`${labelBaseStyle}`}>كلمة السر</label>
          <input
            className={`${inputBaseStyle}`}
            type="password"
            placeholder="كلمة السر"
            {...register("password")}
          />
        </SingleFormInputContainer>

        <SingleFormInputContainer error={errors.password_confirmation?.message}>
          <label className={`${labelBaseStyle}`}>تأكيد كلمة السر</label>
          <input
            className={`${inputBaseStyle}`}
            type="password"
            placeholder="تأكيد كلمة السر"
            {...register("password_confirmation")}
          />
        </SingleFormInputContainer>
        <Button
          type="submit"
          variant="contained"
          sx={{ borderRadius: "0px", fontSize: "1rem" }}
          fullWidth
          disableElevation
          disabled={isSubmitting}
        >
          {isSubmitting ? "جاري التسجيل..." : "تسجيل"}
        </Button>
      </form>
    </>
  );
}
