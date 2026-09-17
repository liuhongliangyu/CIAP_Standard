# CIAP White Paper v1.0

> **Composable Intelligent Application Platform**
>
> 面向 AI 时代的可组合工业软件研发体系

---

## 0. 执行摘要

今天的软件研发正在进入一个新的拐点。

AI 已经显著降低了“写代码”的成本，但它并没有自动解决软件工程中更难的问题：

- 相同能力在不同项目中反复开发；
- 不同软件之间无法有效复用；
- 项目越做越多，代码越积越厚；
- 一个新项目往往仍然需要重新搭建页面、流程、接口和 2D/3D 交互；
- AI 可以更快地产生代码，但如果没有统一架构，它也会更快地产生重复和耦合。

CIAP 试图解决的不是“如何让开发更快写代码”，而是更根本的问题：

> **如何让软件从“项目式开发”转向“能力沉淀、模块复用、流程组合和多 Runtime 运行”。**

CIAP 的目标不是再做一个新的 MES、WMS、数字孪生平台或低代码平台，而是建立一套统一的软件组织方式：

```text
Capability（能力）
    ↓
Module（模块）
    ↓
Contract（合约）
    ↓
Flow（流程）
    ↓
Scene（场景）
    ↓
Product（产品）
    ↓
Runtime（运行）
```

在这一体系下：

- 一个软件可以完整独立运行；
- 一个软件也可以拆成多个独立能力模块；
- 不同软件中的模块可以重新组合；
- 同一个 Product 可以运行在 Web、Unity、Unreal 等不同 Runtime；
- AI 可以基于统一 Contract、SDK 和规范参与开发；
- 平台可以持续沉淀企业的软件资产，而不是只沉淀“项目代码”。

CIAP 的核心价值可以概括为一句话：

> **Software should be assembled, not rewritten.**  
> 软件应该被组合，而不是被一遍遍重写。

---

# 1. 为什么现在的软件研发模式正在失效

## 1.1 软件越来越多，但能力并没有等比例增加

在典型工业软件组织中，经常会同时存在：

- 仓储管理软件；
- 生产管理软件；
- 设备管理软件；
- 数字孪生软件；
- AGV 调度系统；
- 质量管理系统；
- 工厂可视化系统；
- 能源管理系统。

表面上看，这些软件差异很大。

但拆开后会发现，大量能力高度重复：

```text
库存
库位
工单
设备
报警
权限
任务
状态
流程
2D 面板
3D 实体
日志
报表
```

问题在于，这些能力通常不是被作为“企业级软件资产”维护，而是被分别写在不同项目里。

结果是：

```text
项目 A
├── 库存
├── 设备
├── 报警
└── 3D

项目 B
├── 库存
├── 设备
├── 报警
└── 3D

项目 C
├── 库存
├── 设备
├── 报警
└── 3D
```

从组织角度看，投入了三次研发成本，但沉淀的仍然是三套难以复用的项目代码。

---

## 1.2 “复制一个旧项目改”正在成为隐性标准

在项目压力下，最快的方式往往是：

> 找一个最像的旧项目，复制，再修改。

短期看，这种方式交付快。

长期看，它带来四个问题：

### 维护成本线性增长

每复制一次，就多一套：

- Bug；
- 依赖；
- 升级；
- 安全风险；
- 技术债。

### 修复无法自动传播

一个库存模块在 A 项目中修了 Bug，不代表 B、C 项目自动受益。

### 技术栈逐渐分裂

不同项目在不同时间开发，容易出现：

```text
Vue 2
Vue 3
Three.js 不同版本
不同状态管理
不同事件模型
不同权限机制
```

### AI 会放大复制模式

AI 让复制和修改更快。

如果架构没有变化：

> AI 只会让“重复开发”变得更高效，而不会让软件变得更可复用。

---

# 2. AI 改变了编码，但没有改变软件结构

## 2.1 AI 的真正机会

AI 非常适合：

