import React, { useContext, useState } from 'react'

const CreateCourseContext = React.createContext();

export function useCreateCourseContext(){
  return useContext(CreateCourseContext);
}

export function CreateCourseContextProvider({children}) {
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
    currentCourseObject,
    setCurrentCourseObject
  }
  return (
    <CreateCourseContext.Provider value={value}>
      {children}
    </CreateCourseContext.Provider>
  )
}