import Logo from "../other/Logo";
import Button from "../buttons/Button";
import book from "../../assets/images/book.jpg";
import { Link } from "react-router-dom";

import ResetPasswordForm from "../forms/ResetPasswordForm";
export default function ResetPasswordPage() {
  return (
    <div className="sign-in">
      <div className="top flex justify-between p-3 border-b-2 border-gray-300 md:px-5 lg:w-10/12 lg:m-auto lg:border-none lg:px-4">
        <Logo />
        <div className="cta flex items-center gap-2">
          <p className="text-gray-700 text-sm">ليس لديك حساب؟</p>
          <Link to="/sign-up">
            <Button text="أنشئ حساباً" type="secondary" />
          </Link>
        </div>
      </div>
      <div className="content flex w-full min-h-[35rem] lg:h-[89vh] lg:border-t-2">
        <div className="right hidden h-full w-2/5 bg-primary-500 object-cover lg:block">
          <img src={book} alt="photo of an book" className="w-full h-full" />
        </div>
        <div className="left flex flex-col items-center gap-6 w-full h-full justify-center lg:w-3/5 py-6">
          <h2 className="text-center text-gray-900 text-2xl font-bold">
            تحديث كلمة السر
          </h2>
          <ResetPasswordForm/>
        </div>
      </div>
    </div>
  );
}
