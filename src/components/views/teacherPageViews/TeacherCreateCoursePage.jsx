import React, { useEffect, useRef, useState } from "react";
import LinearStepper from "../../other/LinearStepper";
import CreateCourseFormBasic from "../../forms/create-course-forms/CreateCourseFormBasic";
import CreateCourseFormAdvanced from "../../forms/create-course-forms/CreateCourseFormAdvanced";
import CreateCourseFormCurriculum from "../../forms/create-course-forms/CreateCourseFormCurriculum";
import CreateCourseFormPublish from "../../forms/create-course-forms/CreateCourseFormPublish";
import { CreateCourseContextProvider, useCreateCourseContext } from "../../../contexts/CreateCourseContext";
import { useSearchParams } from "react-router-dom";

const steps = [
  {
    name : "المعلومات الأساسية",
    param : "basic"
  },
  {
    name : "المعلومات المتقدمة",
    param : "advanced"
  },
  {
    name : "المحتوى",
    param : "curriculum"
  },
  {
    name : "نشر الدورة",
    param : "publish"
  }
];


export default function TeacherCreateCoursePage() {

  const {handleSubmit, onSubmit, setFormRef} = useCreateCourseContext();

  const formRef = useRef();



  useEffect(()=>{
    setFormRef(formRef);
  },[formRef])

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}></form>
      <section className="my-4 flex justify-between gap-1 w-[90%] m-auto bg-gray-white p-3 ">
          <LinearStepper steps={steps} id="gg" formRef={formRef}  >
            <CreateCourseFormBasic />
            <CreateCourseFormAdvanced />
            <CreateCourseFormCurriculum />
            <CreateCourseFormPublish />
          </LinearStepper>
      </section>
    </>
  );
}
