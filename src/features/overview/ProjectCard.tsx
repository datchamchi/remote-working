import React from "react";

const ProjectCard = () => {
  return (
    <div className="max-w-sm overflow-hidden rounded bg-white p-5 shadow-lg">
      <div className="mb-2 text-xl font-bold">Project Name</div>
      <p className="mb-2 text-base text-gray-700">
        Members:{" "}
        <span className="font-semibold">Member 1, Member 2, Member 3</span>
      </p>
      <p className="mb-2 text-base text-gray-700">
        Leader: <span className="font-semibold">Leader Name</span>
      </p>
      <p className="text-sm text-gray-500">
        Created on: <span className="font-semibold">October 9, 2024</span>
      </p>
    </div>
  );
};

export default ProjectCard;
