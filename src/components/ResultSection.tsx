"use client";

import React from "react";
import FireChart from "./FireChart";
import { FireResult, FireInputs } from "@/types";

interface ResultSectionProps {
  result: FireResult | null;
  inputs: FireInputs;
  resultRef: React.RefObject<HTMLElement | null>;
}

function ResultSection({ result, inputs, resultRef }: ResultSectionProps) {
  const formatMoney = (num: number) => "¥ " + Number(num).toLocaleString();

  if (!result) return null;

  const principalPct = (result.principal / result.finalAssets) * 100;
  const interestPct = 100 - principalPct;

  return (
    <div
      className="flex flex-col items-center max-w-4xl w-full px-4 mb-10"
      ref={resultRef as React.RefObject<HTMLDivElement>}
    >
      {/* 头部标题 */}
      <div className="text-center mt-10">
        <p className="font-semibold text-3xl md:text-4xl mb-2 text-foreground">
          Your FIRE Path
        </p>
        <p className="text-lg md:text-xl max-w-2xl mx-auto font-thin text-muted-foreground">
          Financial projection based on current strategy
        </p>
      </div>

      <div className="w-full">
        {/* 核心结果卡片 */}
        <div className="bg-card p-6 md:p-8 rounded-xl mt-6 w-full border border-border">
          <p className="text-2xl font-bold text-center mb-6 text-card-foreground">
            Result
          </p>

          <div className="flex flex-col md:flex-row justify-between text-center gap-8 md:gap-0">
            <div>
              <p className="text-muted-foreground mb-1">Fire Age</p>
              <p className="text-4xl md:text-5xl font-bold text-foreground">
                {result.fireAge} <span className="text-2xl">years old</span>
              </p>
            </div>

            {inputs && (
              <div>
                <p className="text-muted-foreground mb-1">Inflation Used</p>
                <p className="text-4xl md:text-5xl font-bold text-accent">
                  {inputs.inflationRate}%
                </p>
              </div>
            )}

            <div>
              <p className="text-muted-foreground mb-1">Target Number</p>
              <p className="text-4xl md:text-5xl font-bold text-primary">
                {formatMoney(result.targetNumber)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 图表组件 */}
      <FireChart data={result.chartData} targetAmount={result.targetNumber} />

      {/* 资金详情卡片 */}
      <div className="bg-card p-6 md:p-8 rounded-xl mt-6 w-full border border-border">
        <p className="text-2xl font-bold text-center mb-6 text-card-foreground">
          How your money grows
        </p>

        {/* 双色进度条 */}
        <div className="p-2 md:p-4">
          <div className="w-full h-4 flex rounded-full overflow-hidden bg-muted">
            <div
              style={{ width: `${principalPct}%` }}
              className="bg-chart-1 transition-all duration-1000"
            ></div>
            <div
              style={{ width: `${interestPct}%` }}
              className="bg-chart-2 transition-all duration-1000"
            ></div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-10 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-chart-1 rounded-full"></div>
              <p className="text-sm md:text-base text-muted-foreground">
                Principal:{" "}
                <span className="font-semibold text-foreground">
                  {formatMoney(result.principal)}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-chart-2 rounded-full"></div>
              <p className="text-sm md:text-base text-muted-foreground">
                Interest:{" "}
                <span className="font-semibold text-foreground">
                  {formatMoney(result.interest)}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* 资产明细 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="rounded-lg p-4 text-center border border-border">
            <span className="text-sm text-muted-foreground">Stocks / ETFs</span>
            <p className="text-2xl md:text-3xl font-bold text-foreground">
              {formatMoney(result.breakdown.stock)}
            </p>
          </div>
          <div className="rounded-lg p-4 text-center border border-border">
            <span className="text-sm text-muted-foreground">Bonds / MMF</span>
            <p className="text-2xl md:text-3xl font-bold text-foreground">
              {formatMoney(result.breakdown.bond)}
            </p>
          </div>
          <div className="rounded-lg p-4 text-center border border-border">
            <span className="text-sm text-muted-foreground">Cash / Savings</span>
            <p className="text-2xl md:text-3xl font-bold text-foreground">
              {formatMoney(result.breakdown.cash)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultSection;