- 根据 Contract （合约）生成 Module（模块）；
- 根据 Schema （模式）生成 API；
- 生成单元测试；
- 生成 Runtime Adapter（运行时适配器）；
- 生成 Flow Draft（流程草稿）；
- 生成 Scene Draft（场景草稿）；
- 分析 Breaking Change（突破性变更）；
- 生成迁移方案。

但 AI 要真正提高研发体系效率，有一个前提：

> **软件本身必须是结构化、可约束、可验证的。**

如果一个项目没有明确：

- Capability（能力）；
- Contract（合约）；
- Module Boundary（模块边界）；
- Runtime Boundary（运行时边界）；
- Flow（流程）；
- Scene（场景）；
- Product Recipe（场景配方）；

那么 AI 只能依赖自然语言和上下文猜测。

这种开发方式无法稳定规模化。

---

## 2.2 AI 时代更需要架构，而不是更少

传统开发中，架构错误可能由少量开发人员缓慢累积。

AI 时代，错误架构可以被几十倍速度复制。

因此，CIAP 的判断是：

> **AI 越强，标准化架构越重要。**

CIAP 不把 AI 定位为“自由写代码的工程师”，而是：

```text
AI
↓
读取 Contract（合约） / Specification（规范）
↓
生成 Draft（草稿） / Implementation（实现）
↓
自动 Test（测试）
↓
Architecture Check（架构检查）
↓
Human（人工） / Policy Review（政策审查）
↓
Merge（合并） / Release（发布）
```

---

# 3. CIAP 的核心思想

CIAP 不把“软件”看成一个不可拆分的项目。

而是看成几个不同层级对象的组合。

---

## 3.1 Capability：业务能力

Capability 回答：

> 这个系统“会做什么”？

例如：

```text
warehouse.inventory-仓库库存
warehouse.location-仓库位置
production.workorder-生产工单
device.machine-设备机器
quality.inspection-质量检验
alarm.management-报警管理
```

Capability 是业务语义，不是代码实现。

---

## 3.2 Module：能力的可发布实现

Module 是 Capability 的具体实现单元。

一个 Module 应该：

- 独立开发；
- 独立测试；
- 独立版本；
- 独立发布；
- 明确 Owner；
- 声明 Contract；
- 声明 Runtime Support。

Module 不是一个“公共组件目录”。

它是一个正式的软件资产。

---

## 3.3 Contract：跨边界的唯一协作方式

不同 Module 之间不直接访问私有实现。

它们通过：

- Action（动作）；
- Event（事件）；
- Interaction（交互）；
- Data Contract（数据合约）；
- Permission（权限）；

协作。

例如：

```text
warehouse.inventory.reserve-仓储库存预留
```

而不是：

```text
import InventoryService from another-module/internal
```

---

## 3.4 Flow：跨能力业务流程

Flow 回答：

> 多个 Capability 如何按业务过程协同？

例如：

```text
库存检查
↓
库存预留
↓
出库
↓
创建工单
↓
人工选择设备
↓
启动设备
↓
等待完成
↓
质量检验
```

Flow 不属于任何单一页面。

也不属于任何单一 Runtime。

---

## 3.5 Scene：2D/3D 表现组合

CIAP 面向的是大量 2D + 3D 工业交互软件，因此必须把 Scene 作为一级对象。

Scene 负责：

- 2D Slot（2D插槽）；
- 3D World（3D世界）；
- Layer（图层）；
- Entity Projection（实体投影）；
- Asset（资源）；
- Interaction（交互）；
- Camera Request（相机请求）；
- Overlay（覆盖层）。

Scene 不负责业务真实状态。

---

## 3.6 Product：最终软件

Product 不再是“一套独立源码”。

Product 是：

```text
Modules-模块
+
Flows-流程
+
Scenes-场景
+
Runtime Target-运行时目标
+
Roles-角色
+
Configuration-配置
```

的组合。

---

# 4. CIAP 最终想做成什么样

CIAP 最终由四个核心产品组成。

```text
CIAP SDK
CIAP Runtime
CIAP Platform
CIAP Studio
```

---

## 4.1 CIAP SDK

