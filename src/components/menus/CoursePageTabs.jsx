import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faComment } from "@fortawesome/free-solid-svg-icons";
import user from "../../assets/images/user.jpg";
import { useState } from "react";
import Button from "@mui/material/Button";
import PopupLayout from "../layouts/PopupLayout";
import AddComent from "../popups/AddComment";
import SlidingTabs from "./SlidingTabs";
import ClosePopupButton from "../buttons/ClosePopupButton";

function Description({ text = "" }) {
  return (
    <>
      <h3 className="mb-3 text-xl font-bold text-gray-900 title">الوصف</h3>
      <p className="text-gray-700">{text}</p>
    </>
  );
}
function AttachedFiles() {
  return (
    <>
      <div className="flex items-center justify-between p-2 file bg-gray-50">
        <div className="flex items-center gap-3 info">
          <div className="text-4xl icon text-primary-500">
            <FontAwesomeIcon icon={faFile} />
          </div>
          <div className="flex flex-col name">
            <a className="text-lg font-bold text-gray-900 cursor-pointer hover:underline">
              نموذج امتحان.pdf
            </a>
            <p className="text-sm text-gray-600">2.4 MB</p>
          </div>
        </div>
        <Button variant="contained" sx={{ borderRadius: 0 }}>
          تحميل الملف
        </Button>
      </div>
    </>
  );
}
function StudentComment() {
  const [extended, setExtended] = useState(false);
  const text =
    "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا كنت تحتاج إلى عدد أكبر من الفقرات";
  return (
    <>
      <div className="flex items-center gap-2 text-sm header">
        <div className="object-cover w-6 h-6 rounded-full img">
          <img src={user} alt="" className="w-full h-full rounded-full" />
        </div>
        <div className="info">
          <div className="font-bold text-gray-900 name">
            يعقوب قمر الدين
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
function StudentsFeedback() {
  const [addCommentPopupOpen, setAddCommentPopupOpen] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="mb-3 text-xl font-bold text-gray-900 title">
          تعليقات الطلاب
        </h3>
        <Button
          disableElevation
          sx={{ borderRadius: "0px" }}
          onClick={() => setAddCommentPopupOpen(true)}
          variant="contained"
        >
          <div className="flex items-center gap-1">
            <p>تعليق</p>
            <FontAwesomeIcon icon={faComment} />
          </div>
        </Button>
      </div>

      {addCommentPopupOpen ? (
        <PopupLayout>
          <div className="relative z-10 w-10/12 max-w-[40rem] pt-6 pb-2 px-3 bg-gray-white">
            <ClosePopupButton setOpen={setAddCommentPopupOpen} />
            <AddComent setOpen={setAddCommentPopupOpen} />
          </div>
        </PopupLayout>
      ) : null}
    </>
  );
}

export default function CourseInfoTabs({ lecture }) {
  return (
    <SlidingTabs showTabs={true}>
      <Description text={lecture?.description} label="الوصف" />
      {/* <AttachedFiles label="الملفات المرفقة" /> */}
      <StudentsFeedback label="تعليقات الطلاب" />
    </SlidingTabs>
  );
}
