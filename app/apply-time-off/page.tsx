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

export default function ApplyTimeOff() {
  const [date, setDate] = useState({
    from: new Date(),
    to: new Date(),
  });
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label>Leave Type</Label>
        <Select>
          <SelectTrigger className="w-full min-w-[180px]">
            <SelectValue placeholder="Leave Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="privilege">Privilege Leave</SelectItem>
            <SelectItem value="casual">Casual Leave</SelectItem>
            <SelectItem value="sick">Sick Leave</SelectItem>
            <SelectItem value="bereavement">Bereavement Leave</SelectItem>
            <SelectItem value="complimentary">Complimentary Leave</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Reason for Leave</Label>
        <Textarea placeholder="Reason for leave" />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Date Range</Label>
        <DateFilter date={date} setDate={setDate} />
      </div>
    </div>
  );
}
