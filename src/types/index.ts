// 文件路径: src/types/index.ts

/**
 * 1. 用户输入的数据结构
 * 包含了 SituationCard 和 StrategyCard 里的所有字段
 */
export interface FireInputs {
  currentAge: number;
  currentSavings: number;
  targetAge: number;
  annualSpending: number;
  inflationRate: number;
  stockYearly: number;
  stockReturn: number;
  bondYearly: number;
  bondReturn: number;
  cashYearly: number;
  cashReturn: number;
  [key: string]: number;
}

/**
 * 2. 图表中每一个点的数据结构
 * 对应 Recharts 需要的数组元素格式
 */
export interface ChartDataPoint {
  age: number;
  assets: number; // 总资产
  principal: number; // 本金
  interest: number; // 利息 (assets - principal)
}

/**
 * 3. 最终计算结果的数据结构
 * 包含了分析后的所有数据，用于传递给 ResultSection 组件
 */
export interface FireResult {
  fireAge: number;
  targetNumber: number; // 目标存款
  finalAssets: number; // 最终资产
  principal: number; // 总投入本金
  interest: number; // 总利息收益
  breakdown: {
    stock: number;
    bond: number;
    cash: number;
  };
  chartData: ChartDataPoint[]; // 图表数据数组
}
