# CIAP Academy v1.0

> 把 CIAP 从“少数人的理解”复制成“整个团队的能力”

---

# 0. 培训目标

Academy 不要求所有人掌握全部细节，而是让不同角色掌握对应层级能力。

课程分五级：

```text
L0 Executive
L1 Foundation
L2 Developer
L3 Advanced Engineer
L4 Architect
```

---

# 1. L0 — 管理层课程

**时长：30 分钟**

目标：听完能回答：

- CIAP 为什么值得做；
- 第一阶段投入什么；
- 第一阶段怎么判断成败；
- CIAP 与低代码、微服务、AI Coding 有什么不同。

课程结构：

```text
10 min  当前软件重复开发问题
5 min   AI 为什么不能自动解决结构问题
10 min  CIAP 核心模型
5 min   MVP Gate 与阶段投资
```

验收：能用一句话解释——

> CIAP 是把项目代码转成可持续复用的软件能力资产。

---

# 2. L1 — 全员基础课程

**时长：2 小时**

目标：理解 Capability、Module、Contract、Flow、Scene、Product、Runtime。

练习：

1. 把现有 WMS 拆成 Capability List；
2. 为 Inventory 设计 query/reserve/release；
3. 把“库存 → 工单 → 设备 → 质检”拆成 Flow；
4. 解释为什么 Web 与 Unity 可以表现不同但业务语义相同。

结业测验：判断以下逻辑应该放在哪里：

- 库存扣减；
- 相机聚焦；
- 工单流程；
- Machine Mesh；
- Permission；
- Product Composition。

---

# 3. L2 — Developer Bootcamp

**时长：1 天**

目标：独立完成：

```text
Hello Module
↓
Action Contract
↓
Web Adapter
↓
Flow
↓
Product Recipe
↓
Run
```

## Lab 1 — Module

创建 `training.inventory`，包含 manifest、owner、domain、tests。

## Lab 2 — Action

实现 `training.inventory.reserve`，必须包含 input、output、error、permission、timeout、idempotency。

## Lab 3 — Web Adapter

展示库存状态。要求：不拥有 Domain State，只使用 Runtime SDK，并正确 mount/unmount。

## Lab 4 — Flow

```text
Reserve
↓
Human Confirm
↓
Release / Complete
```

## Lab 5 — Product

通过 Recipe 组合，禁止 import Module Private Code。

结业标准：Contract Test Pass、Architecture Check Pass、Product 可运行、无跨 Module 私有依赖。

---

# 4. L3 — Advanced Engineer

**时长：2～3 天**

掌握：Runtime Adapter、Flow Failure、Event、Compensation、Scene、Entity Projection、Product Lock、Compatibility。

核心练习：给同一个 Module 实现 Web Adapter + 第二 Runtime Mock Adapter，验证业务 Contract 不变化。

---

# 5. L4 — CIAP Architect

**时长：1～2 周分阶段完成**

目标：可以进行 Capability Boundary、Contract Review、Flow Architecture、Runtime Boundary、ADR、RFC、Breaking Change Analysis。

核心 Case：设计 Warehouse + Production → Factory Logistics，要求：

```text
0 Domain code modifications
```

---

# 6. AI Engineer Track

AI Context Pack：

```text
Constitution
Terminology
Relevant Specification
Engineering Handbook / Playbook
Task Contract
Acceptance Criteria
```

AI Lab：

1. 生成一个 Module Draft；
2. 故意要求 AI 直接调用其他 Module private service，预期 AI 拒绝或提出 Architecture Issue；
3. 要求 AI 修改 Stable Contract，预期输出 Impact / RFC 建议，而不是直接改。

---

# 7. 内部认证

- **CIAP Foundation**：通过 L1；
- **CIAP Developer**：通过 L2；
- **CIAP Advanced Developer**：通过 L3；
- **CIAP Architect**：通过 L4 + Architecture Case Review。

---

# 8. 新人三天 Onboarding

## Day 1

White Paper + Constitution + Foundation Course + Capability/Module Workshop。

## Day 2

Developer Bootcamp：Module、Action、Adapter。

## Day 3

Flow、Product、Review、AI Development。

第三天下午目标：

> 在不修改 CIAP Core 的情况下完成一个简单 Product。

---

# 9. 持续培训节奏

- 每季度：Architecture Workshop；
- 每月：CIAP Case Review；
- 每两周：Architecture Clinic；
- 新成员：必须完成 L1；
- 核心研发：必须完成 L2。

---

# 10. Academy KPI

不是考试分数，而是：

- 新成员独立开发时间；
- Architecture Violation 数量；
- Contract Review 返工率；
- Module Reuse Rate；
- AI 生成代码合格率。

---

# 11. 最终目标

CIAP Academy 成功的标志不是大家都能背规范，而是：

> **不同成员面对相同问题时，会自然做出接近一致的架构判断。**
