import { useState } from "react";
import SingleFormInputContainer from "../containers/SingleFormInputContainer";
import { Button } from "@mui/material";
import UploadFileHandler from "../forms/UploadFileHandler";

export default function AddLecture({ callback = () => {},setOpen } ) {
  const [lectureName, setLectureName] = useState();
  const [lectureDescription, setLectureDescription] = useState();
  const [videoLink,setVideoLink] = useState();
  const [videoFile,setVideoFile] = useState();
  const [error, setError] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!lectureName || lectureName == ""){
      setError("لا يمكن أن يكون اسم الحصة فارغاً")
      return; 
    }
    callback({
      name : lectureName, 
      description : lectureDescription,
      link : videoLink
    });
    setOpen(false);
  };

  const labelBaseStyle = "mb-2 text-base block font-semibold";
  const inputBaseStyle =
    "border-[2px] border-gray-100 p-2 w-full focus:border-primary-500 outline-none duration-200 text-sm";
  return (
    <form className="flex flex-col gap-2" onInput={()=>{setError(null)}} onSubmit={handleSubmit}>
      <SingleFormInputContainer error={error}>
        <label className={`${labelBaseStyle}`}>اسم الحصة</label>
        <input
          className={`${inputBaseStyle}`}
          type="text"
          value={lectureName}
          onChange={(e) => setLectureName(e.target.value)}
          placeholder="متوسط التغير - الحصة الأولى"
        />
      </SingleFormInputContainer>
      <SingleFormInputContainer error={null}>
        <label className={`${labelBaseStyle}`}>وصف الحصة</label>
        <textarea
          className={`${inputBaseStyle}`}
          type="text"
          value={lectureDescription}
          onChange={(e) => setLectureDescription(e.target.value)}
          placeholder="اشرح عن محتوى الحصة..."
        />
      </SingleFormInputContainer>
      <SingleFormInputContainer error={null}>
        <label className={`${labelBaseStyle}`}>مقطع الفيديو</label>
        <UploadFileHandler />
      </SingleFormInputContainer>
      

      <Button
        variant="contained"
        disableElevation
        sx={{ borderRadius: "0px" }}
        type="submit"
      >
        إضافة حصة
      </Button>
      
    </form>
    
  );
}
