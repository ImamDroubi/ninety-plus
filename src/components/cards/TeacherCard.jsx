import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const teacherSample = {
  name: "محمد حرزالله",
  major: "رياضيات",
  preview:
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  stars: 4.1,
  studentsNo: 1324,
};

export default function TeacherCard({
  preview = teacherSample.preview,
  name = teacherSample.name,
  major = teacherSample.major,
  stars = teacherSample.stars,
  studentsNo = teacherSample.studentsNo,
}) {
  return (
    <div className="group w-full max-w-[16rem] min-h-[15rem] bg-gray-white  flex flex-col cursor-pointer  border-2 border-gray-100">
      <div className="preview w-full object-cover h-[16rem] relative">
        <div className="absolute hidden w-full h-full overlay bg-gray-white opacity-30 group-hover:block"></div>
        <img src={preview} alt="teacher" className="w-full h-full" />
      </div>
      <div className="flex flex-col items-center p-1 info">
        <h3 className="text-lg font-semibold text-gray-900 name group-hover:underline">
          أ. <span>{name}</span>
        </h3>
        <p className="text-lg text-gray-500 major">{major}</p>
      </div>
      <div className="flex justify-between p-2 font-semibold border-t-2 border-gray-100 rating">
        <p className="stars flex items-center gap-[2px] text-gray-700">
          <FontAwesomeIcon className="text-warning-500" icon={faStar} />
          {stars}
        </p>
        <div className="text-gray-500 students">
          <span className="text-gray-700">{studentsNo}</span> طالب
        </div>
      </div>
    </div>
  );
}
