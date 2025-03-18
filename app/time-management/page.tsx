import { List } from "@mui/material";
import LeaveHistory from "./leave-history";
import { Calendar } from "@/components/ui/calendar";
import dayjs from "dayjs";

export default function TimeManagement() {
  const leaveDays = [
    { from: new Date(2025, 2, 23), to: new Date(2025, 2, 24) },
    new Date(2025, 2, 14),
    new Date(2025, 2, 12),
    new Date(2025, 1, 13),
    new Date(2025, 0, 26),
  ];

  const leaves = leaveDays.map((date) => {
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
  return (
    <div className="flex flex-col gap-6 py-4">
      <div className="flex flex-col gap-3">
        <h2 className="text-lg text-center">Your Calendar</h2>
        <div className="flex justify-center">
          <Calendar
            className="w-fit rounded-md border"
            modifiers={{
              leaves: leaveDays,
            }}
            modifiersClassNames={{
              leaves: "leaveDay",
            }}
          />
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold">Time Off Requests</h2>
        <List className="max-h-80 overflow-y-scroll">
          {leaves.map((leave, i) => (
            <LeaveHistory key={i} leave={leave} />
          ))}
        </List>
      </div>
    </div>
  );
}
