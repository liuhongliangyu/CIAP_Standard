# CIAP Engineering Handbook v1.0

> 面向 CIAP 开发人员、架构师、AI Agent 和代码评审人员的研发执行手册

---

# 0. 本手册的作用

《CIAP Constitution》定义“不能轻易违反的法律”。

《CIAP Engineering Handbook》定义：

> **开发人员每天应该怎么工作。**

适用对象：

- Module Developer；模块开发者
- Runtime Developer；运行时开发者
- Platform Developer；平台开发者
- Studio Developer；工作室开发者
- Product Developer；产品开发人员
- AI Coding Agent；AI编码代码
- Reviewer；评审员
- Architecture Owner。架构负责人

所有进入 CIAP 主分支的代码和设计，都应满足本手册。

---

# 1. 十条开发铁律

## Rule 1 — Capability First

开发任何公共能力前，必须先回答：

> 这是什么 Capability？

禁止：

```text
先建页面
先建 Controller
先建表
先写接口
```

然后再倒推业务职责。

---

## Rule 2 — Contract First

公共行为的标准顺序：

```text
Requirement-需求
↓
Contract-合约
↓
Schema-模式图
↓
Test-测试
↓
Implementation-实现
↓
Adapter-适配器
```

没有 Contract，不得开始公共接口实现。

---

## Rule 3 — Module Owns State：模块拥有状态

一个业务状态只能有一个明确 Module Owner。

禁止：

```text
Module A
直接查
Module B DB
```

跨 Module 必须：

```text
Action / Event / Contract
```

---

## Rule 4 — Flow Owns Process：流程拥有流程

跨多个 Capability 的流程必须进入 Flow。

不要把：

```text
库存 → 工单 → 设备 → 质检
```

全部写在某个页面或某个 Module Service 里。

---

## Rule 5 — Adapter Owns Presentation：适配器拥有演示/成果

Web / Unity / Unreal 的表现差异放在 Adapter。

Domain 不知道：

- DOM；文档对象模型
- Three.js；
- GameObject；游戏对象
- Actor；Unreal的角色
- UI Framework。用户界面框架

---

## Rule 6 — Runtime Never Owns Business：运行时从不拥有业务

Runtime Core 中禁止出现：

```text
warehouse-仓库
production-生产
machineBusiness-机器业务
customerA-客户A
MESRule-制造执行系统规则
```

如果只有某个 Product 需要：

默认不进入 Runtime Core。

---

## Rule 7 — Composition Before Duplication：复制前的组合

发现已有 Capability 时：

先复用。

不允许默认：

```text
copy module-复制模块
rename-重命名
modify-修改
```

---

## Rule 8 — CLI First, Studio Second

核心能力必须可通过：

```text
API / CLI / Schema
```

完成。

Studio 只做可视化表达。

---

## Rule 9 — AI Must Follow the Same Rules

AI 不享有特殊权限。

AI 生成代码必须：

- 读 Constitution；
- 读 Contract；
- 读 Module Spec；
- 生成 Test；
- 经过 Review。

---

## Rule 10 — No Hidden Architecture

依赖、权限、版本、Runtime Support 必须显式。

禁止依赖：

- 口头约定；
- 文件路径猜测；
- 隐藏环境变量；
- “大家都知道”。

---

# 2. 开发工作流

标准开发流程：

```text
需求
↓
Capability Check
↓
Contract Draft
↓
Architecture Review
↓
Schema / Test
↓
Implementation
↓
Runtime Adapter
↓
Integration Test
↓
Product Composition Test
↓
PR
↓
Merge
```

---

# 3. Capability 开发流程

开发前必须先搜索 Registry。

检查：

```text
是否已有 Capability？
是否已有类似 Capability？
是否可以扩展现有 Contract？
是否真的需要新 Capability？
```

新 Capability 必须说明：

- Business Responsibility；
- Owner；
- State Boundary；
- Public Contract；
- Consumers；
- Runtime Independence。

---

# 4. Module 开发规范

推荐目录：

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

---

## 4.1 module.yaml

必须包含：

```text
moduleId
capabilityId
contractVersion
implementationVersion
owner
actions
events
permissions
dependencies
runtimeSupport
status
```

---

## 4.2 domain/

只放业务规则。

允许：

```text
Entity
Value Object
Domain Service
Domain Rule
Repository Interface
```

禁止：

```text
Vue
Three.js
Unity
Unreal
HTTP Controller
SQL-specific business behavior
```

---

## 4.3 application/

负责协调 Domain 和 Contract。

允许：

```text
Use Case
Action Handler
Application Service
```

不负责视觉表现。

---

## 4.4 adapters/

负责 Runtime-specific 实现。

例如：

```text
adapters/web
adapters/unity
adapters/unreal
```

Adapter 不得拥有 Domain State。

---

# 5. Action 开发规范

Action ID：

```text
domain.capability.verb
```

例如：

```text
warehouse.inventory.reserve
device.machine.start
quality.inspection.execute
```

