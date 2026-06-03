# FIRE Calculator Design Improvement Log

## Baseline Assessment

| Category | Score | Notes |
|---|---|---|
| Design Quality | 18/40 | 通用蓝紫+白卡组合，无金融工具专业感 |
| Originality | 10/30 | 命中全部三条"AI味"反模式：紫蓝渐变+白圆角卡堆叠+hero文字居中 |
| Craft | 12/20 | 纯黑border(oklch 0 0 0)过重，全零阴影设置意味着无阴影，排版层级缺失 |
| Functionality | 8/10 | 核心流程可用，布局响应合理 |
| **Total** | **48/100** | |

### Baseline Problems
- Primary color: 蓝紫系(hue 276°) - 直接命中扣分项
- Card style: 白底+黑border+1rem圆角，千篇一律
- Hero: 完全居中文字，无设计选择
- FireChart: 硬编码 #8B5CF6(紫) + #10B981(绿)，AI生成感强
- 所有 shadow 变量均为 0px，等于无阴影
- 边框颜色 border: oklch(0 0 0) 即纯黑，视觉太重

---

## Round 1

### Generator Phase

**设计方向：** "精英金融报告" — 琥珀色(FIRE=火=财富) + 深海军蓝 + 编辑排版风格

**修改文件：**

1. `src/app/globals.css` - 全面色彩系统重构
   - Primary: oklch(0.57 0.185 52) 深琥珀色（放弃蓝紫）
   - Secondary: oklch(0.44 0.11 148) 森林绿（增长/财富）
   - Background light: oklch(0.965 0.015 85) 暖象牙色（非纯白）
   - Dark mode background: oklch(0.13 0.025 255) 深海军蓝（非纯黑）
   - Border: oklch(0.80 0.02 85) 柔和暖灰（非纯黑）
   - Radius: 从1rem改为0.375rem（更精练）
   - 添加真实阴影数值

2. `src/app/page.tsx` - Hero重设计
   - 删除居中 hero 文字
   - 添加编辑排版风格：大号"FIRE."标题 + 横线 + mono字体标签
   - CTA按钮改为实色amber

3. `src/components/Navbar.tsx` - 加粗navbar底边
4. `src/components/SituationCard.tsx` - 加入编号章节标题(01/02)，编辑排版
5. `src/components/StrategyCard.tsx` - 加入编号章节标题(03)，编辑排版
6. `src/components/ResultSection.tsx` - FIRE Age改为超大typographic数字作hero
7. `src/components/FireChart.tsx` - 图表颜色从紫绿改为琥珀+青色

**Generator 自评：**

| Category | Score | Reason |
|---|---|---|
| Design Quality | 28/40 | 色彩有情绪(琥珀=火=财富)，编辑排版有专业感，但整体一致性还需打磨 |
| Originality | 22/30 | 明确的设计选择：非典型金融工具色、编辑layout、无圆角大卡 |
| Craft | 15/20 | 间距改善，排版层级清晰，但响应式在小屏可能有张力 |
| Functionality | 8/10 | 核心流程未改动 |
| **Total** | **73/100** | |

**最不满意的点：** 两个输入卡在极窄屏幕(375px)上标签和输入框的对齐可能出问题，需要进一步测试

---

## Round 2

### Generator Phase

**针对 Round 1 问题修复 + 设计推进：**

