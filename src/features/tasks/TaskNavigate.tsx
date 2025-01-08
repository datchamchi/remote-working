import { HiOutlineSwitchVertical } from "react-icons/hi";
import SidebarSort from "./SidebarSort";
import TaskTable from "./TaskTable";

const TaskNavigate = () => {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <div className="flex justify-between gap-4 bg-slate-200 p-4">
        <div className="flex items-center gap-2">
          <HiOutlineSwitchVertical />
          <span className="text-sm font-semibold">Sort by</span>
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
