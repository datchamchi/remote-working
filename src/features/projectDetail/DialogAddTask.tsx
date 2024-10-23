import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ReactNode, useState } from "react";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Project } from "@/types/project.type";
import { useMutation } from "@tanstack/react-query";
import { addTask } from "@/api/task-api";
import { useForm } from "react-hook-form";
import { TaskSchema } from "@/dto/TaskDto";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Spinner from "@/ui/Spinner";
import { useSelector } from "react-redux";
import { selectAuth } from "../auth/authSlice";

const DialogAddTask = ({
  children,
  project,
  refetch,
  openDialog,
  closeDialog,
}: {
  children: ReactNode;
  project: Project;
  refetch: () => void;
  openDialog: boolean;
  closeDialog: () => void;
}) => {
  const currentUser = useSelector(selectAuth).user;
  const [openChooseUser, setOpenChooseUser] = useState(false);
  const checkIsLeader = currentUser
    ? currentUser.email === project.leader
    : false;
  const [username, setUsername] = useState(currentUser?.name);
  const { mutate, isPending } = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      closeDialog();
      refetch();
    },
  });

  const form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      taskName: "",
      description: "",
      assign: currentUser ? currentUser.id : 0,
      estimate: new Date(),
    },
  });
  function handleReset() {
    form.reset();
  }
  function handleSubmit(values: z.infer<typeof TaskSchema>) {
    const { assign, description, estimate, taskName } = values;
    mutate({
      taskName,
      description,
      estimate,
      assign,
      projectId: String(project.id),
    });
  }

  return (
    <div>
      <Dialog open={openDialog} onOpenChange={handleReset}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]" closeDialog={closeDialog}>
          <DialogHeader>
            <DialogTitle className="tracking-widest">Add New Task</DialogTitle>
            <div className="flex items-center gap-2 font-semibold">
              <DialogDescription>{project.projectName}</DialogDescription>
            </div>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="taskName"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="col-span-1 font-semibold">
                      Task Name
                    </FormLabel>
                    <FormControl className="col-span-3">
                      <Input {...field} />
                    </FormControl>

                    <FormMessage className="col-start-1 col-end-5" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="col-span-1 font-semibold">
                      Description
                    </FormLabel>
                    <FormControl className="col-span-3">
                      <Input {...field} />
                    </FormControl>

                    <FormMessage className="col-start-1 col-end-5" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="estimate"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="col-span-1 font-semibold">
                      Due Date
                    </FormLabel>
                    <FormControl className="col-span-3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[280px] justify-start text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {format(field.value, "PPP")}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(value) => {
                              if (!value) return;
                              field.onChange(value);
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>

                    <FormMessage className="col-start-1 col-end-5" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="assign"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="col-span-1 font-semibold">
                      Assign to
                    </FormLabel>
                    <FormControl className="col-span-3">
                      <Popover
                        open={openChooseUser}
                        onOpenChange={setOpenChooseUser}
                      >
                        <PopoverTrigger asChild disabled={!checkIsLeader}>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[280px] justify-between"
                          >
                            {username}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[280px] p-0">
                          <Command>
                            <CommandInput
                              placeholder="Search User..."
                              className="h-9 w-full"
                            />
                            <CommandList>
                              <CommandEmpty>No User Found</CommandEmpty>
                              <CommandGroup>
                                {project.users.map((user) => (
                                  <CommandItem
                                    key={user.id}
                                    value={"" + user.id}
                                    onSelect={(currentValue) => {
                                      field.onChange(Number(currentValue));
                                      setUsername(user.name);
                                      setOpenChooseUser(false);
                                    }}
                                  >
                                    {user.name}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        field.value === user.id
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>

                    <FormMessage className="col-start-1 col-end-5" />
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <Button onClick={closeDialog}>Cancel</Button>
                <Button type="submit" className="bg-primary hover:bg-blue-600">
                  {isPending ? <Spinner h={5} w={5} /> : "Save"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogAddTask;
