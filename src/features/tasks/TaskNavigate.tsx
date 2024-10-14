import { useState } from "react";
import { HiOutlineSwitchVertical } from "react-icons/hi";
import SidebarSort from "./SidebarSort";
import TaskTable from "./TaskTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const TaskNavigate = () => {
  const [listFilter, setListFilter] = useState(["deadline", "todo", "myself"]);

  return (
    <div className="flex flex-1 flex-col gap-2">
      <div className="flex gap-4 bg-slate-200 p-4">
        <div className="flex items-center gap-2">
          <HiOutlineSwitchVertical />
          <span className="text-sm font-semibold">Sort by</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="py- rounded-lg bg-white px-2 underline">
            #{listFilter[0]}
          </div>
          <div className="rounded-lg bg-white px-2 py-1 underline">
            #{listFilter[1]}
          </div>
          <div className="rounded-lg bg-white px-2 py-1 underline">
            #{listFilter[2]}
          </div>
        </div>
        <div className="flex gap-4">
          <Input
            className="border-slate-600 px-4 py-2 text-sm"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="grid flex-1 grid-cols-6 gap-4">
        <SidebarSort listFilter={listFilter} setListFilter={setListFilter} />
        <div className="col-span-5">
          <TaskTable />
        </div>
      </div>
    </div>
  );
};

export default TaskNavigate;
