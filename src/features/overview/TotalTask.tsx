import { Task } from "@/types/task.type";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const TotalTask = ({ task, taskDone }: { task: Task[]; taskDone: Task[] }) => {
  const percentage =
    task.length === 0 ? 100 : Math.floor((taskDone.length / task.length) * 100);
  return (
    <div className="col-span-2 flex gap-4 rounded-lg bg-[#141522] p-4 text-sm text-white sm:flex-col sm:text-base">
      <div className="flex flex-col justify-between gap-2">
        <p className="text-slate-400">Done</p>
        <p className="text-3xl font-semibold">{taskDone.length}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex w-20 items-center">
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={{
              root: { height: "80px", width: "80px" },
              path: {
                stroke: "#546fff",
              },
              trail: {
                stroke: "#1A1e38",
              },
              text: {
                fill: "#fff",
              },
            }}
          />
        </div>
        <div className="self-center">
          <p className="text-slate-400">Total</p>
          <div className="flex items-center gap-2">
            <p className="text-xl font-semibold">{task.length}</p>
            <p className="text-slate-400">Tasks</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalTask;
