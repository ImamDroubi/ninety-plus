import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from '@fortawesome/free-solid-svg-icons'
import user from "../../assets/images/user.jpg"
import BasicTabs from "../menus/BasicTabs";
import Container90 from "../containers/Container90";

export default function CoursePage() {
  const teacherImage = user;
  const starImage = <FontAwesomeIcon icon={faStar} />;
  const booksImgae = "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <>
      <Container90>
        <div className="page p-1 mt-2">
          <div className="content">
            <div className="header">
              <h2 className="title text-gray-900 text-2xl font-bold mb-2">
                دورة شاملة لمنهاج الرياضيات للفرع العلمي الفصل الأول
              </h2>
              <p className="description text-gray-700 mb-2">
                بثوث مباشرة وحلول أسئلة الكتاب ونماذج سابقة من امتحانات التوجيهي
              </p>
              <div className="info flex justify-between mb-2">
                <div className="teacher flex items-center gap-1">
                  <div className="img w-5 h-5 object-cover rounded-full">
                    <img src={teacherImage} alt="محمد حرزالله" className="w-full h-full rounded-full"/>
                  </div>
                  <p className="name text-gray-900">أ.محمد حرزالله</p>
                </div>
                <div className="rating flex gap-1 items-center">
                  <div className="stars text-warning-500">
                  {starImage}
                  </div>
                  <p className="number text-gray-900">4.8 <span className="text-gray-600 text-sm">(3200 طالب)</span></p>
                </div>
              </div>
            </div>
            <div className="preview">
              <img src={booksImgae} alt="" />
            </div>
            <div className="information">
              <BasicTabs/>
            </div>
          </div>
          <div className="widget"></div>
        </div>
      </Container90>
    </>
  )
}
