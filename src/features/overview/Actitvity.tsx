import {
  Line,
  LineChart,
  ResponsiveContainer,
  Text,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "M", complete: 1, incomplete: 0 },
  { name: "Tu", complete: 2, incomplete: 0 },
  { name: "Wed", complete: 3, incomplete: 1 },
  { name: "Th", complete: 4, incomplete: 2 },
  { name: "Fri", complete: 3, incomplete: 0 },
  { name: "Sa", complete: 3, incomplete: 0 },
  { name: "Sun", complete: 2, incomplete: 0 },
];

const Actitvity = () => {
  return (
    <ResponsiveContainer>
      <LineChart
        className="h-full w-full"
        data={data}
        margin={{ left: -20, right: 10, top: 10 }}
      >
        <Line
          type="monotone"
          dataKey="complete"
          stroke="#000"
          strokeWidth={2}
          // dot={false}
        />
        {/* <Line type="monotone" dataKey="incomplete" stroke="red" /> */}

        {/* <CartesianGrid stroke="#ccc" /> */}
        <XAxis dataKey="name" />
        <Tooltip />
        <YAxis axisLine={false} tickLine={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Actitvity;
