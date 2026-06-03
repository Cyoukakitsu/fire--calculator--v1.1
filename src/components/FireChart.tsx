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
    return (
      <div className="p-10 text-center text-muted-foreground font-mono text-sm">
        No Data
      </div>
    );

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
    <div className="w-full border border-border mt-6 bg-card">
      <div className="flex items-center gap-4 px-6 py-3 border-b border-border bg-muted/50">
        <span className="font-mono text-xs text-primary tracking-widest font-bold">~</span>
        <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-foreground">
          FIRE Projection
        </h3>
        <div className="ml-auto flex items-center gap-5">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-chart-1 shrink-0" />
            <span className="text-xs text-muted-foreground font-mono">Principal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-chart-2 shrink-0" />
            <span className="text-xs text-muted-foreground font-mono">Interest</span>
          </div>
        </div>
      </div>

      <div className="h-72 md:h-80 p-4 md:p-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={stackedData}
            margin={{ top: 20, right: 0, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0891b2" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#0891b2" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d97706" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#d97706" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              opacity={0.15}
            />

            <XAxis
              dataKey="age"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 11, fontFamily: "Space Mono, monospace" }}
              tickFormatter={(val) => `${val}`}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 11, fontFamily: "Space Mono, monospace" }}
              tickFormatter={formatCurrency}
              width={55}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "2px",
                border: "1px solid oklch(0.80 0.02 85)",
                boxShadow: "0 4px 12px -2px rgba(0,0,0,0.12)",
                fontFamily: "Space Mono, monospace",
                fontSize: "12px",
              }}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                stroke="#d97706"
                strokeDasharray="4 4"
                strokeOpacity={0.8}
              >
                <Label
                  value={`Goal: ${formatCurrency(targetAmount)}`}
                  position="insideTopLeft"
                  fill="#d97706"
                  fontSize={11}
                  fontWeight="bold"
                  fontFamily="Space Mono, monospace"
                  dy={-8}
                />
              </ReferenceLine>
            )}

            <Area
              type="monotone"
              dataKey="principal"
              stackId="1"
              stroke="#d97706"
              strokeWidth={1.5}
              fill="url(#colorPrincipal)"
              name="Principal"
            />

            <Area
              type="monotone"
              dataKey="interest"
              stackId="1"
              stroke="#0891b2"
              strokeWidth={1.5}
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