SDK 定义统一开发规则。

它让开发人员和 AI 知道：

- Module 如何定义；
- Action 如何调用；
- Event 如何订阅；
- Entity 如何映射；
- Scene 如何挂载；
- Runtime Adapter 如何实现；
- Product 如何构建。

SDK 是 CIAP 的“开发语言”。

---

## 4.2 CIAP Runtime

Runtime 负责运行最终 Product。

第一阶段：

```text
Web Runtime
=
Vue 3
+
Three.js
+
CIAP Runtime Core
```

后续：

```text
Unity Runtime
Unreal Runtime
Edge Runtime
Offline Runtime
```

关键原则：

> Runtime 只负责“如何运行和表现”，不负责“业务是什么”。

---

## 4.3 CIAP Platform

Platform 是控制面。

负责：

- Registry-注册表；
- Compiler-编译器；
- Flow Engine-流引擎；
- Product Service-产品服务；
- Release-发布；
- Policy-策略；
- Audit-审计；
- Compatibility-兼容性；
- Asset Metadata-资产元数据。

它负责管理企业沉淀的软件能力资产。

---

## 4.4 CIAP Studio

Studio 是面向用户和研发人员的可视化工作台。

包括：

```text
Product Composer-产品编排器
Flow Designer-流程设计器
Scene Composer-场景编排器
Module Browser-模块浏览器
Governance Workspace-治理工作区
Release Center-发布中心
AI Center-人工智能中心
```

但 Studio 不是运行时。

Studio 挂掉，已经发布的软件仍然应该运行。

---

# 5. 一个具体例子

假设企业当前存在两个软件：

## Warehouse Standard-仓库标准

包含：

```text
Inventory-库存
Location-位置
Inbound-入库
Outbound-出库
Alarm-报警
```

## Production Standard-生产标准

包含：

```text
WorkOrder-工单
Machine-设备
Quality-质量/质检
Alarm/报警
```

过去，如果要做一个 Factory Logistics 软件，通常会：

1. 复制仓储项目；
2. 拿一部分生产项目代码；
3. 修改页面；
4. 修改接口；
5. 再次集成。

CIAP 希望改成：

```text
warehouse.inventory-仓库库存
warehouse.outbound-仓库出库
production.workorder-生产工单
device.machine-设备-机器
quality.inspection-质量检验
```

直接组合。

业务 Flow：

```text
Reserve Inventory-预留库存
↓
Outbound-出库
↓
Create WorkOrder-创建工单
↓
Select Machine-选择设备
↓
Start Machine-启动设备
↓
Wait Completed-等待完成
↓
Inspect-检查
```

最终形成：

```text
Factory Logistics-工厂物流
```

最关键的验收标准：

> **Factory Logistics 不修改原 Warehouse / Production Module Domain 源码。**

如果做不到，这说明 Module/Contract 边界设计仍然失败。

---

# 6. CIAP 与传统低代码平台的区别

传统低代码通常围绕：

```text
Page-页面
Form-表单
Table-表格
CRUD-创建、读取、更新、删除
Workflow-工作流
```

CIAP 围绕：

```text
Capability-能力
Module-模块
Contract-合约
Flow-流程
Scene-场景
Product-产品
Runtime-运行时
```

CIAP 不以“更快做一个页面”为核心目标。

CIAP 的目标是：

> **更快构建新的软件产品。**

---

# 7. CIAP 与微服务的区别

CIAP 不等于微服务。

微服务主要解决：

- 服务部署；
- 服务治理；
- 服务边界。

CIAP 更关注：

- 企业能力如何沉淀；
- 模块如何复用；
- Product 如何组合；
- 2D/3D Runtime 如何一致；
- Flow/Scene 如何跨产品复用。

CIAP 的 MVP 甚至优先采用：

```text
Modular Monolith：模块化单体结构
```

而不是一开始拆微服务。

---

# 8. CIAP 与 Unity / Unreal 的关系

CIAP 不替代 Unity 或 Unreal。

Unity / Unreal 仍然负责：

