import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export default function Teacher({preview,name,major,stars,studentsNo}) {


  return (
    <div className="group max-w-[16rem] min-h-[15rem] bg-gray-white m-4 flex flex-col cursor-pointer  border-2 border-gray-100">
      <div className="preview w-full object-cover h-[16rem] relative">
      <div className="absolute hidden w-full h-full overlay bg-gray-white opacity-30 group-hover:block"></div>
        <img src={preview} alt="teacher" className="w-full h-full"/>
      </div>
      <div className="flex flex-col items-center p-1 info">
        <h3 className="text-lg font-semibold text-gray-900 name group-hover:underline">أ. <span>{name}</span></h3>
        <p className="text-lg text-gray-500 major">{major}</p>
      </div>
      <div className="flex justify-between p-2 font-semibold border-t-2 border-gray-100 rating">
        <p className="stars flex items-center gap-[2px] text-gray-700"><FontAwesomeIcon className="text-warning-500" icon={faStar} />{stars}</p>
        <div className="text-gray-500 students"><span className="text-gray-700">{studentsNo}</span> طالب</div>
      </div>
    </div>
  )
}
