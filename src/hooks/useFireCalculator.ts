"use client";

import { useState } from "react";
import { calculateFireResult } from "@/utils/calculateFireResult";
import { FireInputs, FireResult } from "@/types/index";

export const useFireCalculator = () => {
  //定义初始状态 (指定类型为 FireInputs)
  const [inputs, setInputs] = useState<FireInputs>({
    //左侧卡片
    currentAge: 30,
    currentSavings: 1000000,
    targetAge: 50,
    annualSpending: 3000000,
    inflationRate: 2,

    // 右侧：投资策略
    stockYearly: 500000,
    stockReturn: 7,
    bondYearly: 500000,
    bondReturn: 3,
    cashYearly: 500000,
    cashReturn: 0,
  });

  //结果状态 (初始为 null)
  const [result, setResult] = useState<FireResult | null>(null);

  //处理输入框变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: Number(value), // 强制转为数字，防止字符串拼接错误
    }));
  };

  //点击分析按钮
  const handleAnalyze = () => {
    const calculatedResult = calculateFireResult(inputs);
    setResult(calculatedResult);
  };

  return {
    inputs,
    handleInputChange,
    handleAnalyze,
    result,
  };
};
