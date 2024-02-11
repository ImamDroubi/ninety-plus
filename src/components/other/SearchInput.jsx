import { useRef } from "react";
import { MagnifyingGlassIcon } from "../icons/icons";

export default function SearchInput({ stateChanger }) {
  const searchRef = useRef();

  return (
    <div className="relative w-full">
      <input
        ref={searchRef}
        onClick={(e) => stateChanger(e.target.value)}
        type="search"
        name="search"
        id="search"
        className="w-full duration-150 px-2 py-[7px] border-2 rounded-sm outline-none  peer border-gray-100 focus:border-2 focus:border-primary-500 sm:border-2 text-primary-700"
      />
      <MagnifyingGlassIcon
        onClick={() => searchRef.current.focus()}
        className="absolute left-[5px] top-[50%] -translate-y-1/2 cursor-pointer text-gray-900 peer-focus:hidden "
      />
    </div>
  );
}
