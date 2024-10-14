import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Task } from "@/types/task.type";
import { useState } from "react";
import {
  HiOutlineCheck,
  HiOutlinePencilSquare,
  HiXMark,
} from "react-icons/hi2";

const TaskRow = ({ task }: { task: Task }) => {
  const [openChange, setOpenChange] = useState(true);
  const [nameTask, setNameTask] = useState(task.taskName);
  return (
    <div className="flex items-center font-medium hover:bg-slate-200">
      <div className="min-w-20 text-sm">{task.id}</div>
      <div className="relative flex-1">
        <Input
          onBlur={() => {
            setNameTask(task.taskName);
            setOpenChange(true);
          }}
          onChange={(e) => setNameTask(e.target.value)}
          className="border-none font-semibold outline-none hover:underline focus:no-underline"
          value={nameTask}
          disabled={openChange}
        />
        <HiOutlinePencilSquare
          onClick={() => setOpenChange(false)}
          className="absolute bottom-2 right-4 cursor-pointer"
        />
        {!openChange && (
          <div className="absolute right-10 flex cursor-pointer gap-2">
            <div className="bg-slate-300 px-2 py-1">
              <HiOutlineCheck />
            </div>
            <div
              className="bg-slate-300 px-2 py-1"
              onClick={() => setOpenChange(true)}
            >
              <HiXMark />
            </div>
          </div>
        )}
      </div>
      <div className="min-w-8 justify-self-end">
        <Select defaultValue={task.status}>
          <SelectTrigger className="w-[150px] rounded-sm border-2 border-slate-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="text-sm">
            <SelectItem value="todo">TO DO</SelectItem>
            <SelectItem value="ongoing" className="text-primary">
              ON GOING
            </SelectItem>
            <SelectItem
              value="done"
              className="text-red-700 hover:text-red-700"
            >
              DONE
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TaskRow;
