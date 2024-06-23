import { useEffect, useState } from "react";
import SlidingTabs from "../menus/SlidingTabs";
import StudentCourses from "../studentPageComponents/StudentCourses";
import StudentFavourite from "../studentPageComponents/StudentFavourite";
import StudentMessages from "../studentPageComponents/StudentMessages";
import StudentOverview from "../studentPageComponents/StudentOverview";
import StudentPurchaseHistory from "../studentPageComponents/StudentPurchaseHistory";
import StudentSettings from "../studentPageComponents/StudentSettings";
import StudentTeachers from "../studentPageComponents/StudentTeachers";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  BookIcon,
  EyeIcon,
  FilledHeartIcon,
  MessageIcon,
  MoneyIcon,
  SettingsIcon,
  TeacherIcon,
} from "../icons/icons";
import { useAuth } from "../../contexts/AuthContext";
import HamburgerMenuOpenner from "../other/HamburgerMenuOpenner";
import MenuDrawer from "../menus/MenuDrawer";
import { useProfileInfo } from "../../hooks/useProfileInfo";
import { CircularProgress } from "@mui/material";
import { UserProfileProvider } from "../../contexts/UserProfileContext";
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
  // {
  //   text: "الأساتذة",
  //   icon: <TeacherIcon />,
  //   url: "?tab=teachers",
  // },
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
  // "teachers",
  "messages",
  "favourite",
  "purchases",
  "settings",
];
export default function StudentPage() {
  const { user } = useProfileInfo();
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
  const { currentUser } = useAuth();
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

  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      if (currentUser.roles.indexOf("student") == -1) {
        navigate("/");
      }
    }
  }, [currentUser]);
  if (!currentUser) return <CircularProgress />;
  return (
    <div className="relative lg:pt-[7rem]">
      <div className="background absolute hidden -z-10 w-full top-[0rem] h-[15rem] bg-primary-100  lg:block"></div>
      <div className="w-full m-auto content bg-gray-white shadow-lg mb-6 lg:w-3/4">
        <header className="flex justify-start p-5">
          <div className="flex items-center gap-3 personal">
            <div className="picture w-[7rem] h-[7rem] object-fill rounded-full">
              <img
                src={currentUser.profile_image}
                alt=""
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="flex flex-col gap-2 info">
              <h1 className="font-extrabold">{`${currentUser.first_name} ${currentUser.last_name}`}</h1>
              <p className="text-sm text-gray-600">
                {currentUser.branch || "علمي"}
              </p>
            </div>
          </div>
        </header>
        <UserProfileProvider>
          <section className="mobile block md:hidden">
            <SlidingTabs
              handleTabChange={handleTabChange}
              currentIndex={currentIndex}
              showTabes={false}
            >
              <StudentOverview label="نظرة عامة" />
              <StudentCourses label="الدورات" />
              {/* <StudentTeachers label="الأساتذة" /> */}
              <StudentMessages label="الرسائل" />
              <StudentFavourite label="المفضلة" />
              <StudentPurchaseHistory label="عمليات الشراء" />
              <StudentSettings label="الإعدادات" />
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
              <StudentOverview label="نظرة عامة" />
              <StudentCourses label="الدورات" />
              {/* <StudentTeachers label="الأساتذة" /> */}
              <StudentMessages label="الرسائل" />
              <StudentFavourite label="المفضلة" />
              <StudentPurchaseHistory label="عمليات الشراء" />
              <StudentSettings label="الإعدادات" />
            </SlidingTabs>
          </section>
        </UserProfileProvider>
      </div>
    </div>
  );
}
