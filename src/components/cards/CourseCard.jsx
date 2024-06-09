import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import MathBook from "../../assets/images/book-covers/math-scientific.jpg";
import OptionsOverlayButton from "../overlays/OptionsOverlayButton";
import { useState } from "react";
const sample = {
  title: "رياضيات توجيهي علمي وصناعي للأستاذ محمد حرزالله",
  category: "علمي",
  price: 400,
  cover_image: MathBook,
  stars: 4.5,
  studentsNo: 120,
};
export default function CourseCard({ course }) {
  const [currentCourse, setCurrentCourse] = useState({ ...sample, ...course });

  return (
    <>
      <div className="relative group w-[20rem] sm:w-[16rem] min-h-[20rem] bg-gray-white  flex flex-col cursor-pointer border-2 border-gray-100">
        <OptionsOverlayButton />
        <div className="preview w-full h-[12rem] object-cover overflow-hidden relative">
          <div className="absolute hidden w-full h-full overlay bg-gray-white opacity-30 group-hover:block"></div>
          <img
            src={currentCourse.cover_image}
            alt="math book"
            className="w-full"
          />
        </div>
        <div className="flex items-center justify-between w-full p-2 info">
          <p className="category font-semibold bg-primary-100 p-[0.3rem] text-primary-700">
            {currentCourse.category}
          </p>
          <p className="font-bold price text-primary-500">
            {currentCourse.price} ₪
          </p>
        </div>
        <h3
          title={currentCourse.title}
          className="p-2 text-lg font-bold title group-hover:underline"
        >
          {currentCourse.title.length > 45
            ? `${currentCourse.title.slice(0, 42)}...`
            : currentCourse.title}
        </h3>
        <div className="flex justify-between p-2 font-semibold border-t-2 border-gray-100 rating">
          <p className="stars flex items-center gap-[2px] text-gray-700">
            <FontAwesomeIcon className="text-warning-500" icon={faStar} />
            {currentCourse.stars}
          </p>
          <div className="text-gray-500 students">
            <span className="text-gray-700">{currentCourse.studentsNo}</span>{" "}
            طالب
          </div>
        </div>
      </div>
    </>
  );
}
