import { Button } from "@mui/material";
import { ChatIcon } from "../icons/icons";

export default function AddComment() {
  return (
    <>
      <h2 className="mb-2 text-lg text-gray-900">اكتب تعليقاً</h2>
      <textarea
        placeholder="تعليقك هنا..."
        name=""
        id=""
        cols="30"
        rows="4"
        className="w-full p-2 mb-4 border-2 border-gray-100"
      ></textarea>
      <div className="flex justify-between buttons">
        <Button
          disableElevation
          variant="contained"
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
        >
          <div
            onClick={() => setAddCommentPopupOpen(true)}
            className="flex items-center gap-1"
          >
            <p>تعليق</p>
            <ChatIcon />
          </div>
        </Button>
      </div>
    </>
  );
}
