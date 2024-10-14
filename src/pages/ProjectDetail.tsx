import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { selectAuth } from "@/features/auth/authSlice";
import {
  HeaderProjectDetail,
  Information,
  ListTask,
} from "@/features/projectDetail";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ProjectDetail = () => {
  const currentUser = useSelector(selectAuth).user;
  const { name } = useParams<{ name: string }>();
  const [changeDescription, setChangeDescription] = useState(false);
  if (!currentUser) return;

  return (
    <div className="flex flex-1 flex-col gap-4 pt-4">
      <HeaderProjectDetail user={currentUser} name={name} />

      <div className="space-y-4">
        <Label className="font-semibold">Description</Label>
        <Input
          onFocus={() => setChangeDescription(true)}
          defaultValue="Your description project"
          className="w-1/2 border-none outline-none"
        />
        {changeDescription && (
          <div className="space-x-4">
            <Button className="bg-blue-600">Save</Button>
            <Button onClick={() => setChangeDescription(false)}>Cancel</Button>
          </div>
        )}
      </div>
      <div className="mt-6 grid grid-cols-6">
        <div className="col-span-4">
          <ListTask />
        </div>
        <div className="col-span-2">
          {/* <Information project={project} /> */}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
