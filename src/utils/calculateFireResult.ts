// 文件路径: src/utils/calculateFireResult.ts

import { FireInputs, FireResult, ChartDataPoint } from "@/types";

export const calculateFireResult = (inputs: FireInputs): FireResult => {
  // 1. 数据清洗：确保所有输入都是数字，防止计算错误
  const safeInputs: FireInputs = { ...inputs };
  for (const key in inputs) {
    if (key !== "currentAge" && key !== "targetAge") {
      safeInputs[key] = Number(inputs[key]);
    }
  }

  const {
    currentAge,
    currentSavings,
    targetAge,
    annualSpending,
    inflationRate,
    stockYearly,
    stockReturn,
    bondYearly,
    bondReturn,
    cashYearly,
    cashReturn,
  } = safeInputs;

  //  2. 基础参数
  const swr = 0.04; // 4% 安全提款率
  let fireNumber = annualSpending / swr; // 初始目标金额

  //初始化投资金额
  let stockBal = 0;
  let bondBal = 0;
  let cashBal = 0;

  let age = currentAge;

  // 总投入本金初始化 = 现有的存款
  let totalPrincipal = currentSavings;

  //创建一个空数组，用来存每一年的记录
  const chartData: ChartDataPoint[] = [];

  // 把起跑线（现在的状态）先存进去
  chartData.push({
    age: age,
    assets: Math.round(stockBal + bondBal + cashBal + currentSavings),
    principal: Math.round(totalPrincipal),
    interest: 0,
  });

  //开始模拟每一年的增长
  while (age < targetAge) {
    //计算总资产：投资品+存款
    const totalAssets = stockBal + bondBal + cashBal + currentSavings;

    //如果已经达到 FIRE 目标，可以提前退出循环 (可选)
    if (totalAssets >= fireNumber) break;
    age++;

    //投资品复利
    stockBal = stockBal * (1 + stockReturn / 100) + stockYearly;
    bondBal = bondBal * (1 + bondReturn / 100) + bondYearly;
    cashBal = cashBal * (1 + cashReturn / 100) + cashYearly;

    //累计总投入本金
    totalPrincipal += stockYearly + bondYearly + cashYearly;

    //通胀
    fireNumber = fireNumber * (1 + inflationRate / 100);

    // 计算当年的总资产
    const currentTotalAssets = stockBal + bondBal + cashBal + currentSavings;

    //把这一年的计算结果存进数组
    chartData.push({
      age: age,
      assets: Math.round(stockBal + bondBal + cashBal + currentSavings),
      principal: Math.round(totalPrincipal),
      interest: Math.round(currentTotalAssets - totalPrincipal),
    });
  }

  //准备最终结果
  const finalAssets = stockBal + bondBal + cashBal + currentSavings;

  return {
    fireAge: age,
    targetNumber: Math.round(fireNumber),
    finalAssets: Math.round(finalAssets),
    principal: Math.round(totalPrincipal),
    interest: Math.round(finalAssets - totalPrincipal),
    breakdown: {
      stock: Math.round(stockBal),
      bond: Math.round(bondBal),
      cash: Math.round(cashBal + currentSavings),
    },
    chartData: chartData,
  };
};
