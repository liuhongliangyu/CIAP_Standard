---
document_id: CIAP-2001
title: Module Specification
version: 0.2.0
status: Draft
owner: Architecture Committee
type: Specification
---

# CIAP-2001 — Module Specification

## 1. Definition

Module 是 CIAP 中可独立开发、测试、版本化、发布和组合的 Capability 实现单元。

## 2. Recommended structure

```text
module/
├── module.yaml
├── contracts/
├── domain/
├── application/
├── adapters/
│   ├── web/
│   ├── unity/
│   └── unreal/
├── tests/
├── README.md
└── CHANGELOG.md
```

## 3. Mandatory declarations

Stable Module MUST 声明：

- module id；
- capability；
- contract version；
- implementation version；
- owner；
- actions；
- events；
- permissions；
- dependencies；
- runtime support；
- lifecycle status。

## 4. State ownership

Module MUST own its Domain State boundary.

其他 Module MUST NOT：

- 直接读写其私有数据库；
- Import 私有 Domain Service；
- 修改内部 Entity State。

跨 Module 协作 MUST 通过公开 Contract。

## 5. Public/private boundary

公开：

```text
Manifest
Contracts
Runtime Support Metadata
```

私有：

```text
Domain implementation
Application internals
Private persistence
```

## 6. Dependencies

允许依赖：

- public Contract；
- CIAP SDK；
- 声明式 external connector abstraction。

禁止依赖：

- another module private code；
- another module private database；
- Studio internals；
- Runtime private internals。

## 7. Runtime support

支持关系必须显式声明。

```yaml
runtimeSupport:
  web:
    supported: true
    adapter: warehouse.inventory.web@1.2.0
  unity:
    supported: false
```

Compiler MUST NOT 将“未声明”理解为“默认支持”。

## 8. Lifecycle

```text
Draft → Experimental → Stable → Deprecated → Retired
```

Stable Module MUST 有 Owner、Contract Tests、Changelog 和 Compatibility Responsibility。

## 9. Product-specific behavior

共享 Module SHOULD 避免：

```text
if product == X
if customer == Y
```

优先使用 configuration、policy、extension point、separate capability 或 flow composition。

## 10. Composition criterion

Module 被另一个 Product 复用时：

> SHOULD NOT require modifying its Domain source.

## 11. Review checklist

- [ ] Capability 是否明确？
- [ ] State Owner 是否明确？
- [ ] Public/Private 是否隔离？
- [ ] 是否存在跨模块私有依赖？
- [ ] Runtime Support 是否显式？
- [ ] 是否包含 Product-specific Domain Fork？
