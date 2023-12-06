import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock,faAddressCard,faUser} from '@fortawesome/free-regular-svg-icons'
import { Button } from "@mui/material";

export default function BuyCourse() {
  const price = 14.00;
  const discount = 0.56;
  const original = discount?price/(1-discount):price;
  const specifications = [
    {
      "icon" : <FontAwesomeIcon className="text-gray-400" icon={faClock} />,
      "name" : "المدة",
      "value" : "الفصل الأول"
    },
    {
      "icon" : <FontAwesomeIcon className="text-gray-400" icon={faAddressCard} />,
      "name" : "الفرع",
      "value" : "العلمي والصناعي"
    },
    {
      "icon" : <FontAwesomeIcon className="text-gray-400" icon={faUser} />,
      "name" : "الطلاب المسجلون",
      "value" : "1322"
    },
    
  ]
  return (
    <div className="z-10 w-full p-5">
      <div className="flex items-center justify-between price">
        <p className="text-2xl">{price.toFixed(2)}$ {discount?<span className="text-xl text-gray-500 line-through">{original.toFixed(2)}</span>:null}</p>
        <p className="p-1 text-sm text-primary-500 bg-primary-100">{discount}% خصم</p>
      </div>
      <hr className="my-4" />
      <div className="specifications">
        {
          specifications.map(item=>{
            return(
              <div className="flex justify-between mb-4 text-base">
                <div className="flex items-center gap-1 text-gray-900">{item.icon} {item.name}</div>
                <p className="text-gray-600">{item.value}</p>
              </div>
            )
          })
        }
      </div>
      <hr className="my-4" />
      <button className="w-full py-2 mb-2 text-lg font-semibold duration-200 bg-primary-500 text-gray-white hover:bg-primary-600">
        اشتر الآن
      </button>
      <button className="w-full py-2 mb-2 text-lg font-semibold duration-200 bg-primary-100 text-primary-500 hover:bg-primary-200">
        أضف للسلة
      </button>
    </div>
  )
}
