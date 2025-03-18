import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, LayoutDashboard, Plus, Wallet } from "lucide-react";
import Link from "next/link";

export default function BottomNavigation() {
  return (
    <div
      className="grid"
      style={{ grid: "subgrid/subgrid", gridArea: "footer/main" }}
    >
      <div className="grid grid-cols-5 justify-items-center items-center">
        <Link href={"/"}>
          <LayoutDashboard size={28} />
        </Link>
        <Link href="/time-management">
          <CalendarDays size={28} />
        </Link>
        <Link
          href="/apply-time-off"
          className="border p-2 rounded-full border-black"
        >
          <Plus size={28} />
        </Link>
        <Link href="/payroll">
          <Wallet size={28} />
        </Link>
        <Link href="/profile">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </div>
  );
}
