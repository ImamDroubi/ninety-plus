import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../buttons/Button";
import AuthDropdown from "../menus/AuthDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faBell } from "@fortawesome/free-solid-svg-icons";
import AccountAvatarMenu from "../menus/AccountAvatarMenu";

export default function LoggedUser() {
  const { currentUser, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {}, [currentUser]);
  return (
    <>
      {/* <div className="relative flex">
        <div className="flex items-center gap-1 mx-1 text-lg icons text-primary-500">
          <FontAwesomeIcon
            className="duration-200 cursor-pointer hover:text-primary-600"
            icon={faEnvelope}
          />
          <FontAwesomeIcon
            className="duration-200 cursor-pointer hover:text-primary-600"
            icon={faBell}
          />
        </div>
        <div className="object-cover w-6 h-6 rounded-full">
          <img
            onClick={() => setShowMenu(!showMenu)}
            src={currentUser?.photo}
            alt={currentUser?.username}
            className="w-full h-full rounded-full cursor-pointer"
          />
        </div>
        {showMenu&&<AuthDropdown/>}
      </div> */}
      <AccountAvatarMenu />
    </>
  );
}
