"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Label,
} from "recharts";
import { ChartDataPoint } from "@/types";

interface FireChartProps {
  data: ChartDataPoint[];
  targetAmount: number;
}

const FireChart = ({ data, targetAmount }: FireChartProps) => {
  if (!data || data.length === 0)
    return <div className="p-10 text-center">No Data</div>;

  const stackedData = data.map((item) => {
    const interest = item.assets - item.principal;
    return {
      ...item,
      interest: interest > 0 ? interest : 0,
    };
  });

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) return `¥${(value / 1000000000).toFixed(1)}B`;
    if (value >= 1000000) return `¥${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `¥${(value / 1000).toFixed(0)}k`;
    return `¥${value}`;
  };

  return (
    <div className="w-full h-96 max-w-4xl mx-auto mt-8 bg-white p-4 md:p-6 rounded-2xl shadow-xl border border-gray-100 flex flex-col overflow-hidden">
      <div className="text-center mb-6 shrink-0">
        <h3 className="text-xl font-bold text-gray-800">
          Your FIRE Projection
        </h3>
        <div className="flex justify-center gap-4 mt-2 text-sm">
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-purple-500"></span>
            <span className="text-gray-500">Principal</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span className="text-gray-500">Interest</span>
          </div>
        </div>
      </div>

      <div className="grow w-full min-h-0 min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={stackedData}
            margin={{ top: 20, right: 0, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.7} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.7} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              opacity={0.2}
            />

            <XAxis
              dataKey="age"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              tickFormatter={(val) => `${val}`}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              tickFormatter={formatCurrency}
              width={55} // 稍微改小一点宽度，给手机腾空间
            />

            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
              //使用 any 是处理 Recharts
              formatter={(value: any, name: any) => {
                const numValue = Number(value);
                if (!isNaN(numValue)) {
                  if (name === "Interest")
                    return [`¥${value.toLocaleString()}`, "Total Interest"];
                  if (name === "Principal")
                    return [`¥${value.toLocaleString()}`, "Total Principal"];
                }
                return [value, name];
              }}
              labelFormatter={(label: number) => `Age: ${label}`}
            />

            {targetAmount && (
              <ReferenceLine
                y={targetAmount}
                stroke="#059669"
                strokeDasharray="5 5"
              >
                <Label
                  value={`Goal: ${formatCurrency(targetAmount)}`}
                  position="insideTopLeft"
                  fill="#059669"
                  fontSize={14}
                  fontWeight="bold"
                  dy={-10}
                />
              </ReferenceLine>
            )}

            <Area
              type="monotone"
              dataKey="principal"
              stackId="1"
              stroke="#8B5CF6"
              fill="url(#colorPrincipal)"
              name="Principal"
            />

            <Area
              type="monotone"
              dataKey="interest"
              stackId="1"
              stroke="#10B981"
              fill="url(#colorInterest)"
              name="Interest"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FireChart;
