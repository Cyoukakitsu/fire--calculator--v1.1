"use client";
import { useRef, useEffect } from "react";
import { FireResult } from "@/types";

export const usePageScroll = (result: FireResult | null) => {
  const fireModelsRef = useRef<HTMLElement>(null); // 左边：FIRE 模式
  const investorRef = useRef<HTMLElement>(null); // 右边：大师策略
  const resultRef = useRef<HTMLElement>(null); // 底部：计算结果

  const handleScrollToModels = () => {
    fireModelsRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleScrollToInvestor = () => {
    investorRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 当有了结果后，自动滚到底部
  useEffect(() => {
    if (result && resultRef.current) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  }, [result]);

  return {
    refs: {
      resultRef,
      fireModelsRef,
      investorRef,
    },
    handlers: {
      handleScrollToModels,
      handleScrollToInvestor,
    },
  };
};
