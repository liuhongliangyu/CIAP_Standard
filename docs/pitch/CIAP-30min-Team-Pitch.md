# CIAP 30 分钟团队立项汇报脚本

## 0–5 分钟：先讲问题

不要先讲 CIAP。

直接列出现有软件：WMS、MES、设备管理、数字孪生；再列共同能力：库存、设备、告警、任务、权限、3D。

核心句：

> 我们一直在开发软件，但没有持续积累能力。

## 5–10 分钟：讲 AI

核心句：

> AI 让写代码越来越快，但不会自动让软件更可复用。

举例：AI 一天可以写三个库存模块，但真正的问题是——为什么要三个？

## 10–18 分钟：讲 CIAP

只画一张主图：

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

用 Warehouse / Production 举例。

## 18–23 分钟：讲最终平台

```text
Studio
↓
Platform / Compiler
↓
Runtime
↓
Module Library
```

强调：Studio 不是核心，组合语义才是核心。

## 23–27 分钟：讲 MVP

只验证：

```text
Warehouse + Production → Factory Logistics
```

要求：

```text
0 Domain modifications
```

## 27–30 分钟：请求决策

需要团队批准：

1. Capability / Module 作为长期资产；
2. Contract First；
3. Runtime 与业务分离；
4. 做一次真实 PoC；
5. PoC 不通过就停，不扩平台。

结束句：

> 我们不是申请一次性建设一个大平台，而是申请用一个可验证 PoC，证明一种新的软件研发方式。