每个 Action 必须定义：

- Input；
- Output；
- Error；
- Permission；
- Timeout；
- Idempotency；
- Retry Policy（需要时）；
- Compensation（需要时）。

---

# 6. Event 开发规范

Event 表示：

> 已经发生的事实。

推荐：

```text
warehouse.inventory.reserved
device.machine.completed
quality.inspection.failed
```

禁止用 Event 表达命令：

```text
please-start-machine
```

这应该是 Action。

---

# 7. Flow 开发规范

Flow 用于跨 Capability Process。

V1 节点：

```text
Start
Action
Decision
HumanTask
WaitEvent
Timer
SubFlow
End
```

禁止任意 Script Node。

原因：

- 无法静态分析；
- 无法跨 Runtime；
- 无法安全治理；
- AI 容易绕过 Contract。

---

## 7.1 Flow 中不得出现

```text
Vue Component Name
DOM Selector
Three.js UUID
Unity GameObject
Unreal Actor
SQL Query
```

---

## 7.2 Flow 必须考虑失败

每个关键节点检查：

```text
失败怎么办？
是否 Retry？
是否 Compensation？
是否 Manual Recovery？
是否 Timeout？
```

---

# 8. Scene 开发规范

Scene 负责表现组合。

标准元素：

```text
World
Slot
Layer
Entity Projection
Asset Binding
Interaction
Camera Request
Overlay
```

Scene 不是 Domain State。

---

## 8.1 Entity Identity

业务 Entity：

```text
machine-001
```

Web：

```text
Three.js Object
```

Unity：

```text
GameObject
```

Unreal：

```text
Actor
```

Runtime Object 可以变化。

业务 `entityId` 不变。

---

# 9. Runtime Adapter 开发规范

标准生命周期：

```text
load
↓
mount
↓
activate
↓
deactivate
↓
unmount
↓
dispose
```

Adapter 必须：

- 释放 Event Subscription；
- 释放 Runtime Resource；
- 不保存业务真实状态；
- 不访问其他 Module 私有数据。

---

# 10. Product 开发规范

Product 不应该是新的“大项目”。

Product 由：

```text
Recipe
+
Modules
+
Flows
+
Scenes
+
Configuration
```

形成。

Product Repository 中禁止复制已有 Module Domain Code。

---

# 11. Product Recipe 规范

Recipe 描述：

```text
what
```

不是：

```text
how
```

不要在 Recipe 中加入任意脚本。

具体版本解析进入：

```text
Product Lock
```

---

# 12. Runtime 开发规范

Runtime Core 只允许通用能力。

典型：

```text
Product Host
Module Loader
Adapter Manager
Scene Runtime
Entity Runtime
Interaction Router
Asset Resolver
Flow Client
Telemetry
```

提交 Runtime Core PR 时必须回答：

> 这个能力是否至少被多个不同 Product 共同需要？

如果只服务一个 Product：

拒绝进入 Core。

---

# 13. Studio 开发规范

Studio 是控制面 UI。

Studio 的职责：

```text
Design
Compose
Validate
Publish
Govern
```

Studio 不承担运行时业务状态。

Studio 生成的结果必须是标准 Artifact，例如：

```text
Product Recipe
Flow DSL
Scene DSL
```

而不是只有 Studio 自己能理解的数据库记录。

---

# 14. Platform 开发规范

MVP 优先 Modular Monolith。

不要一开始拆：

```text
20 个微服务
Kafka
Service Mesh
复杂分布式事务
```

只有真实需求证明后再拆。

核心边界：

```text
Registry
Compiler
Flow
Product
Release
Policy
Audit
```

可以在一个部署单元中保持模块化。

---

# 15. 数据库规范

每个 Module 拥有自己的业务数据边界。

禁止：

```text
SELECT *
FROM another_module_private_table
```

如果需要别的 Capability 数据：

使用：

```text
Action
Query Contract
Event Projection
```

---

# 16. Versioning 规范

至少区分：

```text
Contract Version
Implementation Version
Adapter Version
Flow Version
Scene Version
Product Version
Runtime Version
```

Stable Contract 的 Breaking Change 不允许偷偷发生。

必须：

```text
Impact Analysis
↓
Migration
↓
Review
↓
Version Change
```

---

# 17. Testing 规范

## Module

必须：

```text
Domain Unit Test
Contract Test
Action Schema Test
```

## Adapter

必须：

```text
Lifecycle Test
Mount/Unmount
Resource Cleanup
```

## Flow

必须：

```text
Happy Path
Failure Path
Retry
Wait/Resume
Compensation
```

## Product

必须：

```text
Composition Test
Runtime Load Test
Integration Test
```

---

# 18. Definition of Done

任何 Feature 完成必须满足：

```text
[ ] Contract
[ ] Code
[ ] Unit Test
[ ] Contract Test
[ ] Integration Test
[ ] Documentation
[ ] Owner
[ ] Changelog
[ ] Architecture Check
[ ] No forbidden dependency
```

---

# 19. Pull Request 规范

