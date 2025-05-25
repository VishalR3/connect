import {
  PayComponentCalculationType,
  PayComponentCategory,
} from "@/constants/enums";

export interface PayrollEntry {
  id: number;
  componentName: string;
  amount: number;
  type: PayComponentCategory | null;
  component: {
    id: number;
    name: string;
    category: PayComponentCategory;
    calculationType: PayComponentCalculationType;
    amount: number;
    formula: string | null;
    isStatutory: boolean;
  } | null;
}

export interface PayrollRecord {
  id: number;
  periodStart: Date;
  periodEnd: Date;
  paymentDate: Date | null;
  grossSalary: number;
  netSalary: number;
  totalEarnings: number;
  totalDeductions: number;
  entries: {
    earnings: PayrollEntry[];
    deductions: PayrollEntry[];
  };
}
