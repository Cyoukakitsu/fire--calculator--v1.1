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
      className="w-full max-w-7xl mx-auto px-4 md:px-6 pb-16"
      ref={resultRef as React.RefObject<HTMLDivElement>}
    >
      {/* Results Header */}
      <div className="border-t-2 border-foreground mt-10 pt-8">
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono text-xs tracking-[0.22em] text-muted-foreground uppercase">
            Financial Projection
          </span>
          <div className="flex-1 h-px bg-border" />
          <span className="font-mono text-xs tracking-[0.22em] text-primary uppercase">
            Your FIRE Path
          </span>
        </div>

        {/* Hero metrics */}
        <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16 mb-10">
          <div>
            <p className="font-mono text-xs text-muted-foreground tracking-[0.2em] uppercase mb-1">
              FIRE Age
            </p>
            <p className="text-[7rem] md:text-[9rem] font-bold tracking-tighter leading-none text-foreground">
              {result.fireAge}
            </p>
          </div>

          <div className="flex flex-row md:flex-col gap-8 md:gap-5 pb-3">
            <div>
              <p className="font-mono text-xs text-muted-foreground tracking-[0.2em] uppercase mb-1">
                Inflation Used
              </p>
              <p className="text-3xl font-bold text-accent">
                {inputs.inflationRate}%
              </p>
            </div>
            <div>
              <p className="font-mono text-xs text-muted-foreground tracking-[0.2em] uppercase mb-1">
                Target Number
              </p>
              <p className="text-2xl font-bold text-primary">
                {formatMoney(result.targetNumber)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <FireChart data={result.chartData} targetAmount={result.targetNumber} />

      {/* Money Breakdown */}
      <div className="border border-border mt-6">
        <div className="flex items-center gap-4 px-6 py-3 border-b border-border bg-muted/50">
          <span className="font-mono text-xs text-primary tracking-widest font-bold">—</span>
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-foreground">
            How Your Money Grows
          </h3>
        </div>

        <div className="p-6">
          {/* Progress bar */}
          <div className="w-full h-1.5 flex overflow-hidden bg-muted mb-4">
            <div
              style={{ width: `${principalPct}%` }}
              className="bg-chart-1 transition-all duration-1000"
            />
            <div
              style={{ width: `${interestPct}%` }}
              className="bg-chart-2 transition-all duration-1000"
            />
          </div>

          <div className="flex flex-wrap gap-6 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-chart-1 shrink-0" />
              <span className="text-xs text-muted-foreground">
                Principal:{" "}
                <strong className="text-foreground font-semibold">
                  {formatMoney(result.principal)}
                </strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-chart-2 shrink-0" />
              <span className="text-xs text-muted-foreground">
                Interest:{" "}
                <strong className="text-foreground font-semibold">
                  {formatMoney(result.interest)}
                </strong>
              </span>
            </div>
          </div>

          {/* Breakdown grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="border-l-2 border-chart-1 pl-4 py-2">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                Stocks / ETFs
              </span>
              <p className="text-xl font-bold text-foreground mt-0.5">
                {formatMoney(result.breakdown.stock)}
              </p>
            </div>
            <div className="border-l-2 border-chart-2 pl-4 py-2">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                Bonds / MMF
              </span>
              <p className="text-xl font-bold text-foreground mt-0.5">
                {formatMoney(result.breakdown.bond)}
              </p>
            </div>
            <div className="border-l-2 border-chart-3 pl-4 py-2">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                Cash / Savings
              </span>
              <p className="text-xl font-bold text-foreground mt-0.5">
                {formatMoney(result.breakdown.cash)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultSection;
