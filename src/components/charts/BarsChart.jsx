import {
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
const sampleData = [
  { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
  { name: "Page A", uv: 200, pv: 2300, amt: 2400 },
  { name: "Page A", uv: 400, pv: 2320, amt: 200 },
];

export default function BarsChart({
  data = sampleData,
  lineKey = "uv",
  xKey = "pv",
  yKey = "amt",
}) {
  return (
    <ResponsiveContainer width="100%" minHeight={300} height="100%">
      <BarChart data={data || sampleData}>
        <Bar type="monotone" dataKey={lineKey} fill="#FF6636" />
        <XAxis dataKey={xKey} />
        <YAxis width={10} />
      </BarChart>
    </ResponsiveContainer>
  );
}