PR 必须回答：

### Why

为什么需要？

### Capability

属于哪个 Capability？

### Contract Impact

是否影响公共 Contract？

### Runtime Impact

是否引入 Runtime-specific behavior？

### Compatibility

是否 Breaking？

### Test

如何验证？

### Reuse

是否重复已有能力？

---

# 20. Architecture Review 触发条件

以下变更必须进行 Architecture Review：

- 新 Capability；
- 新公共 Contract；
- Breaking Change；
- 新 Runtime Core API；
- 新 Flow Node Type；
- 新 Scene Core Concept；
- 新跨 Module Dependency；
- Product-specific logic 想进入 Platform/Runtime Core。

---

# 21. ADR 触发条件

需要长期解释“为什么这样设计”的决策必须写 ADR。

例如：

```text
为什么不用微服务
为什么禁止 Script Node
为什么 Flow 服务端持久化
为什么 Runtime 不拥有业务
为什么先 Web 后 Unity
```

---

# 22. AI 开发规则

任何 AI Coding Session 必须获得以下上下文：

```text
CIAP Constitution
CIAP Terminology
相关 Specification
Module Contract
Task Acceptance Criteria
```

---

## 22.1 AI 必须先生成计划

AI 不应直接从需求跳到代码。

至少输出：

```text
Capability
Files to change
Contract impact
Implementation plan
Tests
Risks
```

---

## 22.2 AI 禁止自行做的事

AI MUST NOT：

- 新增未批准 Capability；
- 修改 Stable Contract；
- 新增跨模块私有依赖；
- 把 Domain Logic 放进 Runtime；
- 绕过 Test；
- 删除 Migration；
- 修改权限模型；
- 直接发布 Production。

---

# 23. AI 标准任务模板

```text
Role:
You are a CIAP Engineer.

Context:
- Constitution
- Relevant Specification
- Module Contract

Task:
...

Constraints:
- Do not bypass Contract.
- Do not access another Module's private store.
- Do not put Domain Logic into Runtime Adapter.
- Do not modify Stable Contract unless explicitly approved.

Deliverables:
- Implementation
- Tests
- Changelog
- Architecture notes
```

---

# 24. AI 输出验收

AI 任务完成前检查：

```text
[ ] Module Manifest
[ ] Contract
[ ] Implementation
[ ] Tests
[ ] Runtime Adapter
[ ] README
[ ] Changelog
[ ] No Architecture Violation
```

---

# 25. 禁止的典型反模式

## Anti-pattern 1

Runtime 中：

```text
if warehouseOrderStatus == ...
```

错误。

---

## Anti-pattern 2

Module A：

```text
import ModuleBInternalService
```

错误。

---

## Anti-pattern 3

Flow：

```text
script: "custom javascript"
```

V1 禁止。

---

## Anti-pattern 4

共享 Module：

```text
if customer == "ABC"
```

默认错误。

---

## Anti-pattern 5

Studio 数据库成为 Product 的唯一运行定义。

错误。

Product 必须能被构建成标准 Recipe/Package。

---

# 26. MVP 开发顺序

严格建议：

```text
Foundation
↓
SDK
↓
CLI
↓
Registry / Compiler
↓
Web Runtime
↓
Flow Engine
↓
Reference Modules
↓
Warehouse
↓
Production
↓
Factory Logistics
↓
Studio
```

不要把 Studio 提前。

---

# 27. MVP 验收 Gate

在以下验证完成前：

```text
Warehouse
+
Production
        ↓
Factory Logistics
```

并达到：

```text
0 行原 Module Domain 修改
```

不得把主要精力转向：

- Unity；
- Unreal；
- Marketplace；
- Commercial；
- Advanced AI。

---

# 28. 技术负责人每周检查什么

不要只看：

```text
完成率
代码量
AI 写了多少
```

重点看：

```text
重复 Capability 数
Contract 变更数
Architecture Violation
Module Reuse Rate
Composition Failure
Product-specific Core Code
Cross-module Private Dependency
```

---

# 29. 开发人员的日常判断框架

遇到任何新需求，依次问：

```text
1. 这是哪个 Capability？
2. 已经有 Module 吗？
3. 是否需要新增/修改 Contract？
4. 这是 Module 内部规则还是跨能力 Flow？
5. 这是业务语义还是 Runtime Presentation？
6. 是否可以复用？
7. 是否破坏 Stable Contract？
8. 是否需要 ADR/RFC？
```

如果前面的问题没有回答清楚，不要急着写代码。

---

# 30. 最终原则

CIAP 研发不是为了让代码“看起来更架构化”。

最终判断只有几个：

### 能不能复用？

### 能不能组合？

### 能不能跨 Runtime？

### 能不能持续升级？

### AI 能不能在不破坏架构的情况下参与？

如果答案是否定的，就需要回到边界重新设计。

---

# 31. 一句话工程哲学

> **Module owns state. Flow owns process. Scene owns presentation. Runtime owns execution. Platform owns governance. Product owns composition.**
