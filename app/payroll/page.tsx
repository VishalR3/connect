"use client";
import { Suspense, useEffect, useMemo, useState } from "react";
import CollapsibleSection from "@/components/common/collapsible-section";
import PayrollPieChart from "./payroll-pie-chart";
import { formatIndianCurrency } from "@/utils/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import dayjs from "dayjs";
import StickyHeader from "@/components/common/sticky-header";
import PayrollPDF from "@/components/payroll/payroll-pdf";
import { PDFDownloadLink } from "@react-pdf/renderer";

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
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const payrollData = {
    name: "John Doe",
    id: "EMP1234",
    payPeriod: `${dayjs().startOf("month").format("DD.MM.YY")} - ${dayjs()
      .endOf("month")
      .format("DD.MM.YY")}`,
    payDate: dayjs().endOf("month").add(5, "day").format("DD.MM.YY"),
    earnings: [
      { type: "Basic Salary", amount: "20,341.00" },
      { type: "House Rent Allowance", amount: "10,360.00" },
    ],
    deductions: [
      { type: "Income Tax", amount: "5,569.00" },
      { type: "Provident Fund", amount: "2,200.00" },
    ],
    netPay: "22,910.00",
  };

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
    <>
      <StickyHeader className="px-4">
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
      </StickyHeader>
      <div className="flex flex-col gap-6 px-4">
        <div className="flex flex-col justify-center w-full">
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
          <Suspense>
            {loaded && (
              <PDFDownloadLink
                document={<PayrollPDF payrollData={payrollData} />}
                fileName="Payroll.pdf"
              >
                {({ loading }) =>
                  loading ? (
                    "Generating PDF..."
                  ) : (
                    <Button className="w-full min-h-12">
                      <Download />
                      Download Payslip
                    </Button>
                  )
                }
              </PDFDownloadLink>
            )}
          </Suspense>
        </div>
      </div>
    </>
  );
}
