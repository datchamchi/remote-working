import axiosInstance from "@/api/axiosInstance";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Project } from "@/types/project.type";
import { User } from "@/types/user.type";
import Spinner from "@/ui/Spinner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function DialogLeaveProject({
  currentUser,
  children,
  project,
}: {
  children: ReactNode;
  project: Project;
  currentUser: User;
}) {
  const [user, setUser] = useState<string>("");
  const navigate = useNavigate();

  const { data: listUser } = useQuery({
    queryKey: ["/user/search"],
    queryFn: handleSearchUser,
  });
  async function handleSearchUser() {
    try {
      const res = await axiosInstance.get(
        `/api/users/in-project?projectId=${project.id}`,
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      const { data } = res.data as { data: User[] };
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  const { mutate, isPending } = useMutation({
    mutationKey: ["/project/leave"],
    mutationFn: async () => {
      await axiosInstance.patch(`/api/projects/${project.id}/leave`, {
        userId: user,
      });
    },
    onSuccess: () => {
      navigate("/your-projects");
      toast.message("Leave Project Successfully");
    },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Leave Project</DialogTitle>
          {currentUser.email === project.leader ? (
            <DialogDescription>
              If you want to leave , please choose other become leader
            </DialogDescription>
          ) : (
            <DialogDescription>
              If you left project, all informations relating project will be
              removed
            </DialogDescription>
          )}
        </DialogHeader>
        {currentUser.email === project.leader && (
          <div className="mmin-h-40 max-h-64 divide-y-2 overflow-auto">
            <RadioGroup
              onValueChange={(value) => {
                setUser(value);
              }}
            >
              {listUser &&
                listUser.map((user) => (
                  <div className="flex items-center space-x-2" key={user.id}>
                    <RadioGroupItem
                      value={String(user.id)}
                      id={String(user.id)}
                    />

                    <Label htmlFor={String(user.id)}>{user.name}</Label>
                  </div>
                ))}
            </RadioGroup>
          </div>
        )}
        <DialogFooter>
          <Button
            type="submit"
            disabled={user.length === 0 && currentUser.email === project.leader}
            onClick={() => mutate()}
          >
            {isPending ? <Spinner w={5} h={5} /> : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
