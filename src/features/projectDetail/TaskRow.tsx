import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Task } from "@/types/task.type";

import defaultPhoto from "../../assets/images/default.jpg";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const TaskRow = ({ task }: { task: Task }) => {
  return (
    <div className="flex items-center px-4 py-2 font-medium hover:bg-slate-200">
      <div className="min-w-20 text-sm font-semibold">{task.key}</div>

      <div className="flex-1 cursor-pointer hover:underline">
        {task.taskName}
      </div>
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage
            src={task.user.photo?.path || defaultPhoto}
            alt="Avatar"
          />
        </Avatar>
        <div></div>
        <Select defaultValue={task.state}>
          <SelectTrigger
            className={`h-6 w-20 rounded-sm p-0 text-[12px] text-white ${task.state == "done" ? "bg-green-500" : "bg-primary"}`}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="todo" className="text-[12px] font-semibold">
                TO DO
              </SelectItem>
              <SelectItem value="ongoing" className="text-[12px] font-semibold">
                ON GOING
              </SelectItem>
              <SelectItem value="done" className="text-[12px] font-semibold">
                DONE
              </SelectItem>
              <SelectItem value="overdue" className="text-[12px] font-semibold">
                OVERDUE
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TaskRow;
