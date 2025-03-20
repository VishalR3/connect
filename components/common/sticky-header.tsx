"use client";
import { cn } from "@/lib/utils";
import { useScrollTrigger } from "@mui/material";
import { ReactNode } from "react";

export default function StickyHeader({
  children,
  className = "",
  threshold = 0,
  ...props
}: {
  children: ReactNode;
  className?: string;
  threshold?: number;
  [key: string]: any;
}) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: threshold,
  });
  return (
    <div
      className={cn(
        "flex justify-between items-center px-4 sticky top-0 pt-4 pb-2 z-50 bg-background/80 backdrop-blur-md bg-blend-luminosity",
        trigger && "shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
