import { selectAuth } from "@/app/authSlice";
import { HeaderAnalys, Overview } from "@/features/analys";

import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const ProjectAnalys = () => {
  const currentUser = useSelector(selectAuth).user;
  const {
    state: { project },
  } = useLocation();

  if (!currentUser || !project) return;

  return (
    <div>
      <HeaderAnalys user={currentUser} project={project} />
      <Overview project={project} />
    </div>
  );
};

export default ProjectAnalys;
