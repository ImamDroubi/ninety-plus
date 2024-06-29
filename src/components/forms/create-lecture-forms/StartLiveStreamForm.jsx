import { useEffect, useState } from "react";
import SingleFormInputContainer from "../../containers/SingleFormInputContainer";
import SelectDropdown from "../../menus/SelectDropdown";
import UploadFileHandler from "../UploadFileHandler";
import { coursesList } from "../../data/coursesList";
import { Button, CircularProgress } from "@mui/material";
import { liveStreamsList } from "../../data/livestreamsList";
import { Link, useNavigate } from "react-router-dom";
import useGetResources from "../../../apiCalls/useGetResources";
import useCreateResource from "../../../apiCalls/useCreateResource";
import { useAlert } from "../../../hooks/useAlert";
import TopAlert from "../../alerts/TopAlert";
export default function StartLiveStreamForm() {
  const [liveStreamsList, setLiveStreamsList] = useState([]);
  const [selectedLiveStream, setSelectedLiveStream] = useState();

  const navigate = useNavigate();
  const getLecturesQuery = useGetResources("lectures?role=instructor");
  const startLiveMutation = useCreateResource(
    `lectures/${selectedLiveStream?.id}/start-live`
  );
  console.log(selectedLiveStream);
  useEffect(() => {
    if (getLecturesQuery.data) {
      setLiveStreamsList(getLecturesQuery.data.data.data);
    }
  }, [getLecturesQuery.isSuccess]);
  const alertController = useAlert();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const labelBaseStyle = "mb-2 text-base block font-semibold";

  const handleStartLive = async () => {
    if (!selectedLiveStream) return;
    setIsSubmitting(true);
    try {
      const response = await startLiveMutation.mutateAsync();
      console.log(response);
      navigate(
        `/courses/${selectedLiveStream?.course[0].id}/live/${selectedLiveStream?.id}`
      );
    } catch (error) {
      console.log(error);
      alertController.alertErrorToggle(`خطأ في الإضافة!`);
    }
    setIsSubmitting(false);
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
      <form>
        {/* Select Live Stream Dropdown */}
        <SingleFormInputContainer extraStyles={"my-2"} error={null}>
          <div className="mb-3 flex items-center gap-1 ">
            <label className={`${labelBaseStyle}`}>
              اختر البث المباشر المحدد مسبقا
            </label>
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

        <p className="my-2">{`تم تحديد موعد البث في ${
          selectedLiveStream?.starts_at || "-"
        }`}</p>
        <p className="my-2">
          الرجاء بدء البث قبل الموعد المحدد بخمس دقائق على الأكثر
        </p>

        <Button
          type="submit"
          variant="contained"
          sx={{ borderRadius: "0px", fontSize: "1rem" }}
          fullWidth
          disableElevation
          disabled={isSubmitting}
          onClick={handleStartLive}
        >
          {isSubmitting ? "جاري الانتقال..." : "الانتقال إلى صفحة البث المباشر"}
        </Button>
      </form>
    </>
  );
}
