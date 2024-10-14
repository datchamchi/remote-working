import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Task } from "@/types/task.type";
import { ReactNode, useState } from "react";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { HiChevronRight } from "react-icons/hi2";
const DialogDetailTask = ({
  children,
  task,
}: {
  children: ReactNode;
  task: Task;
}) => {
  const [createDate, setCreateDate] = useState<Date | undefined>(
    task.createdAt,
  );
  const [createDueDate, setDueDate] = useState<Date | undefined>(
    task.createdAt,
  );
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{task.taskName}</DialogTitle>
            <div className="flex items-center gap-2 font-semibold">
              <DialogDescription>{task.projectName}</DialogDescription>
              <DialogDescription>
                <HiChevronRight />
              </DialogDescription>
              <DialogDescription>{task.id}</DialogDescription>
            </div>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-start">
                Description
              </Label>
              <Input
                id="description"
                defaultValue={task.description}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-start">
                Created At
              </Label>
              <Input
                type="date"
                disabled
                id="description"
                value={task.createdAt.toISOString().split("T")[0]}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-start">
                Due Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !createDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {createDate ? (
                      format(createDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={createDate}
                    onSelect={setCreateDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter>
            <Button>Delete</Button>
            <Button variant={"destructive"}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogDetailTask;
