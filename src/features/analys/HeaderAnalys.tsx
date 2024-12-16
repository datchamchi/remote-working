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

const HeaderAnalys = ({ user, project }: { user: User; project: Project }) => {
  return (
    <div>
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
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/your-projects/${project.id}`}
                className="text-xl hover:underline"
              >
                {project.projectName}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-lg font-semibold text-red-600">
                Overview
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Header>
    </div>
  );
};

export default HeaderAnalys;
