import { zodResolver } from '@hookform/resolvers/zod';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const CreateCourseContext = React.createContext();

export function useCreateCourseContext(){
  return useContext(CreateCourseContext);
}

const courseSchema = z.object({
  title: z.string().min(10, {message : "العنوان قصير جداً"}).max(150 , {message : "العنوان طويل جداً"}),
  coverage: z.string().min(5, {message : "يرجى تزويد معلومات أكثر"}).max(150 , {message : "أطول من اللازم"}),
});


export function CreateCourseContextProvider({children}) {
  
  const [subject,setSubject] = useState();
  const [weekly_lectures,setWeeklyLectures] = useState();
  

   // React hook form attributes
   const {
    register,
    handleSubmit,
    setError, // This is to set errors after recieving a response from the backend . example : setError("root" , {message :"something went wrong!"})
    formState: { errors, isSubmitting }, // this errors here is the validation errors from the frontend
  } = useForm({
    resolver: zodResolver(courseSchema)
  });

// ===================================== HANDLE SUBMISSION FUNCTION ========================================================
const onSubmit = async (data) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Send to backend 
  console.log(data);

};

  const [currentCourseObject, setCurrentCourseObject] = useState({
    title : undefined,
    coverage : undefined,// first semester, first chapter, both semesters, etc... 
    module_id : undefined,
    instructor_id : undefined,
    weekly_lectures : undefined,
    thumbnail : undefined, // link 
    intro_video : undefined, // link (could be null)
    description : undefined,
    chapters : undefined,// array of objects, each chapter contains array of lectures 
    welcome_message : "", // optional 
    ending_message : "", // optional
    status : ""// pending, ongoing, finished
  });


  const value = {
    register,
    handleSubmit,
    setError, // This is to set errors after recieving a response from the backend . example : setError("root" , {message :"something went wrong!"})
    formState: { errors, isSubmitting },
    onSubmit,
    subject,
    setSubject,
    weekly_lectures,
    setWeeklyLectures
  }
  return (
    <CreateCourseContext.Provider value={value}>
      {children}
    </CreateCourseContext.Provider>
  )
}