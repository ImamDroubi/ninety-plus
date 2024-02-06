import { HumburgerIcon } from "../icons/icons";
export default function HamburgerMenuOpenner() {
  return (
    <div className="fixed flex items-center p-3 justify-center right-[0] top-[50%] z-20 text-gray-white  rounded-l-xl bg-primary-500">
      <HumburgerIcon />
    </div>
  );
}
