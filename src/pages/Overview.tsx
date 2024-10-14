import { useSelector } from "react-redux";
import { selectAuth } from "../features/auth/authSlice";
import {
  Actitvity,
  HeaderOverview,
  ProjectRencently,
  TaskOverview,
  TotalTask,
} from "../features/overview";

const Overview = () => {
  const currentUser = useSelector(selectAuth).user;
  console.log(currentUser);
  if (!currentUser) return;
  return (
    <div>
      <div className="py-4">
        <HeaderOverview user={currentUser} />
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-6">
        <div className="xl:col-span-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div>
              <TotalTask />
            </div>
            <div className="flex-1 self-stretch rounded-lg bg-white px-4 md:self-start">
              <div className="flex items-center justify-between p-4">
                <p className="text-sm font-semibold text-red-500">Activity</p>

                <select className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-green-700 outline-none">
                  <option selected value="week">
                    This week
                  </option>
                  <option value="month">This month</option>
                </select>
              </div>
              <div className="h-36 w-full">
                <Actitvity />
              </div>
            </div>
          </div>
          <div>
            <TaskOverview />
          </div>
        </div>

        <div className="xl:col-span-2">
          <div className="bg-white">
            <ProjectRencently />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
