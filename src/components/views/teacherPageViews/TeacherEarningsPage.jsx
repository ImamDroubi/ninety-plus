import React from "react";
import {
  CreditCardIcon,
  CrownIcon,
  StackIcon,
  WalletIcon,
} from "../../icons/icons";
import StatisticsBlock from "../../other/StatisticsBlock";
import PaginatedTable from "../../tables/PaginatedTable";
import { teacherEarningsTableData, teacherEarningsTableHeaders } from "../../data/teacherEarningsTableData";
export default function TeacherEarningsPage() {
  return (
    <div className="my-4 w-[90%] m-auto">
      <section className="statistics flex flex-wrap justify-between gap-y-2">
        <StatisticsBlock
          icon={<StackIcon />}
          number={`$${1200.0}`}
          description="الرصيد الكلي"
          style="primary"
        />
        <StatisticsBlock
          icon={<WalletIcon />}
          number={`$${500.0}`}
          description="الرصيد الحالي"
          style="secondary"
        />
        <StatisticsBlock
          icon={<CreditCardIcon />}
          number={`$${700.0}`}
          description="الرصيد المستلم"
          style="error"
        />
        <StatisticsBlock
          icon={<CrownIcon />}
          number={`$${200.0}`}
          description="أرباح اليوم"
          style="success"
        />
      </section>
      <div className="withdraw-history bg-gray-white p-4 my-3">
        <h5 className="my-2 text-lg">عمليات السحب</h5>
        <PaginatedTable data={teacherEarningsTableData} headers={teacherEarningsTableHeaders} />
      </div>
    </div>
  );
}
