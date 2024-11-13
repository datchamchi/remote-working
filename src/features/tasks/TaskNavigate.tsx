import { HiOutlineSwitchVertical } from "react-icons/hi";
import SidebarSort from "./SidebarSort";
import TaskTable from "./TaskTable";

import { Input } from "@/components/ui/input";
const TaskNavigate = () => {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <div className="flex justify-between gap-4 bg-slate-200 p-4">
        <div className="flex items-center gap-2">
          <HiOutlineSwitchVertical />
          <span className="text-sm font-semibold">Sort by</span>
        </div>

        <div className="flex gap-4">
          <Input
            className="border-2 border-slate-600 px-4 py-2 text-sm"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="grid flex-1 grid-cols-6 gap-4">
        <SidebarSort />
        <div className="col-span-5">
          <TaskTable />
        </div>
      </div>
    </div>
  );
};

export default TaskNavigate;
