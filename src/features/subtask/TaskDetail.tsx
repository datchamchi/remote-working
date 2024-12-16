import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Task } from "@/types/task.type";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

const TaskDetail = ({ task }: { task: Task }) => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-start">
          Description
        </Label>
        <Input
          id="description"
          disabled={task.state === "overdue"}
          defaultValue={task.description}
          //   onChange={(e) => setDescription(e.target.value)}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-start">
          Created At
        </Label>
        <Input
          type="text"
          disabled
          id="description"
          value={format(task.createdAt, "hh:mm - PPP")}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-start">
          Proccess
        </Label>
        <Select
          disabled={task.state === "overdue"}
          //   onValueChange={(value: "todo" | "done" | "ongoing") =>
          //     setTaskState(value)
          //   }
        >
          <SelectTrigger className="col-span-3 rounded-lg border-2 border-slate-200">
            {/* <SelectValue placeholder={taskState} /> */}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todo">to do</SelectItem>
            <SelectItem value="ongoing">ongoing</SelectItem>
            <SelectItem value="done">done</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="username" className="col-span-1 text-start">
          Due Date
        </Label>
        <div className="col-span-3 flex items-center gap-2">
          <Input
            disabled={task.state === "overdue"}
            type="time"
            className="w-1/3 rounded-lg border-2 border-slate-200 px-2 py-1"
            // defaultValue={time}
            // onChange={(e) => setTime(e.target.value)}
          />

          {/* <Popover>
            <PopoverTrigger asChild>
              <Button
                disabled={task.state === "overdue"}
                variant={"outline"}
                className={cn(
                  "flex-1 justify-start text-left font-normal",
                  !day && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {day}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={new Date(task.estimate)}
                onSelect={(value) => {
                  if (!value) return;
                  setDay(format(value, "dd-MM-yyyy"));
                }}
              />
            </PopoverContent>
          </Popover> */}
        </div>
      </div>
      {task.state === "overdue" && (
        <div className="font-semibold text-red-600">This Task is overdue</div>
      )}
    </div>
  );
};

export default TaskDetail;
