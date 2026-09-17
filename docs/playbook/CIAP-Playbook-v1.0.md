# CIAP Playbook v1.0

> CIAP 团队的日常研发打法

---

# 0. Playbook 的定位

Constitution 回答：什么不能违反。  
Specification 回答：标准是什么。  
Playbook 回答：**项目实际怎么做。**

---

# 1. 新需求进入团队后的八问法

1. 这是哪个 Capability？
2. 已有 Capability 吗？
3. 已有 Module 吗？
4. 是否需要新增/修改 Contract？
5. 这是 Module 内部规则，还是跨能力 Flow？
6. 这是业务语义，还是 Runtime Presentation？
7. 是否可以复用已有实现？
8. 是否需要 ADR / RFC？

没有回答完，不进入编码。

---

# 2. 什么时候创建新 Capability

只有同时满足以下多数条件，才考虑新 Capability：

- 有独立业务职责；
- 有独立生命周期；
- 有明确 Owner；
- 不依赖具体 UI；
- 不依赖具体 Runtime；
- 未来可能被多个 Product 使用。

否则优先使用：扩展已有 Capability、增加 Flow、增加配置、增加 Adapter。

---

# 3. 什么时候创建新 Module

流程：

```text
Capability exists?
↓
Existing module?
↓
Can extend?
↓
Need separate implementation?
```

禁止因为客户、项目、页面不同就直接创建新 Module。

---

# 4. Contract 设计流程

```text
Requirement
↓
Canonical Vocabulary
↓
Action / Event / Interaction
↓
Input / Output Schema
↓
Error
↓
Permission
↓
Version
↓
Contract Review
```

---

# 5. Module 开发流程

```text
module.yaml
↓
contracts/
↓
tests/
↓
domain/
↓
application/
↓
adapters/
↓
integration test
```

不要先写页面再补 Contract。

---

# 6. Flow 设计流程

先画业务过程：

```text
Actor
↓
Capability
↓
Decision
↓
Human Task
↓
Event
```

再转成 Flow DSL。

不要从页面跳转反推业务流程。

---

# 7. Scene 设计流程

先识别：

```text
Entity
Layer
Slot
Interaction
Asset
Camera Intent
```

再实现 Web / Unity / Unreal 表现。

---

# 8. Product 设计流程

```text
Business Goal
↓
Capability Selection
↓
Module Selection
↓
Flow Composition
↓
Scene Composition
↓
Runtime Target
↓
Product Recipe
↓
Build
```

---

# 9. Runtime Core 是否应该改

任何 Runtime Core 修改都必须回答：

1. 是否至少两个以上 Product 都需要？
2. 是否跨 Capability 通用？
3. 是否确实属于 Runtime 执行职责？
4. 是否可以放在 Adapter？
5. 是否引入了业务词汇？

如果只服务单一 Product，默认拒绝进入 Core。

---

# 10. Studio Feature 是否应该做

Studio 只负责：

```text
Design
Compose
Validate
Publish
Govern
```

如果某功能只能通过 Studio 完成，而 CLI/API 无法完成，需要重新检查平台语义是否被 UI 绑架。

---

# 11. AI 如何参与

建议把 AI 角色逻辑拆成：

```text
Contract Agent
Module Agent
Adapter Agent
Test Agent
Architecture Review Agent
```

即使实际使用同一个模型，也按不同角色和不同权限执行。

---

# 12. AI 开发标准流程

```text
Read Constitution
↓
Read relevant Specification
↓
Read Contract
↓
Plan
↓
Implement
↓
Test
↓
Architecture Check
↓
Human Review
```

---

# 13. AI Task 必须包含

```text
Role
Context
Task
Constraints
Deliverables
Acceptance Criteria
Forbidden Changes
```

---

# 14. PR 必须回答

## Why
为什么需要？

## Capability
属于哪个 Capability？

## Contract Impact
是否影响公共 Contract？

## Architecture Impact
是否新增跨模块私有依赖？

## Runtime Impact
是否引入 Runtime-specific business logic？

## Compatibility
是否 Breaking？

## Tests
如何验证？

## Reuse
是否重复已有能力？

---

# 15. 每周架构例会看什么

不只看进度和代码量，重点看：

- 新增 Capability 数；
- 重复 Capability 数；
- Contract Breaking Change；
- Cross-module Private Dependency；
- Product-specific Runtime Code；
- Module Reuse Rate；
- Composition Failure；
- Architecture Violation。

---

# 16. Product Review 看什么

除了页面完成度，必须审查：

```text
Recipe
Module Reuse
Flow
Scene
Runtime Support
Contract Compatibility
Tests
```

---

# 17. Definition of Ready

开发前：

- [ ] Capability 明确；
- [ ] Owner 明确；
- [ ] Contract 明确；
- [ ] Acceptance Criteria 明确；
- [ ] Runtime 影响明确；
- [ ] 对其他 Product 的影响明确。

---

# 18. Definition of Done

Feature 完成：

- [ ] Contract；
- [ ] Code；
- [ ] Unit Test；
- [ ] Contract Test；
- [ ] Integration Test；
- [ ] Runtime Adapter（需要时）；
- [ ] Docs；
- [ ] Changelog；
- [ ] Architecture Check；
- [ ] No Forbidden Dependency。

---

# 19. 必须拒绝的反模式

## Cross-module DB

```text
Module A → Module B private DB
```

拒绝。

## Product code in Runtime

```text
Runtime Core → warehouse special logic
```

拒绝。

## Arbitrary Script Node

Flow V1 中任意 JS/Python：拒绝。

## Customer Branch Logic

共享 Module 中大量 `if customer == ...`：默认拒绝。

## Copy Module

为了新 Product 复制旧 Module：默认拒绝。

---

# 20. MVP Gate

```text
Gate 1: Contract/SDK 支持 Reference Module
Gate 2: Web Runtime 加载合法 Product Package
Gate 3: Warehouse 独立运行
Gate 4: Production 独立运行
Gate 5: Factory Logistics 0 Domain modifications
```

Gate 5 不通过，不进入 Studio / Unity / Marketplace 扩张。

---

# 21. 技术负责人判断框架

遇到架构争议，依次问：

```text
是否违反 Constitution？
是否改变 Meta Model？
是否破坏 Contract？
是否增加 Runtime Coupling？
是否降低 Reuse？
是否造成 Hidden State？
是否使 AI 难以自动验证？
```

---

# 22. 一句话打法

> **先找 Capability，再定 Contract；Module 管状态，Flow 管过程，Scene 管表现，Runtime 管执行，Platform 管治理，Product 管组合。**
