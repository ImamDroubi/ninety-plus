import ChangePasswordForm from "../forms/ChangePasswordForm";
import StudentSettingsForm from "../forms/StudentSettingsForm";
import TemporaryDrawer from "../menus/TempraryDrawer";
import UploadPhotoOverlayButton from "../overlays/uploadPhotoOverlayButton";

export default function Settings() {
  const user = {
    photoUrl:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    firstName: "يعقوب",
    lantName: "قمر الدين",
    userName: "يعقوب قمر الدين",
    email: "imam.droubi@gmail.com",
    stream: "العلمي",
  };

  return (
    <section className="mb-4">
      <h2 className="mb-3 text-lg text-gray-900 font-semibold">
        إعدادات الحساب
      </h2>
      <div className="flex flex-col items-center xl:items-start xl:flex-row gap-4">
        <div className="right w-fit xl:w-1/4 p-3 h-fit border-[1px] border-gray-100">
          <div className="preview relative max-w-[15rem] max-h-[15rem]">
            <img
              className="object-cover"
              src={user.photoUrl}
              alt={user.userName}
            />
            <UploadPhotoOverlayButton />
          </div>
          <p className="instructions text-gray-600 text-center text-sm mt-1">
            حجم الصورة لا يجب أن يتجاوز 1 ميجابايت
          </p>
        </div>
        <div className="left w-full xl:w-3/4">
          <StudentSettingsForm />
          <div className="change-password mt-5 border-t-[1px] border-gray-100 py-4">
            <h3 className="mb-3 text-lg text-center text-gray-900 font-semibold">
              تغيير كلمة السر 
            </h3>
            <ChangePasswordForm/>
          </div>
        </div>
      </div>
      <TemporaryDrawer/>
    </section>
  );
}
