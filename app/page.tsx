import PayrollChart from "./payroll/payroll-chart";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 py-4">
      <div className="flex flex-col gap-4">
        <div className="px-4">Payroll Overview</div>
        <PayrollChart />
      </div>
    </div>
  );
}
