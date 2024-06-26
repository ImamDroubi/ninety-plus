import {
  TeacherIcon,
  StarIcon,
  StackIcon,
  EyeIcon,
  MoneyIcon,
} from "../icons/icons";
export const adminPageList = [
  {
    text: "قسم المعلمين",
    icon: <TeacherIcon />,
    url: "teachers-section",
  },
  {
    text: "قسم الطلاب",
    icon: <StarIcon />,
    url: "students-section",
  },
  {
    text: "قسم الدورات",
    icon: <StackIcon />,
    url: "courses-section",
  },
  // {
  //   text: "قسم مراجعة الكورسات الجديدة",
  //   icon: <EyeIcon />,
  //   url: "courses-review-section",
  // },
  {
    text: "قسم السحوبات المالية",
    icon: <MoneyIcon />,
    url: "withdraw-section",
  },
  // {
  //   text: "قسم إضافة الدورات",
  //   icon: <StackIcon />,
  //   url: "add-course-section",
  // },
  // {
  //   text: "قسم الإضافة العامة",
  //   icon: <StarIcon />,
  //   url: "general-adding-section",
  // },
  {
    text: "قسم المدن",
    icon: <StackIcon />,
    url: "cities-section",
  },
  {
    text: "قسم الفروع",
    icon: <StackIcon />,
    url: "branches-section",
  },
  {
    text: "قسم المواد",
    icon: <StackIcon />,
    url: "modules-section",
  },
  {
    text: "قسم الوحدات",
    icon: <StackIcon />,
    url: "chapters-section",
  },
];
