"use client";

import React from "react";
import { FireInputs } from "@/types";

interface SituationCardProps {
  inputs: FireInputs;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fireModelsRef: React.RefObject<HTMLElement | null>;
  onScrollToModels: () => void;
}

function SituationCard({
  inputs,
  handleInputChange,
  fireModelsRef,
  onScrollToModels,
}: SituationCardProps) {
  return (
    <div className="flex flex-col w-full max-w-[600px]">
      {/* Section 01: Situation */}
      <div className="w-full border border-border border-l-4 border-l-primary bg-card">
        <div className="flex items-center gap-4 px-6 py-3 border-b border-border bg-muted/40">
          <span className="font-mono text-xs text-primary tracking-widest font-bold">01</span>
          <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-foreground">
            Your Situation
          </h2>
        </div>

        <div className="px-6 py-6 space-y-5">
          {/* Current Age */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5">
            <label className="text-sm font-medium text-muted-foreground sm:w-44 sm:text-right shrink-0">
              Current Age
            </label>
            <input
              type="number"
              name="currentAge"
              min="0"
              className="input input-bordered w-full sm:flex-1 text-sm"
              placeholder="25"
              value={inputs.currentAge}
              onChange={handleInputChange}
              onWheel={(e) => (e.target as HTMLInputElement).blur()}
            />
          </div>

          {/* Simulation Age */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5">
            <label className="text-sm font-medium text-muted-foreground sm:w-44 sm:text-right shrink-0">
              Simulation Age
            </label>
            <input
              type="number"
              name="targetAge"
              min="0"
              className="input input-bordered w-full sm:flex-1 text-sm"
              placeholder="50"
              value={inputs.targetAge}
              onChange={handleInputChange}
              onWheel={(e) => (e.target as HTMLInputElement).blur()}
            />
          </div>

          {/* Current Savings */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5">
            <label className="text-sm font-medium text-muted-foreground sm:w-44 sm:text-right shrink-0">
              Current Savings
            </label>
            <div className="flex items-center w-full sm:flex-1">
              <span className="px-3 h-10 flex items-center bg-muted border border-border border-r-0 text-sm text-muted-foreground font-mono shrink-0">
                ¥
              </span>
              <input
                type="number"
                name="currentSavings"
                min="0"
                className="input input-bordered flex-1 border-l-0 text-sm"
                placeholder="1,000,000"
                value={inputs.currentSavings}
                onChange={handleInputChange}
                onWheel={(e) => (e.target as HTMLInputElement).blur()}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 02: Retirement — attached below 01 */}
      <div className="w-full border border-border border-t-0 border-l-4 border-l-primary bg-card">
        <div className="flex items-center gap-4 px-6 py-3 border-b border-border bg-muted/40">
          <span className="font-mono text-xs text-primary tracking-widest font-bold">02</span>
          <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-foreground">
            Your Retirement
          </h2>
        </div>

        <div className="px-6 py-6 space-y-5">
          {/* Target Spending */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5">
            <label className="text-sm font-medium text-muted-foreground sm:w-44 sm:text-right shrink-0 leading-tight">
              Post-FIRE Annual Spending
            </label>
            <div className="flex items-center w-full sm:flex-1">
              <span className="px-3 h-10 flex items-center bg-muted border border-border border-r-0 text-sm text-muted-foreground font-mono shrink-0">
                ¥
              </span>
              <input
                type="number"
                name="annualSpending"
                min="0"
                className="input input-bordered flex-1 border-l-0 text-sm"
                value={inputs.annualSpending}
                onChange={handleInputChange}
                onWheel={(e) => (e.target as HTMLInputElement).blur()}
              />
            </div>
          </div>

          {/* Inflation Rate */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-5">
            <label className="text-sm font-medium text-muted-foreground sm:w-44 sm:text-right shrink-0 sm:pt-1">
              Annual Inflation
            </label>
            <div className="flex flex-col w-full sm:flex-1 gap-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-muted-foreground">0%</span>
                <span className="font-mono text-sm font-bold text-primary">{inputs.inflationRate}%</span>
                <span className="font-mono text-xs text-muted-foreground">10%</span>
              </div>
              <input
                type="range"
                name="inflationRate"
                min={0}
                max="10"
                className="range range-primary w-full"
                value={inputs.inflationRate}
                onChange={handleInputChange}
                onWheel={(e) => (e.target as HTMLInputElement).blur()}
              />
            </div>
          </div>

          {/* FIRE Models */}
          <div className="pt-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 h-px bg-border" />
              <p className="text-xs text-muted-foreground font-mono whitespace-nowrap">
                Not sure about spending?
              </p>
              <div className="flex-1 h-px bg-border" />
            </div>

            <details
              className="border border-border"
              ref={fireModelsRef as React.RefObject<HTMLDetailsElement>}
            >
              <summary
                className="flex items-center justify-between px-4 py-3 font-semibold text-sm cursor-pointer select-none hover:bg-muted/50 transition-colors duration-150"
                onClick={onScrollToModels}
              >
                <span>5 FIRE models for reference</span>
                <svg className="w-4 h-4 text-muted-foreground shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>

              <div className="border-t border-border divide-y divide-border">
                {[
                  { num: "1", name: "Lean FIRE", desc: "Minimalist retirement through extreme frugality.", amount: "~¥1.5–2.5M / year" },
                  { num: "2", name: "Fat FIRE", desc: "Luxurious, high-budget retirement with abundant spending.", amount: "¥10M+ / year" },
                  { num: "3", name: "Regular FIRE", desc: "Standard comfortable middle-class retirement.", amount: "~¥4–6M / year" },
                  { num: "4", name: "Barista FIRE", desc: "Semi-retirement with low-stress part-time income.", amount: "~¥3–5M / year" },
                  { num: "5", name: "Coast FIRE", desc: "Enough saved early for compound interest to do the work.", amount: "¥4–8M+ / year" },
                ].map((m) => (
                  <div key={m.num} className="px-4 py-3">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-primary shrink-0">{m.num}.</span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{m.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{m.desc}</p>
                        <p className="text-xs font-mono font-bold text-primary mt-1">{m.amount}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SituationCard;
