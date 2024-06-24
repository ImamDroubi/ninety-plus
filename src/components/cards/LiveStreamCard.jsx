import { useNavigate } from "react-router-dom";
import { LiveStreamIcon } from "../icons/icons";

export default function LiveStreamCard({ navigateURL = "#" }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(navigateURL);
  };
  return (
    <div
      onClick={handleClick}
      className="bg-primary-100 px-3 py-2 my-2 flex justify-between cursor-pointer hover:bg-primary-200"
    >
      <div className="right">
        <h4 className="text-md font-bold text-gray-900 my-1">
          بث مباشر يجري الآن...
        </h4>
        <p className="text-gray-900 text-sm">انتقل لمشاهدة البث</p>
      </div>
      <div className="left flex flex-col justify-center items-center">
        <LiveStreamIcon className="text-error-900 text-lg animate-ping" />
      </div>
    </div>
  );
}
