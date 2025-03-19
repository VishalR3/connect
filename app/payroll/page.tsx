import { useMemo } from "react";
import PayrollCategory from "./payroll-category";
import PayrollPieChart from "./payroll-pie-chart";
import { formatIndianCurrency } from "@/utils/utils";

export default function Payroll() {
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

  const totalEarnings = useMemo(
    () => earnings.reduce((a, b) => a + b.amount, 0),
    []
  );
  const totalDeductions = useMemo(
    () => deductions.reduce((a, b) => a + b.amount, 0),
    []
  );
  return (
    <div className="flex flex-col gap-6 py-4">
      <div className="flex justify-center w-full h-64">
        <PayrollPieChart value={400000} />
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
        <PayrollCategory header={"Earnings & Allowances"}>
          {earnings.map((earning, index) => (
            <div
              key={index}
              className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm flex items-center justify-between"
            >
              <div>{earning.name}</div>
              <div>{formatIndianCurrency(earning.amount)}</div>
            </div>
          ))}
        </PayrollCategory>
      </div>
      <div>
        <PayrollCategory defaultOpen={true} header={"Deductions"}>
          {deductions.map((deduction, index) => (
            <div
              key={index}
              className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm flex items-center justify-between"
            >
              <div>{deduction.name}</div>
              <div>{formatIndianCurrency(deduction.amount)}</div>
            </div>
          ))}
        </PayrollCategory>
      </div>
    </div>
  );
}
