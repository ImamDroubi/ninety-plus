import { useEffect, useState } from "react";
import SlidingTabs from "../menus/SlidingTabs";
import Courses from "../studentPageComponents/Courses";
import Favourite from "../studentPageComponents/Favourite";
import Messages from "../studentPageComponents/Messages";
import Overview from "../studentPageComponents/Overview";
import PurchaseHistory from "../studentPageComponents/PurchaseHistory";
import Settings from "../studentPageComponents/Settings";
import Teachers from "../studentPageComponents/Teachers";
import { useSearchParams } from "react-router-dom";
import {
  BookIcon,
  EyeIcon,
  FilledHeartIcon,
  MessageIcon,
  MoneyIcon,
  SettingsIcon,
  TeacherIcon,
} from "../icons/icons";
import HamburgerMenuOpenner from "../other/HamburgerMenuOpenner";
import MenuDrawer from "../menus/MenuDrawer";
const listItems = [
  {
    text: "نظرة عامة",
    icon: <EyeIcon />,
    url: "?tab=overview",
  },
  {
    text: "الدورات",
    icon: <BookIcon />,
    url: "?tab=courses",
  },
  {
    text: "الأساتذة",
    icon: <TeacherIcon />,
    url: "?tab=teachers",
  },
  {
    text: "الرسائل",
    icon: <MessageIcon />,
    url: "?tab=messages",
  },
  {
    text: "المفضلة",
    icon: <FilledHeartIcon />,
    url: "?tab=favourite",
  },
  {
    text: "عمليات الشراء",
    icon: <MoneyIcon />,
    url: "?tab=purchases",
  },
  {
    text: "الإعدادات",
    icon: <SettingsIcon />,
    url: "?tab=settings",
  },
];
const pagesList = [
  "overview",
  "courses",
  "teachers",
  "messages",
  "favourite",
  "purchases",
  "settings",
];
export default function StudentPage() {
  const studentInfo = {
    id: 1,
    name: "يعقوب قمر الدين",
    profilePicture:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stream: "علمي",
    enrolledCourses: 4,
    activeCourses: 1,
    completedCourses: 3,
    coursesInstructors: 3,
  };
  // ============ This is to put the current page in the parameters  =======================
  const [searchParams, setSearchParams] = useSearchParams();
  const handleTabChange = (index) => {
    setSearchParams({ tab: pagesList[index] });
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    let tab = searchParams.get("tab");
    let index = pagesList.indexOf(tab);
    if (index == -1) index = 0;
    setCurrentIndex(index);
    window.scrollTo(0, 0);
  }, [searchParams]);
  // ==========================================================================================

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleOpenSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="relative lg:pt-[7rem]">
      <div className="background absolute hidden -z-10 w-full top-[0rem] h-[15rem] bg-primary-100  lg:block"></div>
      <div className="w-full m-auto content bg-gray-white shadow-lg mb-6 lg:w-3/4">
        <header className="flex justify-start p-5">
          <div className="flex items-center gap-3 personal">
            <div className="picture w-[7rem] aspect-square object-cover rounded-full">
              <img
                src={studentInfo.profilePicture}
                alt=""
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="flex flex-col gap-2 info">
              <h1 className="font-extrabold">{studentInfo.name}</h1>
              <p className="text-sm text-gray-600">{studentInfo.stream}</p>
            </div>
          </div>
        </header>
        <section className="mobile block md:hidden">
          <SlidingTabs
            handleTabChange={handleTabChange}
            currentIndex={currentIndex}
            showTabes={false}
          >
            <Overview student={studentInfo} label="نظرة عامة" />
            <Courses label="الدورات" />
            <Teachers label="الأساتذة" />
            <Messages label="الرسائل" />
            <Favourite label="المفضلة" />
            <PurchaseHistory label="عمليات الشراء" />
            <Settings label="الإعدادات" />
          </SlidingTabs>
          <MenuDrawer
            listItems={listItems}
            side="right"
            onClickFunction={toggleOpenSidebar}
          >
            {!sidebarOpen && <HamburgerMenuOpenner />}
          </MenuDrawer>
        </section>
        <section className="desktop hidden md:block">
          <SlidingTabs
            handleTabChange={handleTabChange}
            currentIndex={currentIndex}
            showTabs={true}
          >
            <Overview student={studentInfo} label="نظرة عامة" />
            <Courses label="الدورات" />
            <Teachers label="الأساتذة" />
            <Messages label="الرسائل" />
            <Favourite label="المفضلة" />
            <PurchaseHistory label="عمليات الشراء" />
            <Settings label="الإعدادات" />
          </SlidingTabs>
        </section>
      </div>
    </div>
  );
}
