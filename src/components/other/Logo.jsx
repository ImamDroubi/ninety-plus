import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logo.svg";
export default function Logo() {
  return (
    <Link to={"/"} className="flex items-center">
      {/* <FontAwesomeIcon
        className="text-5xl text-primary-500"
        icon={faGraduationCap}
      /> */}
      <img src={logo} className="w-[5rem]" alt="" />
      {/* <h1 className="text-xl font-black text-primary-500">90+</h1> */}
    </Link>
  );
}
