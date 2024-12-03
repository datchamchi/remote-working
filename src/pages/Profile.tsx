import axiosInstance from "@/api/axiosInstance";
import { selectAuth } from "@/app/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/ui/Header";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import defaultPicture from "../assets/images/default.jpg";
import Spinner from "@/ui/Spinner";
import { AxiosError } from "axios";
const Profile = () => {
  const currentUser = useSelector(selectAuth).user;
  const [changePassword, setChangePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<null | File>(null);
  const [user, setUser] = useState<Record<string, string>>({
    name: "",
    photo: currentUser?.photo?.path || "",
    phone: currentUser?.phone || "",
    email: "",
  });

  const [updatePassword, setUpdatePassword] = useState<Record<string, string>>({
    currentPass: "",
    newPass: "",
    confirmPass: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpenFile = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      if (!files[0].name.includes("jpg") && !files[0].name.includes("png")) {
        toast.error("Invalid photo", {
          description: "Photo is only jpg/png",
        });
        return;
      }
      setFile(files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, photo: reader.result as string });
      };
      reader.readAsDataURL(files[0]);
    }
  };
  useEffect(() => {
    if (currentUser)
      setUser({
        name: currentUser.name,
        photo: currentUser.photo?.path || "",
        phone: currentUser.phone || "",
        email: currentUser.email,
      });
  }, [currentUser]);
  if (!currentUser) return;

  function handleReset() {
    if (currentUser) {
      setUser({
        name: currentUser.name,
        photo: currentUser.photo?.path || "",
        phone: currentUser.phone || "",
        email: currentUser.email,
      });
    }
    setUpdatePassword({
      currentPass: "",
      newPass: "",
      confirmPass: "",
    });
  }
  async function handleSubmit() {
    const formData = new FormData();

    if (!currentUser) return;
    Object.keys(user).forEach((key) => {
      if (key != "photo" && user[key]) formData.append(key, user[key]);
    });
    if (file) formData.append("photo", file);
    Object.keys(updatePassword).forEach((key) => {
      if (updatePassword[key]) formData.append(key, updatePassword[key]);
    });
    setIsLoading(true);
    await axiosInstance
      .patch(`/api/users/${currentUser.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((data) => {
        const { data: user } = data.data;
        localStorage.setItem("user", JSON.stringify(user));
        setIsLoading(false);
        toast.info("Update information successfully");
        setTimeout(window.location.reload, 1000);
      })
      .catch((err: AxiosError) => {
        const { message } = err.response?.data as { message: string };
        setIsLoading(false);
        toast.error(message);
      });
  }
  return (
    <div className="flex flex-1 flex-col gap-4 px-4">
      <div>
        <Header path={currentUser.photo?.path}>
          <div>
            <p className="text-xl font-medium text-primary">Setting</p>
          </div>
        </Header>
      </div>
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-1 space-y-4">
          <img
            src={user.photo || defaultPicture}
            className="max-h-52 w-full rounded-md object-cover"
          />
          <div className="flex justify-center bg-slate-200 p-2">
            <div
              className="w-[95%] cursor-pointer rounded-lg bg-white px-4 py-1 text-center text-sm text-black"
              onClick={handleOpenFile}
            >
              Upload Photo
            </div>
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div className="col-span-4 space-y-4 px-4">
          <div className="flex gap-4">
            <div className="space-y-2">
              <label className="text-sm">Username</label>
              <Input
                value={user.name}
                onChange={(e) => {
                  setUser({ ...user, name: e.target.value });
                }}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm">Phone</label>
              <Input
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                placeholder="+84"
              />
            </div>
          </div>
          <div className="space-y-2 sm:w-1/2">
            <label className="text-sm">Email</label>
            <Input
              disabled={true}
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div
            className="cursor-pointer text-sm text-primary underline"
            onClick={() => setChangePassword(!changePassword)}
          >
            Change your password
          </div>
          {changePassword && (
            <>
              <div className="space-y-2 sm:w-1/2">
                <label className="text-sm">Current Password</label>
                <Input
                  placeholder="*****"
                  value={updatePassword.currentPass}
                  onChange={(e) =>
                    setUpdatePassword({
                      ...updatePassword,
                      currentPass: e.target.value,
                    })
                  }
                  type="password"
                />
              </div>
              <div className="space-y-2 sm:w-1/2">
                <label className="text-sm">New Password</label>
                <Input
                  placeholder="*****"
                  value={updatePassword.newPass}
                  onChange={(e) =>
                    setUpdatePassword({
                      ...updatePassword,
                      newPass: e.target.value,
                    })
                  }
                  type="password"
                />
              </div>
              <div className="space-y-2 sm:w-1/2">
                <label className="text-sm">Confirm Password</label>
                <Input
                  placeholder="*****"
                  value={updatePassword.confirmPass}
                  onChange={(e) =>
                    setUpdatePassword({
                      ...updatePassword,
                      confirmPass: e.target.value,
                    })
                  }
                  type="password"
                />
              </div>
            </>
          )}
          <div className="flex w-1/2 justify-end gap-2">
            <Button variant={"default"} onClick={handleReset}>
              Cancel
            </Button>
            <Button variant={"destructive"} onClick={handleSubmit}>
              {isLoading ? <Spinner w={5} h={5} /> : "Update"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
