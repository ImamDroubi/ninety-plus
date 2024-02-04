import { Link } from "react-router-dom";
import Button from "../buttons/Button";
import FooterMenu from "../menus/FooterMenu";
import Logo from "./Logo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF,faInstagram,faXTwitter,faYoutube } from '@fortawesome/free-brands-svg-icons'


export default function Footer() {
  const footerLists = [
    {
      "title" : "الفروع الأكثر رواجاً",
      "links" : [
        {
          "name" : "علمي",
          "dest" : "/"
        },
        {
          "name" : "أدبي",
          "dest" : "/"
        },
        {
          "name" : "صناعي",
          "dest" : "/"
        },
        {
          "name" : "نجاري",
          "dest" : "/"
        }
      ]
    },
    {
      "title" : "روابط مفيدة",
      "links" : [
        {
          "name" : "من نحن",
          "dest" : "/"
        },
        {
          "name" : "انضم للمعلمين",
          "dest" : "/"
        },
        {
          "name" : "تواصل معنا",
          "dest" : "/"
        },
        {
          "name" : "الدورات",
          "dest" : "/"
        }
      ]
    },
    {
      "title" : "الدعم الفني",
      "links" : [
        {
          "name" : "طلب المساعدة",
          "dest" : "/"
        },
        {
          "name" : "أسئلة شائعة",
          "dest" : "/"
        },
        {
          "name" : "الشروط والاستخدام",
          "dest" : "/"
        },
        {
          "name" : "سياسة الخصوصية",
          "dest" : "/"
        }
      ]
    },
  ]
  const socialList = [
    {
      "name" : "Facebook",
      "dest" : "/",
      "icon" : <FontAwesomeIcon icon={faFacebookF} />
    },
    {
      "name" : "Instagram",
      "dest" : "/",
      "icon" : <FontAwesomeIcon icon={faInstagram} />
    },
    {
      "name" : "Twitter",
      "dest" : "/",
      "icon" : <FontAwesomeIcon icon={faXTwitter} />
    },
    {
      "name" : "Youtube",
      "dest" : "/",
      "icon" : <FontAwesomeIcon icon={faYoutube} />
    },
  ]
  return (
    <div className="w-full py-6 bg-gray-900 footer text-gray-white ">
      <div className="container flex flex-col-reverse items-center justify-between w-11/12 m-auto lg:flex-row">
        <div className="flex flex-col gap-6 right-sec lg:flex-row lg:justify-between lg:w-2/3">
          {footerLists.map((list,ind)=>{
            return <FooterMenu list={list} key={ind}/>
          })}
        </div>
        <div className="left-sec flex flex-col items-center w-3/4 text-center gap-4 p-4 text-2xl border-b-2 border-gray-white mb-4 lg:w-1/4 lg:border-none lg:px-[0]">
          <Logo/>
            <p className="text-gray-500">منصة إلكترونية تعليمية للدروس المباشرة لطلبة التوجيهي</p>
          <div className="flex flex-row-reverse gap-3 social-links">
            {socialList.map((link,ind)=>{
              return <Link key={ind} title={link.name} to={link.dest}><div className="icon w-[3rem] h-[3rem] flex items-center justify-center bg-[rgba(255,255,255,0.05)] text-gray-white hover:bg-primary-500 hover:shadow-[0px_0px_15px_0px_rgba(255,102,54,0.2)]">{link.icon}</div></Link>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
