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
    url: "dashboard",
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
  {
    text: "الرسائل",
    icon: <MessageIcon />,
    url: "messages",
  },
  {
    text: "الإعدادات",
    icon: <SettingsIcon />,
    url: "settings",
  },
  {
    text: "تسجيل الخروج",
    icon: <LogoutIcon />,
    url: "/logout",
  },
];
