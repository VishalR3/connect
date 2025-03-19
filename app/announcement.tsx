"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Megaphone, X } from "lucide-react";
import { useState } from "react";
export default function Announcement() {
  const [isDismissed, setIsDismissed] = useState(false);
  return !isDismissed ? (
    <div className="px-4">
      <Alert variant={"info"} className="bg-amber-50 ">
        <Megaphone className="h-4 w-4" />
        <AlertTitle className="flex items-center justify-between">
          Heads up!
          <X
            size={16}
            className="text-muted-foreground"
            onClick={() => setIsDismissed(true)}
          />
        </AlertTitle>
        <AlertDescription>Tomorrow is a public holiday.</AlertDescription>
      </Alert>
    </div>
  ) : null;
}
