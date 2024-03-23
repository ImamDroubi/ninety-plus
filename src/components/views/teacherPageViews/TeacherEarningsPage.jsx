import React from "react";
import {
  CreditCardIcon,
  CrownIcon,
  StackIcon,
  WalletIcon,
} from "../../icons/icons";
import MoneyAmountBlock from "../../other/MoneyAmountBlock";
import PaginatedTable from "../../tables/PaginatedTable";

export default function TeacherEarningsPage() {
  return (
    <div className="my-4 w-[90%] m-auto">
      <section className="statistics flex flex-wrap justify-between gap-y-2">
        <MoneyAmountBlock
          icon={<StackIcon />}
          amount={1200.0}
          desctiption="الرصيد الكلي"
          style="primary"
        />
        <MoneyAmountBlock
          icon={<WalletIcon />}
          amount={500.0}
          desctiption="الرصيد الحالي"
          style="secondary"
        />
        <MoneyAmountBlock
          icon={<CreditCardIcon />}
          amount={700.0}
          desctiption="الرصيد المستلم"
          style="error"
        />
        <MoneyAmountBlock
          icon={<CrownIcon />}
          amount={200.0}
          desctiption="أرباح اليوم"
          style="success"
        />
      </section>
      <div className="withdraw-history bg-gray-white p-4 my-3">
        <h5 className="my-2 text-lg">عمليات السحب</h5>
        <PaginatedTable/>
      </div>
    </div>
  );
}
