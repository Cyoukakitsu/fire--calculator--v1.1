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
    <div className="flex flex-col w-full max-w-162.5">
      {/* --- 上半部分：Situation --- */}
      <div className="bg-card text-card-foreground p-6 md:p-8 rounded-xl mt-10 w-full border border-border shadow-sm">
        <p className="text-3xl md:text-4xl font-bold text-center mb-6">
          Your Situation
        </p>

        {/* Current Age */}
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mb-4">
          <label className="text-lg md:text-xl font-semibold w-full md:w-40 text-left md:text-right">
            Current Age
          </label>
          <input
            type="number"
            name="currentAge"
            min="0"
            className="input input-bordered w-full md:w-80"
            placeholder="25"
            value={inputs.currentAge}
            onChange={handleInputChange}
            onWheel={(e) => (e.target as HTMLInputElement).blur()}
          />
        </div>

        {/* Target Age */}
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mb-4">
          <label className="text-lg md:text-xl font-semibold w-full md:w-40 text-left md:text-right">
            Simulation Age
          </label>
          <input
            type="number"
            name="targetAge"
            min="0"
            className="input input-bordered w-full md:w-80"
            placeholder="50"
            value={inputs.targetAge}
            onChange={handleInputChange}
            onWheel={(e) => (e.target as HTMLInputElement).blur()}
          />
        </div>

        {/* Current Savings */}
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mb-4">
          <label className="text-lg md:text-xl font-semibold w-full md:w-40 text-left md:text-right">
            Current Savings
          </label>
          <input
            type="number"
            name="currentSavings"
            min="0"
            className="input input-bordered w-full md:w-80"
            placeholder="1,000,000"
            value={inputs.currentSavings}
            onChange={handleInputChange}
            onWheel={(e) => (e.target as HTMLInputElement).blur()}
          />
        </div>
      </div>

      {/* --- 下半部分：Retirement --- */}
      <div className="bg-card text-card-foreground p-6 md:p-8 pb-4 rounded-xl mt-10 w-full border border-border shadow-sm">
        <p className="text-3xl md:text-4xl font-bold text-center mb-6">
          Your retirement
        </p>

        {/* Target Spending */}
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mb-4">
          <label className="text-lg md:text-xl font-semibold w-full md:w-64 text-left md:text-right">
            Post-FIRE Annual Spending
          </label>
          <input
            type="number"
            name="annualSpending"
            min="0"
            className="input input-bordered w-full md:w-80"
            value={inputs.annualSpending}
            onChange={handleInputChange}
            onWheel={(e) => (e.target as HTMLInputElement).blur()}
          />
        </div>

        {/* Annual Inflation */}
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mb-2">
          <label className="text-lg md:text-xl font-semibold w-full md:w-64 text-left md:text-right">
            Annual Inflation ({inputs.inflationRate}%)
          </label>
          <input
            type="range"
            name="inflationRate"
            min={0}
            max="10"
            className="range range-neutral w-full md:w-80"
            value={inputs.inflationRate}
            onChange={handleInputChange}
            onWheel={(e) => (e.target as HTMLInputElement).blur()}
          />
        </div>

        {/* Life Models */}
        <fieldset className="fieldset w-full">
          <div className="divider mt-10">
            <p className="text-sm md:text-base font-light text-center text-muted-foreground">
              I don&apos;t know how much I&apos;ll spend after FIRE
            </p>
          </div>

          <details
            className="collapse bg-card border border-border"
            ref={fireModelsRef as React.RefObject<HTMLDetailsElement>}
          >
            <summary
              className="collapse-title font-bold btn h-auto py-3 flex items-center justify-center cursor-pointer"
              onClick={onScrollToModels}
            >
              5 FIRE models for you to choose from
            </summary>

            {/* Model 1 */}
            <details className="collapse bg-card border border-border mt-2">
              <summary className="collapse-title font-semibold text-lg cursor-pointer">
                1. Lean FIRE
              </summary>
              <div className="collapse-content">
                <p className="font-light text-sm md:text-base mt-2 text-muted-foreground">
                  A minimalist retirement achieved through extreme frugality and
                  very low living expenses. <br />
                  <span className="font-bold text-foreground">
                    Approximate Annual Spending: ~1.5 - 2.5 Million JPY
                  </span>
                </p>
              </div>
            </details>

            {/* Model 2 */}
            <details className="collapse bg-card border border-border mt-2">
              <summary className="collapse-title font-semibold text-lg cursor-pointer">
                2. Fat FIRE
              </summary>
              <div className="collapse-content">
                <p className="font-light text-sm md:text-base mt-2 text-muted-foreground">
                  A luxurious, high-budget retirement with abundant spending and
                  lifestyle indulgences. <br />
                  <span className="font-bold text-foreground">
                    Approximate Annual Spending: 10 Million JPY+
                  </span>
                </p>
              </div>
            </details>

            {/* Model 3 */}
            <details className="collapse bg-card border border-border mt-2">
              <summary className="collapse-title font-semibold text-lg cursor-pointer">
                3. Traditional / Regular FIRE
              </summary>
              <div className="collapse-content">
                <p className="font-light text-sm md:text-base mt-2 text-muted-foreground">
                  The standard approach aiming for a comfortable, average
                  middle-class retirement lifestyle. <br />
                  <span className="font-bold text-foreground">
                    Approximate Annual Spending: ~4 - 6 Million JPY
                  </span>
                </p>
              </div>
            </details>

            {/* Model 4 */}
            <details className="collapse bg-card border border-border mt-2">
              <summary className="collapse-title font-semibold text-lg cursor-pointer">
                4. Barista FIRE
              </summary>
              <div className="collapse-content">
                <p className="font-light text-sm md:text-base mt-2 text-muted-foreground">
                  Semi-retirement using low-stress part-time income to cover
                  current expenses while letting investments grow. <br />
                  <span className="font-bold text-foreground">
                    Approximate Annual Spending: ~3 - 5 Million JPY
                  </span>
                </p>
              </div>
            </details>

            {/* Model 5 */}
            <details className="collapse bg-card border border-border mt-2">
              <summary className="collapse-title font-semibold text-lg cursor-pointer">
                5. Coast FIRE
              </summary>
              <div className="collapse-content">
                <p className="font-light text-sm md:text-base mt-2 text-muted-foreground">
                  Saving enough early for compound interest to cover future
                  retirement, allowing you to stop saving now and spend your
                  full income. <br />
                  <span className="font-bold text-foreground">
                    Approximate Annual Spending: 4 - 8 Million JPY+
                  </span>
                </p>
              </div>
            </details>
          </details>
        </fieldset>
      </div>
    </div>
  );
}

export default SituationCard;
