import { deleteSubTask, updateSubTask } from "@/api/subtask-api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { SubTask } from "@/types/subTask.type";
import Spinner from "@/ui/Spinner";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { HiOutlineCheck } from "react-icons/hi";
import {
  HiMiniPlusCircle,
  HiMiniXCircle,
  HiMiniXMark,
  HiOutlineArrowDownLeft,
} from "react-icons/hi2";
import { toast } from "sonner";

const SubTaskRow = ({
  subTask,
  taskKey,
  refetch,
}: {
  subTask: SubTask;
  taskKey: string;
  refetch: () => void;
}) => {
  const [change, setChange] = useState(false);
  const [name, setName] = useState(subTask.name);
  const [status, setStatus] = useState<string>(subTask.status);
  const { mutate: update } = useMutation({
    mutationFn: updateSubTask,
    onSuccess: () => {
      refetch();
      toast.success("Update status successfully");
      setChange(false);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const { mutate: deleteSub, isPending } = useMutation({
    mutationFn: deleteSubTask,
    onSuccess: () => {
      toast.success("Delete successfully");
      refetch();
    },
  });
  function handleUpdate() {
    update({ subTaskId: subTask.id, name, status, taskKey });
  }
  return (
    <div className="relative">
      <div className="absolute -right-2 -top-2 cursor-pointer">
        <Dialog>
          <DialogTrigger asChild>
            <button type="button" className="bg-none">
              <HiMiniXCircle />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete SubTask</DialogTitle>
              <DialogDescription>This subtask will be remove</DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button
                type="submit"
                onClick={() => deleteSub({ taskKey, subTaskId: subTask.id })}
              >
                {isPending ? <Spinner h={5} w={5} /> : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Input
        value={name}
        readOnly={!change}
        onChange={(e) => setName(e.target.value)}
        onClick={() => setChange(true)}
        className={`pl-32 ${!status && "pl-24"} pr-4 disabled:cursor-pointer disabled:opacity-100`}
      />
      <div
        className={`absolute left-4 top-2 flex cursor-pointer items-center gap-2 rounded-sm ${status === "complete" ? "bg-green-600 text-white" : status === "incomplete" ? "bg-red-500 text-white" : "bg-slate-200"} px-2 text-sm`}
      >
        {!status ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <p className="flex items-center gap-2">
                <span>status</span>
                <HiMiniPlusCircle />
              </p>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setStatus("complete")}>
                  Complete
                  {status === "complete" && (
                    <DropdownMenuShortcut>
                      <HiOutlineArrowDownLeft />
                    </DropdownMenuShortcut>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setStatus("incomplete")}>
                  Incomplete
                  {status === "incomplete" && (
                    <DropdownMenuShortcut>
                      <HiOutlineArrowDownLeft />
                    </DropdownMenuShortcut>
                  )}
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <span>{status}</span>
            <HiMiniXCircle
              onClick={() => {
                setStatus("");
                setChange(true);
              }}
            />
          </>
        )}
      </div>
      {change && (
        <div className="absolute right-4 flex gap-2">
          <div
            className="cursor-pointer bg-slate-200 px-2 py-1"
            onClick={handleUpdate}
          >
            <HiOutlineCheck />
          </div>
          <div
            className="cursor-pointer bg-slate-200 px-2 py-1"
            onClick={() => {
              setName(subTask.name);
              setStatus(subTask.status);
              setChange(false);
            }}
          >
            <HiMiniXMark />
          </div>
        </div>
      )}
    </div>
  );
};

export default SubTaskRow;
