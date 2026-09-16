---
document_id: CIAP-2010
title: Product Recipe Specification
version: 0.2.0
status: Draft
owner: Architecture Committee
type: Specification
---

# CIAP-2010 — Product Recipe Specification

## 1. Purpose

Product Recipe 是 Product Composition 的 Source of Truth。

它回答：

> 这个软件由哪些 Module、Flow、Scene 和 Runtime Target 组成？

## 2. Declarative rule

Recipe MUST 描述“需要什么”，而不是“如何编程实现”。

Recipe MUST NOT 包含 arbitrary scripts、Runtime 私有代码、DB Connection 或 Module Private Implementation。

## 3. Minimum structure

```yaml
product:
  id: factory-logistics
  name: Factory Logistics
  version: 1.0.0

runtime:
  type: web
  version: 1.x

modules:
  warehouse.inventory:
    contract: 2
  production.workorder:
    contract: 1
  device.machine:
    contract: 1

flows:
  main:
    id: factory-logistics.main
    version: 1.0.0

scene:
  id: factory.main
  version: 1

roles: []
configuration: {}
```

## 4. Runtime target

Recipe MUST 声明 Runtime Target。

Compiler MUST 验证所有 Module 的 Runtime Adapter Compatibility。

## 5. Modules

Recipe SHOULD 声明 Contract Requirement。

具体解析得到的 Implementation/Adapter Version 写入 Product Lock。

## 6. Flow / Scene

Flow 和 Scene MUST 独立版本化。

## 7. Configuration

Configuration MAY 用于产品变体，但 MUST NOT 改写公共 Contract、成为隐藏脚本或绕过 Module Boundary。

## 8. Compiler validation

Compiler MUST 至少检查：

1. Module exists；
2. Contract compatible；
3. dependency resolvable；
4. no forbidden cycle；
5. Runtime Adapter available；
6. Flow references resolvable；
7. Scene providers resolvable；
8. permissions declared；
9. asset variants available when required。

## 9. Product Lock

Recipe 声明需求；Lock 锁定解析结果。

Lock SHOULD 包含：

```text
Module Implementation Version
Contract Version
Adapter Version
Flow Version
Scene Version
Runtime Version
Asset Version
Compiler Version
```

## 10. Product variants

Lite / Standard / Advanced SHOULD 使用 base recipe + variant override，而不是复制整个 Product Codebase。

## 11. MVP gate

`factory-logistics` MUST 通过引用 Warehouse / Production 已有 Module 形成。

禁止复制 Domain Code 来伪造“组合”。

## 12. Review checklist

- [ ] 是否优先复用已有 Module？
- [ ] Runtime 是否显式？
- [ ] 是否把实现细节写入 Recipe？
- [ ] Flow/Scene 是否独立版本化？
- [ ] 是否可生成 Lock？
- [ ] Variant 是否避免代码 Fork？
