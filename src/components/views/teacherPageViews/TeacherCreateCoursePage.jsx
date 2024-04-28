import React, { useEffect, useRef } from "react";
import LinearStepper from "../../other/LinearStepper";
import CreateCourseFormBasic from "../../forms/create-course-forms/CreateCourseFormBasic";
import CreateCourseFormAdvanced from "../../forms/create-course-forms/CreateCourseFormAdvanced";
import CreateCourseFormCurriculum from "../../forms/create-course-forms/CreateCourseFormCurriculum";
import CreateCourseFormPublish from "../../forms/create-course-forms/CreateCourseFormPublish";
import { CreateCourseContextProvider, useCreateCourseContext } from "../../../contexts/CreateCourseContext";

const steps = [
  "المعلومات الأساسية",
  "المعلومات المتقدمة",
  "المحتوى",
  "نشر الدورة",
];
export default function TeacherCreateCoursePage() {
  const formRef= useRef();
  
  return (
    <>
      <form ref={formRef}></form>
      <section className="my-4 flex justify-between gap-1 w-[90%] m-auto bg-gray-white p-3 ">
        <CreateCourseContextProvider>
          <LinearStepper steps={steps} formRef={formRef}>
            <CreateCourseFormBasic />
            <CreateCourseFormAdvanced />
            <CreateCourseFormCurriculum />
            <CreateCourseFormPublish />
          </LinearStepper>
        </CreateCourseContextProvider>
      </section>
    </>
  );
}
