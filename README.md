# 🔥 FIRE 自由之路计算器 (FireFlow)

一个极简、现代化的 Web 应用程序，旨在帮助用户可视化财务自由（Financial Independence, Retire Early）的路径。通过输入当前的财务状况和投资策略，实时推演资产增长曲线与预计退休年龄。

本项目已全面重构，从纯 React 迁移至 **Next.js** 框架，并使用 **TypeScript** 保证代码的健壮性。通过输入当前的财务状况、选择不同的投资大师策略，实时推演资产增长曲线与预计退休年龄。

## ✨ 主要功能

- **🚀 实时推演**：基于当前的储蓄、收支和预期收益率，毫秒级计算 FIRE 达成时间。
- **📈 可视化图表**：集成 **Recharts**，使用动态面积图直观展示未来资产的复利增长趋势。
- **🌗 日夜模式切换**：内置深色/浅色主题切换（基于 DaisyUI Theme Controller），提供舒适的视觉体验。
- **🧠 策略模拟**：提供巴菲特、瑞·达利欧等投资大师的策略模板，以及 Lean/Fat/Coast FIRE 等生活方式模型供参考。
- **📱 响应式设计**：完美适配移动端与桌面端，提供流畅的交互体验。
- **🛡️ 类型安全**：全项目采用 **TypeScript** 编写，拥有完整的类型定义与推断。

## 🛠 技术栈

- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **核心框架**: [Next.js 16](https://nextjs.org/)
- **样式库**: [Tailwind CSS](https://tailwindcss.com/)
- **UI 库**: [DaisyUI](https://daisyui.com/)
- **图表库**: [Recharts](https://recharts.org/) (用于数据可视化)

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone [https://github.com/your-username/fire-calculator-next.git](https://github.com/your-username/fire-calculator-next.git)
cd fire-calculator-next
```

### 2. 安装依赖

```bash
npm install
```

### 3. 启动本地开发服务器

```bash
npm run dev
```

## 📂 项目结构

```text
src/
├── app/
│   ├── globals.css         # 全局样式 & Tailwind 配置
│   ├── layout.tsx          # 根布局 (Metadata, Font)
│   └── page.tsx            # 主页面 (组装各个组件)
├── components/
│   ├── Navbar.tsx          # 导航栏 (含日夜模式开关)
│   ├── SituationCard.tsx   # 左侧卡片 (个人财务状况 & FIRE 模型)
│   ├── StrategyCard.tsx    # 右侧卡片 (投资策略 & 大师策略轮播)
│   ├── ResultSection.tsx   # 结果展示区 (包含数据统计 & 进度条)
│   └── FireChart.tsx       # 核心图表组件 (Recharts 封装)
├── hooks/
│   ├── useFireCalculator.ts # 核心业务 Hook (状态管理 & 计算触发)
│   └── usePageScroll.ts     # UI 交互 Hook (平滑滚动控制)
├── types/
│   └── index.ts             # TypeScript 类型定义 (Interfaces)
├── utils/
│   └── calculateFireResult.ts # 纯计算逻辑 (核心算法)
└── public/
    └── photo/               # 静态资源图片 (投资大师头像)
```

## 📄 License

MIT License
