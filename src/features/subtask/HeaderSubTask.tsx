import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { User } from "@/types/user.type";
import Header from "@/ui/Header";

const HeaderSubTask = ({
  user,
  taskKey,
}: {
  user: User;
  taskKey: string | undefined;
}) => {
  return (
    <div>
      <Header path={user.photo?.path}>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/your-tasks?page=1&time=deadline&type=all"
                className="text-xl hover:underline"
              >
                Tasks
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage className="text-lg font-semibold text-primary">
                {taskKey}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Header>
    </div>
  );
};

export default HeaderSubTask;
