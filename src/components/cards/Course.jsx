
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
export default function Course({preview,category,price,title,stars,studentsNo}) {
  return (
    <div className="group w-[20rem] sm:w-[16rem] min-h-[20rem] bg-gray-white  flex flex-col cursor-pointer border-2 border-gray-100">
      <div className="preview w-full h-[12rem] object-cover overflow-hidden relative">
        <div className="absolute hidden w-full h-full overlay bg-gray-white opacity-30 group-hover:block"></div>
        <img src={preview} alt="math book" className="w-full"/>
      </div>
      <div className="flex items-center justify-between w-full p-2 info">
        <p className="category font-semibold bg-primary-100 p-[0.3rem] text-primary-700">{category}</p>
        <p className="font-bold price text-primary-500">{price} ₪</p>
      </div>
      <h3 title={title} className="p-2 text-lg font-bold title group-hover:underline">{title.length>45?`${title.slice(0,42)}...` : title}</h3>
      <div className="flex justify-between p-2 font-semibold border-t-2 border-gray-100 rating">
        <p className="stars flex items-center gap-[2px] text-gray-700"><FontAwesomeIcon className="text-warning-500" icon={faStar} />{stars}</p>
        <div className="text-gray-500 students"><span className="text-gray-700">{studentsNo}</span> طالب</div>
      </div>
    </div>
  )
}
