import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
} from "recharts";

const chartConfig = {
  type: {
    label: "total",
    color: "#2563eb",
  },
} satisfies ChartConfig;
const Actitvity = () => {
  const data = [
    { type: "Todo", total: 186 },
    { type: "Done", total: 305 },
    { type: "Overdue", total: 237 },
  ];
  return (
    <ResponsiveContainer>
      <ChartContainer config={chartConfig} className="h-[240px] w-full">
        <BarChart accessibilityLayer data={data}>
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
          />
        </BarChart>
      </ChartContainer>
    </ResponsiveContainer>
  );
};

export default Actitvity;
