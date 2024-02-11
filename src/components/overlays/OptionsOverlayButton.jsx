import { ThreeDotsIcon } from "../icons/icons";
import DropdownMenu from "../menus/DropdownMenu";

export default function OptionsOverlayButton() {
  return (
    <div className="absolute text-gray-white flex items-center justify-center hover:text-gray-900 w-[30px] h-[30px] text-xl cursor-pointer hover:bg-primary-200 p-[5px] rounded-full z-10 ">
      <DropdownMenu
        // make this list come from the parent props 
        list={[
          { text: "عرض الدورة" },
          { text: "تعديل الدورة" },
          { text: "حذف الدورة" },
        ]}
      >
        <ThreeDotsIcon />
      </DropdownMenu>
    </div>
  );
}
