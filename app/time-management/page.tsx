import { List } from "@mui/material";
import LeaveHistory from "./leave-history";
import { Calendar } from "@/components/ui/calendar";
import dayjs from "dayjs";
import LeaveRecord from "./leave-record";
import { useCallback } from "react";

export default function TimeManagement() {
  const leaveDays = [
    { from: new Date(2025, 2, 23), to: new Date(2025, 2, 24) },
    new Date(2025, 2, 14),
    new Date(2025, 2, 12),
    new Date(2025, 1, 13),
    new Date(2025, 0, 26),
  ];
  const upcomingLeaves = [
    { from: new Date(2025, 3, 2), to: new Date(2025, 3, 7) },
    new Date(2025, 2, 29),
  ];

  const leaves = useCallback((days: any[]) => {
    return days.map((date: Date | { from: Date; to: Date }) => {
      if (typeof date === "object" && "from" in date && "to" in date) {
        return {
          type: "Sick Leave",
          start: date.from,
          end: date.to,
          days: dayjs(date.to).diff(date.from, "day") + 1,
        };
      }
      return { type: "Sick Leave", start: date, end: date, days: 1 };
    });
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex justify-center">
          <Calendar
            className="w-fit py-4 px-0 "
            modifiers={{
              leaves: leaveDays,
            }}
            modifiersClassNames={{
              leaves: "leaveDay",
            }}
          />
        </div>
      </div>
      <div className="px-4">
        <h2 className="text-lg font-semibold">Upcoming Leaves</h2>
        <div className="space-y-2 mt-3">
          {leaves(upcomingLeaves).map((leave: any, i: number) => (
            <LeaveRecord key={i} leave={leave} />
          ))}
        </div>
      </div>
      <div className="px-4">
        <h2 className="text-lg font-semibold">Leave History</h2>
        <div className="space-y-2 mt-3">
          {leaves(leaveDays).map((leave: any, i: number) => (
            <LeaveRecord key={i} leave={leave} />
          ))}
        </div>
      </div>
    </div>
  );
}
