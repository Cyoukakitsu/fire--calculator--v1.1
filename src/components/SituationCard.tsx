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
      <div className="bg-base-100 p-6 md:p-8 rounded-xl mt-10 w-full shadow-sm">
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

      {/* --- 下半部分：Retirement (重点修改区域) --- */}
      <div className="bg-base-100 p-6 md:p-8 pb-4 rounded-xl mt-10 w-full shadow-sm">
        <p className="text-3xl md:text-4xl font-bold text-center mb-6">
          Your retirement
        </p>

        {/* Target Spending - 修复：允许换行，调整宽度 */}
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mb-4">
          {/* 1. 去掉 whitespace-nowrap：防止手机上撑爆屏幕 
             2. md:w-64：给长文字更多空间，并右对齐
          */}
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

        {/* Life Models - 修复：重构折叠面板结构 */}
        <fieldset className="fieldset w-full">
          <div className="divider mt-10">
            <p className="text-sm md:text-base font-light text-center">
              I don&apos;t know how much I&apos;ll spend after FIRE 😫
            </p>
          </div>

          <details
            className="collapse bg-base-100 border border-base-300"
            ref={fireModelsRef as React.RefObject<HTMLDetailsElement>}
          >
            <summary
              className="collapse-title font-bold btn h-auto py-3 flex items-center justify-center"
              onClick={onScrollToModels}
            >
              5 FIRE models for you to choose from ⬇️
            </summary>

            {/* 修改说明：
               DaisyUI 的 collapse 组件，标准写法是：
               <summary>标题</summary>
               <div className="collapse-content">内容</div>
               你之前把内容全塞在 summary 里了，这会导致手机上显示混乱。
            */}

            {/* Model 1 */}
            <details className="collapse bg-base-100 border border-base-300 mt-2">
              <summary className="collapse-title font-semibold text-lg">
                1. Lean FIRE 🍜
              </summary>
              <div className="collapse-content">
                <p className="font-light text-sm md:text-base mt-2">
                  A minimalist retirement achieved through extreme frugality and
                  very low living expenses. <br />
                  <span className="font-bold">
                    Approximate Annual Spending: ~1.5 - 2.5 Million JPY
                  </span>
                </p>
              </div>
            </details>

            {/* Model 2 */}
            <details className="collapse bg-base-100 border border-base-300 mt-2">
              <summary className="collapse-title font-semibold text-lg">
                2. Fat FIRE 🍷
              </summary>
              <div className="collapse-content">
                <p className="font-light text-sm md:text-base mt-2">
                  A luxurious, high-budget retirement with abundant spending and
                  lifestyle indulgences. <br />
                  <span className="font-bold">
                    Approximate Annual Spending: 10 Million JPY+
                  </span>
                </p>
              </div>
            </details>

            {/* Model 3 */}
            <details className="collapse bg-base-100 border border-base-300 mt-2">
              <summary className="collapse-title font-semibold text-lg">
                3. Traditional / Regular FIRE 🏠
              </summary>
              <div className="collapse-content">
                <p className="font-light text-sm md:text-base mt-2">
                  The standard approach aiming for a comfortable, average
                  middle-class retirement lifestyle. <br />
                  <span className="font-bold">
                    Approximate Annual Spending: ~4 - 6 Million JPY
                  </span>
                </p>
              </div>
            </details>

            {/* Model 4 */}
            <details className="collapse bg-base-100 border border-base-300 mt-2">
              <summary className="collapse-title font-semibold text-lg">
                4. Barista FIRE ☕️
              </summary>
              <div className="collapse-content">
                <p className="font-light text-sm md:text-base mt-2">
                  Semi-retirement using low-stress part-time income to cover
                  current expenses while letting investments grow. <br />
                  <span className="font-bold">
                    Approximate Annual Spending: ~3 - 5 Million JPY
                  </span>
                </p>
              </div>
            </details>

            {/* Model 5 */}
            <details className="collapse bg-base-100 border border-base-300 mt-2">
              <summary className="collapse-title font-semibold text-lg">
                5. Coast FIRE 🏂
              </summary>
              <div className="collapse-content">
                <p className="font-light text-sm md:text-base mt-2">
                  Saving enough early for compound interest to cover future
                  retirement, allowing you to stop saving now and spend your
                  full income. <br />
                  <span className="font-bold">
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
