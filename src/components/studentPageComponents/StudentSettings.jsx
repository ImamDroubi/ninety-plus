import { useAuth } from "../../contexts/AuthContext";
import ChangePasswordForm from "../forms/ChangePasswordForm";
import StudentSettingsForm from "../forms/StudentSettingsForm";
import TemporaryDrawer from "../menus/MenuDrawer";
import UploadPhotoOverlayButton from "../overlays/uploadPhotoOverlayButton";
import { useUploadMedia } from "../../hooks/useUploadMedia";
import { CircularProgress } from "@mui/material";
export default function StudentSettings() {
  const { currentUser } = useAuth();
  const { file, fileRef, uploading, preview, handleFileChange } =
    useUploadMedia(currentUser?.profile_image);
  const handleUploadButtonClick = () => {
    fileRef.current.click();
  };
  if (!currentUser) return <CircularProgress />;
  return (
    <section className="mb-4">
      <h2 className="mb-3 text-lg text-gray-900 font-semibold">
        إعدادات الحساب
      </h2>
      <div className="flex flex-col items-center xl:items-start xl:flex-row gap-4">
        <div className="right w-fit xl:w-1/4 p-3 h-fit border-[1px] border-gray-100">
          <div className="preview relative max-w-[15rem] h-[15rem] max-h-[15rem]">
            {uploading ? (
              <CircularProgress />
            ) : (
              <img
                className="object-cover"
                src={preview}
                alt={currentUser.first_name}
              />
            )}
            <input
              type="file"
              hidden
              ref={fileRef}
              accept="image/*"
              onChange={handleFileChange}
            />
            <UploadPhotoOverlayButton
              onClickFunction={handleUploadButtonClick}
            />
          </div>
          <p className="instructions text-gray-600 text-center text-sm mt-1">
            حجم الصورة لا يجب أن يتجاوز 1 ميجابايت
          </p>
        </div>
        <div className="left w-full xl:w-3/4">
          <StudentSettingsForm profilePicture={file} />
          <div className="change-password mt-5 border-t-[1px] border-gray-100 py-4">
            <h3 className="mb-3 text-lg text-center text-gray-900 font-semibold">
              تغيير كلمة السر
            </h3>
            <ChangePasswordForm />
          </div>
        </div>
      </div>
    </section>
  );
}
