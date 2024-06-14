import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
const sampleData = [
  { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
  { name: "Page A", uv: 200, pv: 2300, amt: 2400 },
  { name: "Page A", uv: 400, pv: 2320, amt: 200 },
];

export default function LinearChart({
  data = sampleData,
  lineKey = "uv",
  xKey = "pv",
  yKey = "amt",
}) {
  return (
    <ResponsiveContainer width="100%" minHeight={300} height="100%">
      <LineChart data={data || sampleData}>
        <Line
          type="monotone"
          dataKey={lineKey}
          stroke="#8884d8"
          strokeWidth={1}
        />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey={xKey} />
        <YAxis width={10} />
      </LineChart>
    </ResponsiveContainer>
  );
}
