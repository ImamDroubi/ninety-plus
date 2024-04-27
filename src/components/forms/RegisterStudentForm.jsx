import { Button } from "@mui/material";
import DoubleFormInputContainer from "../containers/DoubleFormInputContainer";
import SingleFormInputContainer from "../containers/SingleFormInputContainer";
import { useEffect, useState } from "react";
import SelectDropdown from "../menus/SelectDropdown";
import { streamsList } from "../data/streamsList";
import { citiesList } from "../data/citiesList";
import { gendersList } from "../data/gendersList";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SuccessAlert from "../alerts/SuccessAlert";

const PHONE_NUMBER_REGEX = /^((\+970)|(\+972)|0)?5[0-9]{8}$/;

const registerSchema = z
  .object({
    first_name: z
      .string()
      .min(2, { message: "الاسم قصير" })
      .max(10, { message: "الاسم طويل" }),
    last_name: z
      .string()
      .min(2, { message: "الاسم قصير" })
      .max(10, { message: "الاسم طويل" }),
    email: z.string().email({ message: "الرجاء إدخال بريد إلكتروني صالح" }),
    password: z
      .string()
      .min(8, { message: "كلمة السر قصيرة جداً" })
      .max(30, { message: "كلمة السر طويلة جداً" }),
    birth_date: z.string().date("تاريخ الميلاد غير صالح"),
    password_confirmation: z
      .string()
      .min(8, { message: "كلمة السر قصيرة جداً" })
      .max(30, { message: "كلمة السر طويلة جداً" }),
    phone: z
      .string()
      .regex(PHONE_NUMBER_REGEX, { message: "رقم الجوال غير صالح" }),
  })
  .refine(
    (data) => {
      return data.password === data.password_confirmation;
    },
    {
      message: "يجب أن تتطابق كلمتا السر",
      path: ["password_confirmation"],
    }
  );

export default function RegisterStudentForm() {
  const [showAlert, setShowAlert] = useState(false);

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
  const [currentStream, setCurrentStream] = useState();
  const [currentCity, setCurrentCity] = useState();
  const [currentGender, setCurrentGender] = useState();
  const [selectInputsErrors, setSelectInputsErrors] = useState();

  const validateSelectInputs = () => {
    let isValid = true;
    let streamError = selectInputsErrors?.stream;
    let cityError = selectInputsErrors?.city;
    let genderError = selectInputsErrors?.gender;
    if (currentStream == null) {
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
    setSelectInputsErrors({
      stream: streamError,
      city: cityError,
      gender: genderError,
    });
    return isValid;
  };

  // This is to delete the error messages once the data is valid
  useEffect(() => {
    let streamError = selectInputsErrors?.stream;
    let cityError = selectInputsErrors?.city;
    let genderError = selectInputsErrors?.gender;
    if (currentStream != null) {
      streamError = null;
    }
    if (currentCity != null) {
      cityError = null;
    }
    if (currentGender != null) {
      genderError = null;
    }
    setSelectInputsErrors({
      stream: streamError,
      city: cityError,
      gender: genderError,
    });
  }, [currentStream, currentCity, currentGender]);

  // ===================================== HANDLE SUBMISSION FUNCTION ========================================================
  const onSubmit = async (data) => {
    if (!validateSelectInputs()) return;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const userInformation = {
      role_id: 1,
      city_id: currentCity.id,
      branch_id: currentStream.id,
      gender: currentGender.id,
      ...data,
    };
    // this is the final object that would be sent to the backend
    console.log(userInformation);

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
      {showAlert && <SuccessAlert message="تم إنشاء الحساب بنجاح" />}
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

        {/* Stream, City, Gender select-dropdown */}
        <div className="flex flex-col my-2 md:flex-row justify-between">
          <SingleFormInputContainer error={selectInputsErrors?.stream}>
            <div className="mb-3 flex items-center gap-1 ">
              <label className={`${labelBaseStyle}`}>الفرع</label>
              <SelectDropdown
                title="الفرع"
                list={streamsList}
                stateChanger={setCurrentStream}
              />
            </div>
          </SingleFormInputContainer>
          <SingleFormInputContainer error={selectInputsErrors?.city}>
            <div className="mb-3 flex items-center gap-1">
              <label className={`${labelBaseStyle}`}>المحافظة</label>
              <SelectDropdown
                title="المحافظة"
                list={citiesList}
                stateChanger={setCurrentCity}
              />
            </div>
          </SingleFormInputContainer>
          <SingleFormInputContainer error={selectInputsErrors?.gender}>
            <div className="mb-3 flex items-center gap-1">
              <label className={`${labelBaseStyle}`}>الجنس</label>
              <SelectDropdown
                title="الجنس"
                list={gendersList}
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
