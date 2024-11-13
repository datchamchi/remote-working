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

const HeaderProjectDetail = ({
  user,
  name,
}: {
  user: User;
  name: string | undefined;
}) => {
  if (!name) return;
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
              <BreadcrumbPage className="text-lg font-semibold text-primary">
                {name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Header>
    </div>
  );
};

export default HeaderProjectDetail;
