# CIAP Standard Repository

CIAP（Composable Intelligent Application Platform）标准文档仓库。

本仓库当前阶段只完成两件事：

1. 建立完整目录结构；
2. 将每一份文档拆分为独立 Markdown 文件。

> 当前文件内容以结构骨架为主，后续逐份完善正文。

## Highest-Level Authority

文档优先级建议：

```text
Constitution
  ↓
RFC / ADR
  ↓
Architecture
  ↓
Specification
  ↓
Guides / Examples
```

## Main Areas

- `constitution/`：最高设计原则与边界
- `program/`：愿景、战略、实施路线
- `architecture/`：总体与领域架构
- `specification/`：正式规范
- `sdk/`：SDK 设计与使用规范
- `runtime/`：Web / Unity / Unreal / Edge / Offline Runtime
- `platform/`：Registry、Compiler、Flow、Release、Policy 等控制面
- `studio/`：Product / Flow / Scene / Governance Studio
- `ai/`：AI 开发与治理
- `governance/`：RFC、ADR、Owner、Review、版本治理
- `security/`：身份、权限、供应链、安全基线
- `operations/`：部署、监控、灾备、升级
- `conformance/`：一致性与认证测试
- `ecosystem/`：开发者生态、Marketplace、Connector
- `commercial/`：计费、授权、商业运营
- `profiles/`：行业 Profile
- `examples/`：参考案例
- `templates/`：模板
- `glossary/`：术语
- `adr/`：架构决策记录
- `rfc/`：设计提案
- `roadmap/`：平台路线图


# CIAP Standard

**CIAP — Composable Intelligent Application Platform**

CIAP Standard 是 CIAP 平台的规范、架构、治理和参考实现文档仓库。

本仓库坚持：

> **Markdown 是唯一文档源（Single Source of Truth）。**

所有 Word、PDF、HTML、PPT、文档站内容都应从本仓库的 Markdown、Schema、Diagram 和 Reference Artifact 派生。

---

## 文档层级

```text
CIAP-0000 Meta Model
        ↓
CIAP-0001 Constitution
        ↓
CIAP-0002 Terminology
        ↓
CIAP-0003 Product Boundary
        ↓
CIAP-0004 Design Principles
        ↓
Architecture
        ↓
Specification
        ↓
SDK / Runtime / Platform / Studio
        ↓
Reference Implementation
```

若下层文档与上层文档发生冲突，应以上层文档为准。

---

## 当前版本

**Repository Version:** v0.1.0  
**Status:** Draft  
**Focus:** Foundation Freeze

第一版优先冻结五份根文档：

- `CIAP-0000` Meta Model
- `CIAP-0001` Constitution
- `CIAP-0002` Terminology
- `CIAP-0003` Product Boundary
- `CIAP-0004` Design Principles

---

## 本地预览

```bash
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS / Linux
source .venv/bin/activate

pip install -r requirements.txt
mkdocs serve
```

打开：

```text
http://127.0.0.1:8000
```

---

## 构建静态站点

```bash
mkdocs build --strict
```

输出：

```text
site/
```

---

## 初始化 GitHub 仓库

如果下载的是 ZIP：

```bash
git init
git add .
git commit -m "chore: initialize CIAP Standard repository"
git branch -M main

git remote add origin https://github.com/<org>/ciap-standard.git
git push -u origin main
```

---

## 修改流程

普通内容修改：

```text
Issue
→ Branch
→ Pull Request
→ Review
→ Merge
```

涉及以下内容必须先走 RFC / ADR：

- 核心对象新增或删除
- Meta Model 关系变化
- Constitution 修改
- Runtime Contract 修改
- Flow DSL 核心语义修改
- Product Recipe 核心结构修改
- Event Envelope 修改
- 跨团队公共 Contract Breaking Change

---

## 仓库目录

```text
docs/            文档正文
schemas/         JSON Schema
diagrams/        Mermaid / PlantUML / SVG
examples/        参考示例
templates/       文档与设计模板
scripts/         构建与校验脚本
.github/          GitHub Actions / Issue / PR 模板
```

---

## 核心开发原则

> Contract First  
> Composition Before Duplication  
> Runtime Neutrality  
> Single Source of Truth  
> AI Under Governance  
> Backward Compatibility by Default


# CIAP Communication Pack v1.0

本资料包用于两个目的：

## 1. 说服和统一认知

阅读：

- `CIAP_White_Paper_v1.0.md`

适合：

- 管理层
- 技术负责人
- 产品负责人
- 团队成员
- 合作方

目标：

> 讲清楚为什么要做 CIAP、CIAP 是什么、如何阶段性验证、为什么值得投入。

## 2. 统一研发执行

阅读：

- `CIAP_Engineering_Handbook_v1.0.md`

适合：

- 架构师
- 开发人员
- AI Coding Agent
- Reviewer
- Runtime / Platform / Studio 开发人员

目标：

> 规定 CIAP 日常研发应该怎么做、哪些不能做、如何 Review 和验收。

## 与现有 CIAP_Standard 的关系

