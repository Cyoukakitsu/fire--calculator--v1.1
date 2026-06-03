"use client";

import { useFireCalculator } from "@/hooks/useFireCalculator";
import { usePageScroll } from "@/hooks/usePageScroll";

import Navbar from "@/components/Navbar";
import SituationCard from "@/components/SituationCard";
import StrategyCard from "@/components/StrategyCard";
import ResultSection from "@/components/ResultSection";

function Home() {
  const { inputs, handleInputChange, result, handleAnalyze } =
    useFireCalculator();

  const { refs, handlers } = usePageScroll(result);

  return (
    <>
      <Navbar />

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

        {/* Input Cards */}
        <div className="flex justify-center gap-8 flex-wrap items-start w-full px-4 md:px-6 mt-8 mb-8">
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

        {/* CTA */}
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 mb-14">
          <button
            className="w-full md:w-auto px-12 py-4 bg-primary text-primary-foreground font-bold text-sm tracking-[0.15em] uppercase hover:opacity-90 active:scale-[0.99] transition-all duration-200 cursor-pointer rounded-none"
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
