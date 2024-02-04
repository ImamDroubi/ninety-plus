import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faEllipsis,
  faPaperPlane,
  faStar,
  faHeart as solidHeart,
  faTrash,
  faCircleCheck,
  faArrowUpFromBracket
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";


export function ThreeDotsIcon(props) {
  return <FontAwesomeIcon {...props} icon={faEllipsis} />;
}
export function MagnifyingGlassIcon(props) {
  return <FontAwesomeIcon {...props} icon={faMagnifyingGlass} />;
}
export function SendIcon(props) {
  return <FontAwesomeIcon {...props} icon={faPaperPlane} />;
}

export function StarIcon(props) {
  return <FontAwesomeIcon {...props} icon={faStar} />;
}
export function FilledHeartIcon(props) {
  return <FontAwesomeIcon {...props} icon={solidHeart} />;
}
export function EmptyHeartIcon(props) {
  return <FontAwesomeIcon {...props} icon={faHeart} />;
}
export function TrashIcon(props) {
  return <FontAwesomeIcon {...props} icon={faTrash} />;
}
export function CircleCheckIcon(props) {
  return <FontAwesomeIcon {...props} icon={faCircleCheck} />;
}
export function UploadArrowIcon(props) {
  return <FontAwesomeIcon {...props} icon={faArrowUpFromBracket} />
}


