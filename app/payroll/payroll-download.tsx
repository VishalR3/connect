"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import PayrollPDF from "@/components/payroll/payroll-pdf";
import { PayrollRecord } from "../types";
import { formatIndianCurrency } from "@/utils/utils";
import dayjs from "dayjs";
import dynamic from "next/dynamic";

// Dynamically import PDFDownloadLink with no SSR
const PDFDownloadLinkNoSSR = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

interface PayrollDownloadProps {
  payroll: PayrollRecord | null | undefined;
  userName: string | undefined;
  userId: string | undefined;
}

export default function PayrollDownload({
  payroll,
  userName,
  userId,
}: PayrollDownloadProps) {
  const [loaded, setLoaded] = useState(false);

  const payrollData = useMemo(() => {
    if (!payroll || !userName || !userId) return null;
    return {
      name: userName,
      id: userId,
      payPeriod: `${dayjs(payroll.periodStart).format("DD.MM.YY")} - ${dayjs(
        payroll.periodEnd
      ).format("DD.MM.YY")}`,
      payDate: dayjs(payroll.paymentDate).format("DD.MM.YY"),
      earnings: payroll.entries.earnings.map((earning) => ({
        type: earning.componentName,
        amount: formatIndianCurrency(earning.amount),
      })),
      deductions: payroll.entries.deductions.map((deduction) => ({
        type: deduction.componentName,
        amount: formatIndianCurrency(deduction.amount),
      })),
      netPay: formatIndianCurrency(payroll.netSalary),
    };
  }, [payroll, userName, userId]);

  useEffect(() => {
    if (payrollData) {
      setLoaded(true);
    } else {
      setLoaded(false);
    }
  }, [payrollData]);

  if (!loaded || !payrollData) return null;

  return (
    <PDFDownloadLinkNoSSR
      document={<PayrollPDF payrollData={payrollData} />}
      fileName={`Payroll-${dayjs(payroll?.periodStart).format("MMM-YYYY")}.pdf`}
    >
      {({ loading, error }) => {
        if (error) {
          return (
            <Button className="w-full min-h-12" variant="destructive">
              Error generating PDF
            </Button>
          );
        }
        return loading ? (
          <Button className="w-full min-h-12" disabled>
            Generating PDF...
          </Button>
        ) : (
          <Button className="w-full min-h-12">
            <Download className="mr-2 h-4 w-4" />
            Download Payslip
          </Button>
        );
      }}
    </PDFDownloadLinkNoSSR>
  );
}
