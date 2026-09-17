# CIAP White Paper v2.0

> **Composable Intelligent Application Platform**-可组合智能应用平台
>
> **Software should be assembled, not rewritten.**  
> 软件应该被组合，而不是被一遍遍重写。

---

# 0. 执行摘要

CIAP 试图解决的不是“如何让开发更快写代码”，而是更根本的问题：

> **如何让软件从“项目式开发”转向“能力沉淀、模块复用、流程组合和多 Runtime 运行”。**

今天我们面对的真实问题是：软件越来越多，但可持续复用的软件资产增长得很慢。WMS、MES、设备管理、数字孪生、AGV 调度、质量管理等软件中，库存、库位、工单、设备、告警、任务、权限、状态、2D 面板、3D 实体等能力不断重复开发。

AI 又进一步改变了研发节奏。AI 能显著提高编码速度，但如果软件结构没有统一，它也会更快地产生重复实现、隐式依赖和架构漂移。

CIAP 因此提出：

```text
Capability
↓
Module
↓
Contract
↓
Flow
↓
Scene
↓
Product
↓
Runtime
```

在这一体系下，一个软件可以完整独立运行，也可以拆成多个能力模块重新组合；同一个 Product 可以面向 Web、Unity、Unreal 等 Runtime 构建；AI 则在 Contract、SDK、Schema 和治理规则内参与开发，而不是自由生成不可控代码。

---

# 1. 为什么当前研发模式必须改变

## 1.1 项目数量增长，不等于能力增长

典型项目：

```text
项目 A：库存 / 设备 / 告警 / 3D
项目 B：库存 / 工单 / 告警 / 3D
项目 C：设备 / 工单 / 质量 / 3D
```

这些项目名称不同，但其中大量能力重复。组织长期沉淀的是多套项目代码，而不是一套可复用的软件资产库。

## 1.2 “复制旧项目再修改”是短期最优、长期最差

这种方式短期交付快，但会导致：

- Bug 在多个项目重复修复；
- 相同逻辑出现多个版本；
- 技术栈逐步分裂；
- 安全与依赖升级成本增加；
- 新人学习依赖“找旧项目抄”；
- AI 继续复制旧结构。

## 1.3 AI 不会自动解决结构问题

AI 可以更快写三个库存模块，但真正的问题是：

> **为什么需要三个库存模块？**

如果没有统一的 Capability、Contract、Module Boundary、Flow、Scene、Runtime Boundary，AI 只能基于自然语言猜测。

因此 CIAP 的判断是：

> **AI 越强，架构标准化越重要。**

---

# 2. CIAP 的核心模型

## 2.1 Capability

Capability 表达“系统会做什么”。

例如：

```text
warehouse.inventory
warehouse.location
production.workorder
device.machine
quality.inspection
alarm.management
```

Capability 是稳定业务语义，不是页面、按钮或某个 Runtime 组件。

## 2.2 Module

Module 是 Capability 的可发布实现单元。一个合格 Module 必须具备：Owner、Contract、Version、Tests、Runtime Support 和 Changelog。

## 2.3 Contract

跨边界协作统一通过 Contract：

- Action；
- Event；
- Interaction；
- Data；
- Permission。

禁止把跨 Module 的私有调用、私有数据库访问当作正常复用方式。

## 2.4 Flow

Flow 负责跨 Capability 的业务过程，例如：

```text
库存预留
↓
出库
↓
创建工单
↓
选择设备
↓
启动设备
↓
等待完成
↓
质量检验
```

Flow 不是页面跳转，也不是 Runtime Script。

## 2.5 Scene

Scene 负责 2D/3D 表现组合，包括 Layer、Slot、Entity Projection、Asset、Interaction、Camera Request、Overlay。

Scene 不拥有业务真实状态。

## 2.6 Product

Product 不再等于一套独立源码，而是：

```text
Modules + Flows + Scenes + Runtime Target + Configuration
```

的组合。

---

# 3. CIAP 最终产品形态

CIAP 由四个核心产品组成：

```text
CIAP SDK
CIAP Runtime
CIAP Platform
CIAP Studio
```

## 3.1 CIAP SDK

SDK 定义统一开发方式：Module 如何声明、Action 如何调用、Event 如何订阅、Entity 如何映射、Runtime Adapter 如何实现、Product 如何构建。

## 3.2 CIAP Runtime

第一阶段：

```text
Web Runtime = Vue 3 + Three.js + CIAP Runtime Core
```

后续扩展 Unity Runtime、Unreal Runtime、Edge Runtime、Offline Runtime。

Runtime 只负责“如何执行与表现”，不负责“业务是什么”。

## 3.3 CIAP Platform

负责 Registry、Compiler、Flow、Product、Release、Policy、Audit、Compatibility、Asset Metadata 等控制面能力。

## 3.4 CIAP Studio

提供 Product Composer、Flow Designer、Scene Composer、Module Browser、Governance、Release、AI Assistant。

关键原则：

> **Studio 不能成为已发布 Product 的运行依赖。**

---

# 4. 最关键的业务案例

已有两个独立产品：

## Warehouse Standard

