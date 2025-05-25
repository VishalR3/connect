"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import DateFilter from "./date-filter";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { handleAsyncWithToast } from "@/utils/utils";
import { useApplyLeaveMutation } from "@/lib/features/leaveService";
import { toast } from "sonner";

export default function TimeOffPage({
  handleClose,
}: {
  handleClose: () => void;
}) {
  const [leaveType, setLeaveType] = useState("");
  const [reasonForLeave, setReasonForLeave] = useState("");
  const [date, setDate] = useState({
    from: new Date(),
    to: new Date(),
  });

  const { data: session } = authClient.useSession();
  const [applyLeave] = useApplyLeaveMutation();

  const handleSubmit = () => {
    console.log({
      leaveType,
      reasonForLeave,
      date,
    });
    if (!session?.user.id) {
      toast.error("You are not logged in");
      handleClose();
      return;
    }

    if (!leaveType || !reasonForLeave || !date) {
      toast.error("Please fill all the fields");
      return;
    }

    const payload = {
      userId: session?.user.id,
      type: leaveType,
      reason: reasonForLeave,
      startDate: date.from,
      endDate: date?.to || date.from,
    };

    handleAsyncWithToast(
      () => applyLeave(payload).unwrap(),
      "Leave applied successfully",
      "An unexpected error occurred. Please try again."
    );

    handleClose();
  };
  return (
    <div className="grid grid-cols-[1fr 3rem] h-full gap-6 py-6">
      <div className="grid grid-cols-1 gap-6 ">
        <div className="flex flex-col gap-3">
          <Label>Leave Type</Label>
          <Select value={leaveType} onValueChange={setLeaveType}>
            <SelectTrigger className="w-full min-w-[180px] min-h-12">
              <SelectValue placeholder="Leave Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="personal" className="h-12">
                Privilege Leave
              </SelectItem>
              <SelectItem value="casual" className="h-12">
                Casual Leave
              </SelectItem>
              <SelectItem value="sick" className="h-12">
                Sick Leave
              </SelectItem>
              <SelectItem value="bereavement" className="h-12">
                Bereavement Leave
              </SelectItem>
              <SelectItem value="complimentary" className="h-12">
                Complimentary Leave
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-3">
          <Label>Reason for Leave</Label>
          <Textarea
            placeholder="Reason for leave"
            rows={5}
            value={reasonForLeave}
            onChange={(e) => setReasonForLeave(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label>Date Range</Label>
          <DateFilter date={date} setDate={setDate} />
        </div>
      </div>
      <div className="mt-12">
        <Button className="w-full min-h-12" onClick={handleSubmit}>
          Apply
        </Button>
      </div>
    </div>
  );
}
