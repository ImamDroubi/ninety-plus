import { Button } from "@mui/material";
import React, { useState } from "react";
import useCreateResource from "../../apiCalls/useCreateResource";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import TopAlert from "../alerts/TopAlert";
import { useAlert } from "../../hooks/useAlert";
export default function AddRating({ courseId, setOpen }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const starImage = <FontAwesomeIcon icon={faStar} />;
  const addRateMutation = useCreateResource(`rates/course/${courseId}`);
  const alertController = useAlert();
  const handleAddRate = async () => {
    try {
      const response = await addRateMutation.mutateAsync({
        rate_value: rating,
      });
      alertController.alertSuccessToggle("تمت إضافة  التقييم!");
      await new Promise((resolve) => setTimeout(resolve, 500));
      setOpen(false);
    } catch (error) {
      console.log(error);
      alertController.alertErrorToggle("حدث خطأ ما");
      setOpen(false);
    }
  };

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
      <div className="flex flex-col items-center py-4 text-2xl gap-6">
        <h2>اختر تقييماً للدورة</h2>
        <div className="stars text-warning-500 text-5xl">
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className={
                  index <= (hover || rating)
                    ? "text-warning-500"
                    : "text-gray-300"
                }
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
              >
                <span className="stars">{starImage}</span>
              </button>
            );
          })}
        </div>
        <div className="flex justify-between buttons gap-6">
          <Button
            disableElevation
            variant="contained"
            onClick={() => setOpen(false)}
            sx={{
              color: "rgb(29 32 38)",
              backgroundColor: "rgb(245 247 250)",
              "&:hover": { backgroundColor: "rgb(206 209 217)" },
              borderRadius: "0px",
            }}
          >
            إلغاء
          </Button>
          <Button
            disableElevation
            sx={{ borderRadius: "0px" }}
            variant="contained"
            onClick={handleAddRate}
            disabled={addRateMutation.isPending}
          >
            <div className="flex items-center gap-1">
              <p>{addRateMutation.isPending ? "جاري التقييم..." : "تقييم"}</p>
              {starImage}
            </div>
          </Button>
        </div>
      </div>
    </>
  );
}
