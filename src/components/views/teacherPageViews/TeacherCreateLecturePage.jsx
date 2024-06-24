import { useState } from "react";
import SlidingTabs from "../../menus/SlidingTabs";
import UploadLectureForm from "../../forms/create-lecture-forms/UploadLectureForm";
import SetLiveStreamForm from "../../forms/create-lecture-forms/SetLiveStreamForm";
import StartLiveStream from "../../forms/create-lecture-forms/StartLiveStreamForm";

export default function TeacherCreateLecturePage() {
  const [isLectureRecorded, setIsLectureRecorded] = useState(true);

  return (
    <div className="my-4 w-[90%] m-auto">
      <section className="text-center ">
        <h2 className="text-2xl my-1">إضافة حصة جديدة إلى دوراتك</h2>
        <p>يمكنك إضافة حصة مسجلة من الجهاز أو تحديد موعد بث مباشر</p>
      </section>
      <main>
        <SlidingTabs showTabs={true}>
          <UploadLectureForm label={"إضافة حصة مسجلة"} />
          <SetLiveStreamForm label={"تحديد بث مباشر"} />
          <StartLiveStream label={"بدء بث مباشر"} />
        </SlidingTabs>
      </main>
    </div>
  );
}
