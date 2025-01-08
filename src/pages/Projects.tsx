import { selectAuth } from "@/app/authSlice";
import { HeaderProject, ListProject } from "@/features/projects";
import { useSelector } from "react-redux";

const Projects = () => {
  const currentUser = useSelector(selectAuth).user;

  if (!currentUser) return;
  return (
    <div className="flex flex-1 flex-col gap-4">
      <HeaderProject user={currentUser} />
      <div className="space-y-4 px-4">
        <ListProject />
      </div>
    </div>
  );
};

export default Projects;
