import Button from "../buttons/Button";
import Container90 from "../containers/Container90";
import Logo from "./Logo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import {useAuth} from "../../contexts/AuthContext";
import LoggedUser from "./LoggedUser";
import { useRef } from "react";
import { Link } from "react-router-dom";
export default function Header() {
  const {login, currentUser} = useAuth();
  const searchRef = useRef();
  return (
    <Container90>
      <header className="flex items-center justify-between px-1 py-2 border-b sm:px-0">
        <Logo/>
        <div className="flex items-center justify-end w-2/3">
          <div className="relative flex items-center justify-end ml-1 search">
            <input ref={searchRef} type="search" name="search" id="search" className="w-full duration-150 rounded-sm outline-none bg-gray-50 peer border-primary-100 focus:border-2 focus:border-primary-500 sm:border-2 text-primary-700" />
            <FontAwesomeIcon onClick={()=>searchRef.current.focus()} className="absolute pl-1 cursor-pointer text-primary-500 peer-focus:hidden " icon={faMagnifyingGlass} />
          </div>
          {
            !currentUser?
              <div className="flex gap-1">
              <Link to="/sign-up"><Button
              text="تسجيل"
              type="secondary"
              /></Link>
              <Link to="/sign-in">
              <Button
              text="دخول"
              // action={login}
              /></Link>
              </div>
            :
              <LoggedUser/>
          }
        </div>
      </header>
    </Container90>
  )
}
