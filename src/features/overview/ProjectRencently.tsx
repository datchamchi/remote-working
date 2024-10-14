import React from "react";
import ProjectCard from "./ProjectCard";
import { Link } from "react-router-dom";

const ProjectRencently = () => {
  const array = [1, 2, 3];
  return (
    <div>
      <div className="flex justify-between">
        <p className="font-semibold">Recent Project</p>
        <Link to="/" className="text-sm text-primary hover:underline">
          View all projects
        </Link>
      </div>
      <div>
        {array.map((el) => (
          <ProjectCard key={el} />
        ))}
      </div>
    </div>
  );
};

export default ProjectRencently;
