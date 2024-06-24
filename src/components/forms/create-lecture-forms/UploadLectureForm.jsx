import { useState } from "react";
import SingleFormInputContainer from "../../containers/SingleFormInputContainer";
import SelectDropdown from "../../menus/SelectDropdown";
import UploadFileHandler from "../UploadFileHandler";
import { liveStreamsList } from "../../data/livestreamsList";

export default function UploadLectureForm() {
  const [selectedLiveStream, setSelectedLiveStream] = useState();
  const labelBaseStyle = "mb-2 text-base block font-semibold";
  return (
    <form>
      <p>إضافة التسجيل الخاص ببث مباشر عُقد مسبقاً</p>
      {/* Select Live Stream Dropdown */}
      <SingleFormInputContainer extraStyles={"my-2"} error={null}>
        <div className="mb-3 flex items-center gap-1 ">
          <label className={`${labelBaseStyle}`}>
            اختر البث 
          </label>
          <SelectDropdown
            width={300}
            title="البث المباشر"
            list={liveStreamsList}
            stateChanger={setSelectedLiveStream}
          />
        </div>
      </SingleFormInputContainer>

      <UploadFileHandler />
    </form>
  );
}
