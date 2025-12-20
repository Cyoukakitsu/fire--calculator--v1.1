"use client";

//引入hook
import { useFireCalculator } from "@/hooks/useFireCalculator";
import { usePageScroll } from "@/hooks/usePageScroll";

// 引入组件
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

      <div className="bg-base-200 min-h-screen w-full flex flex-col items-center overflow-y-auto overflow-x-hidden py-4">
        <div className="text-center max-w-8xl mb-5 px-4">
          <div className="font-semibold text-4xl md:text-6xl mb-4">
            FIRE calculator
            <p className="text-xl md:text-4xl mt-4">Find your Free Path</p>
          </div>

          <p className="text-xl max-w-3xl mx-auto px-6 font-thin">
            FIRE stands for Financial Independence, Retire Early. Our calculator
            can help you create an investment and savings plan that may allow
            you to retire years earlier than usual, joining the growing
            community of people pursuing early retirement.
          </p>
        </div>

        <div className="flex justify-center gap-10 flex-wrap items-start w-full px-4 mb-10">
          {/* 左侧 ：卡片 1 */}
          <SituationCard
            inputs={inputs}
            handleInputChange={handleInputChange}
            fireModelsRef={refs.fireModelsRef}
            onScrollToModels={handlers.handleScrollToModels}
          />

          {/* 右侧：卡片 2 */}
          <StrategyCard
            inputs={inputs}
            handleInputChange={handleInputChange}
            investorRef={refs.investorRef}
            onScrollToInvestors={handlers.handleScrollToInvestor}
          />
        </div>

        {/* 中间：按钮 */}
        <button
          className="btn text-base-content  w-11/12 md:w-80 btn-outline btn-accent mb-10 text-lg "
          onClick={handleAnalyze}
        >
          Analyze
        </button>

        {/* 结果区 */}
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
