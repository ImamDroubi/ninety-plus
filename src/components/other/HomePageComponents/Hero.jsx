import bookStack from "../../../assets/images/book-stack.jpg";
import bookStackCropped from "../../../assets/images/book-stack-cropped.png";
import Button from "../../buttons/Button";
import Container90 from "../../containers/Container90";
export default function Hero() {
  return (
    <div className="w-full flex items-center md:bg-gray-100  justify-center flex-col relative min-h-[20rem] text-center md:text-right md:justify-center md:items-start md:pr-[5%] md:min-h-[30rem]">
      <h1 className="z-10 py-2 text-4xl font-bold leading-snug text-gray-white md:text-gray-900 md:text-5xl md:w-1/2 md:leading-snug">
        طريقك نحو النجاح يبدأ من هنا
      </h1>
      <p className="z-10 my-3 text-lg text-gray-200 md:text-gray-700 md:text-2xl">
        تابع دروسك وتفاعل مع المعلمين من البيت
      </p>
      <div className="z-10">
        <Button text="انضم الآن" />
      </div>
      <div className="w-full h-full bg-[rgba(0,0,0,0.5)] absolute -z-10 md:hidden"></div>
      <div className="w-full object- h-full absolute -z-20 md:w-auto md:left-[0] md:z-0">
        <img
          src={bookStack}
          alt="book stack"
          className="w-full h-full md:hidden"
        />
        <img
          src={bookStackCropped}
          alt="book stack"
          className="hidden w-full h-full md:block"
        />
      </div>
    </div>
  );
}
