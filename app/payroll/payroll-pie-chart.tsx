"use client";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatIndianCurrency } from "@/utils/utils";
import { Label, Pie, PieChart } from "recharts";
import { PayrollRecord } from "../types";

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

export default function PayrollPieChart({
  payroll,
}: {
  payroll: PayrollRecord | null;
}) {
  const chartData = payroll
    ? [
        {
          name: "earnings",
          value: payroll.totalEarnings,
          fill: "hsl(var(--chart-2))",
        },
        {
          name: "deductions",
          value: payroll.totalDeductions,
          fill: "hsl(var(--chart-1))",
        },
      ]
    : [];

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[280px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-xl font-bold"
                    >
                      {formatIndianCurrency(payroll?.grossSalary ?? 0)}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Gross Salary
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
