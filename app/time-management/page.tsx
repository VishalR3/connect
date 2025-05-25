"use client";
import { Calendar } from "@/components/ui/calendar";
import LeaveRecord from "./leave-record";
import ApplyTimeOffBtn from "./apply-time-off-btn";
import { useGetLeavesHistoryQuery } from "@/lib/features/leaveService";
import { authClient } from "@/lib/auth-client";
import LoadingSuspense from "@/components/common/LoadingSuspense/LoadingSuspense";
import { useMemo } from "react";
import dayjs from "dayjs";

export default function TimeManagement() {
  // const leaveDays = [
  //   { from: new Date(2025, 2, 23), to: new Date(2025, 2, 24) },
  //   new Date(2025, 2, 14),
  //   new Date(2025, 2, 12),
  //   new Date(2025, 1, 13),
  //   new Date(2025, 0, 26),
  // ];
  const { data: session, isPending } = authClient.useSession();
  const {
    data: leaves,
    isLoading,
    isError,
    isUninitialized,
  } = useGetLeavesHistoryQuery(session?.user.id, {
    skip: isPending || !session?.user.id,
  });

  const leaveDays = useMemo((): {
    upcoming: Date[];
    past: Date[];
  } => {
    if (!leaves) return { upcoming: [], past: [] };
    if (isUninitialized || isLoading) return { upcoming: [], past: [] };
    // return both upcoming and past leaves, if dates are different then do from and to, otherwise, just date is enough
    const returnDate = (leave: (typeof leaves.upcoming)[0]) => {
      if (dayjs(leave.startDate).isSame(dayjs(leave.endDate), "day")) {
        return new Date(leave.startDate);
      }
      return {
        from: leave.startDate,
        to: leave.endDate,
      };
    };

    return {
      upcoming: leaves.upcoming.map((leave: any) => returnDate(leave)),
      past: leaves.past.map((leave: any) => returnDate(leave)),
    };
  }, [leaves, isUninitialized, isLoading]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex justify-center">
          <Calendar
            className="w-fit py-4 px-0 "
            modifiers={{
              pastLeaves: leaveDays.past,
              upcomingLeaves: leaveDays.upcoming,
            }}
            modifiersClassNames={{
              pastLeaves: "leaveDay",
              upcomingLeaves: "upcomingLeaves leaveDay",
            }}
          />
        </div>
      </div>
      <LoadingSuspense isLoading={isLoading || isPending} isError={isError}>
        <div className="px-4">
          <h2 className="text-lg font-semibold">Upcoming Leaves</h2>
          <div className="space-y-2 mt-3">
            {leaves?.upcoming?.map((leave: any, i: number) => (
              <LeaveRecord key={i} leave={leave} />
            ))}
          </div>
        </div>
      </LoadingSuspense>
      <div className="px-4 flex items-center gap-3">
        <ApplyTimeOffBtn />
      </div>
      <LoadingSuspense isLoading={isLoading || isPending} isError={isError}>
        <div className="px-4">
          <h2 className="text-lg font-semibold">Leave History</h2>
          <div className="space-y-2 mt-3">
            {leaves?.past?.map((leave: any, i: number) => (
              <LeaveRecord key={i} leave={leave} />
            ))}
          </div>
        </div>
      </LoadingSuspense>
    </div>
  );
}
