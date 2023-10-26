import { Link } from "react-router-dom"
import error from "../../assets/images/not-found.png"
import Button from "../buttons/Button"
export default function NotFound() {
  return (
    <div className="flex flex-col-reverse w-100 items-center md:flex-row">
      <div className="content flex flex-col gap-2 items-center w-2/3 text-center py-6 md:items-start md:px-6 lg:px-[5rem]  md:text-right md:gap-4">
        <h1 className="text-gray-300 text-4xl font-bold lg:text-6xl">خطأ 404</h1>
        <h2 className="text-gray-900 text-3xl font-bold lg:text-4xl">عذراً ! الصفحة غير موجودة</h2>
        <p className="text-gray-700 text-base lg:text-lg">
          حدث خطأ ما. يبدو أن هناك مشكلة في الرابط أو أن الصفحة تم حذفها
        </p>
        <Link to="/">
        <Button 
        text="الرجوع للرئيسية"
        />
        </Link>
      </div>
      <div className="photo w-2/3 md:w-1/3">
        <img src={error} alt="error" />
      </div>
    </div>
  )
}
