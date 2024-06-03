import Button from "../buttons/Button";
import Container90 from "../containers/Container90";
import Logo from "./Logo";

import { useAuth } from "../../contexts/AuthContext";
import LoggedUser from "./LoggedUser";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";
export default function Header() {
  const { login, currentUser } = useAuth();
  const [searchInput, setSearchInput] = useState();
  return (
    <Container90>
      <header className="flex items-center justify-between px-1 py-2 border-b sm:px-0">
        <Logo />
        <div className="flex items-center justify-end gap-1 w-2/3">
          <div className="flex items-center justify-end ml-1 search">
            <SearchInput stateChanger={setSearchInput} />
          </div>
          {!currentUser ? (
            <div className="flex gap-1">
              <Link to="/sign-up">
                <Button text="تسجيل" type="secondary" />
              </Link>
              <Link to="/sign-in">
                <Button text="دخول"/>
              </Link>
            </div>
          ) : (
            <LoggedUser />
          )}
        </div>
      </header>
    </Container90>
  );
}
