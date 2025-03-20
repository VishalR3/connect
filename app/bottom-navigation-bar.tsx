"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { CalendarDays, CircleDollarSign, LayoutDashboard } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const actions = [
  {
    label: "Home",
    icon: <LayoutDashboard />,
    href: "/",
  },
  {
    label: "Time Off",
    icon: <CalendarDays />,
    href: "/time-management",
  },
  {
    label: "Payroll",
    icon: <CircleDollarSign />,
    href: "/payroll",
  },
  {
    label: "Profile",
    icon: (
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
    href: "/profile",
  },
];

export default function BottomNavigationBar() {
  const [value, setValue] = useState(0);
  const router = useRouter();
  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        router.push(actions[newValue].href);
      }}
      sx={{
        backgroundColor: "transparent",
      }}
    >
      {actions.map((action, index) => (
        <BottomNavigationAction
          key={index}
          label={action.label}
          icon={action.icon}
        />
      ))}
    </BottomNavigation>
    // <div className="grid h-full items-center bg-background">
    //   <div className="grid grid-cols-5 justify-items-center items-center">
    //     <Link href={"/"}>
    //       <LayoutDashboard size={28} />
    //     </Link>
    //     <Link href="/time-management">
    //       <CalendarDays size={28} />
    //     </Link>
    //     <Link
    //       href="/apply-time-off"
    //       className="border p-2 rounded-full border-black"
    //     >
    //       <Plus size={28} />
    //     </Link>
    //     <Link href="/payroll">
    //       <CircleDollarSign size={28} />
    //     </Link>
    //     <Link href="/profile">
    //       <Avatar>
    //         <AvatarImage src="https://github.com/shadcn.png" />
    //         <AvatarFallback>CN</AvatarFallback>
    //       </Avatar>
    //     </Link>
    //   </div>
    // </div>
  );
}
