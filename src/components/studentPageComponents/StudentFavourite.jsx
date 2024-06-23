import { Button, CircularProgress } from "@mui/material";
import { StarIcon, TrashIcon } from "../icons/icons";
import useGetResources from "../../apiCalls/useGetResources";
import { useFavouriteList } from "../../hooks/useFavouriteList";
import useDeleteResource from "../../apiCalls/useDeleteResource";
import { useAlert } from "../../hooks/useAlert";
import TopAlert from "../alerts/TopAlert";

export default function StudentFavourite() {
  const { favouriteList, isLoading, isError } = useFavouriteList();

  if (isLoading || !favouriteList) return <CircularProgress />;

  return (
    <section className="mb-4">
      <h2 className="mb-3 text-lg text-gray-900 font-semibold">
        المفضلة <span>({favouriteList.length})</span>
      </h2>

      <div className="favourite-list ">
        <div className="header hidden md:flex text-gray-700 border-[1px] border-gray-100 font-bold text-sm  p-2">
          <p className="w-7/12">الدورات</p>
          <p className="w-2/12">السعر</p>
          <p className="w-3/12">الإجراءات</p>
        </div>
        <div className="body border-x-[1px] border-gray-100 p-2 border-b-[1px] md:h-[32rem] overflow-auto">
          {favouriteList.map((course, key) => {
            return <CourseCardInFavourite course={course} key={key} />;
          })}
        </div>
      </div>
    </section>
  );
}

export function CourseCardInFavourite({ course }) {
  // const course = {
  //   photoUrl:
  //     "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   title: " دورة شاملة في مادة الرياضيات للتوجيهي العلمي",
  //   instructor: "أ.محمد حرزالله",
  //   rating: 4.6,
  //   reviewsCount: 250,
  //   price: 200,
  // };
  const removeFromFavouriteMutation = useDeleteResource(`favorites/course`);
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
  if (!course) return <CircularProgress />;
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
      <div className="card flex flex-col items-center md:flex-row border-b-[1px] gap-4 md:gap-[0] border-gray-100 py-3">
        <div className="course w-full md:w-7/12 flex flex-col md:flex-row gap-2 cursor-pointer group/card">
          <div className="preview w-full h-[10rem] md:w-[12rem] md:h-[8rem] relative">
            <div className="absolute hidden w-full h-full overlay bg-gray-white opacity-30 group-hover/card:block"></div>
            <img
              className="w-full h-full object-cover"
              src={course.cover_image}
              alt={course.title}
            />
          </div>
          <div className="info flex flex-col justify-between">
            <p className="text-gray-500 flex items-center">
              <StarIcon className="text-warning-500 ml-[5px]" />{" "}
              <span className="text-gray-900 ml-[2px]">{course.rate}</span>
              {/* ({course.reviewsCount} تقييم) */}
            </p>
            <h2 className="text-gray-900 font-semibold text-lg mt-1 mb-2 h-1/2 group-hover/card:underline">
              {course.title}
            </h2>
            <p className="text-gray-400">
              اسم المعلم:{" "}
              <span className="text-gray-700">{course.instructor.name}</span>
            </p>
          </div>
        </div>
        <div className="price w-full md:w-2/12 flex flex-col md:flex-row items-center">
          <p className="text-primary-500 text-2xl md:text-lg">
            {course.price}₪
          </p>
        </div>
        <div className="actions w-full md:w-3/12 flex justify-center items-center gap-2">
          <Button
            variant="contained"
            disableElevation
            fullWidth
            sx={{ borderRadius: 0 }}
          >
            اشتر الآن
          </Button>
          <Button
            variant="outlined"
            disableElevation
            fullWidth
            onClick={handleRemoveFromFavourite}
            disabled={removeFromFavouriteMutation.isPending}
            sx={{ borderRadius: 0, display: "flex", gap: "5px" }}
          >
            {removeFromFavouriteMutation.isPending
              ? "جاري الإزالة..."
              : "إزالة"}
            <TrashIcon />
          </Button>
        </div>
      </div>
    </>
  );
}
