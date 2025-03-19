import dayjs from "dayjs";

interface Leave {
  type: string;
  start: Date;
  end: Date;
  days: number;
}

export default function LeaveRecord({ leave }: { leave: Leave }) {
  return (
    <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm flex items-center justify-between">
      <div className="font-semibold">{leave.type}</div>
      <div>{`${dayjs(leave.start).format("MMM D")} ${
        leave.days > 1 ? `- ${dayjs(leave.end).format("MMM D")} ` : ""
      }`}</div>
    </div>
  );
}