- 渲染；
- 物理；
- Animation；
- Material；
- Native Scene；
- 高质量 3D 表现。

CIAP 负责：

> 让同一业务 Capability、Flow 和 Entity Identity 能够在不同 Runtime 中保持一致语义。

例如：

```text
machine-001
```

在 Web 中可能是：

```text
Three.js Object
```

在 Unity 中：

```text
GameObject
```

在 Unreal 中：

```text
Actor
```

业务身份仍然是：

```text
machine-001
```

---

# 9. CIAP 的第一阶段不做什么

CIAP 第一阶段必须克制范围。

不做：

- 完整 Unity Runtime；
- Unreal Runtime；
- 商业 Marketplace；
- Billing；
- 公共开发者生态；
- 大规模微服务；
- Kafka/NATS；
- 完整 AI Autonomous Platform。

第一阶段只证明一件事：

> **模块是否真的可以组合。**

---

# 10. 第一阶段 MVP

建议范围：

```text
CIAP SDK-软件开发工具包
CIAP CLI-命令行界面
Registry-注册表
Compiler-编译器
Flow Engine-流引擎
Web Runtime-web运行时
Reference Modules-参考模块
Reference Products-参考产品
```

首批 Reference Modules：参考模块

```text
warehouse.inventory-仓库库存
warehouse.location-仓库位置
warehouse.inbound-仓库入库
warehouse.outbound-仓库出库
production.workorder-生产工单
device.machine-设备·机器
quality.inspection-质量检验
alarm.management-报警管理
```

---

# 11. MVP 的三次考试

## Test 1 — Warehouse Standard

能够独立运行。

## Test 2 — Production Standard

能够独立运行。

## Test 3 — Factory Logistics

必须复用前两个产品已有 Module。

且：

```text
0 行原 Module Domain 修改
```

这是 CIAP 第一阶段最重要的 Gate。

---

# 12. 建设阶段

CIAP 建设建议分四个阶段。

---

## Phase 1 — Composable Core-可组合核心

目标：

> 证明组合模型成立。

交付：

- Standard；标准
- SDK；软件开发工具包
- CLI；命令行界面
- Registry；注册表
- Compiler；编译器
- Flow Engine；流引擎
- Web Runtime；web运行时
- Reference Modules；参考模块
- 三个 Reference Products。三个参考产品

效果：

> 从“概念成立”变成“可运行验证”。

---

## Phase 2 — Platformization-平台化

目标：

> 将 PoC 变成团队可以持续使用的平台。

交付：

- Product Service；产品服务
- Release；发布
- Governance；治理
- Compatibility；兼容性
- Observability；可观测性
- Studio MVP；工作室MVP
- Product Composer；产品作曲家
- Flow Designer。流程设计师

效果：

> 开发新 Product 不再主要依靠手工工程拼接。

---

## Phase 3 — Multi-Runtime-多运行时

目标：

> 验证 Runtime Neutrality-运行时中立性。

交付：

- Unity Runtime；Unity运行时
- Runtime Certification；运行时认证
- Asset Variant；资产变体
- Scene Portability；场景可移植性
- Product Portability。产品可移植性

效果：

> 同一 Product/Flow 可以在第二种 Runtime 中保持一致业务语义。

---

## Phase 4 — Ecosystem-生态系统

目标：

> 从内部平台升级为生态平台。

交付：

- Marketplace；市场平台
- External SDK；外部SDK
- Connector；连接器
- AI Agent；AI代理
- Edge；边缘
- Partner Development。合作伙伴开发

效果：

> 能力不仅在内部复用，也可以被外部团队扩展。

---

# 13. 团队如何配合

即使现阶段每个项目由单人 + AI 独立开发，也必须逻辑上区分角色。

---

## Architecture Owner：架构负责人

负责：

- Constitution；“宪法”
- Capability Boundary；能力边界
- Contract Review；合约评审
- ADR；ADR
- Breaking Change；突破变更
- Architecture Gate。架构门槛

---

## Platform Owner：平台负责人

负责：

