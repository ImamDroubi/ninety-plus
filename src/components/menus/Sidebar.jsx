import { NavLink } from "react-router-dom";
import Logo from "../other/Logo";
export default function Sidebar({ list=[] }) {
  return (
    <>
      <div className="top-section p-2  flex items-center gap-2 border-b-[1px] border-gray-500">
        <Logo />
        <h2 className="text-lg text-gray-white font-bold">Ninety Plus</h2>
      </div>
      <ul>
        {list.map((item, key) => {
          return (
            <NavLink
              key={key}
              to={item.url}
              className={({ isActive }) =>
                isActive
                  ? "[&>*]:bg-primary-500 [&>*]:text-gray-white"
                  : undefined
              }
            >
              <li className="text-gray-500 text-md flex items-center gap-2 py-1 px-2 hover:bg-primary-500 hover:text-gray-white">
                {item.icon}
                {item.text}
              </li>
            </NavLink>
          );
        })}
      </ul>
    </>
  );
}
