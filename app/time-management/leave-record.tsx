import dayjs from "dayjs";
import { useMemo } from "react";

interface Leave {
  type: string;
  startDate: Date;
  endDate: Date;
}

export default function LeaveRecord({ leave }: { leave: Leave }) {
  const days = useMemo(() => {
    return dayjs(leave.endDate).diff(dayjs(leave.startDate), "day");
  }, [leave]);
  return (
    <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm flex items-center justify-between">
      <div className="font-semibold">{leave.type}</div>
      <div>{`${dayjs(leave.startDate).format("MMM D")} ${
        days > 1 ? `- ${dayjs(leave.endDate).format("MMM D")} ` : ""
      }`}</div>
    </div>
  );
}
