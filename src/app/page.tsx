"use client";

import { useFireCalculator } from "@/hooks/useFireCalculator";
import { usePageScroll } from "@/hooks/usePageScroll";

import Navbar from "@/components/Navbar";
import SituationCard from "@/components/SituationCard";
import StrategyCard from "@/components/StrategyCard";
import ResultSection from "@/components/ResultSection";

const TICKER_ITEMS = [
  "4% SAFE WITHDRAWAL RULE",
  "25× ANNUAL SPEND = FIRE NUMBER",
  "COMPOUND GROWTH: TIME × PATIENCE",
  "PORTFOLIO: STOCKS · BONDS · CASH",
  "FIRE = FINANCIAL INDEPENDENCE, RETIRE EARLY",
];

const METHOD_STEPS = [
  { step: "01", action: "SAVE", desc: "Build your capital base systematically over time" },
  { step: "02", action: "INVEST", desc: "Put capital to work across diversified asset classes" },
  { step: "03", action: "RETIRE", desc: "Live on the 4% safe withdrawal rate from your portfolio" },
];

function Home() {
  const { inputs, handleInputChange, result, handleAnalyze } =
    useFireCalculator();

  const { refs, handlers } = usePageScroll(result);

  return (
    <>
      <Navbar />

      {/* Financial ticker bar */}
      <div className="w-full border-b border-border bg-primary overflow-hidden py-2">
        <div className="flex gap-12 ticker-animate whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              className="font-mono text-xs text-primary-foreground tracking-[0.15em] opacity-90 shrink-0"
            >
              {item}
              <span className="mx-6 opacity-40">·</span>
            </span>
          ))}
        </div>
      </div>

      <div className="bg-background min-h-screen w-full overflow-y-auto overflow-x-hidden">
        {/* Editorial Hero */}
        <div className="w-full max-w-7xl mx-auto px-6 pt-12 pb-0">
          <div className="pb-6 border-b-2 border-foreground">
            <div className="flex items-center gap-4 mb-5">
              <span className="font-mono text-xs tracking-[0.22em] text-muted-foreground uppercase">
                Financial Calculator
              </span>
              <div className="flex-1 h-px bg-border" />
              <span className="font-mono text-xs tracking-[0.22em] text-primary uppercase">
                FIRE Method
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <h1 className="text-8xl md:text-[9rem] font-bold tracking-tighter leading-none text-foreground">
                FIRE<span className="text-primary">.</span>
              </h1>
              <p className="text-base text-muted-foreground max-w-xs leading-relaxed md:text-right md:pb-3 hidden md:block">
                Financial Independence, Retire Early —
                <br />
                <span className="text-foreground font-semibold">
                  Chart your path to freedom.
                </span>
              </p>
            </div>
          </div>
          <p className="md:hidden text-base text-muted-foreground mt-4 leading-relaxed">
            Financial Independence, Retire Early —{" "}
            <span className="text-foreground font-semibold">
              Chart your path to freedom.
            </span>
          </p>
        </div>

        {/* FIRE Method Strip */}
        <div className="w-full max-w-7xl mx-auto px-6 mt-6">
          <div className="flex flex-col sm:flex-row items-stretch border border-border border-t-2 border-t-primary bg-card">
            {METHOD_STEPS.map((s, i) => (
              <div
                key={i}
                className={`flex-1 px-5 py-4 ${i < METHOD_STEPS.length - 1 ? "border-b sm:border-b-0 sm:border-r border-border" : ""}`}
              >
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-mono text-xs text-muted-foreground">{s.step}</span>
                  <span className="text-sm font-bold uppercase tracking-[0.14em] text-primary">
                    {s.action}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Input Cards */}
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 mt-6 mb-8">
          <div className="flex justify-center gap-6 flex-wrap items-start">
            <SituationCard
              inputs={inputs}
              handleInputChange={handleInputChange}
              fireModelsRef={refs.fireModelsRef}
              onScrollToModels={handlers.handleScrollToModels}
            />
            <StrategyCard
              inputs={inputs}
              handleInputChange={handleInputChange}
              investorRef={refs.investorRef}
              onScrollToInvestors={handlers.handleScrollToInvestor}
            />
          </div>
        </div>

        {/* CTA */}
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 mb-14">
          <button
            style={{ borderRadius: 0 }}
            className="w-full md:w-auto px-12 py-4 bg-primary text-primary-foreground font-bold text-sm tracking-[0.18em] uppercase hover:opacity-90 active:scale-[0.99] transition-all duration-200 cursor-pointer"
            onClick={handleAnalyze}
          >
            Analyze my FIRE path →
          </button>
        </div>

        {/* Results */}
        {result && (
          <ResultSection
            result={result}
            resultRef={refs.resultRef}
            inputs={inputs}
          />
        )}
      </div>
    </>
  );
}

export default Home;
