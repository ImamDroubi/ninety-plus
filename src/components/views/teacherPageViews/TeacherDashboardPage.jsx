import React from "react";
import {
  CreditCardIcon,
  CrownIcon,
  StackIcon,
  WalletIcon,
} from "../../icons/icons";
import StatisticsBlock from "../../other/StatisticsBlock";
import LinearChart from "../../charts/LinearChart";
import {
  lastCourseLastMonthSales,
  lastCourseLastWeekSales,
  latestStudentsTableData,
  latestStudentsTableHeaders,
} from "../../data/teacherDashboardStatistics";
import ChartComponent from "../../charts/ChartComponent";
import BarsChart from "../../charts/BarsChart";
import PaginatedTable from "../../tables/PaginatedTable";
import { useTeacherProfile } from "../../../contexts/TeacherProfileContext";
import { CircularProgress } from "@mui/material";
export default function TeacherDashboardPage() {
  const { profileInfo, isLoading } = useTeacherProfile();
  if (isLoading || !profileInfo) return <CircularProgress />;
  const totalCourses =
    (profileInfo.courses.draft?.length || 0) +
    (profileInfo.courses.active?.length || 0) +
    (profileInfo.courses.over?.length || 0);
  return (
    <div className="my-4 w-[90%] m-auto">
      <section className="statistics flex flex-wrap justify-between gap-y-2">
        <StatisticsBlock
          icon={<StackIcon />}
          number={totalCourses}
          description="الدورات الكلية"
          style="primary"
        />
        <StatisticsBlock
          icon={<WalletIcon />}
          number={profileInfo.courses.length || 0}
          description="الدورات الحالية"
          style="secondary"
        />
        <StatisticsBlock
          icon={<CreditCardIcon />}
          number={profileInfo.total_earnings || 0}
          description="مجموع الأرباح"
          style="error"
        />
        <StatisticsBlock
          icon={<CrownIcon />}
          number={profileInfo.number_of_sales || 0}
          description="عدد المبيعات"
          style="success"
        />
      </section>
      <section className="my-6">
        <h2 className="text-lg font-bold my-2">إحصائيات</h2>
        <div className="charts flex flex-wrap justify-between gap-2">
          <ChartComponent
            title={"مبيعات آخر دورة في الأسبوع الماضي"}
            extraStyle={"w-[32%]"}
          >
            <BarsChart
              data={lastCourseLastWeekSales}
              lineKey={"sales"}
              xKey={"day"}
            />
          </ChartComponent>
          <ChartComponent
            title={"مبيعات آخر دورة في الشهر الماضي"}
            extraStyle={"w-[66%]"}
          >
            <LinearChart
              data={lastCourseLastMonthSales}
              lineKey={"sales"}
              xKey={"day"}
            />
          </ChartComponent>
        </div>
        <div className="withdraw-history bg-gray-white p-4 my-3">
          <h5 className="my-2 text-lg">آخر الطلاب المنتسبين</h5>
          <PaginatedTable
            data={latestStudentsTableData}
            headers={latestStudentsTableHeaders}
          />
        </div>
      </section>
    </div>
  );
}
