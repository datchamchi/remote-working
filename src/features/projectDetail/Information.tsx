import { Project } from "@/types/project.type";
import { converDate } from "@/utils/utils";

const Information = ({ project }: { project: Project }) => {
  return (
    <div className="px-4">
      <div>Created At</div>
      <div>{converDate(project.createdAt)}</div>
    </div>
  );
};

export default Information;
