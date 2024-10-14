import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const TotalTask = () => {
  const percentage = 66;
  return (
    <div className="flex gap-4 rounded-lg bg-[#141522] p-4 text-sm text-white sm:flex-col sm:text-base">
      <div className="flex flex-col justify-between gap-6">
        <p className="text-slate-400">Completed</p>
        <p className="text-3xl font-semibold">65</p>
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
        <div className="flex items-center gap-2 self-center lg:flex-col lg:items-start">
          <p className="text-xl font-semibold">100</p>
          <p className="text-slate-400">Tasks</p>
        </div>
      </div>
    </div>
  );
};

export default TotalTask;
