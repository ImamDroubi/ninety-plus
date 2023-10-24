import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket,faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"
import { useAuth } from '../../contexts/AuthContext'
export default function AuthDropdown() {
  const {logout} = useAuth();
  const links = [
    {
      'text' : 'الملف الشخصي',
      'destinaion' : '/',
      'icon' : <FontAwesomeIcon icon={faUser} />
    },
    {
      'text' : 'تسجيل الخروج',
      'destinaion' : '/',
      icon : <FontAwesomeIcon icon={faRightFromBracket} />
    },
  ]
  return (
    <ul className="absolute bg-gray-white border-primary-500 border-r-2  list-none min-w-[10rem] top-full left-1 z-10 animate-dropdown">
      {
      links.map((link,ind)=>{
        return <Link key={ind} onClick={ind === links.length -1? ()=>logout() : null} to={link.destinaion}><li className="flex w-40 gap-1 p-1 text-sm border-b-2 cursor-pointer text-primary-500 border-primary-100 hover:bg-primary-500 hover:text-gray-white sm:text-base">
          <div className="icon">{link.icon}</div>
          <p>{link.text}</p>
          </li></Link>
      })
      }
    </ul>
  )
}
