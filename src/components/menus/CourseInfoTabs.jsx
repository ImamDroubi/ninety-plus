import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import user from "../../assets/images/user.jpg";
import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";

import PopupLayout from "../layouts/PopupLayout";
import SlidingTabs from "./SlidingTabs";
import AddComment from "../popups/AddComment";
import ClosePopupButton from "../buttons/ClosePopupButton";
import { useComments } from "../../hooks/useComments";
import { useUserInfo } from "../../hooks/useUserInfo";

function Description({ text }) {
  return (
    <>
      <h3 className="mb-3 text-xl font-bold text-gray-900 title">الوصف</h3>
      <p className="text-gray-700">{text}</p>
    </>
  );
}
function Teacher({ instructor }) {
  return (
    <>
      <h3 className="mb-3 text-xl font-bold text-gray-900 title">الأستاذ</h3>
      <div className="flex flex-col gap-3 teacher">
        <div className="object-cover w-full img">
          <img
            src={instructor.profile_image}
            alt=""
            className="w-full h-full"
          />
        </div>
        <p className="text-gray-700">
          <span className="font-bold text-gray-900">{instructor.name}</span>
          {instructor.about}
        </p>
      </div>
    </>
  );
}
function StudentComment({ comment }) {
  const [extended, setExtended] = useState(false);
  const { userInfo, isLoading } = useUserInfo(comment?.user_id, comment);
  console.log(userInfo);
  const text = comment.content;
  if (isLoading || !comment || !userInfo) return <CircularProgress />;
  return (
    <>
      <div className="flex items-center gap-2 text-sm header">
        <div className="object-cover w-6 h-6 rounded-full img">
          <img
            src={userInfo.profile_image}
            alt=""
            className="w-full h-full rounded-full"
          />
        </div>
        <div className="info">
          <div className="font-bold text-gray-900 name">
            {userInfo.first_name} {userInfo.last_name}
            <span className="text-sm font-normal text-gray-600 time">
              {" "}
              • 5 دقائق
            </span>
          </div>
        </div>
      </div>
      <div className="body">
        <p className="text-gray-700 pr-[3.5rem] text-sm">
          {text.length > 150
            ? extended
              ? text
              : `${text.slice(0, 147)}...`
            : text}
          {text.length > 150 ? (
            extended ? (
              <button
                onClick={() => setExtended(false)}
                className="text-sm font-bold text-primary-700"
              >
                إظهار أقل
              </button>
            ) : (
              <button
                onClick={() => setExtended(true)}
                className="text-sm font-bold text-primary-700"
              >
                إظهار المزيد
              </button>
            )
          ) : null}
        </p>
      </div>
      <hr className="my-2" />
    </>
  );
}
function StudentsFeedback({ courseId }) {
  const { comments, isLoading } = useComments("course", courseId);
  const [addCommentPopupOpen, setAddCommentPopupOpen] = useState(false);
  if (isLoading || !comments) return <CircularProgress />;
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="mb-3 text-xl font-bold text-gray-900 title">
          تعليقات الطلاب
        </h3>

        <Button
          onClick={() => setAddCommentPopupOpen(true)}
          variant="contained"
          disableElevation
          sx={{ borderRadius: "0px" }}
        >
          <div className="flex items-center gap-1">
            <p>تعليق</p>
            <FontAwesomeIcon icon={faComment} />
          </div>
        </Button>
      </div>
      {comments.map((comment) => {
        return <StudentComment comment={comment} />;
      })}
      {addCommentPopupOpen ? (
        <PopupLayout>
          <div className="relative z-10 w-10/12 max-w-[40rem] pt-6 pb-2 px-3 bg-gray-white">
            <ClosePopupButton setOpen={setAddCommentPopupOpen} />
            <AddComment courseId={courseId} setOpen={setAddCommentPopupOpen} />
          </div>
        </PopupLayout>
      ) : null}
    </>
  );
}
export default function CoursePageTabs({ course, instructor }) {
  return (
    <SlidingTabs showTabs={true}>
      <Description text={course.description} label="الوصف" />
      <Teacher instructor={instructor} label="المعلم" />
      <StudentsFeedback courseId={course.id} label="تعليقات الطلاب" />
    </SlidingTabs>
  );
}
