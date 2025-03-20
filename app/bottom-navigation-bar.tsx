"use client";
import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import { CalendarDays, CircleDollarSign, LayoutDashboard } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
      <Avatar
        alt="John Doe"
        src="https://github.com/shadcn.png"
        sx={{ width: 24, height: 24 }}
      />
    ),
    href: "/profile",
  },
];

export default function BottomNavigationBar() {
  const [value, setValue] = useState(0);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const index = actions.findIndex((action) => action.href === pathname);
    if (value === index) return;
    if (index === -1) return;
    setValue(index);
  }, [pathname]);
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
  );
}
