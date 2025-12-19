"use client";

import React from "react";
import Image from "next/image";
import { FireInputs } from "@/types";

// 注意路径：根据你的文件结构，可能是 ../photo/ 或 ./photo/
// import Warren_Buffett from "../photo/Warren_Buffett.png";
// import Ray_Dalio from "../photo/Ray_Dalio.png";
// import Peter_Lynch from "../photo/Peter_Lynch.png";

interface StrategyCardProps {
  inputs: FireInputs;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  investorRef: React.RefObject<HTMLElement | null>;
  onScrollToInvestors: () => void;
}
function StrategyCard({
  inputs,
  handleInputChange,
  investorRef,
  onScrollToInvestors,
}: StrategyCardProps) {
  return (
    <div className="bg-base-100 p-8 pt-8 pb-4 rounded-xl mt-10 w-full max-w-162.5 shadow-sm">
      <p className="text-4xl font-bold text-center mb-6">
        Your investing strategy
      </p>

      {/* Stocks */}
      <fieldset className="fieldset mb-2">
        <legend className="fieldset-legend text-base font-semibold mb-1">
          Stocks / ETFs Investment yearly
        </legend>
        <input
          type="number"
          min="0"
          className="input input-bordered w-full"
          placeholder="100,000"
          value={inputs.stockYearly}
          onChange={handleInputChange}
          onWheel={(e) => (e.target as HTMLInputElement).blur()}
        />
        {/* 响应式优化：已应用 flex justify-end，很好！ */}
        <div className="flex items-center justify-end gap-2 mt-2">
          <p className="text-base ">Growth rate</p>
          <input
            type="number"
            step="0.1"
            className="input input-bordered input-sm w-20 join-item text-right"
            value={inputs.stockReturn}
            onChange={handleInputChange}
            onWheel={(e) => (e.target as HTMLInputElement).blur()}
          />
        </div>
      </fieldset>

      {/* Bonds */}
      <fieldset className="fieldset mb-2">
        <legend className="fieldset-legend text-base font-semibold mb-1">
          MMF / Bonds Investment yearly
        </legend>
        <input
          type="number"
          min="0"
          className="input input-bordered w-full"
          value={inputs.bondYearly}
          placeholder="100,000"
          onChange={handleInputChange}
          onWheel={(e) => (e.target as HTMLInputElement).blur()}
        />
        <div className="flex items-center justify-end gap-2 mt-2">
          <p className="text-base ">Growth rate</p>
          <input
            type="number"
            step="0.1"
            className="input input-bordered input-sm w-20 join-item text-right"
            value={inputs.bondReturn}
            onChange={handleInputChange}
            onWheel={(e) => (e.target as HTMLInputElement).blur()}
          />
        </div>
      </fieldset>

      {/* Cash */}
      <fieldset className="fieldset mb-2">
        <legend className="fieldset-legend text-base font-semibold mb-1">
          Cash / Savings yearly
        </legend>
        <input
          type="number"
          min="0"
          className="input input-bordered w-full"
          value={inputs.cashYearly}
          placeholder="100,000"
          onChange={handleInputChange}
          onWheel={(e) => (e.target as HTMLInputElement).blur()}
        />
        <div className="flex items-center justify-end gap-2 mt-2">
          <p className="text-base ">Growth rate</p>
          <input
            type="number"
            step="0.1"
            className="input input-bordered input-sm w-20 join-item text-right"
            value={inputs.cashReturn}
            onChange={handleInputChange}
            onWheel={(e) => (e.target as HTMLInputElement).blur()}
          />
        </div>
      </fieldset>

      {/* Investors Strategy */}
      <fieldset className="fieldset">
        <div className="divider mt-3 ">
          <p className="text-base font-light">
            I don&apos;t have investing strategy 😫
          </p>
        </div>
        <details
          className="collapse bg-base-100 border border-base-300"
          ref={investorRef as React.RefObject<HTMLDetailsElement>}
        >
          <summary
            className=" text-center font-bold btn flex"
            // 注意：这里使用了修正后的 prop 名字
            onClick={onScrollToInvestors}
          >
            Three investors&apos; strategies for you to choose ⬇️
          </summary>

          <div className="carousel w-full">
            {/* Slide 1 */}
            <div id="slide1" className="carousel-item relative w-full">
              <Image
                src="/photo/Warren_Buffett.png"
                alt="Warren Buffett"
                width={600}
                height={400}
                className="w-full object-cover rounded-xl"
              />
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                {/* 修复：上一张指向 #slide3 (因为只有3张图) */}
                <a href="#slide3" className="btn btn-circle btn-xs">
                  ❮
                </a>
                <a href="#slide2" className="btn btn-circle btn-xs">
                  ❯
                </a>
              </div>
            </div>

            {/* Slide 2 */}
            <div id="slide2" className="carousel-item relative w-full">
              <Image
                src="/photo/Ray_Dalio.png"
                alt="Ray Dalio"
                width={600}
                height={400}
                className="w-full object-cover rounded-xl"
              />
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide1" className="btn btn-circle btn-xs">
                  ❮
                </a>
                <a href="#slide3" className="btn btn-circle btn-xs">
                  ❯
                </a>
              </div>
            </div>

            {/* Slide 3 */}
            <div id="slide3" className="carousel-item relative w-full">
              <Image
                src="/photo/Peter_Lynch.png"
                alt="Peter Lynch"
                width={600}
                height={400}
                className="w-full object-cover rounded-xl"
              />
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide2" className="btn btn-circle btn-xs ">
                  ❮
                </a>
                {/* 修复：下一张指向 #slide1 */}
                <a href="#slide1" className="btn btn-circle btn-xs">
                  ❯
                </a>
              </div>
            </div>
          </div>
        </details>
      </fieldset>
    </div>
  );
}

export default StrategyCard;