```text
White Paper
    ↓ 解释为什么

Constitution / Standard
    ↓ 规定法律

Engineering Handbook
    ↓ 规定日常开发方式

SDK / Runtime / Platform
    ↓ 实际代码
```

建议将这两份资料放入 `CIAP_Standard`：

```text
docs/
├── whitepaper/
│   └── CIAP-White-Paper-v1.0.md
└── engineering/
    └── CIAP-Engineering-Handbook-v1.0.md
```


# CIAP SDK v0.1 Design Package

This package belongs to CIAP engineering documents.

Sequence:

White Paper
-> Constitution
-> Engineering Handbook
-> SDK Design
-> Runtime Implementation


# CIAP Master Architecture v1.0

本包为 CIAP 前序全部讨论的架构审计与收敛版本。

核心补充：
- Industrial World Model
- Operational State
- Process / Behavior / Policy
- Mobile Agent
- Routing / Dispatch / Traffic / Queue / Charging
- Human Agent
- Simulation Kernel
- Live / Simulation / Hybrid / Replay
- Twin Sync
- Automotive Mini-Factory MVP

建议把 `CIAP-Master-Architecture-v1.0.md` 作为下一阶段工程设计总蓝图。


# CIAP Master Technical Blueprint v0.1

这是 CIAP 从“架构设计”进入“可编码工程设计”的第一版施工蓝图。

目标：

1. 固定核心 package 边界；
2. 固定 package 依赖方向；
3. 固定核心 TypeScript interface；
4. 固定最小 Schema；
5. 固定第一版汽车工厂 Reference Model；
6. 为后续 Monorepo 初始化与 Sprint 0 提供直接输入。

本版本不是最终 API，但应作为第一批代码实现的起点。


# CIAP Platform Bootstrap v0.1

> **Composable Industrial Application Platform**

这是 CIAP 平台工程仓库的第一版代码骨架。

当前目标不是实现完整平台，而是完成 **Sprint 0: Engineering Foundation**，确保核心 package 边界、类型接口和依赖方向可以真正开始编码。

## 当前包含

```text
packages/
├── core
├── contracts
├── world-model
├── operational-state
├── process-model
├── behavior-model
├── policy-sdk
├── simulation-kernel
├── decision-engine
├── runtime-core
├── scene-runtime
├── connector-sdk
└── product-sdk

plugins/
├── routing-a-star
├── dispatch-nearest
└── queue-fifo

apps/
└── runtime-web

examples/
└── mini-auto-factory
```

## 安装

```bash
corepack enable
pnpm install
```

## Build

```bash
pnpm build
```

## Type Check

```bash
pnpm typecheck
```

## Test

```bash
pnpm test
```

## Sprint 0 验收

- [x] Monorepo 结构
- [x] pnpm workspace
- [x] Turborepo
- [x] TypeScript strict mode
- [x] Vitest
- [x] Changesets
- [x] GitHub Actions
- [x] `@ciap/core`
- [x] `@ciap/contracts`
- [x] `@ciap/world-model`
- [x] `@ciap/operational-state`
- [x] `@ciap/policy-sdk`
- [x] 其余核心 package scaffold
- [x] Mini Automotive Factory reference data

下一步：Sprint 1 — Single Machine Vertical Slice。


# CIAP Sprint 1 - Single Machine Vertical Slice v0.1

目标：让 CIAP 第一个工业实体真正运行。

运行链路：

World
-> Machine Entity
-> Operational State
-> Job
-> Behavior State Machine
-> Simulation Kernel
-> Event
-> State Update
-> Scene Projection

验收：
- 一个设备可以加载
- 一个任务可以执行
- 状态可以变化
- 仿真时间可以推进
- 外部 Runtime 可以订阅状态变化

# CIAP Sprint 2 - Material + AGV Runtime v0.1

目标：让 CIAP 从单设备运行进入工业物流运行。

链路：
Order -> Material -> Transport Task -> Dispatcher -> AGV -> Route -> Traffic -> Machine

新增：
- Material Entity
- Transport Task
- Mobile Agent
- Dispatch Policy
- Route Planning
- Traffic Reservation


# CIAP Sprint 3 - Production Flow + Scheduler Runtime v0.1

目标：
把 Sprint 2 的物流闭环升级为生产系统闭环。

核心链路：

Order
 -> Process Instance
 -> Flow Engine
 -> Scheduler
 -> Resource Allocation
 -> Machine Queue
 -> AGV Transport
 -> Production Completion

新增：
- Process Instance Runtime
- Flow Engine
- Scheduler
- Resource Allocation
- Buffer
- Queue Policy
- Multi Machine
- KPI

# CIAP Sprint 4 - Productization + Experiment Runtime v0.1

目标：
把前面 Sprint 0-3 的运行能力包装成平台能力。

核心链路：

Product Recipe
 -> Scenario
 -> Runtime
 -> Simulation
 -> KPI Collector
 -> Experiment Result
 -> Web Runtime


新增：
- Product Recipe Runtime
- Scenario Manager
- Experiment Runner
- KPI Model
- Replay Concept
- Web Runtime Contract
- Studio 基础边界

