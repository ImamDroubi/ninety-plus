import verifyEmail from "../../assets/images/verify-email.png";

export default function VerifyEmailPage() {
  return (
    <div className="flex flex-col-reverse w-100 items-center ">
    <div className="content flex flex-col gap-2 items-center w-2/3 text-center py-6  md:px-6 lg:px-[5rem] md:gap-4">
      <h1 className="text-primary-300 text-4xl font-bold ">تم التسجيل</h1>
      <h2 className="text-gray-900 text-3xl font-bold lg:text-4xl">يرجى تفعيل الحساب</h2>
      <p className="text-gray-700 text-base lg:text-lg">
        أرسلنا رابط تفعيل الحساب إلى البريد الإلكتروني الخاص بك
      </p>

    </div>
    <div className="photo w-[20rem]">
      <img src={verifyEmail} alt="error" />
    </div>
  </div>
  )
}
