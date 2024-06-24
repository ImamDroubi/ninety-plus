import { useEffect, useRef, useState } from "react";

export const useUploadMedia = (defaultPreview = null) => {
  const [file, setFile] = useState();
  const [preview, setPreview] = useState(defaultPreview);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  const handleFileChange = () => {
    if (!fileRef.current) return;
    const media = fileRef.current.files[0];
    if (media) {
      setFile(media);
      setUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setUploading(false);
      };
      reader.readAsDataURL(media);
    }
  };

  return {
    file,
    preview,
    uploading,
    fileRef,
    handleFileChange
  };
};
