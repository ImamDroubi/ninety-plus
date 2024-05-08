import { CloseIcon } from "../icons/icons";

export default function ClosePopupButton({ setOpen }) {

  return (
    <button
      onClick={() => setOpen(false)}
      className="absolute top-1 right-1  text-primary-500 flex items-center  justify-center text-2xl hover:text-gray-900"
    >
      <CloseIcon/>
    </button>
  );
}
