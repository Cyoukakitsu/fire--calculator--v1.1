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
  const yearsToFire = result.fireAge - inputs.currentAge;

  const totalSpan = inputs.targetAge - inputs.currentAge;
  const fireProgress =
    totalSpan > 0
      ? Math.min(96, Math.max(4, ((result.fireAge - inputs.currentAge) / totalSpan) * 100))
      : 50;

  const showFireLabel = fireProgress >= 8 && fireProgress <= 88;

  return (
    <div
      className="w-full pb-16"
      ref={resultRef as React.RefObject<HTMLDivElement>}
    >
      {/* Full-width inverted hero band */}
      <div className="w-full bg-foreground text-background mt-10 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-xs tracking-[0.22em] uppercase opacity-40">
              Financial Projection
            </span>
            <div className="flex-1 h-px bg-background opacity-20" />
            <span className="font-mono text-xs tracking-[0.22em] uppercase opacity-40">
              Your FIRE Path
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-16">
            {/* FIRE Age hero */}
            <div>
              <p className="font-mono text-xs tracking-[0.2em] uppercase opacity-50 mb-1">
                FIRE Age
              </p>
              <p className="text-[6rem] md:text-[8rem] font-bold tracking-tighter leading-none">
                {result.fireAge}
              </p>
            </div>

            {/* Secondary metrics */}
            <div className="flex flex-row md:flex-col gap-8 md:gap-5 pb-2">
              <div>
                <p className="font-mono text-xs tracking-[0.2em] uppercase opacity-50 mb-1">
                  Years to FIRE
                </p>
                <p className="text-3xl font-bold text-accent">
                  {yearsToFire}
                  <span className="text-base font-normal opacity-60 ml-1">yrs</span>
                </p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-[0.2em] uppercase opacity-50 mb-1">
                  Inflation Used
                </p>
                <p className="text-xl font-bold opacity-80">
                  {inputs.inflationRate}%
                </p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-[0.2em] uppercase opacity-50 mb-1">
                  Target Number
                </p>
                <p className="text-xl font-bold text-primary">
                  {formatMoney(result.targetNumber)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart + Breakdown + Timeline */}
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* ── Freedom Timeline ── */}
        <div className="border border-border border-l-4 border-l-primary bg-card mt-6">
          <div className="flex items-center gap-4 px-6 py-3 border-b border-border bg-muted/40">
            <span className="font-mono text-xs text-primary tracking-widest font-bold">◆</span>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-foreground">
              Freedom Timeline
            </h3>
            <span className="ml-auto font-mono text-xs text-muted-foreground">
              {yearsToFire} years to financial independence
            </span>
          </div>

          <div className="px-8 py-7">
            {/* Track */}
            <div className="relative h-1 bg-muted mb-10">
              {/* Amber fill: today → FIRE */}
              <div
                className="absolute inset-y-0 left-0 bg-primary transition-all duration-1000"
                style={{ width: `${fireProgress}%` }}
              />
              {/* Muted fill: FIRE → end */}
              <div
                className="absolute inset-y-0 bg-muted-foreground/20 transition-all duration-1000"
                style={{ left: `${fireProgress}%`, right: 0 }}
              />

              {/* Start marker */}
              <div className="absolute -top-1.5 left-0 w-4 h-4 bg-muted-foreground" />

              {/* FIRE diamond — rotated square */}
              <div
                className="absolute -top-2.5 w-6 h-6 bg-primary -translate-x-1/2 rotate-45 ring-2 ring-primary/30 transition-all duration-1000"
                style={{ left: `${fireProgress}%` }}
              />

              {/* End marker */}
              <div className="absolute -top-1.5 right-0 w-4 h-4 border-2 border-border bg-card" />
            </div>

            {/* Labels */}
            <div className="relative h-9">
              {/* Start */}
              <div className="absolute left-0">
                <p className="font-mono text-xs font-bold text-foreground">
                  Age {inputs.currentAge}
                </p>
                <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                  Today
                </p>
              </div>

              {/* FIRE label */}
              {showFireLabel && (
                <div
                  className="absolute -translate-x-1/2 text-center transition-all duration-1000"
                  style={{ left: `${fireProgress}%` }}
                >
                  <p className="font-mono text-xs font-bold text-primary whitespace-nowrap">
                    Age {result.fireAge}
                  </p>
                  <p className="font-mono text-[10px] text-primary/60 uppercase tracking-wider">
                    FIRE
                  </p>
                </div>
              )}

              {/* End */}
              <div className="absolute right-0 text-right">
                <p className="font-mono text-xs font-bold text-foreground">
                  Age {inputs.targetAge}
                </p>
                <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                  Sim End
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <FireChart data={result.chartData} targetAmount={result.targetNumber} />

        {/* Money Breakdown */}
        <div className="border border-border mt-6">
          <div className="flex items-center gap-4 px-6 py-3 border-b border-border bg-muted/40">
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
    </div>
  );
}

export default ResultSection;
