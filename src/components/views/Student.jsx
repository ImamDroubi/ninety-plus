import SlidingTabs from "../menus/SlidingTabs"
import Overview from "../studentPageComponents/Overview"

function Content(){
  return <>
    <p>content</p>
  </>
}

export default function Student() {
  const studentInfo = {
    id : 1, 
    name : "يعقوب قمر الدين",
    profilePicture: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stream : 'علمي',
    enrolledCourses : 4, 
    activeCourses : 1,
    completedCourses : 3,
    coursesInstructors : 3
  }


  return (
    <div className="relative pt-[7rem]">
      <div className="background absolute -z-10 w-full top-[0rem] h-[15rem] bg-primary-100"></div>
      <div className="w-3/4 m-auto content bg-gray-white">
        <header className="flex justify-start p-5">
          <div className="flex items-center gap-3 personal">
            <div className="picture w-[7rem] aspect-square object-cover rounded-full">
              <img src={studentInfo.profilePicture} alt="" className="w-full h-full rounded-full"/>
            </div>
            <div className="flex flex-col gap-2 info">
              <h1 className="font-extrabold">{studentInfo.name}</h1>
              <p className="text-sm text-gray-600">{studentInfo.stream}</p>
            </div>
          </div>
        </header>
        <SlidingTabs>
          <Overview student={studentInfo} label="نظرة عامة"/>
          <Content label="الدورات"/>
          <Content label="الأساتذة"/>
          <Content label="الرسائل"/>
          <Content label="المفضلة"/>
          <Content label="عمليات الشراء"/>
          <Content label="الإعدادات"/>
        </SlidingTabs>
      </div>
    </div>
  )
}
