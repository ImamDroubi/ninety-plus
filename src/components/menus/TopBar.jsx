import { Link, NavLink } from "react-router-dom"
import Container90 from "../containers/Container90"

export default function TopBar() {
  const links = [
    {
      "text" : "الرئيسية",
      "destination" : "/"
    },
    {
      "text" : "الدورات",
      "destination" : "/courses"
    },
    {
      "text" : "من نحن",
      "destination" : "/about"
    },
    {
      "text" : "تواصل معنا",
      "destination" : "/contact"
    }
  ]
  return (
    <div className="w-full bg-gray-900 text-gray-white">
      <Container90>
        <ul className="flex ">
          {
            links.map((link,ind)=>{
              return <NavLink className={({isActive})=>isActive?'border-t-2 border-primary-500':undefined} to={link.destination}><li key={ind} className="px-1 py-1 text-xs text-center hover:bg-gray-700 sm:text-base" >{link.text}</li></NavLink>
            })
          }
        </ul>
        
      </Container90>
    </div>
  )
}
