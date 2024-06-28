import {
  AddIcon,
  BookIcon,
  DashboardIcon,
  LectureIcon,
  LogoutIcon,
  MessageIcon,
  MoneyIcon,
  SettingsIcon,
} from "../icons/icons";
export const teacherPageList = [
  {
    text: "لوحة التحكم",
    icon: <DashboardIcon />,
    url: "dashboard",
  },
  {
    text: "إضافة حصة جديدة",
    icon: <LectureIcon />,
    url: "create-lecture",
  },
  {
    text: "إنشاء دورة جديدة",
    icon: <AddIcon />,
    url: "create-course",
  },
  {
    text: "دوراتي",
    icon: <BookIcon />,
    url: "courses",
  },
  {
    text: "الأرباح",
    icon: <MoneyIcon />,
    url: "earnings",
  },
  // {
  //   text: "الرسائل",
  //   icon: <MessageIcon />,
  //   url: "messages",
  // },
  {
    text: "الإعدادات",
    icon: <SettingsIcon />,
    url: "settings",
  },
  // {
  //   text: "تسجيل الخروج",
  //   icon: <LogoutIcon />,
  //   url: "/logout",
  // },
];
