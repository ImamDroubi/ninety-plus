import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar,faCartShopping,faXmark} from '@fortawesome/free-solid-svg-icons'
import user from "../../assets/images/user.jpg"
import BasicTabs from "../menus/BasicTabs";
import Container90 from "../containers/Container90";
import BuyCourse from "../popups/BuyCourse";
import PopupLayout from "../layouts/PopupLayout";
import { useState } from "react";

export default function CoursePage() {
  const teacherImage = user;
  const starImage = <FontAwesomeIcon icon={faStar} />;
  const booksImgae = "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const [buyModalOpen, setBuyModalOpen] = useState(0);
  return (
    <>
      <div className="absolute hidden lg:block bg-gray-50 top-[7rem] h-[25rem] -z-10 w-full"></div>
      <Container90>
        <div className="flex justify-between gap-4 p-1 mt-2 page">
          <div className="content">
            <div className="header">
              <h2 className="mb-2 text-2xl font-bold text-gray-900 title">
                دورة شاملة لمنهاج الرياضيات للفرع العلمي الفصل الأول
              </h2>
              <p className="mb-2 text-gray-700 description">
                بثوث مباشرة وحلول أسئلة الكتاب ونماذج سابقة من امتحانات التوجيهي
              </p>
              <div className="flex justify-between mb-2 info">
                <div className="flex items-center gap-1 teacher">
                  <div className="object-cover w-5 h-5 rounded-full img">
                    <img src={teacherImage} alt="محمد حرزالله" className="w-full h-full rounded-full"/>
                  </div>
                  <p className="text-gray-900 name">أ.محمد حرزالله</p>
                </div>
                <div className="flex items-center gap-1 rating">
                  <div className="stars text-warning-500">
                  {starImage}
                  </div>
                  <p className="text-gray-900 number">4.8 <span className="text-sm text-gray-600">(3200 طالب)</span></p>
                </div>
              </div>
            </div>
            <div className="object-cover preview">
              <img src={booksImgae} alt="" className="w-full h-full" />
            </div>
            <div className="information">
              <BasicTabs/>
            </div>
          </div>
          <div className="sticky hidden w-1/2 shadow-md widget lg:flex bg-gray-white h-fit top-2">
            <BuyCourse/>
          </div>
          <button onClick={()=>setBuyModalOpen(!buyModalOpen)} className="w-[4rem] h-[4rem] rounded-full bg-primary-500 text-gray-white fixed bottom-3 left-1 hover:bg-primary-600 duration-100 lg:hidden ">
            <FontAwesomeIcon icon={faCartShopping} />
          </button>
          {
            buyModalOpen?
            <PopupLayout >
              <div className="relative z-10 w-10/12 pt-2 bg-gray-white">
                <button onClick={()=>setBuyModalOpen(false)} className="absolute top-[-1rem] right-[-1rem] text-gray-white bg-primary-500 p-2 w-6 h-6 rounded-full flex items-center justify-center text-xl hover:bg-primary-600">
                  X
                </button>
                <BuyCourse/>
              </div>
            </PopupLayout>
            :
            null
          }
        </div>
      </Container90>
    </>
  )
}
