import {
  AddIcon,
  BookIcon,
  DashboardIcon,
  LogoutIcon,
  MessageIcon,
  MoneyIcon,
  SettingsIcon,
} from "../icons/icons";
export const teacherPageList = [
  {
    text: "لوحة التحكم",
    icon: <DashboardIcon />,
    link: "dashboard",
  },
  {
    text: "إنشاء دورة جديدة",
    icon: <AddIcon />,
    link: "create-course",
  },
  {
    text: "دوراتي",
    icon: <BookIcon />,
    link: "courses",
  },
  {
    text: "الأرباح",
    icon: <MoneyIcon />,
    link: "earnings",
  },
  {
    text: "الرسائل",
    icon: <MessageIcon />,
    link: "messages",
  },
  {
    text: "الإعدادات",
    icon: <SettingsIcon />,
    link: "settings",
  },
  {
    text: "تسجيل الخروج",
    icon: <LogoutIcon />,
    link: "/logout",
  },
];
