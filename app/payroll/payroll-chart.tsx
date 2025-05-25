"use client";

import { Bar, BarChart, XAxis } from "recharts";
import { useMemo } from "react";
import { authClient } from "@/lib/auth-client";
import { useGetPayrollsQuery } from "@/lib/features/payrollService";
import dayjs from "dayjs";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function PayrollChart() {
  const { data: session, isPending } = authClient.useSession();

  const {
    data: payrolls,
    isLoading,
    isError,
    isUninitialized,
  } = useGetPayrollsQuery(session?.user.id, {
    skip: isPending || !session?.user.id,
  });

  const chartData = useMemo(() => {
    if (!payrolls) return [];
    return [...payrolls].reverse().map((payroll) => ({
      month: dayjs(payroll.periodStart).format("MMM"),
      earnings: payroll.totalEarnings,
      deductions: payroll.totalDeductions,
    }));
  }, [payrolls]);

  const chartConfig = {
    earnings: {
      label: "Earnings",
      color: "hsl(var(--chart-1))",
    },
    deductions: {
      label: "Deductions",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  if (isLoading || isUninitialized || !chartData.length) {
    return (
      <div className="min-h-[200px] w-full border rounded-md flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[200px] w-full border rounded-md flex items-center justify-center text-destructive">
        Error loading payroll data
      </div>
    );
  }

  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-[200px] w-full border rounded-md"
    >
      <BarChart accessibilityLayer data={chartData}>
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <Bar dataKey="earnings" fill="var(--color-earnings)" radius={4} />
        <Bar dataKey="deductions" fill="var(--color-deductions)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
