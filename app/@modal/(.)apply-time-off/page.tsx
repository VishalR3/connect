"use client";
import TimeOffPage from "@/app/apply-time-off/time-off-page";
import DialogOrDrawer from "@/components/common/dialog-or-drawer";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <DialogOrDrawer open={true} handleClose={() => router.back()} maxWidth="lg">
      <div className="px-4 h-full">
        <TimeOffPage />
      </div>
    </DialogOrDrawer>
  );
}
