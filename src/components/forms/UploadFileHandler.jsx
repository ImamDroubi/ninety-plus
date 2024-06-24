import { Button } from "@mui/material";
import { CloudIcon } from "../icons/icons";
import { useEffect, useRef, useState } from "react";
import LinearProgressBar from "../other/LinearProgressBar";

export default function UploadFileHandler() {
  const fileInputref = useRef();
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(true);
  const [progress, setProgress] = useState(50);
  useEffect(() => {
    const formData = new FormData();
    if (!file) return;
    formData.append("file", file);
  }, [file]);

  const handleOpenInput = () => {
    fileInputref.current.click();
  };

  return (
    <div className="flex items-center justify-center flex-col gap-2">
      <input
        type="file"
        hidden
        ref={fileInputref}
        disabled={isUploading}
        onChange={(e) => setFile(e.target.files[0])}
      />
      <div
        className={`w-4/12 aspect-square border-[1px] flex items-center justify-center flex-col ${
          !isUploading && "hover:bg-primary-100 cursor-pointer"
        } `}
        onClick={handleOpenInput}
      >
        <div
          className={`icon lg:text-5xl text-3xl  ${
            isUploading ? "text-gray-300" : "text-primary-300"
          }`}
        >
          <CloudIcon />
        </div>
        <p className="text-gray-900 text-sm lg:text-md">تحميل مقطع فيديو</p>
      </div>
      <LinearProgressBar prog={progress} />
    </div>
  );
}
