import { PayrollRecord } from "@/app/types";
import { apiService } from "./apiService";

const payrollService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getPayrolls: builder.query<PayrollRecord[], string | undefined>({
      query: (id) => `users/${id}/payroll`,
      providesTags: ["Payroll"],
    }),
  }),
});

export const { useGetPayrollsQuery } = payrollService;
