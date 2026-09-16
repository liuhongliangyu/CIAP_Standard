---
document_id: CIAP-0003
title: CIAP Product Boundary
version: 0.1.0
status: Draft
owner: Architecture Committee
type: Foundation
---

# CIAP-0003 — Product Boundary

## 1. Why this document exists

大型平台失败的常见原因不是“功能做少了”，而是：

> **边界不断扩张。**

CIAP 必须明确它是什么，也必须明确它不是什么。

---

## 2. CIAP is

CIAP 是：

> **面向 2D/3D 交互型工业软件的可组合应用平台标准与运行体系。**

核心职责：

1. 定义业务 Capability；
2. 定义 Module Contract；
3. 支持 Module 复用；
4. 支持跨 Module Flow；
5. 支持 Scene / Entity / Interaction 组合；
6. 支持 Product Recipe；
7. 支持多 Runtime；
8. 支持治理、版本和兼容性；
9. 支持 AI 在规则内进行开发和分析。

---

## 3. CIAP is not a low-code page builder

CIAP 可以提供 Studio 和可视化编排。

但 CIAP 不是传统意义上的：

```text
拖控件
→ 生成 CRUD 页面
```

CIAP 的核心不是页面，而是：

```text
Capability
Module
Contract
Flow
Scene
Product
```

---

## 4. CIAP is not MES / WMS / ERP

CIAP 不直接成为：

- MES；
- WMS；
- ERP；
- EMS；
- QMS。

这些是可以由 CIAP Capability 和 Module 组合形成的 Product。

因此：

> 平台不应吸收领域产品业务规则。

---

## 5. CIAP is not a database

CIAP 可以定义：

- 数据 Ownership；
- Contract；
- Registry；
- Persistence Pattern。

但不提供“统一业务数据库”作为平台核心。

每个 Domain Module 可以按边界拥有自己的数据持久化策略。

---

## 6. CIAP is not CAD / DCC / 3D modeling software

CIAP Scene Composer 不替代：

- Blender；
- Maya；
- 3ds Max；
- CAD；
- BIM Authoring Tool。

Scene Composer 只负责：

- Layer；
- Entity Binding；
- Asset Binding；
- Slot；
- Interaction；
- Camera Request；
- Product Scene Composition。

---

## 7. CIAP is not Unity Editor / Unreal Editor replacement

Unity 和 Unreal 是 Runtime / Content Authoring Ecosystem。

CIAP 不重做：

- Shader Editor；
- Animation Editor；
- Physics Editor；
- Material Editor；
- Native Scene Authoring。

CIAP 负责建立跨 Runtime 的业务组合语义。

---

## 8. CIAP is not PLC programming software

CIAP Device Capability 可以抽象：

```text
start
stop
pause
setSpeed
```

但 PLC Ladder、IEC 61131-3、Safety Logic 等仍属于专用控制系统。

CIAP 必须尊重设备安全边界。

---

## 9. CIAP is not a general workflow/BPM platform

CIAP Flow 主要服务于：

> Product 内跨 Capability 的业务过程。

如果企业已有成熟 BPM：

CIAP 可以通过 Contract 集成，而不是强制替换。

---

## 10. CIAP is not an ESB

CIAP 支持 Event / Connector / Contract。

但不以“连接所有系统”为平台使命。

系统集成是手段，不是 CIAP 的核心价值。

---

## 11. CIAP is not an AI coding product

CIAP 可以提供 AI Agent。

但核心目标不是“让 AI 写更多代码”。

AI 在 CIAP 中服务于：

- Contract Draft；
- Module Generation；
- Test；
- Impact Analysis；
- Migration；
- Governance。

CIAP 没有 AI 也必须成立。

---

## 12. CIAP Studio boundary

Studio 负责：

- Product Composer；
- Flow Designer；
- Scene Composer；
- Module Browser；
- Governance；
- Release。

Studio MUST NOT：

- 成为 Product 运行必须依赖；
- 持有运行时业务真实状态；
- 绕过 Compiler / Registry 直接改生产 Artifact。

---

## 13. CIAP Runtime boundary

Runtime 负责执行标准 Product Package。

Runtime MUST NOT：

- 吸收 Product 业务逻辑；
- 访问 Studio 内部数据库；
- 让某个项目私有代码进入 Runtime Core。

---

## 14. CIAP Platform boundary

Platform Control Plane 负责：

- Registry；
- Compiler；
- Flow；
- Release；
- Policy；
- Audit；
- Asset Metadata；
- Compatibility。

Platform 不直接拥有领域业务状态。

---

## 15. Boundary decision test

新增能力进入 CIAP Core 前必须回答：

1. 是否所有或多数 Product 都需要？
2. 是否属于跨 Runtime 的稳定平台语义？
3. 是否无法通过 Module / Adapter / Plugin 实现？
4. 是否会增加核心 Meta Model 复杂度？
5. 是否会使 CIAP 与专业工具职责重叠？
6. 是否值得让所有实现长期承担兼容成本？

如果 3～6 的答案不理想，应优先放到 Edge Extension，而不是 Core。
