import React, { useState } from "react";
import SingleFormInputContainer from "../../containers/SingleFormInputContainer";
import { Button } from "@mui/material";
import { UploadArrowIcon } from "../../icons/icons";
export default function CreateCourseFormAdvanced() {
  const labelBaseStyle = "mb-2 text-sm block font-semibold";
  const inputBaseStyle =
    "border-[2px] border-gray-100 p-2 w-full focus:border-primary-500 outline-none duration-200";

  return (
    <>
      <div className="p-2  border-gray-100 mt-4 border-b-[2px]">
        <h3 className="font-bold text-lg">المعلومات المتقدمة</h3>
      </div>
      <form className="text-gray-900 text-sm space-y-5" action="">
        <div className="media w-full flex flex-col md:flex-row border-gray-100 pb-2 border-b-[2px]">
          <div className="thmbnail-section w-full md:w-1/2 p-2">
            <h4 className="font-semibold text-base mb-2">صورة العرض</h4>
            <div className="thmbnail flex gap-2">
              <div className="image w-3/5 aspect-[3/2] object-cover bg-error-400">
                <img className="w-full h-full" src="" alt="" />
              </div>
              <div className="info flex flex-col justify-between items-start">
                <p className="text-gray-600">
                  صورة العرض الخاصة بالدورة. هذه الصورة ستظهر كمعاينة للدورة
                  الخاصة بك.
                </p>
                <Button
                  sx={{ display: "flex", gap: "0.5rem" }}
                  variant="outlined"
                  disableElevation
                >
                  <UploadArrowIcon />
                  تحميل صورة
                </Button>
              </div>
            </div>
          </div>
          <div className="video-section w-full md:w-1/2 p-2">
            <h4 className="font-semibold text-base mb-2">فيديو تعريفي</h4>
            <div className="video flex gap-2">
              <div className="video w-3/5 aspect-[3/2] object-cover bg-error-400">
                <img className="w-full h-full" src="" alt="" />
              </div>
              <div className="info flex flex-col justify-between items-start">
                <p className="text-gray-600">
                  أنشئ مقطع فيديو لجذب الطلاب للدورة الخاصة بك. يساعد هذا في
                  زيادة نسبة المنتسبين.
                </p>
                <Button
                  sx={{ display: "flex", gap: "0.5rem" }}
                  variant="outlined"
                  disableElevation
                >
                  <UploadArrowIcon />
                  تحميل فيديو
                </Button>
              </div>
            </div>
          </div>
        </div>
        <SingleFormInputContainer error={null}>
          <label className={`${labelBaseStyle}`}>وصف الدورة</label>
          <textarea
            className={`${inputBaseStyle}`}
            type="text"
            placeholder="تحدث عن الدورة الخاصة بك... "
            name=""
            id=""
            rows={5}
          />
        </SingleFormInputContainer>
      </form>
    </>
  );
}
