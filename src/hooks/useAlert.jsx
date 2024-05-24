import { useState } from "react";

export const useAlert = () => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorAlertMessage, setErrorAlertMessage] = useState("حدث خطأ ما!");
  const [successAlertMessage, setSuccessAlertMessage] =
    useState("تمت العملية بنجاح!");

  const alertSuccessToggle = (message) => {
    setSuccessAlertMessage(message);
    setShowSuccessAlert(true);
    setTimeout(() => {
      setSuccessAlertMessage("تمت العملية بنجاح!");
      setShowSuccessAlert(false);
    }, 5000);
  };

  const alertErrorToggle = (message) => {
    setErrorAlertMessage(message);
    setShowErrorAlert(true);
    setTimeout(() => {
      setShowErrorAlert(false);
      setErrorAlertMessage("حدث خطأ ما!");
    }, 5000);
  };

  return {
    alertSuccessToggle,
    alertErrorToggle,
    showSuccessAlert,
    showErrorAlert,
    errorAlertMessage,
    successAlertMessage,
  };
};