```text
Inventory
Location
Inbound
Outbound
Alarm
```

## Production Standard

```text
WorkOrder
Machine
Quality
Alarm
```

新需求：Factory Logistics。

传统方式：复制 Warehouse，再混入 Production 代码。

CIAP 方式：

```text
warehouse.inventory
warehouse.outbound
production.workorder
device.machine
quality.inspection
```

重新组合。

关键验收标准：

> **Factory Logistics 不修改原 Warehouse / Production Module Domain 源码。**

这不是一个普通功能验收，而是 CIAP 架构是否成立的第一次考试。

---

# 5. CIAP 与其他技术路线的区别

## 5.1 与低代码

低代码主要围绕 Page、Form、CRUD、Workflow；CIAP 围绕 Capability、Module、Contract、Flow、Scene、Product、Runtime。

CIAP 目标不是更快做页面，而是更快构建新的软件产品。

## 5.2 与微服务

微服务主要解决服务边界、部署和服务治理。CIAP 关注软件能力沉淀、Product 组合、跨 Runtime 和业务语义复用。

MVP 甚至优先采用 Modular Monolith，而不是一开始拆微服务。

## 5.3 与插件系统

插件解决“如何扩展”。CIAP 还定义 Capability、Contract、Ownership、Runtime Adapter、Version、Composition、Conformance。

## 5.4 与 Unity / Unreal

Unity / Unreal 是 Runtime 与内容生产生态。CIAP 不替代它们，而是统一上层业务语义。

同一个 `machine-001` 在 Web、Unity、Unreal 中可以映射成不同视觉对象，但业务身份不变。

## 5.5 与 AI Coding

AI Coding 解决“如何更快实现代码”；CIAP 解决“代码应该被组织成什么样”。

```text
CIAP defines structure
AI accelerates implementation
```

---

# 6. 第一阶段为什么不是“大平台”

第一阶段只验证：

> **模块是否真的可以组合。**

MVP 范围：

```text
CIAP SDK
CIAP CLI
Registry
Compiler
Flow Engine
Web Runtime
Reference Modules
Reference Products
```

第一批 Reference Modules：

```text
warehouse.inventory
warehouse.location
warehouse.inbound
warehouse.outbound
production.workorder
device.machine
quality.inspection
alarm.management
```

---

# 7. 三次关键验证

## Test A — Warehouse Standard

可独立运行。

## Test B — Production Standard

可独立运行。

## Test C — Factory Logistics

复用前两者已有 Module，且：

```text
0 行原 Module Domain 修改
```

Test C 不通过，不进入下一阶段扩张。

---

# 8. 四阶段路线

## Phase 1 — Composable Core

目标：证明组合模型成立。

交付：Standard、SDK、CLI、Registry、Compiler、Flow Engine、Web Runtime、Reference Modules、Reference Products。

## Phase 2 — Platformization

目标：将 PoC 变成团队可持续使用的平台。

交付：Product Service、Release、Governance、Compatibility、Observability、Studio MVP。

## Phase 3 — Multi-Runtime

目标：验证 Runtime Neutrality。

交付：Unity Runtime、Runtime Certification、Scene Portability、Product Portability。

## Phase 4 — Ecosystem

目标：形成内部/外部软件生态。

交付：Marketplace、Connector、Edge、AI Agent、External SDK。

---

# 9. 团队需要同意的五件事

1. 从“项目复用”升级为“Capability / Module 复用”；
2. 公共协作采用 Contract First；
3. Runtime 与业务逻辑分离；
4. 用真实产品做架构 PoC；
5. PoC 不通过就暂停扩张并重新设计。

这意味着 CIAP 不是一次性豪赌，而是阶段性验证。

---

# 10. 成功标准

CIAP 不以“平台写了多少代码”衡量，而看：

- **Composition Success Rate**：组合是否需要改原 Module；
- **Module Reuse Rate**：新 Product 使用已有 Module 的比例；
- **Contract Breaking Rate**：公共 Contract 是否频繁破坏；
- **New Product Lead Time**：新软件交付周期是否下降；
- **Runtime Portability**：同一业务语义是否能迁移到第二 Runtime。

---

# 11. 主要反对意见

## “会不会过度设计？”

如果一开始做 Marketplace、Unity、AI Autonomous，会。CIAP 因此先做三个真实 Product，只验证组合。

## “为什么不继续复制旧项目？”

复制优化第一次交付速度；CIAP 优化第二、第三、第五个 Product 的边际成本。

## “是不是所有模块都必须通用？”

不是。只有被多个真实 Product 验证过的稳定能力才值得沉淀。

## “会不会限制开发自由？”

会限制破坏边界的自由，但保留 Module 内部实现自由、Adapter 实现自由、Product 组合自由和 Runtime 表现自由。

---

# 12. 最终愿景

今天：

```text
项目
↓
代码
↓
上线
↓
下一项目重新开始
```

未来：

```text
Capability
↓
Module
↓
Flow / Scene
↓
Product
↓
Runtime
↓
持续复用
```

CIAP 真正想改变的不是某一个软件，而是：

> **整个团队以后如何生产软件。**
