"use client";
import PayrollPDF from "@/components/payroll/payroll-pdf";
import dayjs from "dayjs";
import { Suspense, useEffect, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";

export default function PDFPage() {
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
  return (
    <Suspense>
      {loaded && (
        <PDFViewer width="100%" style={{ height: "100vh" }}>
          <PayrollPDF payrollData={payrollData} />
        </PDFViewer>
      )}
    </Suspense>
  );
}
