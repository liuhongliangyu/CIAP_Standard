---
document_id: CIAP-0001
title: CIAP Constitution
version: 0.1.0
status: Draft
owner: Architecture Committee
type: Constitution
---

# CIAP-0001 — Constitution

## 1. Authority

本 Constitution 是 CIAP 的最高设计准则。

所有：

- Architecture；
- Specification；
- SDK；
- Runtime；
- Platform；
- Studio；
- Module；
- AI Agent；

都必须遵守本文档。

若下层规范与 Constitution 冲突：

> **Constitution 优先。**

---

## 2. Mission

CIAP 的使命是：

> **让软件从“项目重复开发”转向“能力沉淀、标准组合和多 Runtime 运行”。**

---

## 3. Vision

CIAP 希望形成这样的研发方式：

```text
Business Capability
        ↓
Reusable Module
        ↓
Composable Flow / Scene
        ↓
Product Recipe
        ↓
Runtime
        ↓
Running Software
```

---

## 4. Article I — Capability First

### Statement

所有公共软件能力 MUST 首先被识别为业务 Capability，再决定如何实现。

### Requirements

- MUST 先定义业务职责。
- MUST 明确 Owner。
- MUST 避免以页面、项目、Runtime 命名核心能力。
- SHOULD 优先复用已有 Capability。

### Prohibited

禁止以“这个项目特殊”为默认理由复制已有能力。

---

## 5. Article II — Contract Before Implementation

### Statement

跨边界协作 MUST 先有 Contract，再有实现。

### Requirements

- 公共 Action MUST 有 Contract。
- 公共 Event MUST 有 Contract。
- 公共 Interaction MUST 有 Contract。
- Stable Contract MUST 版本化。
- Breaking Change MUST Review。

### Principle

> 代码可以重写，Contract 不得随意漂移。

---

## 6. Article III — Composition Before Duplication

新的 Product SHOULD 优先组合现有 Module，而不是复制实现。

若组合必须修改原 Module Domain Source：

必须先判断：

- Capability 边界是否错误；
- Contract 是否不足；
- 是否存在产品特化泄漏；
- Runtime 是否包含业务逻辑。

---

## 7. Article IV — Runtime Neutrality

Runtime MUST 保持业务中立。

Runtime 负责：

- Loading；
- Rendering；
- Interaction；
- Runtime Integration。

Runtime MUST NOT：

- 决定业务规则；
- 持有业务真实状态；
- 包含产品特供逻辑。

---

## 8. Article V — Module State Sovereignty

一个 Module 的 Domain State 由该 Module 拥有。

其他 Module MUST 通过 Contract 协作。

禁止：

```text
cross-module private DB query
cross-module private service import
```

---

## 9. Article VI — Stable Core, Evolvable Edge

CIAP 核心协议必须稳定。

扩展能力应优先发生在：

- Adapter；
- Profile；
- Plugin；
- Configuration；
- Extension Point；

而不是频繁修改核心 Meta Model。

---

## 10. Article VII — Single Source of Truth

每类信息必须有明确唯一源。

例如：

| Information | Source of Truth |
|---|---|
| Module Contract | Contract Registry |
| Product composition | Product Recipe |
| Built dependency set | Product Lock |
| Architecture decision | ADR |
| Core terminology | CIAP-0002 |
| Core object model | CIAP-0000 |

禁止同一事实由多份文档分别维护。

---

## 11. Article VIII — Observable by Default

所有 Stable Runtime / Module / Flow SHOULD 可观测。

最低应覆盖：

- trace；
- audit；
- error；
- latency；
- lifecycle；
- dependency health。

不可观测的核心能力不得轻易进入生产关键路径。

---

## 12. Article IX — AI Under Governance

AI 是实现者、分析者和建议者，不是最高架构权威。

AI MUST：

- 遵守 Contract；
- 遵守权限；
- 遵守 Review；
- 留下可审计输出。

AI MUST NOT：

- 私自修改 Stable Contract；
- 绕过 Architecture Review；
- 默认拥有 Production 权限；
- 直接控制高风险设备。

---

## 13. Article X — Backward Compatibility by Default

Stable 公共接口默认向后兼容。

Breaking Change 必须：

```text
Impact Analysis
→ RFC / ADR
→ Migration Plan
→ Version Change
→ Consumer Communication
```

不能通过“大家一起升级”规避兼容性治理。

---

## 14. Article XI — Product Runtime Independence

Product 的业务定义 SHOULD 尽量独立于具体 Runtime。

同一 Product 在 Web / Unity / Unreal 的：

- UI；
- Animation；
- Rendering；

可以不同。

但：

- Contract；
- Flow 业务语义；
- Entity Identity；
- Permission；
- Audit；

必须保持一致语义。

---

## 15. Article XII — Long-term Maintainability

任何设计都必须考虑：

- 三年后谁维护；
- 是否可测试；
- 是否可替换；
- 是否可升级；
- 是否可组合；
- 是否可追踪。

短期开发速度不能成为破坏长期边界的充分理由。

---

## 16. Rights of a Module

每个合规 Module 有权：

1. 拥有自己的 Domain State；
2. 独立版本；
3. 独立测试；
4. 独立发布；
5. 拒绝其他 Module 访问私有实现；
6. 通过 Adapter 支持不同 Runtime。

---

## 17. Responsibilities of a Module

每个 Stable Module 必须：

1. 声明 Capability；
2. 发布 Contract；
3. 声明 Owner；
4. 声明 Runtime Support；
5. 声明 Dependency；
6. 提供 Tests；
7. 维护 Compatibility；
8. 提供 Changelog。

---

## 18. Responsibilities of the Platform

CIAP Platform 必须：

- 不绑架业务实现；
- 提供确定性 Build；
- 提供 Compatibility Check；
- 提供版本治理；
- 提供可审计发布链；
- 支持回滚；
- 不将 Studio 变成 Runtime 必需依赖。

---

## 19. Amendment

修改 Constitution 必须：

```text
RFC
→ Architecture Committee Review
→ Impact Analysis
→ Approval
→ Version Update
```

Constitution 不应因单个项目需求频繁修改。
