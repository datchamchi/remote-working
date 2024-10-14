import { selectAuth } from "@/features/auth/authSlice";
import { HeaderProject, ListProject } from "@/features/projects";
import { useSelector } from "react-redux";

const Projects = () => {
  const currentUser = useSelector(selectAuth).user;

  if (!currentUser) return;
  return (
    <div className="flex flex-1 flex-col gap-4 pt-4">
      <HeaderProject user={currentUser} />
      <ListProject />
    </div>
  );
};

export default Projects;
