import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faEllipsis,
  faPaperPlane,
  faStar,
  faHeart as solidHeart,
  faTrash,
  faCircleCheck,
  faArrowUpFromBracket,
  faEye,
  faBook,
  faChalkboardUser,
  faMoneyCheckDollar,
  faEnvelope,
  faGear,
  faBars,
  faChartLine,
  faCirclePlus,
  faRightFromBracket,
  faBell,
  faPencil,
  faPlus,
  faChevronDown,
  faLayerGroup,
  faCrown,
  faCreditCard,
  faWallet,
  faCircleXmark,
  faXmark,
  faCloudArrowUp,
  faVideo,
  faTriangleExclamation,
  faComment,
  faCircleDot,
  faPersonChalkboard,
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
  return <FontAwesomeIcon {...props} icon={faArrowUpFromBracket} />;
}

// student page icons
export function EyeIcon(props) {
  return <FontAwesomeIcon {...props} icon={faEye} />;
}
export function BookIcon(props) {
  return <FontAwesomeIcon {...props} icon={faBook} />;
}
export function TeacherIcon(props) {
  return <FontAwesomeIcon {...props} icon={faChalkboardUser} />;
}
export function MoneyIcon(props) {
  return <FontAwesomeIcon {...props} icon={faMoneyCheckDollar} />;
}
export function MessageIcon(props) {
  return <FontAwesomeIcon {...props} icon={faEnvelope} />;
}
export function SettingsIcon(props) {
  return <FontAwesomeIcon {...props} icon={faGear} />;
}

export function HumburgerIcon(props) {
  return <FontAwesomeIcon {...props} icon={faBars} />;
}
// teacher page icons

export function DashboardIcon(props) {
  return <FontAwesomeIcon {...props} icon={faChartLine} />;
}

export function AddIcon(props) {
  return <FontAwesomeIcon {...props} icon={faCirclePlus} />;
}

export function LogoutIcon(props) {
  return <FontAwesomeIcon {...props} icon={faRightFromBracket} />;
}

export function BellIcon(props) {
  return <FontAwesomeIcon {...props} icon={faBell} />;
}

export function EditIcon(props) {
  return <FontAwesomeIcon {...props} icon={faPencil} />;
}

export function PlusIcon(props) {
  return <FontAwesomeIcon {...props} icon={faPlus} />;
}

export function ArrowDownIcon(props) {
  return <FontAwesomeIcon {...props} icon={faChevronDown} />;
}
export function StackIcon(props) {
  return <FontAwesomeIcon {...props} icon={faLayerGroup} />;
}
export function WalletIcon(props) {
  return <FontAwesomeIcon {...props} icon={faWallet} />;
}
export function CreditCardIcon(props) {
  return <FontAwesomeIcon {...props} icon={faCreditCard} />;
}
export function CrownIcon(props) {
  return <FontAwesomeIcon {...props} icon={faCrown} />;
}
export function XMarkIcon(props) {
  return <FontAwesomeIcon {...props} icon={faCircleXmark} />;
}
export function CloseIcon(props) {
  return <FontAwesomeIcon {...props} icon={faXmark} />;
}
export function CloudIcon(props) {
  return <FontAwesomeIcon {...props} icon={faCloudArrowUp} />;
}
export function VideoIcon(props) {
  return <FontAwesomeIcon {...props} icon={faVideo} />;
}
export function WarningIcon(props) {
  return <FontAwesomeIcon {...props} icon={faTriangleExclamation} />;
}
export function ChatIcon(props) {
  return <FontAwesomeIcon {...props} icon={faComment} />;
}

export function LiveStreamIcon(props) {
  return <FontAwesomeIcon {...props} icon={faCircleDot} />;
}
export function LectureIcon(props) {
  return <FontAwesomeIcon {...props} icon={faPersonChalkboard} />;
}
