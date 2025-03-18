import { ListItem, ListItemText } from "@mui/material";
import dayjs from "dayjs";

interface Leave {
  type: string;
  start: Date;
  end: Date;
  days: number;
}
export default function LeaveHistory({ leave }: { leave: Leave }) {
  return (
    <ListItem disablePadding>
      <ListItemText
        primary={leave.type}
        secondary={
          <div className="flex items-center gap-2">
            <div className="text-blue-400">
              {leave.days > 1 ? `${leave.days} days` : `${leave.days} day`}
            </div>
            <div>·</div>
            <div>{`${dayjs(leave.start).format("MMM D")} ${
              leave.days > 1 ? `- ${dayjs(leave.end).format("MMM D")} ` : ""
            }`}</div>
          </div>
        }
      />
    </ListItem>
  );
}
