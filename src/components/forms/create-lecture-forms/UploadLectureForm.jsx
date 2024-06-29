import { useEffect, useState } from "react";
import SingleFormInputContainer from "../../containers/SingleFormInputContainer";
import SelectDropdown from "../../menus/SelectDropdown";
import UploadFileHandler from "../UploadFileHandler";
import useGetResources from "../../../apiCalls/useGetResource";
import { Button, CircularProgress } from "@mui/material";
import { useUploadMedia } from "../../../hooks/useUploadMedia";
import { UploadArrowIcon } from "../../icons/icons";
import useCreateResource from "../../../apiCalls/useCreateResource";
import { useAlert } from "../../../hooks/useAlert";
import TopAlert from "../../alerts/TopAlert";
export default function UploadLectureForm() {
  const [selectedLiveStream, setSelectedLiveStream] = useState();
  const [liveStreamsList, setLiveStreamsList] = useState([]);
  const getLecturesQuery = useGetResources("lectures?role=instructor");
  const lecturePayload = new FormData();
  const uploadLectureMutation = useCreateResource(
    `lectures/${selectedLiveStream?.id}/upload-record`
  );

  const alertController = useAlert();
  const handleUploadLecture = async () => {
    try {
      if (!videoFile) return;
      lecturePayload.append("record", videoFile);
      const response = await uploadLectureMutation.mutateAsync(lecturePayload);
      alertController.alertSuccessToggle("تمت الإضافة بنجاح!");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alertController.alertErrorToggle(`خطأ في الإضافة!`);
    }
  };

  useEffect(() => {
    if (getLecturesQuery.data) {
      setLiveStreamsList(getLecturesQuery.data.data.data);
    }
  }, [getLecturesQuery.isSuccess]);

  const {
    file: videoFile,
    fileRef: videoFileRef,
    uploading: videoUploading,
    preview: videoPreview,
    handleFileChange: videoHandleFileChange,
  } = useUploadMedia();
  const handleVideoUploadButtonClick = () => {
    videoFileRef.current.click();
  };
  const labelBaseStyle = "mb-2 text-base block font-semibold";
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
      <form>
        <p>إضافة التسجيل الخاص ببث مباشر عُقد مسبقاً</p>
        {/* Select Live Stream Dropdown */}
        <SingleFormInputContainer extraStyles={"my-2"} error={null}>
          <div className="mb-3 flex items-center gap-1 ">
            <label className={`${labelBaseStyle}`}>اختر البث</label>
            {getLecturesQuery.isPending ? (
              <CircularProgress />
            ) : (
              <SelectDropdown
                width={300}
                title="البث المباشر"
                list={liveStreamsList}
                stateChanger={setSelectedLiveStream}
              />
            )}
          </div>
        </SingleFormInputContainer>

        <SingleFormInputContainer error={null}>
          <div className="video-section w-full p-2">
            <div className="video flex gap-2 relative">
              <div className="video w-full aspect-[2/1] object-cover bg-gray-200">
                {videoUploading ? (
                  <CircularProgress />
                ) : (
                  <video className="w-full h-full" src={videoPreview} />
                )}
              </div>
              <div className="info top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 absolute flex flex-col justify-between items-start">
                <input
                  type="file"
                  accept="video/*"
                  ref={videoFileRef}
                  onChange={videoHandleFileChange}
                  hidden
                />
                <Button
                  sx={{ display: "flex", gap: "0.5rem" }}
                  variant="contained"
                  disableElevation
                  onClick={handleVideoUploadButtonClick}
                  disabled={!selectedLiveStream}
                >
                  <UploadArrowIcon />
                  تحميل فيديو
                </Button>
              </div>
            </div>
          </div>
        </SingleFormInputContainer>
        <Button
          sx={{ width: "100%", borderRadius: "0px" }}
          disableElevation
          variant="contained"
          onClick={handleUploadLecture}
          disabled={
            uploadLectureMutation.isPending || videoUploading || !videoFile
          }
        >
          {uploadLectureMutation.isPending ? "جاري الإضافة..." : "إضافة الحصة"}
        </Button>
      </form>
    </>
  );
}
