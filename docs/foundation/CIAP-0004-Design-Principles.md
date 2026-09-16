---
document_id: CIAP-0004
title: CIAP Design Principles
version: 0.1.0
status: Draft
owner: Architecture Committee
type: Foundation
---

# CIAP-0004 — Design Principles

本文档用于日常架构决策。

Constitution 定义“不可轻易违反的法律”。

Design Principles 定义：

> **面对多个可行方案时，CIAP 默认选择哪一个。**

---

## Principle 1 — Capability First

先问：

> 这是哪个业务能力？

再问：

> 应该写在哪个项目？

如果一个需求无法映射到明确 Capability，优先澄清业务边界，而不是先写代码。

---

## Principle 2 — Contract First

开发顺序默认：

```text
Requirement
→ Contract
→ Test
→ Implementation
→ Adapter
```

不应默认：

```text
页面
→ API
→ 数据库
→ 最后补文档
```

---

## Principle 3 — Composition Before Duplication

新 Product 优先通过：

```text
Reuse
Extend by Contract
Compose
```

解决需求。

复制既有 Module 是最后手段。

---

## Principle 4 — Explicit Over Implicit

依赖、权限、版本、Runtime Support 必须显式声明。

不要依赖：

- 隐藏 Import；
- 环境变量暗约定；
- 目录结构猜测；
- 人工口头知识。

---

## Principle 5 — Runtime-independent Business Semantics

业务语义使用：

```text
entityId
interactionId
actionId
eventId
```

而不是：

```text
DOM selector
Three.js UUID
Unity instance id
Unreal actor pointer
```

---

## Principle 6 — Module Owns State, Flow Owns Process, Adapter Owns Presentation

这是 CIAP 最重要的职责分离之一。

### Module

负责：

- Domain State；
- Domain Rule；
- Capability Implementation。

### Flow

负责：

- 跨 Capability Process。

### Adapter

负责：

- Runtime Presentation；
- Runtime Interaction Binding。

不得反向污染。

---

## Principle 7 — CLI First, Studio Second

所有核心能力 SHOULD 先存在可机器执行的 API / CLI / Schema。

Studio 是可视化工作台，不是核心语义唯一实现。

好处：

- 自动化；
- CI/CD；
- AI；
- Headless；
- Test；
- 可重复构建。

---

## Principle 8 — Schema and Type as Executable Documentation

能够机器表达的规则不要只写自然语言。

优先：

```text
JSON Schema
TypeScript Type
OpenAPI
Conformance Test
```

文档解释“为什么”。

Schema 约束“必须是什么”。

---

## Principle 9 — Deterministic Build

同一个：

```text
Product Recipe
+
Product Lock
+
Registry Artifact
+
Compiler Version
```

应尽可能得到确定性结果。

生产发布不得依赖“当前 Registry 最新版本”这种隐式状态。

---

## Principle 10 — Backward Compatibility by Default

Stable Consumer 不应因为 Provider 的小版本升级突然失效。

Breaking Change 是治理事件，不是普通开发动作。

---

## Principle 11 — Stable Core, Extensible Edge

核心保持小而稳定。

扩展放在：

- Plugin；
- Adapter；
- Profile；
- Extension Point；
- Configuration。

若每个新场景都要修改 Core，说明扩展模型有问题。

---

## Principle 12 — Failure is a First-class State

Flow、Runtime、Connector、Module 都必须设计：

- timeout；
- retry；
- failure；
- recovery；
- compensation；
- manual intervention。

不能只设计 Happy Path。

---

## Principle 13 — Observable by Default

核心执行路径 SHOULD 默认携带：

```text
traceId
correlationId
productId
moduleId
flowInstanceId
tenantId（启用多租户时）
```

---

## Principle 14 — Security is Part of Contract

权限不是 UI 是否显示按钮。

权限是执行语义的一部分。

Action / Interaction / Admin Operation 都应有明确 Permission。

---

## Principle 15 — AI is Constrained Automation

AI 输出默认视为：

```text
Draft / Proposal
```

而不是事实或最终架构决策。

AI 的自由度随环境降低：

```text
Development > Test > Staging > Production
```

---

## Principle 16 — Local Simplicity Before Distributed Complexity

MVP 默认优先：

```text
Modular Monolith
PostgreSQL
Process-local Event
```

只有明确规模和可靠性需求后再引入：

- Kafka；
- NATS；
- Distributed Worker；
- Microservices。

复杂度必须由真实需求购买。

---

## Principle 17 — Portability is Semantic, not Pixel-perfect

Web / Unity / Unreal 不追求画面完全一致。

追求的是：

- Action 语义一致；
- Flow 语义一致；
- Entity Identity 一致；
- Permission 一致；
- Audit 一致。

---

## Principle 18 — No Product-specific Logic in Platform Core

若代码只为某一个 Product 服务：

默认不应进入：

- Runtime Core；
- Compiler Core；
- Registry Core；
- SDK Core。

应优先进入 Module / Product / Adapter。

---

## Principle 19 — Evolution Through RFC, Not Accidental Drift

重大变化必须显式讨论：

```text
Problem
Constraints
Options
Decision
Migration
Compatibility
```

不允许因为“先改一下能跑”让核心标准被动漂移。

---

## Principle 20 — Optimize for the Second and Third Product

CIAP 的价值不是把第一个产品做得更复杂。

它必须在第二、第三个 Product 中体现：

- Reuse；
- Composition；
- Faster Delivery；
- Lower Change Cost。

因此 MVP 的真正验收不是 Warehouse 独立运行，而是：

> Warehouse + Production 的已有 Module 能否零 Domain 修改组合成 Factory Logistics。