1. `src/app/globals.css` - 添加 `--dot-pattern` CSS变量，实现暗/亮模式自适应点阵背景纹理，radius降至0.25rem
2. `src/app/page.tsx` - 新增金融ticker信息条（amber背景，白色mono字体，滚动动画），统一所有区块用`max-w-7xl`容器
3. `src/components/SituationCard.tsx` - 添加 `border-l-4 border-l-primary` 琥珀左边框，移除shadow-sm防止接缝叠影
4. `src/components/StrategyCard.tsx` - 添加 `border-l-4 border-l-secondary` 绿色左边框，资产类型间加分割线
5. `src/components/ResultSection.tsx` - 全宽翻转色(bg-foreground text-background) hero band展示FIRE Age
6. `src/components/FireChart.tsx` - Tooltip改用hex border (#D4C5B0)，纯hex颜色常量，统一chart美学

**Generator 自评：**

| Category | Score | Reason |
|---|---|---|
| Design Quality | 32/40 | 点阵纹理+ticker条+翻转hero带=三层视觉层次；色彩系统一致；仍缺乏令人惊叹的"wow"时刻 |
| Originality | 25/30 | Ticker信息条在FIRE工具中罕见；翻转hero是刻意的戏剧性选择；整体风格有辨识度 |
| Craft | 17/20 | Tooltip用hex，shadow叠加已修复，max-width统一；Tooltip仍为亮模式硬编码，深色模式会突兀 |
| Functionality | 8/10 | 未破坏流程 |
| **Total** | **82/100** | |

**最不满意的点：** 图表Tooltip背景色硬编码为亮色(#FEFCF8)，深色模式下白色tooltip与深海军蓝背景产生视觉脱节

### Evaluator Phase — Round 2

| Category | Score | 具体理由 |
|---|---|---|
| Design Quality | 32/40 | 点阵背景为页面增加了纹理层次感；ticker bar是金融工具合理的信息密度选择；翻转hero产生强对比；但整体仍是"精良执行"而非"令人意外"的设计 |
| Originality | 25/30 | Ticker bar在同类工具中罕见，amber+navy+点阵系统具有内聚感；扣分：表单输入区仍属标准形式，无惊喜 |
| Craft | 17/20 | Tooltip border改用hex有效修复；色彩编码卡片边框系统清晰；扣分：Tooltip背景在dark mode为白色，会破坏沉浸感 |
| Functionality | 8/10 | build通过，无报错 |
| **Total** | **82/100** | 进入Round 3 |

**必须修复问题：**

| 位置 | 严重程度 | 问题 | 修复建议 |
|---|---|---|---|
| `FireChart.tsx` Tooltip | 影响体验 | background: "#FEFCF8" 在深色模式下白色tooltip与深海军蓝背景冲突 | 用CSS var检测或添加dark-aware style对象 |
| `page.tsx` `<style>` | 细节 | `@keyframes scroll` 定义在JSX `<style>`标签中，不符合最佳实践 | 移至 globals.css |
| `ResultSection.tsx` | 细节 | `style={{ color: "var(--accent)" }}` 可替换为更稳健的Tailwind class，前提是accent color映射正确 | 验证或改用 `text-accent` |
| 整体 | 影响体验 | 结果区缺少"距离FIRE还有X年"的时间指标，这是用户最关心的核心信息 | 在hero band中添加years-to-FIRE计算值 |

### Evaluator Phase — Round 1

| Category | Score | 具体理由 |
|---|---|---|
| Design Quality | 26/40 | 琥珀色系替代蓝紫是实质性改进，"FIRE."编辑排版具有辨识度，但卡片结构本质仍是"头部色带+内容区"的标准模式，未突破 |
| Originality | 22/30 | 三项AI味反模式全部消除，amber在金融工具中不常见是明确的设计选择，编号章节增添了编辑感，但表单布局依然常规 |
| Craft | 14/20 | ¥前缀输入框与mono字体标签制作精良；chart颜色协调；但有技术瑕疵：`range-primary` DaisyUI v5兼容性待验、图表Tooltip `border`使用oklch()字符串在CSS-in-JS中无效 |
| Functionality | 8/10 | build通过，类型检查无报错，核心流程完整 |
| **Total** | **70/100** | 通过阈值，进入Round 2 |

**问题列表：**

| 位置 | 严重程度 | 问题 | 修复建议 |
|---|---|---|---|
| `FireChart.tsx` Tooltip contentStyle | 影响体验 | `border: "1px solid oklch(...)"` 在CSS-in-JS中无效，应使用hex | 改为 `border: "1px solid #D4C5B0"` |
| `FireChart.tsx` | 影响体验 | Tooltip背景色无法响应dark mode，深色模式下白色tooltip突兀 | 添加dark mode conditional style |
| `SituationCard.tsx` | 影响体验 | 两个部分用 `border-t-0` 拼接，但两者都有 `shadow-sm`，阴影会在接缝处叠加 | 去掉第二个section的shadow-sm |
| `page.tsx` CTA | 细节 | `rounded-none` 与DaisyUI `btn` class可能因specificity不被覆盖 | 验证或改用 `style={{borderRadius: 0}}` |
| `ResultSection.tsx` | 细节 | Hero区宽度用`max-w-7xl`，与输入卡(`max-w-[600px]`×2)宽度体系不统一，在宽屏产生明显的内容宽度跳变 | 统一最大宽度或在结果区加说明性边距 |
| 整体 | 细节 | `range-primary` 在DaisyUI v5中可能不生效（仅`range`基础样式存在） | 改为 `range` + `accent-primary` 或验证class名 |


