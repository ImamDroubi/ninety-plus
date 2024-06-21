import React from "react";
import {
  CreditCardIcon,
  CrownIcon,
  StackIcon,
  WalletIcon,
} from "../../icons/icons";
import StatisticsBlock from "../../other/StatisticsBlock";
import PaginatedTable from "../../tables/PaginatedTable";
import {
  teacherEarningsTableData,
  teacherEarningsTableHeaders,
} from "../../data/teacherEarningsTableData";
import { useTeacherProfile } from "../../../contexts/TeacherProfileContext";
import { CircularProgress } from "@mui/material";
export default function TeacherEarningsPage() {
  const { profileInfo, isLoading } = useTeacherProfile();
  if (isLoading || !profileInfo) return <CircularProgress />;
  console.log(profileInfo);
  return (
    <div className="my-4 w-[90%] m-auto">
      <section className="statistics flex flex-wrap justify-between gap-y-2">
        <StatisticsBlock
          icon={<StackIcon />}
          number={`$${profileInfo.total_earnings}`}
          description="الرصيد الكلي"
          style="primary"
        />
        <StatisticsBlock
          icon={<WalletIcon />}
          number={`$${profileInfo.balance}`}
          description="الرصيد الحالي"
          style="secondary"
        />
        <StatisticsBlock
          icon={<CreditCardIcon />}
          number={`$${profileInfo.withdraw_balance}`}
          description="الرصيد المستلم"
          style="error"
        />
        <StatisticsBlock
          icon={<CrownIcon />}
          number={`$${profileInfo.today_earnings}`}
          description="أرباح اليوم"
          style="success"
        />
      </section>
      <div className="withdraw-history bg-gray-white p-4 my-3">
        <h5 className="my-2 text-lg">عمليات السحب</h5>
        <PaginatedTable
          data={teacherEarningsTableData}
          headers={teacherEarningsTableHeaders}
        />
      </div>
    </div>
  );
}
