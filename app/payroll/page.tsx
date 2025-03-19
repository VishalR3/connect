"use client";
import { useMemo, useState } from "react";
import CollapsibleSection from "@/components/common/collapsible-section";
import PayrollPieChart from "./payroll-pie-chart";
import { formatIndianCurrency } from "@/utils/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import dayjs from "dayjs";

const earnings = [
  {
    name: "Basic Salary",
    amount: 100,
  },
  {
    name: "House Rent Allowances",
    amount: 100,
  },
  {
    name: "Transport Allowances",
    amount: 100,
  },
  {
    name: "LTA - Monthly",
    amount: 100,
  },
  {
    name: "Meal Allowance",
    amount: 100,
  },
  {
    name: "Special Allowance",
    amount: 100,
  },
  {
    name: "NPS Allowance",
    amount: 100,
  },
  {
    name: "Internet Allowance",
    amount: 100,
  },
  {
    name: "Medical Allowance",
    amount: 100,
  },
];

const deductions = [
  {
    name: "Income Tax",
    amount: 100,
  },
  {
    name: "Provident Fund",
    amount: 13,
  },
  {
    name: "LWF Contribution",
    amount: 2,
  },
  {
    name: "Recovery (Rounding)",
    amount: 0.39,
  },
];

export default function Payroll() {
  const [selectedMonth, setSelectedMonth] = useState(dayjs().startOf("month"));

  const totalEarnings = useMemo(
    () => earnings.reduce((a, b) => a + b.amount, 0),
    []
  );
  const totalDeductions = useMemo(
    () => deductions.reduce((a, b) => a + b.amount, 0),
    []
  );

  const changeMonth = (value: number) => {
    setSelectedMonth(dayjs(selectedMonth).add(value, "month"));
  };
  return (
    <div className="flex flex-col gap-6 py-4">
      <div className="flex flex-col justify-center w-full">
        <div className="flex items-center justify-between">
          <Button
            size={"icon"}
            variant={"outline"}
            onClick={() => changeMonth(-1)}
          >
            <ChevronLeft />
          </Button>
          <div className="font-semibold">
            {dayjs(selectedMonth).format("MMMM YYYY")}
          </div>
          <Button
            size={"icon"}
            variant={"outline"}
            onClick={() => changeMonth(1)}
          >
            <ChevronRight />
          </Button>
        </div>
        <div className="h-64">
          <PayrollPieChart value={400000} />
        </div>
      </div>
      <div>
        <div className="flex items-center gap-4">
          <div className="flex-1 rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
            <div className="text-xl mb-1">
              {formatIndianCurrency(totalEarnings)}
            </div>
            <div>Earnings</div>
          </div>
          <div className="flex-1 rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
            <div className="text-xl mb-1">
              {formatIndianCurrency(totalDeductions)}
            </div>
            <div>Deductions</div>
          </div>
        </div>
      </div>
      <div>
        <CollapsibleSection header={"Earnings & Allowances"}>
          {earnings.map((earning, index) => (
            <div
              key={index}
              className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm flex items-center justify-between"
            >
              <div>{earning.name}</div>
              <div>{formatIndianCurrency(earning.amount)}</div>
            </div>
          ))}
        </CollapsibleSection>
      </div>
      <div>
        <CollapsibleSection defaultOpen={true} header={"Deductions"}>
          {deductions.map((deduction, index) => (
            <div
              key={index}
              className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm flex items-center justify-between"
            >
              <div>{deduction.name}</div>
              <div>{formatIndianCurrency(deduction.amount)}</div>
            </div>
          ))}
        </CollapsibleSection>
      </div>
      <div>
        <Button className="w-full min-h-12">
          <Download />
          Download Payslip
        </Button>
      </div>
    </div>
  );
}
