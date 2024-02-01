import { Button } from "@mui/material";
import SelectDropdown from "../menus/SelectDropdown";
import { streamsList } from "../data/streamsList";
import {citiesList} from "../data/citiesList";
import { useState } from "react";
export default function Settings() {
  const [currentStream, setCurrentStream] = useState();
  const [currentCity,setCurrentCity] = useState();
  const [currentGender,setCurrentGender] = useState();
  const user = {
    photoUrl:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    firstName: "يعقوب",
    lantName: "قمر الدين",
    userName: "يعقوب قمر الدين",
    email: "imam.droubi@gmail.com",
    stream: "العلمي",
  };
  const inputBaseStyle =
    "border-[2px] border-gray-100 p-2 w-full focus:border-primary-500 outline-none duration-200";
  const errorBaseStyle = "error text-error-500 text-sm mt-[3px]";
  return (
    <section className="mb-4">
      <h2 className="mb-3 text-lg text-gray-900 font-semibold">
        إعدادات الحساب
      </h2>
      <div className="top-container flex flex-col items-center xl:items-start xl:flex-row gap-4">
        <div className="right w-fit xl:w-1/4 p-3 h-fit border-[1px] border-gray-100">
          <div className="preview max-w-[15rem] max-h-[15rem]">
            <img
              className="object-cover "
              src={user.photoUrl}
              alt={user.userName}
            />
          </div>
          <p className="instructions text-gray-600 text-center text-sm mt-1">
            حجم الصورة لا يجب أن يتجاوز 1 ميجابايت
          </p>
        </div>
        <div className="left w-full xl:w-3/4">
          <form className="text-gray-900 text-sm" action="">
            <div className="form-input mb-3">
              <label className="mb-2 text-base block font-semibold" htmlFor="">
                الاسم الكامل
              </label>
              <div className="actual-input flex gap-2">
                <div className="f-name w-1/2 ">
                  <input
                    className={`${inputBaseStyle}`}
                    type="text"
                    placeholder="الاسم الأول"
                    name=""
                    id=""
                  />
                  {/* <div className={`${errorBaseStyle}`}>يجب أن يحتوي الاسم على خمسة وعشرين حرف</div  > */}
                </div>
                <div className="l-name w-1/2 ">
                  <input
                    className={`${inputBaseStyle}`}
                    type="text"
                    placeholder="الاسم الأخير"
                    name=""
                    id=""
                  />
                  {/* <div className={`${errorBaseStyle}`}>يجب أن يحتوي الاسم على خمسة وعشرين حرف</div  > */}
                </div>
              </div>
            </div>
            <div className="form-container flex gap-2">
              <div className="form-input mb-3 w-1/2">
                <label
                  className="mb-2 text-base block font-semibold"
                  htmlFor=""
                >
                  اسم الحساب
                </label>
                <div className="actual-input">
                  <input
                    className={`${inputBaseStyle}`}
                    type="text"
                    placeholder="اسم الحساب"
                    name=""
                    id=""
                  />
                  {/* <div className={`${errorBaseStyle}`}>يجب أن يحتوي الاسم على خمسة وعشرين حرف</div  > */}
                </div>
              </div>
              <div className="form-input mb-3 w-1/2">
                <label
                  className="mb-2 text-base block font-semibold"
                  htmlFor=""
                >
                  رقم الجوال
                </label>
                <div className="actual-input">
                  <input
                    className={`${inputBaseStyle}`}
                    type="tel"
                    placeholder="05XX-XXX-XXX"
                    name=""
                    id=""
                  />
                  {/* <div className={`${errorBaseStyle}`}>يجب أن يحتوي الاسم على خمسة وعشرين حرف</div  > */}
                </div>
              </div>
            </div>
            <div className="form-input mb-3">
              <label className="mb-2 text-base block font-semibold" htmlFor="">
                البريد الإلكتروني
              </label>
              <div className="actual-input">
                <input
                  className={`${inputBaseStyle}`}
                  type="email"
                  placeholder="example@example.com"
                  name=""
                  id=""
                />
                {/* <div className={`${errorBaseStyle}`}>يجب أن يحتوي الاسم على خمسة وعشرين حرف</div  > */}
              </div>
            </div>
            <div className="form-container flex justify-between">
              <div className="form-input mb-3 flex items-center">
                <label
                  className="mb-2 text-base block font-semibold"
                  htmlFor=""
                >
                  الفرع
                </label>
                <SelectDropdown
                  title="الفرع"
                  list={streamsList}
                  stateChanger={setCurrentStream}
                />
              </div>
              <div className="form-input mb-3 flex items-center">
                <label
                  className="mb-2 text-base block font-semibold"
                  htmlFor=""
                >
                  المحافظة
                </label>
                <SelectDropdown
                  title="المحافظة"
                  list={citiesList}
                  stateChanger={setCurrentCity}
                />
              </div>
              <div className="form-input mb-3 flex items-center">
                <label
                  className="mb-2 text-base block font-semibold"
                  htmlFor=""
                >
                  الجنس
                </label>
                <SelectDropdown
                  title="الجنس"
                  list={["ذكر", "أنثى"]}
                  stateChanger={setCurrentGender}
                />
              </div>
            </div>
            <Button variant="contained" fullWidth disableElevation>
              حفظ التغييرات
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
