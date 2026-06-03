"use client";

import React from "react";
import Image from "next/image";
import { FireInputs } from "@/types";

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
    <div className="w-full max-w-[600px] border border-border border-l-4 border-l-secondary bg-card">
      <div className="flex items-center gap-4 px-6 py-3 border-b border-border bg-muted/40">
        <span className="font-mono text-xs text-secondary tracking-widest font-bold">03</span>
        <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-foreground">
          Investing Strategy
        </h2>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Stocks */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2.5 h-2.5 bg-chart-1 shrink-0" />
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-foreground">
              Stocks / ETFs
            </span>
            <span className="text-xs text-muted-foreground ml-auto font-mono">per year</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center flex-1 min-w-0">
              <span className="px-3 h-10 flex items-center bg-muted border border-border border-r-0 text-sm text-muted-foreground font-mono shrink-0">
                ¥
              </span>
              <input
                type="number"
                name="stockYearly"
                min="0"
                className="input input-bordered flex-1 border-l-0 text-sm min-w-0"
                placeholder="100,000"
                value={inputs.stockYearly}
                onChange={handleInputChange}
                onWheel={(e) => (e.target as HTMLInputElement).blur()}
              />
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-muted-foreground">Growth</span>
              <div className="relative">
                <input
                  type="number"
                  name="stockReturn"
                  step="0.1"
                  className="input input-bordered input-sm w-20 text-right pr-5 text-sm"
                  value={inputs.stockReturn}
                  onChange={handleInputChange}
                  onWheel={(e) => (e.target as HTMLInputElement).blur()}
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Bonds */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2.5 h-2.5 bg-chart-2 shrink-0" />
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-foreground">
              MMF / Bonds
            </span>
            <span className="text-xs text-muted-foreground ml-auto font-mono">per year</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center flex-1 min-w-0">
              <span className="px-3 h-10 flex items-center bg-muted border border-border border-r-0 text-sm text-muted-foreground font-mono shrink-0">
                ¥
              </span>
              <input
                type="number"
                name="bondYearly"
                min="0"
                className="input input-bordered flex-1 border-l-0 text-sm min-w-0"
                placeholder="100,000"
                value={inputs.bondYearly}
                onChange={handleInputChange}
                onWheel={(e) => (e.target as HTMLInputElement).blur()}
              />
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-muted-foreground">Growth</span>
              <div className="relative">
                <input
                  type="number"
                  name="bondReturn"
                  step="0.1"
                  className="input input-bordered input-sm w-20 text-right pr-5 text-sm"
                  value={inputs.bondReturn}
                  onChange={handleInputChange}
                  onWheel={(e) => (e.target as HTMLInputElement).blur()}
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Cash */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2.5 h-2.5 bg-chart-3 shrink-0" />
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-foreground">
              Cash / Savings
            </span>
            <span className="text-xs text-muted-foreground ml-auto font-mono">per year</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center flex-1 min-w-0">
              <span className="px-3 h-10 flex items-center bg-muted border border-border border-r-0 text-sm text-muted-foreground font-mono shrink-0">
                ¥
              </span>
              <input
                type="number"
                name="cashYearly"
                min="0"
                className="input input-bordered flex-1 border-l-0 text-sm min-w-0"
                placeholder="100,000"
                value={inputs.cashYearly}
                onChange={handleInputChange}
                onWheel={(e) => (e.target as HTMLInputElement).blur()}
              />
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-muted-foreground">Growth</span>
              <div className="relative">
                <input
                  type="number"
                  name="cashReturn"
                  step="0.1"
                  className="input input-bordered input-sm w-20 text-right pr-5 text-sm"
                  value={inputs.cashReturn}
                  onChange={handleInputChange}
                  onWheel={(e) => (e.target as HTMLInputElement).blur()}
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Investor Strategies */}
        <div className="pt-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 h-px bg-border" />
            <p className="text-xs text-muted-foreground font-mono whitespace-nowrap">
              Need a strategy?
            </p>
            <div className="flex-1 h-px bg-border" />
          </div>

          <details
            className="border border-border"
            ref={investorRef as React.RefObject<HTMLDetailsElement>}
          >
            <summary
              className="flex items-center justify-between px-4 py-3 font-semibold text-sm cursor-pointer select-none hover:bg-muted/50 transition-colors duration-150"
              onClick={onScrollToInvestors}
            >
              <span>Three investor strategies</span>
              <svg className="w-4 h-4 text-muted-foreground shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>

            <div className="border-t border-border">
              <div className="carousel w-full">
                <div id="slide1" className="carousel-item relative w-full">
                  <Image
                    src="/photo/Warren_Buffett.png"
                    alt="Warren Buffett"
                    width={600}
                    height={400}
                    className="w-full object-cover"
                  />
                  <div className="absolute left-4 right-4 top-1/2 flex -translate-y-1/2 justify-between">
                    <a href="#slide3" className="btn btn-circle btn-xs cursor-pointer opacity-80 hover:opacity-100">❮</a>
                    <a href="#slide2" className="btn btn-circle btn-xs cursor-pointer opacity-80 hover:opacity-100">❯</a>
                  </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                  <Image
                    src="/photo/Ray_Dalio.png"
                    alt="Ray Dalio"
                    width={600}
                    height={400}
                    className="w-full object-cover"
                  />
                  <div className="absolute left-4 right-4 top-1/2 flex -translate-y-1/2 justify-between">
                    <a href="#slide1" className="btn btn-circle btn-xs cursor-pointer opacity-80 hover:opacity-100">❮</a>
                    <a href="#slide3" className="btn btn-circle btn-xs cursor-pointer opacity-80 hover:opacity-100">❯</a>
                  </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                  <Image
                    src="/photo/Peter_Lynch.png"
                    alt="Peter Lynch"
                    width={600}
                    height={400}
                    className="w-full object-cover"
                  />
                  <div className="absolute left-4 right-4 top-1/2 flex -translate-y-1/2 justify-between">
                    <a href="#slide2" className="btn btn-circle btn-xs cursor-pointer opacity-80 hover:opacity-100">❮</a>
                    <a href="#slide1" className="btn btn-circle btn-xs cursor-pointer opacity-80 hover:opacity-100">❯</a>
                  </div>
                </div>
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}

export default StrategyCard;
