"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  history: any[];
};

export default function Dashboard({ history }: Props) {

  const realCount = history.filter(
    (item) => item.prediction === "REAL"
  ).length;

  const fakeCount = history.filter(
    (item) => item.prediction === "FAKE"
  ).length;

  const data = [
    {
      name: "REAL",
      value: realCount,
    },
    {
      name: "FAKE",
      value: fakeCount,
    },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  const avgConfidence =
    history.length > 0
      ? (
          history.reduce(
            (acc, item) => acc + item.confidence,
            0
          ) / history.length
        ).toFixed(1)
      : 0;

  return (
    <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 mt-10 w-full max-w-4xl">

      <h2 className="text-3xl font-bold mb-8 text-center">
        AI Analytics Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-gray-800 rounded-xl p-6 text-center">
          <h3 className="text-gray-400 mb-2">
            Total Uploads
          </h3>

          <p className="text-4xl font-bold">
            {history.length}
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 text-center">
          <h3 className="text-gray-400 mb-2">
            REAL Images
          </h3>

          <p className="text-4xl font-bold text-green-400">
            {realCount}
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 text-center">
          <h3 className="text-gray-400 mb-2">
            Avg Confidence
          </h3>

          <p className="text-4xl font-bold text-blue-400">
            {avgConfidence}%
          </p>
        </div>
      </div>

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>

            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={120}
              dataKey="value"
              label
            >
              {
                data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))
              }
            </Pie>

            <Tooltip />

          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}