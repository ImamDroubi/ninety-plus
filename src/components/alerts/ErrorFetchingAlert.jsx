import TopAlert from "./TopAlert";

export default function ErrorFetchingAlert({ message = "فشل التحميل!" }) {
  return <TopAlert message={message} type="error" />;
}
