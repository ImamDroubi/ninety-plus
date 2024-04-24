import Logo from "../other/Logo";
import Button from "../buttons/Button";
import book from "../../assets/images/book.jpg";
import { Link } from "react-router-dom";
import StudentSettingsForm from "../forms/StudentSettingsForm";
import RegisterStudentForm from "../forms/RegisterStudentForm";
export default function SignUpPage() {
  return (
    <div className="sign-up">
      <div className="top flex justify-between p-3 border-b-2 border-gray-300 md:px-5 lg:w-10/12 lg:m-auto lg:border-none lg:px-4">
        <Logo />
        <div className="cta flex items-center gap-2">
          <p className="text-gray-700 text-sm">لديك حساب مسبقاً؟</p>
          <Link to="/sign-in">
            <Button text="دخول" type="secondary" />
          </Link>
        </div>
      </div>
      <div className="content flex w-full min-h-[35rem] lg:h-fit lg:border-t-2 mb-6 md:mb-[0] lg:mb-[0]">
        <div className="right hidden  w-2/5 bg-primary-500 object-cover lg:block">
          <img src={book} alt="photo of an book" className="w-full h-full" />
        </div>
        <div className="left flex flex-col items-center gap-5 w-full  justify-center lg:w-3/5 py-3">
          <h2 className="text-center text-gray-900 text-2xl font-bold">
            إنشاء حساب جديد
          </h2>
          {/* <form action="" className="w-11/12 flex flex-col gap-4 lg:w-2/3">
            <div className="from-input  flex flex-col gap-2 w-full">
              <label htmlFor="f-name" className="text-gray-900">
                الاسم كاملاً
              </label>
              <div className="inputs flex flex-col gap-2 lg:flex-row lg:justify-between">
                <input
                  type="text"
                  placeholder="الاسم الأول"
                  name="f-name"
                  id="f-name"
                  className="py-2 px-1 text-gray-500 border-2 border-gray-100 focus:border-primary-500 outline-none lg:w-4/6"
                />
                <input
                  type="text"
                  placeholder="اسم العائلة"
                  name="l-name"
                  id="l-name"
                  className="py-2 px-1 text-gray-500 border-2 border-gray-100 focus:border-primary-500 outline-none lg:w-4/6"
                />
              </div>
            </div>
            <div className="from-input  flex flex-col gap-2 w-full">
              <label htmlFor="email" className="text-gray-900">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                placeholder="test@example.com"
                name="email"
                id="email"
                className="py-2 px-1 text-gray-500 border-2 border-gray-100 focus:border-primary-500 outline-none"
              />
            </div>
            <div className="passwords flex flex-col gap-2 lg:flex-row">
              <div className="from-input flex flex-col gap-2 w-full">
                <label htmlFor="password" className="text-gray-900">
                  كلمة السر
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="py-2 px-1 text-gray-500 border-2 border-gray-100 focus:border-primary-500 outline-none"
                />
              </div>
              <div className="from-input flex flex-col gap-2 w-full">
                <label htmlFor="re-password" className="text-gray-900">
                  تأكيد كلمة السر
                </label>
                <input
                  type="password"
                  name="re-password"
                  id="re-password"
                  className="py-2 px-1 text-gray-500 border-2 border-gray-100 focus:border-primary-500 outline-none"
                />
              </div>
            </div>
            <div className="form-bottom flex justify-between">
              <div className="form-input flex items-center gap-1">
                <input
                  type="checkbox"
                  name="remember"
                  id="remember"
                  className="w-3 h-3 accent-primary-500 "
                />
                <label htmlFor="remember" className="text-gray-700">
                  أوافق على{" "}
                  <span className="text-secondary-500 hover:underline">
                    <Link>شروط الاستخدام</Link>{" "}
                  </span>
                </label>
              </div>
              <Button text="تسجيل" />
            </div>
          </form> */}
          <RegisterStudentForm />
        </div>
      </div>
    </div>
  );
}
