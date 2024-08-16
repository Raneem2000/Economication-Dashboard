import { LineChart, Line, Tooltip, ResponsiveContainer, CartesianGrid, XAxis, YAxis } from "recharts";

function DurationLineChart({ data }) {
  // تأكد من أن البيانات تحتوي على المفاتيح الصحيحة
  const formattedData = data.map((item) => ({
    date: item.date,
    points: item.points,
    rounds: item.rounds,
  }));

  return (
    <ResponsiveContainer width="100%" height="80%">
      <LineChart width={300} height={100} data={formattedData}>
        <CartesianGrid stroke="#ffffff" strokeOpacity={0.2} />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip
          formatter={(value, name) => {
            switch (name) {
              case "points":
                return [`${value} points`, "Points"];
              case "rounds":
                return [`${value} rounds`, "Rounds"];
              default:
                return value;
            }
          }}
        />
        <Line type="monotone" dataKey="points" stroke="#5b2c90" strokeWidth={5} dot={false} />
        <Line type="monotone" dataKey="rounds" stroke="#ff7300" strokeWidth={5} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default DurationLineChart;