- Registry；注册表
- Compiler；编译器
- Flow；流程
- Release；发布
- Policy。政策

---

## Runtime Owner：运行时负责人

负责：

- Web Runtime；web运行时
- Unity Runtime；unity运行时
- Runtime SDK；运行时SDK
- Scene Runtime；场景运行时
- Entity Runtime。实体运行时

---

## Module Owner：模块负责人

负责：

- Capability Implementation；能力实现
- Contract；合约
- Tests；测试
- Runtime Adapter；运行时适配器
- Changelog。变更日志

---

## Product Owner：产品负责人

负责：

- Product Recipe；产品配方
- Flow；流程
- Scene；场景
- Acceptance。验收

---

## AI

AI 可以承担：

- Contract Draft；合约草案
- Module Implementation；模块实现
- Adapter；适配器
- Test；测试
- Docs；文档
- Architecture Check。架构检查

但 AI 不拥有架构最终决策权。

---

# 14. 为什么值得投入

CIAP 的收益不会在第一个项目中达到最大。

真正收益发生在第二、第三、第五个 Product。

因为复用网络开始形成。

第一阶段投入：

```text
平台基础成本上升
```

后续：

```text
新产品边际开发成本下降
```

CIAP 本质上是：

> 用更高的前期结构化成本，换取更低的长期产品交付成本。

---

# 15. 衡量是否成功

CIAP 不应该以“平台写了多少代码”衡量。

核心 KPI：

## Composition Success Rate：合约成功率

新 Product 能否不修改原 Module 直接组合。

## Module Reuse Rate：模块重用率

Product 使用已有 Module 的比例。

## Contract Breaking Rate：合约违约率

公共 Contract 是否频繁破坏。

## New Product Lead Time：新产品交货日期

从需求到可运行 Product 的时间是否持续下降。

## Runtime Portability：运行时可移植性

同一业务语义是否能够迁移到不同 Runtime。

---

# 16. 最大风险

## 风险一：为了复用而过度抽象

对策：

> 只抽象已验证的重复能力。

---

## 风险二：Module 边界过粗或过细

对策：

> 通过真实 Product 组合不断校验边界。

---

## 风险三：Studio 过早开发

对策：

> CLI First, Studio Second。

---

## 风险四：Runtime 写入业务

对策：

> Runtime Conformance Test。

---

## 风险五：AI 生成架构漂移

对策：

> Constitution + Schema + SDK + Architecture Agent + Review。

---

# 17. 我们需要团队同意什么

启动 CIAP 并不是要求团队一次性批准一个庞大的终局平台。

真正需要同意的是：

### 决策 1

同意从“项目代码复用”升级为“Capability/Module 资产复用”。

### 决策 2

同意 Contract First。

### 决策 3

同意 Runtime 与业务逻辑分离。

### 决策 4

同意用 Warehouse + Production + Factory Logistics 做一次架构 PoC。

### 决策 5

只有 PoC 通过，才继续投入 Studio、Unity、Marketplace。

也就是说：

> CIAP 可以被阶段性验证，而不是一次性豪赌。

---

# 18. 最终愿景

当 CIAP 成熟后，新软件的研发方式将从：

```text
创建项目
↓
复制代码
↓
开发接口
↓
开发页面
↓
重新集成
```

变成：

```text
选择 Capability
↓
选择 Module
↓
编排 Flow
↓
组合 Scene
↓
生成 Product
↓
选择 Runtime
↓
运行
```

开发人员仍然重要。

AI 仍然重要。

Unity、Unreal、Vue 仍然重要。

变化的是：

> **我们不再把项目本身作为软件资产，而是把 Capability、Module、Contract、Flow 和 Scene 作为长期资产。**

---

# 19. 结论

CIAP 不是一个新的业务软件。

也不是一个单纯的低代码平台。

它是一套：

> **面向 2D/3D 工业软件和 AI 开发时代的可组合软件研发体系。**

如果 CIAP 成功，真正改变的不是某一个项目。

而是：

> **整个团队以后如何开发软件。**
