import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import user from "../../assets/images/user.jpg";
import { useState } from "react";
import { Button } from "@mui/material";

import PopupLayout from "../layouts/PopupLayout";
import SlidingTabs from "./SlidingTabs";
import AddComment from "../popups/AddComment";
import ClosePopupButton from "../buttons/ClosePopupButton";

function Description() {
  return (
    <>
      <h3 className="mb-3 text-xl font-bold text-gray-900 title">الوصف</h3>
      <p className="text-gray-700">
        دورة شاملة في منهاج الرياضيات للتوجيهي العلمي على مدار الفصل الأول
        كاملاً، ثلاث لقاءات أسبوعيا، بثوث مباشرة وحلول لأسئلة الدروس وأسئلة
        خارجية وأسئلة سنوات سابقة نماذج امتحانات ومواد إثرائية يقدمها الأستاذ
        محمد حرزالله
      </p>
    </>
  );
}
function Teacher() {
  return (
    <>
      <h3 className="mb-3 text-xl font-bold text-gray-900 title">الأستاذ</h3>
      <div className="flex flex-col gap-3 teacher">
        <div className="object-cover w-full img">
          <img src={user} alt="" className="w-full h-full" />
        </div>
        <p className="text-gray-700">
          <span className="font-bold text-gray-900">أ.محمد حرزالله </span>
          خبرة 30 عاماً في تدريس التوجيهي، خريج جامعة كذا كذا خبرة 30 عاماً في
          تدريس التوجيهي، خريج جامعة كذا كذا خبرة 30 عاماً في تدريس التوجيهي،
          خريج جامعة كذا كذا
        </p>
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
      <StudentComment />
      <StudentComment />
      <StudentComment />
      {addCommentPopupOpen ? (
        <PopupLayout>
          <div className="relative z-10 w-10/12 max-w-[40rem] pt-6 pb-2 px-3 bg-gray-white">
            <ClosePopupButton setOpen={setAddCommentPopupOpen} />
            <AddComment callback={() => {}} setOpen={setAddCommentPopupOpen} />
          </div>
        </PopupLayout>
      ) : null}
    </>
  );
}
export default function CoursePageTabs() {
  return (
    <SlidingTabs showTabs={true}>
      <Description label="الوصف" />
      <Teacher label="المعلم" />
      <StudentsFeedback label="تعليقات الطلاب" />
    </SlidingTabs>
  );
}
