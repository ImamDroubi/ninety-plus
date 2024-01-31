import Course from "../cards/Course";
import TopBar from "../menus/TopBar";
import MathBook from "../../assets/images/book-covers/math-scientific.jpg";
import Hero from "../other/Hero";
import Teacher from "../cards/Teacher";
import FooterInfo from "../other/FooterInfo";

export default function Home() {
  return (
    <>
      <Hero />
      <Course
        title={"رياضيات توجيهي علمي وصناعي للأستاذ محمد حرزالله"}
        category={"علمي"}
        price={400}
        preview={MathBook}
        stars={4.5}
        studentsNo={120}
      ></Course>
      <Teacher
        name={"محمد حرزالله"}
        major={"رياضيات"}
        preview={
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        stars={4.1}
        studentsNo={1324}
      ></Teacher>
      <FooterInfo />
    </>
  );
}
