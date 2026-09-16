---
document_id: CIAP-2000
title: Capability Specification
version: 0.2.0
status: Draft
owner: Architecture Committee
type: Specification
---

# CIAP-2000 — Capability Specification

## 1. Definition

Capability 是稳定、可命名、可拥有，并能独立描述业务价值的业务能力。

Capability 不是 Page、Widget、API Endpoint 或某个 Runtime 组件。

## 2. Required fields

Stable Capability MUST 至少具备：

```yaml
id: warehouse.inventory
name: Inventory Management
owner: warehouse-domain
description: 管理库存查询、预留与释放
status: Stable
```

## 3. Identity

Capability ID MUST：

- 全局唯一；
- 稳定；
- 不包含项目名；
- 不包含 Runtime 名；
- 使用语义化命名。

推荐：

```text
domain.capability
```

示例：

```text
warehouse.inventory
warehouse.location
production.workorder
device.machine
quality.inspection
```

## 4. Boundary rules

Capability SHOULD：

1. 具有稳定业务职责；
2. 有明确 Owner；
3. 不依赖具体 UI；
4. 不依赖具体 Runtime；
5. 有相对独立生命周期。

## 5. Capability vs Module

Capability 表达“做什么”。  
Module 表达“如何实现并发布该能力”。

一个 Capability MAY 有多个 Module Implementation。

## 6. Ownership

Stable Capability MUST 有唯一 Capability Owner。

Owner 负责：

- boundary；
- vocabulary；
- roadmap；
- public contract direction；
- deprecation；
- consumer impact。

## 7. Reuse decision

```text
Search existing capability
↓
Reuse?
├─ yes → compose
└─ no
   ↓
Can extend existing contract?
   ├─ yes → contract review
   └─ no → propose capability
```

## 8. Anti-patterns

不合规：

```text
project-a.inventory
web.inventory.page
unity.machine.controller
customer-x.special-stock
```

## 9. Review checklist

- [ ] 是否表达稳定业务能力？
- [ ] 是否已有重复 Capability？
- [ ] Owner 是否唯一？
- [ ] 是否 Runtime-neutral？
- [ ] 是否与具体 Project/Customer 耦合？
