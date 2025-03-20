import { Poll as PollType } from "@/mocks/poll";
import { Avatar } from "@mui/material";
import dayjs from "dayjs";
import { Ellipsis } from "lucide-react";
import relativeTime from "dayjs/plugin/relativeTime";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

dayjs.extend(relativeTime);

export default function Poll({ poll }: { poll: PollType }) {
  return (
    <div>
      <div className="flex items-center justify-between px-4 mb-2">
        <div className="flex gap-2 items-center ">
          <Avatar
            alt={poll.author}
            src={poll.avatar}
            sx={{ width: 24, height: 24 }}
          />
          <div className="font-semibold text-sm">{poll.author}</div>
        </div>
        <div>
          <Ellipsis size={20} />
        </div>
      </div>

      <div className="px-4 mt-2 mb-4 flex flex-col gap-2">
        <div className="text-sm">
          <span>{poll.caption}</span>
        </div>
        <div className="my-4">
          <RadioGroup defaultValue="comfortable">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="default" id="r1" />
              <Label htmlFor="r1">Default</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="comfortable" id="r2" />
              <Label htmlFor="r2">Comfortable</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="compact" id="r3" />
              <Label htmlFor="r3">Compact</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="text-xs text-muted-foreground">
          {dayjs(poll.timestamp).fromNow()}
        </div>
      </div>
    </div>
  );
}
