import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import courseSchema from "../components/forms/schemas/courseSchema";
import { useAuth } from "./AuthContext";
import useCreateResource from "../apiCalls/useCreateResource";
const CreateCourseContext = React.createContext();

export function useCreateCourseContext() {
  return useContext(CreateCourseContext);
}

export function CreateCourseContextProvider({ children }) {
  const { currentUser } = useAuth();
  const [formRef, setFormRef] = useState();
  const [module, setModule] = useState();
  const [weekly_lectures, setWeeklyLectures] = useState();
  const [chapters, setChapters] = useState([]);
  const [responseErrors, setResponseErrors] = useState();
  const [thumbnailFile, setThumbnailFile] = useState();
  const [introVideoFile, setIntroVideoFile] = useState();
  const mutation = useCreateResource(`modules/${module?.id}/courses`);
  const courseObject = new FormData();
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
    setResponseErrors(null);
    //apending everything to form data object
    handleReactFormData(data);
    handleMenus();
    handleFiles();
    // Send to backend

    try {
      const response = await mutation.mutateAsync(courseObject);
      console.log(response);
    } catch (error) {
      setResponseErrors({ name: "فشل إنشاء الدورة" });
      console.log(error);
    }
  };

  const handleFiles = () => {
    if (thumbnailFile) {
      courseObject.append("cover_image", thumbnailFile);
    }
    if (introVideoFile) {
      courseObject.append("intro_video", introVideoFile);
    }
  };
  const handleMenus = () => {
    courseObject.append("module_id", module?.id);
    courseObject.append("weekly_lectures", weekly_lectures.id);
    if (chapters.indexOf(99) !== -1) {
      // 99 is the id of select All chapters
      // and in the backend it is handled in a way that if we need all chapters we should send
      // and empty array
      // courseObject.append("chapters[]", undefined);
    } else {
      chapters.map((chapter) => {
        courseObject.append("chapters[]", chapter);
      });
    }
  };
  const handleReactFormData = (data) => {
    courseObject.append("title", data.title);
    courseObject.append("instructor_id", currentUser?.user_id);
    courseObject.append("period", "first");
    courseObject.append("welcome_message", data.welcome_message);
    courseObject.append("ending_message", data.ending_message);
    courseObject.append("description", data.description);
    courseObject.append("starts_at", data.starts_at);
    courseObject.append("ends_at", data.ends_at);
  };

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
    setThumbnailFile,
    setIntroVideoFile,
  };
  return (
    <CreateCourseContext.Provider value={value}>
      {children}
    </CreateCourseContext.Provider>
  );
}
