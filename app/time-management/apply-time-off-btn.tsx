"use client";
import DialogOrDrawer from "@/components/common/dialog-or-drawer";
import { Button } from "@/components/ui/button";
import { CalendarPlus } from "lucide-react";
import TimeOffPage from "../apply-time-off/time-off-page";
import { useState } from "react";

export default function ApplyTimeOffBtn() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button className=" flex-1 min-h-12" onClick={() => setOpen(true)}>
        <CalendarPlus />
        Apply Time Off
      </Button>
      <DialogOrDrawer
        open={open}
        handleClose={() => setOpen(false)}
        maxWidth="lg"
      >
        <div className="px-4 h-full">
          <TimeOffPage />
        </div>
      </DialogOrDrawer>
    </>
  );
}
