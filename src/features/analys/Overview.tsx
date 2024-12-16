import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import { CircularProgressbar } from "react-circular-progressbar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import MemberAnalys from "./MemberAnalys";
import { useQuery } from "@tanstack/react-query";
import { analysMembersInProject, analysProject } from "@/api/project-api";
import { Project } from "@/types/project.type";

const chartConfig = {
  type: {
    label: "total",
    color: "#2563eb",
  },
} satisfies ChartConfig;

const Overview = (props: { project: Project }) => {
  const { project } = props;
  const [time, setTime] = useState("all");
  const { data, isSuccess } = useQuery({
    queryKey: ["analys", time],
    queryFn: () => analysProject({ productId: String(project.id), type: time }),
  });

  if (isSuccess) {
    const total = data.length;
    const done = data.filter((task) => task.state === "done").length;
    const todo = data.filter((task) => task.state === "todo").length;
    const overdue = data.filter((task) => task.state === "overdue").length;
    const overviewData = [
      { type: "Todo", total: todo },
      { type: "Done", total: done },
      { type: "Overdue", total: overdue },
    ];

    const percentage = total == 0 ? 100 : Math.round((done / total) * 100);
    return (
      <>
        <div className="grid grid-cols-6 gap-4 p-4">
          <div className="h-[300px]">
            <div className="col-span-1 flex rounded-lg bg-[#141522] p-4 text-sm text-white sm:flex-col sm:text-base">
              <div className="flex flex-col justify-between gap-2">
                <p className="text-slate-400">Done</p>
                <p className="text-3xl font-semibold">{done}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex w-full items-center justify-center">
                  <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    styles={{
                      root: { height: "90px", width: "90px" },
                      path: {
                        stroke: "#546fff",
                      },
                      trail: {
                        stroke: "#1A1e38",
                      },
                      text: {
                        fill: "#fff",
                        fontSize: "24px",
                        textAnchor: "middle",
                        dominantBaseline: "middle",
                      },
                    }}
                  />
                </div>
              </div>
              <div className="mt-4 self-end">
                <p className="text-slate-400">Total</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-semibold">{total}</p>
                  <p className="text-slate-400">Tasks</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 space-y-4">
            <div className="flex items-center justify-between px-4">
              <p className="text-sm font-semibold text-green-500">Activity</p>

              <Select
                defaultValue={time}
                onValueChange={(value) => setTime(value)}
              >
                <SelectTrigger className="w-[180px] border-0 shadow-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select time</SelectLabel>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <ChartContainer config={chartConfig} className="h-[240px] w-full">
              <BarChart
                accessibilityLayer
                data={overviewData}
                margin={{
                  top: 20,
                }}
              >
                <XAxis
                  dataKey="type"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <CartesianGrid vertical={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="total"
                  fill="var(--color-type)"
                  radius={4}
                  barSize={"10%"}
                >
                  <LabelList
                    position="top"
                    offset={4}
                    // className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>
        </div>
        <MemberAnalys chartData={analysMembersInProject(project.users, data)} />
      </>
    );
  }
};

export default Overview;
