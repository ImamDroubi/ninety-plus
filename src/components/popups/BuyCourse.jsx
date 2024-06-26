import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faAddressCard,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { Button, CircularProgress } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import useCreateResource from "../../apiCalls/useCreateResource";
import { useAlert } from "../../hooks/useAlert";
import TopAlert from "../alerts/TopAlert";
import useDeleteResource from "../../apiCalls/useDeleteResource";
import usePurchaseCourse from "../../apiCalls/usePurchaseCourse";
import { Link } from "react-router-dom";
export default function BuyCourse({ course }) {
  const { currentUser } = useAuth();
  const addToFavouriteMutation = useCreateResource(
    `favorites/course/${course?.id}`
  );
  const purchaseMutation = usePurchaseCourse();
  const removeFromFavouriteMutation = useDeleteResource(`favorites/course`);
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
  const alertController = useAlert();
  const handleRemoveFromFavourite = async () => {
    try {
      const response = await removeFromFavouriteMutation.mutateAsync(
        course?.id
      );
      alertController.alertSuccessToggle("تمت إزالة الدورة من السلة!");
      await new Promise((resolve) => setTimeout(resolve, 500));
      window.location.reload();
    } catch (error) {
      console.log(error);
      alertController.alertErrorToggle("حدث خطأ ما!");
    }
  };
  const handleAddToFavourite = async () => {
    try {
      const response = await addToFavouriteMutation.mutateAsync();
      alertController.alertSuccessToggle("تمت إضافة الدورة للسلة!");
      await new Promise((resolve) => setTimeout(resolve, 500));
      window.location.reload();
    } catch (error) {
      console.log(error);
      alertController.alertErrorToggle("حدث خطأ ما");
    }
  };
  const handlePurchaseCourse = async () => {
    try {
      const response = await purchaseMutation.mutateAsync(course?.id);
      const redirectUrl = response.data.data.approval_url;
      window.location.href = redirectUrl;
    } catch (error) {
      console.log(error);
    }
  };
  if (!currentUser || !course) return <CircularProgress />;
  return (
    <>
      {alertController.showSuccessAlert && (
        <TopAlert
          message={alertController.successAlertMessage}
          type="success"
        />
      )}
      {alertController.showErrorAlert && (
        <TopAlert message={alertController.errorAlertMessage} type="error" />
      )}
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
          {specifications.map((item, key) => {
            return (
              <div key={key} className="flex justify-between mb-4 text-base">
                <div className="flex items-center gap-1 text-gray-900">
                  {item.icon} {item.name}
                </div>
                <p className="text-gray-600">{item.value}</p>
              </div>
            );
          })}
        </div>
        <hr className="my-4" />
        {course.is_joined || course.instructor.id === currentUser.user_id ? (
          <Link to={`/courses/${course.id}`}>
            <button className="w-full py-2 mb-2 text-lg font-semibold duration-200 bg-primary-500 text-gray-white hover:bg-primary-600 disabled:cursor-default disabled:bg-gray-100 disabled:text-gray-500">
              مشاهدة الحصص
            </button>
          </Link>
        ) : (
          <button
            onClick={handlePurchaseCourse}
            disabled={purchaseMutation.isPending}
            className="w-full py-2 mb-2 text-lg font-semibold duration-200 bg-primary-500 text-gray-white hover:bg-primary-600 disabled:cursor-default disabled:bg-gray-100 disabled:text-gray-500"
          >
            {purchaseMutation.isPending ? "جاري المعالجة..." : "اشتر الآن"}
          </button>
        )}
        {course.instructor.id ===
        currentUser.user_id ? null : course.is_favorite ? (
          <button
            disabled={removeFromFavouriteMutation.isPending}
            onClick={handleRemoveFromFavourite}
            className="w-full py-2 mb-2 text-lg font-semibold duration-200 bg-primary-100 text-primary-500 hover:bg-primary-200 disabled:cursor-default disabled:bg-gray-100 disabled:text-gray-500"
          >
            {removeFromFavouriteMutation.isPending
              ? "جاري الإزالة..."
              : "إزالة من السلة"}
          </button>
        ) : (
          <button
            disabled={addToFavouriteMutation.isPending}
            onClick={handleAddToFavourite}
            className="w-full py-2 mb-2 text-lg font-semibold duration-200 bg-primary-100 text-primary-500 hover:bg-primary-200 disabled:cursor-default disabled:bg-gray-100 disabled:text-gray-500"
          >
            {addToFavouriteMutation.isPending ? "جاري الإضافة..." : "أضف للسلة"}
          </button>
        )}
      </div>
    </>
  );
}
