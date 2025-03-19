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

export default function TimeOffPage() {
  const [date, setDate] = useState({
    from: new Date(),
    to: new Date(),
  });
  return (
    <div className="grid grid-cols-[1fr 3rem] h-full gap-6 py-6">
      <div className="grid grid-cols-1 gap-6 ">
        <div className="flex flex-col gap-3">
          <Label>Leave Type</Label>
          <Select>
            <SelectTrigger className="w-full min-w-[180px] min-h-12">
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
        <div className="flex flex-col gap-3">
          <Label>Reason for Leave</Label>
          <Textarea placeholder="Reason for leave" rows={5} />
        </div>
        <div className="flex flex-col gap-3">
          <Label>Date Range</Label>
          <DateFilter date={date} setDate={setDate} />
        </div>
      </div>
      <div>
        <Button className="w-full min-h-12">Apply</Button>
      </div>
    </div>
  );
}
