import { Link } from "react-router-dom";

export default function FooterMenu({list}) {
  return (
    <div className="flex flex-col items-center pb-6 text-center border-b-2 border-gray-200 footer-menu last:border-none lg:border-none lg:items-start lg:text-right">
      <h4 className="py-3 text-3xl title">{list.title}</h4>
      <ul>
        {list.links.map((link,ind)=>{
          return <Link key={ind} to={link.dest}><li className="my-1 text-gray-500 duration-500 hover:text-gray-white hover:border-b-2 hover:border-primary-500">{link.name}</li></Link>
        })}
      </ul>
    </div>
  )
}
