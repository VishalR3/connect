"use client";
import { useMemo, useState } from "react";
import CollapsibleSection from "@/components/common/collapsible-section";
import PayrollPieChart from "./payroll-pie-chart";
import { formatIndianCurrency } from "@/utils/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dayjs from "dayjs";
import StickyHeader from "@/components/common/sticky-header";
import { useGetPayrollsQuery } from "@/lib/features/payrollService";
import { authClient } from "@/lib/auth-client";
import LoadingSuspense from "@/components/common/LoadingSuspense/LoadingSuspense";
import PayrollDownload from "./payroll-download";

export default function Payroll() {
  const [selectedMonth, setSelectedMonth] = useState(dayjs().startOf("month"));

  const { data: session, isPending } = authClient.useSession();

  const {
    data: payrolls,
    isLoading,
    isError,
    isUninitialized,
  } = useGetPayrollsQuery(session?.user.id, {
    skip: isPending || !session?.user.id,
  });

  const currentPayroll = useMemo(() => {
    if (!payrolls) return null;
    return payrolls.find(
      (payroll) =>
        dayjs(payroll.periodStart).format("YYYY-MM") ===
        selectedMonth.format("YYYY-MM")
    );
  }, [payrolls, selectedMonth]);

  const totalEarnings = useMemo(
    () => currentPayroll?.totalEarnings ?? 0,
    [currentPayroll]
  );
  const totalDeductions = useMemo(
    () => currentPayroll?.totalDeductions ?? 0,
    [currentPayroll]
  );

  const canNavigateBack = useMemo(() => {
    if (!payrolls?.length) return false;
    const earliestPayroll = payrolls.reduce((earliest, current) =>
      dayjs(current.periodStart).isBefore(dayjs(earliest.periodStart))
        ? current
        : earliest
    );
    return dayjs(selectedMonth).isAfter(dayjs(earliestPayroll.periodStart));
  }, [payrolls, selectedMonth]);

  const canNavigateForward = useMemo(() => {
    if (!payrolls?.length) return false;
    const latestPayroll = payrolls.reduce((latest, current) =>
      dayjs(current.periodStart).isAfter(dayjs(latest.periodStart))
        ? current
        : latest
    );
    return dayjs(selectedMonth).isBefore(dayjs(latestPayroll.periodStart));
  }, [payrolls, selectedMonth]);

  const changeMonth = (value: number) => {
    setSelectedMonth(dayjs(selectedMonth).add(value, "month"));
  };

  return (
    <>
      <LoadingSuspense
        isLoading={isLoading || isUninitialized}
        isError={isError}
        loadingFallback={
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        }
      >
        <StickyHeader className="px-4">
          <Button
            size={"icon"}
            variant={"outline"}
            onClick={() => changeMonth(-1)}
            disabled={!canNavigateBack}
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
            disabled={!canNavigateForward}
          >
            <ChevronRight />
          </Button>
        </StickyHeader>
        <div className="flex flex-col gap-6 px-4">
          <div className="flex flex-col justify-center w-full">
            <div className="h-64">
              <PayrollPieChart payroll={currentPayroll ?? null} />
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
              {currentPayroll?.entries.earnings.map((earning, index) => (
                <div
                  key={index}
                  className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm flex items-center justify-between"
                >
                  <div>{earning.componentName}</div>
                  <div>{formatIndianCurrency(earning.amount)}</div>
                </div>
              ))}
            </CollapsibleSection>
          </div>
          <div>
            <CollapsibleSection defaultOpen={true} header={"Deductions"}>
              {currentPayroll?.entries.deductions.map((deduction, index) => (
                <div
                  key={index}
                  className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm flex items-center justify-between"
                >
                  <div>{deduction.componentName}</div>
                  <div>{formatIndianCurrency(deduction.amount)}</div>
                </div>
              ))}
            </CollapsibleSection>
          </div>
          <div>
            <LoadingSuspense
              isLoading={isLoading || isUninitialized || !currentPayroll}
              isError={isError}
            >
              <PayrollDownload
                payroll={currentPayroll}
                userName={session?.user.name}
                userId={session?.user.id}
              />
            </LoadingSuspense>
          </div>
        </div>
      </LoadingSuspense>
    </>
  );
}
