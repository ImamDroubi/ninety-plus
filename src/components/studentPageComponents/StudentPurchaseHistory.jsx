import { Button } from "@mui/material";
import { CircleCheckIcon, StarIcon, TrashIcon } from "../icons/icons";
import { useAuth } from "../../contexts/AuthContext";
import useGetResources from "../../apiCalls/useGetResources";
import { useEffect, useState } from "react";
export default function StudentPurchaseHistory() {
  const { currentUser } = useAuth();
  const invoicesQuery = useGetResources(
    `users/${currentUser?.user_id}/invoices`
  );
  const [invoices, setInvoices] = useState([]);
  useEffect(() => {
    if (invoicesQuery.data) {
      setInvoices(invoicesQuery.data.data.data);
      console.log(invoicesQuery.data.data.data);
    }
  }, [invoicesQuery.isSuccess]);
  return (
    <section className="mb-4">
      <h2 className="mb-3 text-lg text-gray-900 font-semibold">
        عمليات الشراء <span>({invoices.length})</span>
      </h2>

      <div className="favourite-list ">
        <div className="header hidden md:flex text-gray-700 border-[1px] border-gray-100 font-bold text-sm  p-2">
          <p className="w-7/12">الدورات</p>
          <p className="w-2/12">السعر</p>
          <p className="w-3/12">التاريخ</p>
        </div>
        <div className="body border-x-[1px] border-gray-100 p-2 border-b-[1px] md:h-[32rem] overflow-auto">
          {invoices.map((invoice) => {
            return (
              <CourseCardInPurchaseHistory key={invoice.id} invoice={invoice} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function CourseCardInPurchaseHistory({ invoice }) {
  const course = {
    photoUrl:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: " دورة شاملة في مادة الرياضيات للتوجيهي العلمي",
    instructor: "أ.محمد حرزالله",
    rating: 4.6,
    reviewsCount: 250,
    price: 200,
  };
  return (
    <div className="card flex-col md:flex-row items-center flex border-b-[1px] border-gray-100 gap-4 md:gap-[0] py-3">
      <div className="course w-full md:w-7/12 flex flex-col md:flex-row gap-2 cursor-pointer group/card">
        <div className="preview w-full h-[10rem] md:w-[12rem] md:h-[8rem] relative">
          <div className="absolute hidden w-full h-full overlay bg-gray-white opacity-30 group-hover/card:block"></div>
          <img
            className="w-full h-full object-cover"
            src={invoice.invoiceable[0].cover_image}
            alt={invoice.invoiceable[0].name}
          />
          {console.log(invoice.invoiceable[0].cover_image)}
        </div>
        <div className="info flex flex-col justify-between">
          <p className="text-gray-500 flex items-center">
            <StarIcon className="text-warning-500 ml-[5px]" />{" "}
            <span className="text-gray-900 ml-[2px]">
              {invoice.invoiceable[0].rate}
            </span>
          </p>
          <h2 className="text-gray-900 font-semibold text-lg mt-1 mb-2 h-1/2 group-hover/card:underline">
            {invoice.invoiceable[0].name}
          </h2>
        </div>
      </div>
      <div className="price w-full md:w-2/12 flex flex-col md:flex-row items-center">
        <p className="text-primary-500 text-2xl md:text-lg">
          {invoice.amount}$
        </p>
      </div>
      <div className="date w-full md:w-3/12 flex flex-col md:flex-row text-center md:text-right items-center gap-2">
        <p>
          تم الشراء بتاريخ : <br />
          <span>{invoice.paid_date}</span>
          <CircleCheckIcon className={"text-success-500"} />
        </p>
      </div>
    </div>
  );
}
