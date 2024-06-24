import { Button, CircularProgress } from "@mui/material";
import { ChatIcon } from "../icons/icons";
import useCreateResource from "../../apiCalls/useCreateResource";
import { useAlert } from "../../hooks/useAlert";
import { useState } from "react";
import TopAlert from "../alerts/TopAlert";

export default function AddComment({ courseId = -1, lessonId = -1, setOpen }) {
  const addCommentMutation = useCreateResource(
    courseId == -1
      ? `comments/lesson/${lessonId}`
      : `comments/course/${courseId}`
  );
  const [commentBody, setCommentBody] = useState("");
  const alertController = useAlert();

  const handleAddComment = async () => {
    if (!commentBody || commentBody == "") return;
    try {
      const response = await addCommentMutation.mutateAsync({
        content: commentBody,
      });
      alertController.alertSuccessToggle("تمت إضافة  التعليق!");
      await new Promise((resolve) => setTimeout(resolve, 500));
      window.location.reload();
    } catch (error) {
      console.log(error);
      alertController.alertErrorToggle("حدث خطأ ما");
    }
  };
  // if (!course && !lesson) return <CircularProgress />;
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
      <h2 className="mb-2 text-lg text-gray-900">اكتب تعليقاً</h2>
      <textarea
        placeholder="تعليقك هنا..."
        cols="30"
        rows="4"
        value={commentBody}
        onChange={(e) => setCommentBody(e.target.value)}
        className="w-full p-2 mb-4 border-2 border-gray-100"
      ></textarea>
      <div className="flex justify-between buttons">
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
          onClick={handleAddComment}
          disabled={addCommentMutation.isPending}
        >
          <div className="flex items-center gap-1">
            <p>{addCommentMutation.isPending ? "جاري التعليق..." : "تعليق"}</p>
            <ChatIcon />
          </div>
        </Button>
      </div>
    </>
  );
}
