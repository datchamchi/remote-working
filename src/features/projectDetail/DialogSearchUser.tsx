import axiosInstance from "@/api/axiosInstance";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { User } from "@/types/user.type";
import { Checkbox } from "@/components/ui/checkbox";

const DialogSearchUser = (props: {
  projectId: number | undefined;
  openDialog: boolean;
  handleToggleDialog: () => void;
  handleSendInvite: (to: string[]) => void;
}) => {
  const { handleSendInvite, handleToggleDialog, openDialog, projectId } = props;
  const [searchUser, setSearchUser] = useState("");
  const [listUser, setListUser] = useState<User[]>([]);
  const [listUserInRoom, setListUserInRoom] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  async function handleSearchUser() {
    try {
      handleReset();
      const res = await axiosInstance.get(
        `/api/users/user-relate?projectId=${projectId}&&name=${searchUser}`,
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
  const handleCheckboxChange = (value: string) => {
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
  function handleSubmit() {
    handleSendInvite(listUserInRoom);
  }
  return (
    <Dialog open={openDialog} onOpenChange={handleReset}>
      <DialogContent
        className="sm:max-w-[425px]"
        closeDialog={handleToggleDialog}
      >
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>Find others to invite to team</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="name"
              defaultValue={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              placeholder="Enter username here"
              className="col-span-3 border-slate-500"
            />
            <Button variant={"destructive"} onClick={handleSearchUser}>
              Search
            </Button>
          </div>

          {message ? (
            <div>{message}</div>
          ) : (
            <div className="mmin-h-40 max-h-64 divide-y-2 overflow-auto">
              {listUser.map((user) => (
                <div key={user.id} className="py-2">
                  <div className="flex h-10 items-center space-x-2">
                    <Checkbox
                      id={String(user.id)}
                      value={String(user.id)}
                      onCheckedChange={() => handleCheckboxChange(user.email)}
                    />
                    <div>
                      <p className="text-primary">{user.name}</p>
                      <p className="text-[12px]">{user.email}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={listUserInRoom.length === 0}
          >
            Invite{" "}
            {listUserInRoom.length > 1 ? `${listUserInRoom.length} others` : ""}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogSearchUser;
