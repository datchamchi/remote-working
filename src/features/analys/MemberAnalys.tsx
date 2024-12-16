import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";

const chartConfig = {
  done: {
    label: "done",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const renderLabel = (props: number) => {
  return `${props}%`;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const { total, done, overdue, todo } = payload[0].payload;
    return (
      <div
        style={{
          backgroundColor: "white",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <h4>{label}</h4>
        <ul style={{ paddingLeft: "20px", margin: 0 }}>
          <li>Total: {total}</li>
          <li>Done: {done}</li>
          <li>Overdue: {overdue}</li>
          <li>Todo: {todo}</li>
        </ul>
      </div>
    );
  }

  return null;
};

export default function MemberAnalys({
  chartData,
}: {
  chartData: { user: string; done: number; overdue: number }[];
}) {
  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle>Productitvity</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-60">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 42,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="user"
              type="category"
              tickLine={false}
              tickMargin={1}
              axisLine={false}
            />
            <XAxis dataKey="percentage" type="number" hide />
            <ChartTooltip cursor={false} content={<CustomTooltip />} />
            <Bar
              barSize={"20"}
              dataKey="percentage"
              layout="vertical"
              fill="var(--color-done)"
              radius={4}
            >
              {/* <LabelList
                dataKey="user"
                position="insideLeft"
                offset={8}
                style={{ fill: "#fff", fontSize: "12px" }}
              /> */}
              <LabelList
                dataKey="percentage"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
                formatter={renderLabel}
                style={{ fill: "var(--foreground)", fontSize: "12px" }}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
