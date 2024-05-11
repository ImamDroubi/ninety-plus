import CourseCard from "../cards/CourseCard";
import TopBar from "../menus/TopBar";
import Hero from "../other/HomePageComponents/Hero";
import TeacherCard from "../cards/TeacherCard";
import FooterInfo from "../other/FooterInfo";
import TopSellingCourses from "../other/HomePageComponents/TopSellingCourses";
import MostRecentCourses from "../other/HomePageComponents/MostRecentCourses";
import TopCategories from "../other/HomePageComponents/TopCategories";
import TopInstructors from "../other/HomePageComponents/TopInstructors";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TopSellingCourses />
      <TopCategories />
      <MostRecentCourses />
      <TopInstructors />
      <FooterInfo />
    </>
  );
}
