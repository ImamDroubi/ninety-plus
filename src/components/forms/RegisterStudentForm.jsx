import { Button } from "@mui/material";
import DoubleFormInputContainer from "../containers/DoubleFormInputContainer";
import SingleFormInputContainer from "../containers/SingleFormInputContainer";
import { useRef, useState } from "react";
import SelectDropdown from "../menus/SelectDropdown";
import { streamsList } from "../data/streamsList";
import { citiesList } from "../data/citiesList";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { data } from "autoprefixer";

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
    birth_date: z.string().date(),
    password_confirmation: z
      .string()
      .min(8, { message: "كلمة السر قصيرة جداً" })
      .max(30, { message: "كلمة السر طويلة جداً" }),
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
  const formRef = useRef();
  const {
    register,
    handleSubmit,
    setError, // This is to set errors after recieving a response from the backend . example : setError("root" , {message :"something went wrong!"})
    formState: { errors, isSubmitting }, // this errors here is the validation errors from the frontend
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (date) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(date);
  };

  const [currentStream, setCurrentStream] = useState();
  const [currentCity, setCurrentCity] = useState();
  const [currentGender, setCurrentGender] = useState();

  const labelBaseStyle = "mb-2 text-base block font-semibold";
  const inputBaseStyle =
    "border-[2px] border-gray-100 p-2 w-full focus:border-primary-500 outline-none duration-200";

  return (
    <form
      className="text-gray-900  w-9/12"
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
    >
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
        <SingleFormInputContainer extraStyles={"w-1/2"} error={null}>
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
        <div className="mb-3 flex items-center gap-1 ">
          <label className={`${labelBaseStyle}`}>الفرع</label>
          <SelectDropdown
            title="الفرع"
            list={streamsList}
            stateChanger={setCurrentStream}
          />
        </div>
        <div className="mb-3 flex items-center gap-1">
          <label className={`${labelBaseStyle}`}>المحافظة</label>
          <SelectDropdown
            title="المحافظة"
            list={citiesList}
            stateChanger={setCurrentCity}
          />
        </div>
        <div className="mb-3 flex items-center gap-1">
          <label className={`${labelBaseStyle}`}>الجنس</label>
          <SelectDropdown
            title="الجنس"
            list={["ذكر", "أنثى"]}
            stateChanger={setCurrentGender}
          />
        </div>
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
  );
}
