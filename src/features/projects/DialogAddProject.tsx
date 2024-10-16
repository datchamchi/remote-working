import { ReactNode, useState } from "react";
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

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { formSchema } from "@/dto/ProjectDto";
import { useMutation } from "@tanstack/react-query";
import { addProject } from "@/api/project-api";
import Spinner from "@/ui/Spinner";

const DialogAddProject = ({
  children,
  refetch,
  open,
  handleClose,
}: {
  children: ReactNode;
  refetch: () => void;
  open: boolean;
  handleClose: () => void;
}) => {
  const [errMessage, setErrMessage] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      key: "",
      projectName: "",
      description: "",
    },
  });
  const keyValue = form.watch("projectName");

  function handleReset() {
    setErrMessage("");
    form.reset();
  }
  const { mutate, isPending } = useMutation({
    mutationFn: addProject,
    onSuccess: () => {
      handleReset();
      handleClose();
      refetch();
    },
    onError: (error) => {
      setErrMessage(error.message);
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({
      ...values,
      key:
        values.key.length === 0
          ? keyValue
              .split(/\s+/)
              .map((el) => el[0])
              .join("")
              .toUpperCase()
          : values.key,
    });
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={handleReset}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]" closeDialog={handleClose}>
          <DialogHeader>
            <DialogTitle className="tracking-widest">
              Add New Project
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Project Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="key"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Key</FormLabel>
                    <FormControl>
                      <Input
                        value={
                          field.value ||
                          keyValue
                            .split(/\s+/)
                            .map((el) => el[0])
                            .join("")
                            .toUpperCase()
                        }
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Descripton" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {errMessage && (
                <p className="text-sm font-semibold text-red-600">
                  {errMessage}
                </p>
              )}
              <div className="flex gap-4">
                <Button type="button" onClick={handleClose}>
                  Cancel
                </Button>

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

export default DialogAddProject;
