import { Button } from "@/components/ui/button";
import PayrollChart from "./payroll/payroll-chart";
import { Bell } from "lucide-react";

import { Badge } from "@mui/material";
import Announcement from "./announcement";
import Stats from "./stats";
import StickyHeader from "@/components/common/sticky-header";
import posts from "@/mocks/post";
import Post from "@/components/social/post";
import Poll from "@/components/social/poll";
import poll from "@/mocks/poll";

const stats = [
  {
    value: 4,
    label: "Leaves Remaining",
  },
  {
    value: 5,
    label: "Other Stat",
  },
  {
    value: 12,
    label: "Team Members",
  },
  {
    value: 3,
    label: "Another Stat",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-6 pb-4">
      <StickyHeader>
        <div className="text-xl font-semibold">Home</div>
        <div>
          <Badge badgeContent={4} color="error" overlap="circular">
            <Button
              variant={"secondary"}
              size={"icon"}
              className="rounded-full"
            >
              <Bell size={20} />
            </Button>
          </Badge>
        </div>
      </StickyHeader>

      <Announcement />
      <div className="flex flex-col gap-2 px-4">
        <div>Payroll Overview</div>
        <PayrollChart />
      </div>
      <div className="grid grid-cols-2 gap-3 px-4">
        {stats.map((stat) => (
          <Stats key={stat.label} {...stat} />
        ))}
      </div>
      <div>
        {/* <h2 className="px-4 text-xl mb-4">Social</h2> */}
        <div className="flex flex-col gap-2 mt-8">
          <Poll poll={poll} />
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
