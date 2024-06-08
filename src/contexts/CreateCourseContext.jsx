import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CreateCourseContext = React.createContext();

export function useCreateCourseContext() {
  return useContext(CreateCourseContext);
}

const courseSchema = z.object({
  title: z
    .string()
    .min(10, { message: "العنوان قصير جداً" })
    .max(150, { message: "العنوان طويل جداً" }),
  coverage: z
    .string()
    .min(5, { message: "يرجى تزويد معلومات أكثر" })
    .max(150, { message: "أطول من اللازم" }),
  thumbnail: z.any(),
  video_intro: z.any(),
  description: z.string().min(10, { message: "قصير جدا" }),
  welcome_message: z.string(),
  ending_message: z.string(),
});

export function CreateCourseContextProvider({ children }) {
  const [formRef, setFormRef] = useState();
  const [module, setModule] = useState();
  const [weekly_lectures, setWeeklyLectures] = useState();
  const [chapters, setChapters] = useState([]);
  const [responseErrors, setResponseErrors] = useState();

  // React hook form attributes
  const {
    register,
    handleSubmit,
    setError, // This is to set errors after recieving a response from the backend . example : setError("root" , {message :"something went wrong!"})
    formState: { errors, isSubmitting, isSubmitted, isValid }, // this errors here is the validation errors from the frontend
  } = useForm({
    resolver: zodResolver(courseSchema),
    mode: "onChange",
  });

  // ===================================== HANDLE SUBMISSION FUNCTION ========================================================
  const onSubmit = async (data) => {
    // Send to backend
    // setResponseError
    setResponseErrors(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      // throw new Error();
    } catch (error) {
      setResponseErrors({ name: "This is an error Object" });
    }
    console.log(data);
  };

  const [currentCourseObject, setCurrentCourseObject] = useState({
    title: undefined,
    coverage: undefined, // first semester, first chapter, both semesters, etc...
    module_id: undefined,
    instructor_id: undefined,
    weekly_lectures: undefined,
    thumbnail: undefined, // link
    intro_video: undefined, // link (could be null)
    description: undefined,
    chapters: undefined, // array of objects, each chapter contains array of lectures
    welcome_message: "", // optional
    ending_message: "", // optional
    status: "", // pending, ongoing, finished
  });

  const value = {
    register,
    handleSubmit,
    setError, // This is to set errors after recieving a response from the backend . example : setError("root" , {message :"something went wrong!"})
    errors,
    isSubmitting,
    onSubmit,
    module,
    setModule,
    weekly_lectures,
    setWeeklyLectures,
    chapters,
    setChapters,
    formRef,
    setFormRef,
    isValid,
    responseErrors,
    setResponseErrors,
  };
  return (
    <CreateCourseContext.Provider value={value}>
      {children}
    </CreateCourseContext.Provider>
  );
}
