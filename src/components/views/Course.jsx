import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowRight,faPlay,faComment,faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { Button } from "@mui/material";
import Container90 from "../containers/Container90";
import video from "../../assets/videos/grass.mp4";
import CourseInfoTabs from "../menus/CourseInfoTabs";
export default function Course() {
  return (
    <>
    
    <div className="px-1 py-2 to bg-gray-50 sm:px-0">
      <Container90>
        <div className="flex justify-between content">
          <div className="flex gap-2 right">
            <button className="flex items-center justify-center w-6 h-6 text-gray-900 rounded-full shadow back shrink-0 bg-gray-white hover:bg-gray-200 focus:bg-gray-200">
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
            <div className="info flex flex-col gap-[0.2rem]">
              <h2 className="font-bold text-gray-900">رياضيات التوجيهي العلمي أ.محمد حرزالله</h2>
              <div className="videos flex items-center gap-[3px]">
                <div className="icon text-gray-500 w-[1rem] h-[1rem] text-xs border-gray-500 p-1 justify-center items-center flex border-2 rounded-full">
                  <FontAwesomeIcon className="translate-x-[1px]" icon={faPlay} />
                </div>
                <p className="text-xs text-gray-700"><span>77</span> محاضرة</p>
              </div>
            </div>
          </div>
          <div className="items-center hidden gap-2 left sm:flex">
            <Button variant="outlined" disableElevation sx={{borderRadius:0}}>اترك تعليقاً </Button>
            <Button variant="contained" disableElevation sx={{borderRadius:0}}>المحاضرة التالية </Button>
          </div>
          <div className="flex items-center gap-1 left sm:hidden ">
          <button className="flex items-center justify-center w-6 h-6 text-xl bg-gray-100 rounded-full text-primary-500"> 
            <FontAwesomeIcon icon={faComment} />
          </button>
          <button className="flex items-center justify-center w-6 h-6 text-xl rounded-full text-gray-white bg-primary-500" >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          </div>
        </div>
      </Container90>
    </div>
    <Container90>
      <div className="grid justify-between grid-cols-3 px-2 my-3 text-gray-900 main sm:px-0">
        <div className="col-span-2 content ">
          <div className="video">
            <video controls src={video} className="max-w-full"></video>
            <h1 className="my-2 text-2xl font-bold title">1.متوسط التغير</h1>
            <div className="flex justify-between info">
              <p className="text-gray-600"><span className="text-lg font-bold text-gray-900">523 </span>مشاهد</p>
              <div className="flex gap-5 statistics">
                <p className="text-gray-600 date">تاريخ التحميل: <span className="text-gray-900">Oct/26/2020</span></p>
                <p className="text-gray-600 comments">التعليقات: <span className="text-gray-900">154</span></p>
              </div>
            </div>
          </div>
          <hr className="my-2" />
          <CourseInfoTabs/>
        </div>
        <div className="nav bg-primary-700 h-[60rem] col-span-1  ">

        </div>
      </div>
    </Container90>
    </>
  )
}
