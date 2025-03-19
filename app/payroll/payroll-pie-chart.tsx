export default function PayrollPieChart({ value }: { value: number }) {
  return (
    <div className="w-full aspect-square relative max-w-96">
      <div className="w-full h-full aspect-square rounded-full bg-red-300"></div>
      <div className="absolute top-8 left-8 right-8 bottom-8 aspect-square rounded-full bg-white grid place-items-center">
        <div className="text-5xl font-bold">${value}</div>
      </div>
    </div>
  );
}
