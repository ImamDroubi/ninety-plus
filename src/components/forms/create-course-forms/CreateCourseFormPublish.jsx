import React from "react";
import SingleFormInputContainer from "../../containers/SingleFormInputContainer";
import DoubleFormInputContainer from "../../containers/DoubleFormInputContainer";
import { useCreateCourseContext } from "../../../contexts/CreateCourseContext";

export default function CreateCourseFormPublish() {
  const {
    register,
    errors,
  } = useCreateCourseContext();


  const labelBaseStyle = "mb-2 text-sm block font-semibold";
  const inputBaseStyle =
    "border-[2px] border-gray-100 p-2 w-full focus:border-primary-500 outline-none duration-200";

  return (
    <>
      <div className="p-3  border-gray-100 my-4 border-b-[2px]">
        <h3 className="font-bold text-lg">نشر الدورة</h3>
      </div>
      <form className="text-gray-900 text-sm space-y-5">

        {/* Welcome Message & Ending Message  */}
        <DoubleFormInputContainer extraStyles={"flex-col md:flex-row"}>
          <SingleFormInputContainer extraStyles={"md:w-1/2"} error={errors?.welcome_message?.errors}>
            <label className={`${labelBaseStyle}`}>رسالة ترحيبية</label>
            <textarea
              className={`${inputBaseStyle}`}
              type="text"
              placeholder="رسالة للترحيب بالطلبة المنتسبين..."
              rows={5}
              {...register("welcome_message")}
            />
          </SingleFormInputContainer>

          
          <SingleFormInputContainer extraStyles={"md:w-1/2"} error={errors?.ending_message?.errors}>
            <label className={`${labelBaseStyle}`}>توصيات</label>
            <textarea
              className={`${inputBaseStyle}`}
              type="text"
              placeholder="رسالة للطلاب بعد إنهاء الدورة..."
              rows={5}
              {...register("ending_message")}
            />
          </SingleFormInputContainer>
        </DoubleFormInputContainer>
      </form>
    </>
  );
}
