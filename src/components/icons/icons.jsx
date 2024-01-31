import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faEllipsis,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

export function ThreeDots(props) {
  return <FontAwesomeIcon {...props} icon={faEllipsis} />;
}
export function MagnifyingGlass(props) {
  return <FontAwesomeIcon {...props} icon={faMagnifyingGlass} />;
}
export function SendIcon(props) {
  return <FontAwesomeIcon {...props} icon={faPaperPlane} />;
}
