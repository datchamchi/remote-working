import { Button } from "@/components/ui/button";

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
import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
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

import { format, parse } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { formatDate } from "@/utils/utils";
import { selectAuth } from "@/app/authSlice";
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
      day: "",
      time: "",
    },
  });

  function handleReset() {
    form.reset();
  }
  function handleSubmit(values: z.infer<typeof TaskSchema>) {
    const { assign, description, day, time, taskName } = values;

    mutate({
      taskName,
      description,
      estimate: formatDate(day, time),
      assign,
      projectId: String(project.id),
    });
  }

  return (
    <div>
      <Dialog open={openDialog} onOpenChange={handleReset}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[420px]" closeDialog={closeDialog}>
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
              <div className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="col-span-1">Due Date</FormLabel>
                <div className="col-span-3 flex gap-2">
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormControl>
                          <Input
                            type="time"
                            className="w-full cursor-pointer"
                            defaultValue={field.value}
                            onChange={(value) => {
                              field.onChange(value.target.value);
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="day"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />

                                {field.value || "dd-MM-yyyy"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={parse(
                                  field.value,
                                  "dd-MM-yyyy",
                                  new Date(),
                                )}
                                onSelect={(value) => {
                                  if (!value) return;
                                  field.onChange(format(value, "dd-MM-yyy"));
                                }}
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

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
                            aria-expanded={"false"}
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
