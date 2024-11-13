import { Badge } from "@/components/ui/badge";
import { Task } from "@/types/task.type";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    // const { name, count, uv } = payload[0].payload; // Dữ liệu của điểm được hover
    const { name, count, tasks } = payload[0].payload as {
      name: string;
      count: number;
      tasks: Task[];
    };
    return (
      <div className="custom-tooltip">
        {tasks.length > 0 && (
          <div className="flex flex-col gap-2">
            {tasks.map((task, index) => (
              <Badge key={index}>{task.taskName}</Badge>
            ))}
          </div>
        )}
      </div>
    );
  }
  return null;
};
const Actitvity = ({
  taskDone,
  taskTodo,
  taskOngoing,
}: {
  taskDone: Task[];
  taskOngoing: Task[];
  taskTodo: Task[];
}) => {
  const data = [
    { name: "Todo", count: taskTodo.length, tasks: taskTodo },
    { name: "Ongoing", count: taskOngoing.length, tasks: taskOngoing },
    { name: "Done", count: taskDone.length, tasks: taskDone },
    // { name: "Overdue", count: 4 },
  ];
  return (
    <ResponsiveContainer>
      <LineChart className="-mx-10" data={data}>
        <Line
          type="monotone"
          dataKey="count"
          stroke="#2f09c6"
          strokeWidth={2}
        />

        <XAxis dataKey="name" />
        <YAxis axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Actitvity;
