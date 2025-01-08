import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Project } from "@/types/project.type";

import { User } from "@/types/user.type";
import Header from "@/ui/Header";

const HeaderTaskDetail = ({
  user,
  taskName,
  projectId,
  project,
}: {
  user: User;
  taskName: string | undefined;
  project: Project;
  projectId: string | undefined;
}) => {
  return (
    <div className="z-10 bg-white">
      <Header path={user.photo?.path}>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/your-projects"
                className="text-xl hover:underline"
              >
                Projects
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbLink
                href={`/your-projects/${projectId}`}
                className="text-xl hover:underline"
              >
                {project.projectName}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage className="text-lg font-semibold text-primary">
                {taskName}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Header>
    </div>
  );
};

export default HeaderTaskDetail;
