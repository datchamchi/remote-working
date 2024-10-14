import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HiMiniPlusSmall } from "react-icons/hi2";
import TaskRow from "./TaskRow";
import { Task } from "@/types/task.type";
import DialogAddTask from "./DialogAddTask";

const list: Task[] = [
  {
    id: "FE2024",
    taskName: "Hello World",
    description: "This is for functionality",
    createdAt: new Date(),
    estimate: new Date(),
    status: "todo",
    projectName: "Fe Spring",
  },
  {
    id: "FE2022",
    taskName: "Hello AE",
    description: "This is for functionality",
    createdAt: new Date(),
    estimate: new Date(),
    status: "todo",
    projectName: "Fe Spring",
  },
];
const ListTask = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <span className="text-xl font-semibold text-primary">
          Project's Tasks
        </span>
        <div className="flex items-center gap-4">
          <Select>
            <SelectTrigger className="w-[180px] rounded-sm border-2 border-slate-200">
              <SelectValue placeholder="Order by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="created">Created</SelectItem>
              <SelectItem value="status">Status</SelectItem>
              <SelectItem value="asignee">Asignee</SelectItem>
            </SelectContent>
          </Select>
          <DialogAddTask>
            <Button
              variant={"ghost"}
              className="flex items-center gap-1 bg-blue-600 text-white hover:bg-blue-500 hover:text-white"
            >
              <span>Add task</span>
              <HiMiniPlusSmall className="text-xl" />
            </Button>
          </DialogAddTask>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Progress
          value={60}
          className="w-4/5 bg-slate-400"
          indicatorColor="bg-primary"
        />
        <div className="text-slate-600">60% Done</div>
      </div>
      <div className="space-y-2">
        {list.map((task) => (
          <TaskRow task={task} key={task.id} />
        ))}
      </div>
    </div>
  );
};

export default ListTask;
