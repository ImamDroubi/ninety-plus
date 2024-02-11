import CourseCard from "../cards/CourseCard";
import TopBar from "../menus/TopBar";
import Hero from "../other/Hero";
import TeacherCard from "../cards/TeacherCard";
import FooterInfo from "../other/FooterInfo";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CourseCard />
      <TeacherCard />
      <FooterInfo />
    </>
  );
}
