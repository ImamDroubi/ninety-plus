import Logo from "../../components/other/Logo";
import Button from "../../components/buttons/Button";
import book from "../../assets/images/book.jpg"
import { Link } from "react-router-dom";
export default function SignIn() {
  return (
    <div className="sign-in">
      <div className="top flex justify-between p-3 border-b-2 border-gray-300 md:px-5 lg:w-10/12 lg:m-auto lg:border-none lg:px-4">
        <Logo/>
        <div className="cta flex items-center gap-2">
          <p className="text-gray-700 text-sm">ليس لديك حساب؟</p> 
          <Link to="/sign-up">
            <Button
              text="أنشئ حساباً"
              type="secondary"
            />
          </Link>
        </div>
      </div>
      <div className="content flex w-full min-h-[35rem] lg:h-[89vh] lg:border-t-2">
        <div className="right hidden h-full w-2/5 bg-primary-500 object-cover lg:block">
          <img src={book} alt="photo of an book" className="w-full h-full" />
        </div>
        <div className="left flex flex-col items-center gap-6 w-full h-full justify-center lg:w-3/5 py-6">
          <h2 className="text-center text-gray-900 text-2xl font-bold">تسجيل الدخول</h2>
          <form action="" className="w-11/12 flex flex-col gap-4 lg:w-2/3">
            <div className="from-input  flex flex-col gap-2 w-full">
              <label htmlFor="email" className="text-gray-900">البريد الإلكتروني</label>
              <input type="email" name="email" id="email" className="py-2 px-1 text-gray-500 border-2 border-gray-100 focus:border-primary-500 outline-none"/>
            </div>
            <div className="from-input flex flex-col gap-2 w-full">
              <label htmlFor="password" className="text-gray-900">كلمة السر</label>
              <input type="password" name="password" id="password" className="py-2 px-1 text-gray-500 border-2 border-gray-100 focus:border-primary-500 outline-none"/>
            </div>
            <div className="form-bottom flex justify-between">
              <div className="form-input flex items-center gap-1">
                <input type="checkbox" name="remember" id="remember" className="w-3 h-3 accent-primary-500 " />
                <label htmlFor="remember" className="text-gray-700">تذكرني</label>
              </div>
              <Button
              text="تسجيل الدخول"
              />
            </div>
          </form>
        </div>
      </div>
      
    </div>
  )
}
