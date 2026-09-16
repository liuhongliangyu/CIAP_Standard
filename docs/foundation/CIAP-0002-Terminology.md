---
document_id: CIAP-0002
title: CIAP Terminology
version: 0.1.0
status: Draft
owner: Architecture Committee
type: Foundation
---

# CIAP-0002 — Terminology

本文档是 CIAP 统一术语表。

同一概念在正式文档中 MUST 使用统一名称。

---

## 1. Capability

**中文：业务能力**

稳定、可命名、可拥有的业务职责。

例如：

```text
Inventory Management
Work Order Management
Machine Control
Quality Inspection
```

不要把 Page、Widget、API Endpoint 称为 Capability。

---

## 2. Module

**中文：模块 / 能力模块**

Capability 的可发布实现单元。

Module 不是“代码文件夹”的同义词。

一个目录是否是 Module，取决于它是否拥有：

- 独立边界；
- Contract；
- Version；
- Owner；
- Tests；
- Runtime Support。

---

## 3. Contract

**中文：契约**

跨边界协作协议。

类型：

- Action Contract
- Event Contract
- Interaction Contract
- Data Contract
- Permission Contract

---

## 4. Action

具有明确输入、输出、错误和权限语义的命令式能力。

Action 表达：

> “请求系统做什么”。

---

## 5. Event

已经发生事实的稳定消息。

Event 表达：

> “什么已经发生”。

禁止把请求命令伪装成 Event。

---

## 6. Flow

跨 Capability 的业务过程编排。

Flow 不是：

- 页面路由；
- UI Wizard；
- Script Pipeline。

---

## 7. Scene

2D/3D 产品表现结构的 Runtime-neutral 描述。

Scene 组合：

- Layer
- Slot
- Entity Projection
- Asset
- Interaction

---

## 8. Product

通过 Product Recipe 组合 Module / Flow / Scene 后形成的可交付软件定义。

---

## 9. Product Recipe

描述“产品由什么组成”的声明式源文件。

它是产品组合的 Source of Truth。

---

## 10. Product Lock

Compiler 解析 Recipe 后生成的确定性版本锁定结果。

Recipe 表达：

> 想要什么。

Lock 表达：

> 最终具体用了什么版本。

---

## 11. Runtime

执行 Product Package 的环境。

标准 Runtime 类型：

- Web Runtime
- Unity Runtime
- Unreal Runtime
- Edge Runtime
- Offline Runtime

---

## 12. Runtime Adapter

将 Module 的平台语义映射到特定 Runtime 表现的适配层。

Adapter 不拥有 Domain State。

---

## 13. Entity

具有稳定业务身份、可跨 Runtime 投影的对象。

例如：

```text
machine-001
agv-002
location-A01
```

---

## 14. Projection

Entity 在某种 Runtime 中的表现。

例如：

- Three.js Mesh；
- Unity GameObject；
- Unreal Actor；
- 2D Card。

---

## 15. Interaction

操作者行为的语义描述。

例如：

```text
select machine
confirm outbound
acknowledge alarm
```

---

## 16. Asset

表现层消费的资源。

例如：

- glTF；
- texture；
- prefab；
- audio；
- icon。

---

## 17. Studio

CIAP 的设计、组合、治理 UI。

Studio 是 Control Plane UI。

Studio 不是业务 Product Runtime。

---

## 18. Platform

提供 Registry、Compiler、Flow、Release、Policy、Audit 等控制面能力的系统。

---

## 19. Compiler

将 Product Recipe、Flow、Scene 和 Registry Metadata 转换为确定性 Runtime Artifact 的组件。

---

## 20. Registry

存储、发现和治理稳定 CIAP Artifact 的系统。

---

## 21. Source of Truth

某类事实唯一权威来源。

如果一个事实存在多个互相可编辑来源，就不符合 Single Source of Truth 原则。

---

## 22. Stable

经过治理、允许其他团队形成生产依赖的生命周期状态。

Stable 不代表永远不改。

Stable 代表：

> 修改必须承担兼容性责任。

---

## 23. Breaking Change

使现有合法 Consumer 在不修改自身的情况下无法继续工作的公共变更。

---

## 24. Conformance

一个实现是否符合 CIAP 标准语义。

Conformance 不等于“代码完全相同”。

---

## 25. Reference Implementation

由 CIAP 提供的标准参考实现。

它用于说明“标准应如何被正确实现”，但并不禁止其他合规实现。
