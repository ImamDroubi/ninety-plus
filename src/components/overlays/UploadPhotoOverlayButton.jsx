import { UploadArrowIcon } from "../icons/icons";

export default function UploadPhotoOverlayButton({ onClickFunction }) {
  return (
    <button
      onClick={onClickFunction}
      className="absolute bg-opacity-50 bg-gray-900 z-50 bottom-[0] text-gray-white w-full py-1 flex gap-2 justify-center items-center duration-100 text-sm  hover:bg-opacity-100"
    >
      تحميل صورة جديدة
      <UploadArrowIcon />
    </button>
  );
}
