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

  // 计算百分比，用于画底部的双色进度条
  const principalPct = (result.principal / result.finalAssets) * 100;
  const interestPct = 100 - principalPct;

  return (
    <div
      className="flex flex-col items-center max-w-4xl w-full px-4 mb-10"
      ref={resultRef as React.RefObject<HTMLDivElement>}
    >
      {/* --- 头部标题 --- */}
      <div className="text-center mt-10">
        <p className="font-semibold text-3xl md:text-4xl mb-2">
          Your FIRE Path
        </p>
        <p className="text-lg md:text-xl max-w-2xl mx-auto font-thin text-base-content/70">
          💸 Financial projection based on current strategy
        </p>
      </div>

      <div className="w-full ">
        {/* --- 核心结果卡片 --- */}
        {/* 🎨 优化：shadow-xl 与图表保持一致，bg-white 确保背景纯白 */}
        <div className=" p-6 md:p-8 rounded-xl mt-6 w-full shadow-xl border border-gray-100">
          <p className="text-2xl font-bold text-center mb-6  text-base-content">
            Result
          </p>

          <div className="flex flex-col md:flex-row justify-between text-center gap-8 md:gap-0">
            <div>
              <p className="text-gray-400 mb-1">Fire Age</p>
              <p className="text-4xl md:text-5xl font-bold  text-base-content">
                {result.fireAge} <span className="text-2xl">years old</span>
              </p>
            </div>

            {inputs && (
              <div>
                <p className="text-gray-400 mb-1">Inflation Used</p>
                <p className="text-4xl md:text-5xl font-bold text-accent">
                  {inputs.inflationRate}%
                </p>
              </div>
            )}

            <div>
              <p className="text-gray-400 mb-1">Target Number</p>
              <p className="text-4xl md:text-5xl font-bold text-primary">
                {formatMoney(result.targetNumber)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- 图表组件 (已包含 max-w-4xl 和 shadow) --- */}
      <FireChart data={result.chartData} targetAmount={result.targetNumber} />

      {/* --- 资金详情卡片 --- */}
      <div className=" p-6 md:p-8 rounded-xl mt-6 w-full shadow-xl border border-gray-100">
        <p className="text-2xl font-bold text-center mb-6  text-base-content">
          How your money grows
        </p>

        {/* 🎨 1. 双色进度条 (Purple + Green) */}
        <div className="p-2 md:p-4">
          <div className="w-full h-4 flex rounded-full overflow-hidden bg-gray-100">
            {/* 本金部分 (紫色) */}
            <div
              style={{ width: `${principalPct}%` }}
              className="bg-purple-500 transition-all duration-1000"
            ></div>
            {/* 利息部分 (绿色) */}
            <div
              style={{ width: `${interestPct}%` }}
              className="bg-emerald-500 transition-all duration-1000"
            ></div>
          </div>

          {/* 🎨 2. 图例：颜色与图表完全对应 */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-10 mt-4">
            {/* Principal Legend */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>{" "}
              {/* 🟣 紫色 */}
              <p className="text-sm md:text-base text-gray-400">
                Principal:{" "}
                <span className="font-semibold  text-base-content">
                  {formatMoney(result.principal)}
                </span>
              </p>
            </div>
            {/* Interest Legend */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>{" "}
              {/* 🟢 绿色 */}
              <p className="text-sm md:text-base text-gray-400">
                Interest:{" "}
                <span className="font-semibold  text-base-content">
                  {formatMoney(result.interest)}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* 资产明细 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="card-body  text-base-content rounded-lg p-4 text-center border border-gray-200">
            <span className="text-sm  text-base-content">Stocks / ETFs</span>
            <p className="text-2xl md:text-3xl font-bold  text-base-content">
              {formatMoney(result.breakdown.stock)}
            </p>
          </div>
          <div className="card-body  text-base-content rounded-lg p-4 text-center border border-gray-200">
            <span className="text-sm  text-base-content">Bonds / MMF</span>
            <p className="text-2xl md:text-3xl font-bold  text-base-content">
              {formatMoney(result.breakdown.bond)}
            </p>
          </div>
          <div className="card-body  text-base-content rounded-lg p-4 text-center border border-gray-200">
            <span className="text-sm  text-base-content">Cash / Savings</span>
            <p className="text-2xl md:text-3xl font-bold  text-base-content">
              {formatMoney(result.breakdown.cash)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultSection;
