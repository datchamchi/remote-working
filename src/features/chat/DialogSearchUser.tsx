import axiosInstance from "@/api/axiosInstance";
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
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { User } from "@/types/user.type";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AxiosError } from "axios";
import { toast } from "sonner";
const DialogSearchUser = ({
  children,
  refetch,
}: {
  children: React.ReactNode;
  refetch: () => void;
}) => {
  const [searchUser, setSearchUser] = useState("");
  const [listUser, setListUser] = useState<User[]>([]);
  const [listUserInRoom, setListUserInRoom] = useState<number[]>([]);
  const [message, setMessage] = useState("");
  async function handleSearchUser() {
    try {
      handleReset();
      const res = await axiosInstance.get(
        `/api/users/user-relate?name=${searchUser}`,
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      const { data } = res.data as { data: User[] };
      if (data.length === 0) setMessage("No user found");
      else {
        setMessage("");
        setListUser(data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  const handleCheckboxChange = (value: number) => {
    setListUserInRoom((prevState) =>
      prevState.includes(value)
        ? prevState.filter((item) => item !== value)
        : [...prevState, value],
    );
  };
  function handleReset() {
    setListUser([]);
    setListUserInRoom([]);
  }
  async function handleSubmitCreateRoom() {
    try {
      await axiosInstance.post(
        `/api/rooms`,
        { users: listUserInRoom },
        { headers: { "Content-Type": "application/json" } },
      );

      toast.info("Create room successfully");
      refetch();
    } catch (err) {
      if (err instanceof AxiosError) {
        const { message } = err.response?.data as {
          status: boolean;
          message: string;
        };
        toast.error(message);
      }
    }
  }
  return (
    <Dialog onOpenChange={handleReset}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Room</DialogTitle>
          <DialogDescription>Find others in your teams</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="name"
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              placeholder="Enter username here"
              className="col-span-3"
            />
            <Button variant={"destructive"} onClick={handleSearchUser}>
              Search
            </Button>
          </div>

          {message ? (
            <div>{message}</div>
          ) : (
            listUser.map((user) => (
              <div key={user.id}>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={String(user.id)}
                    value={String(user.id)}
                    onCheckedChange={() => handleCheckboxChange(user.id)}
                  />
                  <Label>{user.name}</Label>
                </div>
              </div>
            ))
          )}
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmitCreateRoom}
            disabled={listUserInRoom.length === 0}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogSearchUser;
