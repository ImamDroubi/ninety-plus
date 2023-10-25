import Button from "../buttons/Button";
export default function FooterInfo() {
  return (
    <div className="w-full py-6 font-semibold bg-gray-900 border-b-2 border-gray-200 info text-gray-white">
      <div className="flex flex-col items-center w-11/12 gap-3 m-auto lg:flex-row lg:justify-between">
        <div className="right-sec  flex flex-col items-center gap-6 border-b-2 border-gray-300 pb-6 lg:items-start lg:border-0 lg:pb-[0]">
          <h2 className="w-2/3 text-3xl text-center lg:text-right lg:text-4xl">
            ابدأ التعلم مع أكثر من <span>2500 </span>
            طالب من مختلف أنحاء الوطن
          </h2>
          <div className="flex flex-col gap-4 buttons lg:flex-row">
            <Button
            text="انضم لعائلتنا"
            ></Button>
            <button className="bg-[rgba(255,255,255,0.05)] px-2 py-1 text-xs text-gray-white hover:bg-primary-600 disabled:bg-primary-200 sm:font-semibold sm:px-3 sm:py-1 sm:text-base">تصفح جميع الدورات</button>
          </div>
        </div>
        <div className="flex flex-col items-center w-full left-sec lg:flex-row lg:w-1/2 lg:justify-between">
          <div className="data-sec flex flex-col gap-1 items-center text-center w-1/2 border-b-2 py-6 border-[rgba(183,186,199,0.2)]  lg:border-0">
            <h2 className="text-6xl">65</h2>
            <p className="text-gray-300">دورة تعليمية</p>
          </div>
          <div className="data-sec flex flex-col gap-1 items-center text-center w-1/2 border-b-2 py-6 border-[rgba(183,186,199,0.2)] lg:border-0">
            <h2 className="text-6xl">25</h2>
            <p className="text-gray-300">معلماً مؤهلاً</p>
          </div>
          <div className="flex flex-col items-center w-1/2 gap-1 py-6 text-center data-sec lg:border-0">
            <h2 className="text-6xl">98%</h2>
            <p className="text-gray-300">نسبة النجاح</p>
          </div>
        </div>
      </div>
    </div>
  )
}
