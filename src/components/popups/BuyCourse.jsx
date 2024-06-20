import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faAddressCard,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { Button } from "@mui/material";

export default function BuyCourse({ course }) {
  const price = 14.0;
  const discount = 0.56;
  const original = discount ? price / (1 - discount) : price;
  const specifications = [
    {
      icon: <FontAwesomeIcon className="text-gray-400" icon={faClock} />,
      name: "المحاضرات الأسبوعية",
      value: course.weekly_lectures,
    },
    {
      icon: <FontAwesomeIcon className="text-gray-400" icon={faAddressCard} />,
      name: "المادة",
      value: course.module.name,
    },
    {
      icon: <FontAwesomeIcon className="text-gray-400" icon={faUser} />,
      name: "الطلاب المسجلون",
      value: course.students_count,
    },
  ];

  const handleRemoveFromFavourite = () => {};
  const handleAddToFavourite = () => {};

  return (
    <div className="z-10 w-full p-5">
      <div className="flex items-center justify-between price">
        <p className="text-2xl">
          {course.price.toFixed(2)}${" "}
          {course.discount ? (
            <span className="text-xl text-gray-500 line-through">
              {course.price.toFixed(2)}
            </span>
          ) : null}
        </p>
        {course.discount && (
          <p className="p-1 text-sm text-primary-500 bg-primary-100">
            {discount}% خصم
          </p>
        )}
      </div>
      <hr className="my-4" />
      <div className="specifications">
        {specifications.map((item) => {
          return (
            <div className="flex justify-between mb-4 text-base">
              <div className="flex items-center gap-1 text-gray-900">
                {item.icon} {item.name}
              </div>
              <p className="text-gray-600">{item.value}</p>
            </div>
          );
        })}
      </div>
      <hr className="my-4" />
      <button className="w-full py-2 mb-2 text-lg font-semibold duration-200 bg-primary-500 text-gray-white hover:bg-primary-600">
        اشتر الآن
      </button>
      {course.is_favorite ? (
        <button
          onClick={handleRemoveFromFavourite}
          className="w-full py-2 mb-2 text-lg font-semibold duration-200 bg-primary-100 text-primary-500 hover:bg-primary-200 disabled:cursor-default disabled:bg-gray-100 disabled:text-gray-500"
        >
          إزالة من السلة
        </button>
      ) : (
        <button
          onClick={handleAddToFavourite}
          className="w-full py-2 mb-2 text-lg font-semibold duration-200 bg-primary-100 text-primary-500 hover:bg-primary-200 disabled:cursor-default disabled:bg-gray-100 disabled:text-gray-500"
        >
          أضف للسلة
        </button>
      )}
    </div>
  );
}
