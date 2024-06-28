import logo from "../../assets/images/aboutimage.png"; 

const AboutUs = () => {
  return (
    <>
      <div className="flex flex-wrap">
        <img src={logo} alt="aboutlogo" className="w-[900px] " />
        <div className="text-lg">
          <h1 className="text-8xl mt-[80px] text-primary-500">من نحن</h1>

          <div className="mt-6">
            <p className="text-lg">
              نحن فريق عمل{" "}
              <strong className="text-primary-500">Ninety Plus</strong>, مجموعة
              من طلاب هندسة أنظمة الحاسوب من جامعة فلسطين التقنية خضوري.
            </p>
            <p className="text-lg">
              قمنا ببناء هذا الموقع لاستكمال اجرائات شهادة البكالوريوس
            </p>
            <p>
              تم بناء هذا الموقع بواجهات ملائمة للطالب والمعلم بحيث يستطيع
              الطالب الوصول بسهولة للكورسات المسجلة بالموقع <br /> والمعلم
              بانشاء كورس للطلاب بشكل سهل.
            </p>
            <p>
              يتوفر الموقع على العديد من المميزات كالحصص التفاعلية داخل الموقع
              والمحادثات بين الطلاب والمعلمين.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;

{
  /*  <img
          src={logo}
          alt="Logo"
          className="w-[300px] h-[300px] opacity-[0.4] "
        />
         */
}
