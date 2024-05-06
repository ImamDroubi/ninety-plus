import { Button, CircularProgress } from "@mui/material";
import { CircleCheckIcon, XMarkIcon } from "../../icons/icons";
import { useCreateCourseContext } from "../../../contexts/CreateCourseContext";

export default function CreateCourseFormResult({ handleReset }) {
  const { isSubmitting, responseErrors, setResponseErrors } =
    useCreateCourseContext();

  return (
    <div className="w-full flex flex-col mt-5 content-center items-center">
      {isSubmitting && <ProgressVariant />}
      {responseErrors && <FailureVariant handleReset={handleReset} setResponseErrors={setResponseErrors} />}
      {!isSubmitting && !responseErrors && <SuccessVariant />}
    </div>
  );
}

function SuccessVariant() {
  return (
    <>
      <p>تم إنشاء الدورة بنجاح</p>
      <div className="text-5xl my-3 text-success-700">
        <CircleCheckIcon />
      </div>
      <Button variant="contained" disableElevation sx={{ borderRadius: "0px" }}>
        الانتقال إلى صفحة الدورة
      </Button>
    </>
  );
}
function FailureVariant({ handleReset , setResponseErrors}) {
  const handleGoBack = () => {
    setResponseErrors(null);
    handleReset();
  };

  return (
    <>
      <p>فشل إنشاء الدورة، يرجى المحاولة مرة أخرى</p>
      <div className="text-5xl my-3 text-error-700">
        <XMarkIcon />
      </div>
      <Button
        onClick={handleGoBack}
        variant="contained"
        disableElevation
        sx={{ borderRadius: "0px" }}
      >
        تعديل البيانات
      </Button>
    </>
  );
}
function ProgressVariant() {
  return (
    <>
      <p>جاري إنشاء الدورة</p>
      <div className="text-5xl my-3 text-primary-700">
        <CircularProgress />
      </div>
      {/* <Button variant="contained" disableElevation sx={{borderRadius : "0px"}}>تعديل البيانات</Button> */}
    </>
  );
}
