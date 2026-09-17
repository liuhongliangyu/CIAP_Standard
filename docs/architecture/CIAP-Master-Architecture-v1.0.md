# CIAP Master Architecture v1.0

> **目标：可组合、可创建、可运行、可仿真的工业软件生成平台**

本文档是在前序 CIAP 全部讨论基础上的一次架构审计与最终收敛。

CIAP 的最终目标不再只是“模块可组合”，而是同时具备：

1. **Composable**：软件能力可拆、可复用、可组合；
2. **Creatable**：可创建厂房、设备、货架、库位、路线、区域与参数；
3. **Executable**：订单、任务、设备、物流流程可以真正执行；
4. **Simulatable**：无真实设备时也可通过仿真内核运行整个工业世界；
5. **Connectable**：可接入 MES/WMS/ERP/PLC/OPC UA/MQTT 等真实系统；
6. **Visualizable**：可通过 Web/Three.js、Unity、Unreal 进行 2D+3D 表现。

最终心智模型：

```text
Product
  ├─ Modules
  ├─ Industrial World Model
  ├─ Process / Flow
  ├─ Behavior / Policy
  ├─ Simulation / Live Data
  └─ Scene Projection
           ↓
      Runtime Engine
           ↓
   Web / Unity / Unreal
```


---

# 1. 前序方案审计：必须补齐的缺口

## 1.1 Scene 职责过重
Scene 不应成为设备布局、业务参数、动线和业务状态的 Source of Truth。  
Scene 只负责：**工业世界在特定 Runtime 中的视觉与交互投影**。

## 1.2 缺少 Industrial World Model
必须有独立世界模型描述：
- 厂房；
- 区域；
- 设备；
- 货架；
- 库位；
- 道路；
- AGV 网络；
- 人员区域；
- 几何关系和空间约束。

## 1.3 缺少 Operational State
必须描述当前：
- 哪台设备正在加工；
- 哪个订单进行到哪一步；
- 哪辆 AGV 在执行什么任务；
- 哪个 Buffer 正在排队；
- 哪个库位被占用。

## 1.4 缺少 Behavior / Policy
设备行为与策略必须独立：
- 状态机；
- 派遣；
- 寻路；
- 避障；
- 排队；
- 充电；
- 调度；
- 安全规则。

## 1.5 缺少 Simulation Kernel
必须具备：
- 仿真时钟；
- 离散事件；
- 暂停/加速/单步；
- 随机种子；
- 概率分布；
- 故障；
- 能耗；
- 可重复 Scenario。

## 1.6 缺少 Live / Simulation 统一
同一 Product 必须能够运行在：
- SIMULATION；
- LIVE；
- HYBRID；
- REPLAY。

业务 Module/Flow 不应为仿真和真实运行维护两套逻辑。

## 1.7 参数归属不清
加工时间通常不是简单的 `machine.processingTime`，而可能由：
`Machine + Product + Operation + Tooling + Mode` 共同决定。  
因此需要 **Parameter Resolution Model**。

## 1.8 缺少 Decision/Optimization 层
Flow 只回答“下一步做什么”，不能回答“由谁做、什么时候做、走哪条路”。  
因此需要 Scheduler、Dispatcher、Router、Queue Policy 等独立策略接口。


---

# 2. 最终六层架构

## Layer 1 — Capability Layer
负责“系统会做什么”：
- Capability
- Module
- Action
- Event
- Contract

## Layer 2 — Industrial World Layer
负责“工业世界有什么、在哪里”：
- World
- Site
- Building
- Area
- Zone
- Entity
- Resource
- Layout
- Topology
- Navigation Network

## Layer 3 — Operational Layer
负责“当前正在发生什么”：
- Order
- Job
- Task
- Work Item
- Machine State
- AGV State
- Inventory State
- Queue
- Buffer
- Resource State

## Layer 4 — Behavior & Decision Layer
负责“对象如何行动、如何选择”：
- State Machine
- Behavior
- Policy
- Scheduler
- Dispatcher
- Router
- Traffic Manager
- Queue Policy
- Charging Policy

## Layer 5 — Execution & Simulation Layer
负责“推动世界向前运行”：
- Flow Engine
- Action Executor
- Event Bus
- Simulation Kernel
- Twin Sync
- Connector Runtime
- Clock
- State Store

## Layer 6 — Presentation Layer
负责“如何看见和操作”：
- Scene
- Projection
- Asset
- Interaction
- Camera
- 2D UI
- 3D Renderer


---

# 3. Industrial World Model

Industrial World Model 是 CIAP 创建工业世界的核心。

## 3.1 World
```yaml
world:
  id: auto-factory-01
  coordinateSystem: metric
  unit: meter
```

## 3.2 Zone
示例：
- Stamping Area
- Body Shop
- Paint Shop
- Assembly Area
- Warehouse
- Charging Area
- Forklift Zone
- Pedestrian Zone

Zone 可定义：
- polygon；
- access rule；
- speed limit；
- safety rule；
- priority。

## 3.3 Entity
稳定身份：
- machine-CNC-001
- agv-001
- forklift-003
- worker-1008
- rack-A01
- location-A01-03-02

## 3.4 Spatial Component
只负责空间：
```yaml
position: [10, 0, 20]
rotation: [0, 90, 0]
size: [2.4, 2.0, 4.0]
```

业务状态不放在 Spatial Component。


---

# 4. Template 与参数系统

## 4.1 Rack Template
```yaml
rackTemplate:
  id: standard-rack-A
  columns: 10
  levels: 5
  depth: 2
  bayWidth: 1.2
```

系统自动生成 Storage Location Entity 和编码。

## 4.2 Machine Template
描述：
- 外形；
- Capability；
- 状态模型；
- 能耗模型；
- 默认参数。

## 4.3 AGV Template
描述：
- maxSpeed
- acceleration
- capacity
- battery
- dimensions
- safety radius

## 4.4 参数解析链
```text
Template Default
    ↓
Entity Instance Override
    ↓
Process Recipe
    ↓
Scenario/Product Override
    ↓
Live Calibration
```

有效加工时间、能耗等由 Parameter Resolver 得出，而不是随意写死在 Scene。


---

# 5. Process、Flow 与 Operational State

## 5.1 Process Model
描述“产品如何被制造”：

```text
Raw Material
↓
Stamping
↓
Body Welding
↓
Painting
↓
Assembly
↓
Inspection
↓
Finished Goods
```

Process Operation 应声明：
- required capability；
- resource requirement；
- processing time model；
- setup；
- buffer；
- constraints。

## 5.2 Flow
Flow 描述跨 Capability 的业务过程。  
Flow 不负责资源最优选择。

## 5.3 Operational State
典型 Machine State：
```text
OFFLINE
IDLE
SETUP
READY
PROCESSING
BLOCKED
STARVED
FAULT
MAINTENANCE
```

AGV State：
```text
IDLE
ASSIGNED
MOVING_TO_PICKUP
LOADING
TRANSPORTING
UNLOADING
CHARGING
BLOCKED
FAULT
```

Order State：
```text
CREATED
PLANNED
RELEASED
IN_PROGRESS
COMPLETED
CANCELLED
```


---

# 6. Behavior Model 与状态机

Behavior 定义“Entity 收到事件后如何变化”。

例如 Machine：

```text
IDLE
  │ start(job)
  ▼
SETUP
  │ setup.completed
  ▼
PROCESSING
  │ processing.completed
  ▼
IDLE
```

原则：
- Behavior 定义“如何变化”；
- Parameter 定义“多快、多大、多长时间”；
- Policy 定义“选择哪个对象/哪条路线/哪个任务”。

三者必须分离。


---

# 7. Mobile Agent：AGV、叉车、AMR、人员

移动对象统一抽象为 Mobile Agent：

```text
Identity
Pose
Velocity
Capacity
Task
Navigation
Energy
Safety
Behavior
Policy
```

人员是特殊 Mobile Agent，并增加：
- Skill
- Shift
- Walking Speed
- Availability
- Work Zone
- Permission
- Safety Constraint


---

# 8. 寻路、派遣、避障、排队与充电策略

这些算法 **不得写死在 AGV Core**，必须通过 Policy/Strategy Plugin 注入。

## 8.1 Navigation Model
支持：
- Graph Navigation：固定 AGV/叉车通道；
- NavMesh / Free Navigation：AMR/人员。

Graph Edge 可定义：
- distance；
- speedLimit；
- direction；
- capacity；
- priority；
- allowed agent types。

## 8.2 Path Planner
统一接口：
```text
IPathPlanner(agent, start, goal, topology, constraints) -> route
```

第一阶段：
- Dijkstra
- A*

后续可扩展：
- D* Lite
- time-dependent A*
- CBS / multi-agent planning

## 8.3 Dispatch Policy
回答“谁接哪个任务”。

第一阶段：
- Nearest Available
- FIFO Task
- Least Utilized
- Battery-aware
- Zone Priority

高级插件：
- Hungarian Assignment
- Min-cost Flow
- MILP
- Metaheuristic
- RL

## 8.4 Traffic Manager
负责：
- Segment Reservation
- Intersection Control
- Direction Control
- Capacity
- Priority
- Deadlock Detection

## 8.5 Collision Avoidance
两层：
- Global：路线/时间窗/路段预约；
- Local：RVO/ORCA/局部避障等插件。

## 8.6 Queue Policy
支持：
- FIFO
- LIFO
- Priority
- EDD
- SPT
- Least Slack

## 8.7 Charging Policy
支持：
- SOC Threshold
- Opportunity Charging
- Nearest Charger
- Charger Reservation

## 8.8 Human Assignment
支持：
- Nearest Qualified Worker
- Skill Priority
- Least Loaded
- Shift-aware


---

# 9. Decision Engine 与 Scheduler

Flow 负责：
> 下一阶段做什么。

Decision Engine 负责：
> 具体选谁做。

例如：
```text
Flow: 需要运输物料
Decision: AGV-003 执行
```

Scheduler 统一接口：
```text
IScheduler(orders, operations, resources, constraints, currentState)
    -> assignments + sequence + startTimes
```

第一阶段：
- FIFO
- EDD
- SPT
- Priority

后续：
- Constraint Programming
- MILP
- Genetic Algorithm
- Simulation Optimization
- RL


---

# 10. Simulation Kernel

推荐核心采用 **Discrete Event Simulation**。

典型事件：
- job.started
- job.completed
- agv.arrived
- machine.failed
- machine.repaired
- charge.completed

## 10.1 Simulation Clock
必须独立于系统时间，支持：
- 1x
- 2x
- 10x
- 100x
- Pause
- Step
- Fast Forward

业务 Module 不得直接依赖 `Date.now()`，而应依赖 Clock Service。

## 10.2 Random Seed
所有随机模型支持 Seed，使 Scenario 可重复。

## 10.3 Distribution
支持：
- Deterministic
- Normal
- Lognormal
- Exponential
- Empirical
- Custom

## 10.4 Failure Model
支持：
- MTBF
- MTTR
- Failure Distribution
- Maintenance Policy

## 10.5 Energy Model
AGV：
- idle
- moving
- loaded factor
- charging efficiency

Machine：
- idle
- setup
- processing
- standby


---

# 11. 四种运行模式

## SIMULATION
所有状态来自仿真。

## LIVE
状态来自真实：
- PLC
- MES
- WMS
- IoT

## HYBRID
部分真实、部分仿真，例如真实 MES + 虚拟 AGV。

## REPLAY
从历史 Event Log 重放，用于：
- 故障分析；
- 培训；
- 回放；
- 算法对比。

同一个 Module/Flow/Product 应尽量不因运行模式改变而重写。


---

# 12. Twin Sync 与 Connectors

真实模式通过 Twin Sync：

```text
External System
↓
Connector
↓
Canonical Contract
↓
Operational State
↓
Entity State
↓
Scene Projection
```

Connector 作为 Plugin。

首批建议：
- REST
- WebSocket
- MQTT
- OPC UA
- File Import
- Database CDC（后续）

MES/WMS/ERP/PLC 不直接侵入 Runtime Core。


---

# 13. Source of Truth 规则

必须严格区分：

| 信息 | Source of Truth |
|---|---|
| 业务 Domain State | Module |
| 空间/布局 | World Model |
| Process Instance | Flow Engine |
| Simulation Time | Simulation Kernel |
| Route/Dispatch Decision | Decision/Policy Engine |
| Runtime Visual State | Projection |
| Product Composition | Product Recipe |

特别注意：

> Scene 永远不是业务 Source of Truth。


---

# 14. Scene 最终定义

Scene 的最终定义：

> **Industrial World + Operational State 在特定 Runtime 中的视觉与交互投影。**

加载过程：

```text
Load Product
↓
Load World Model
↓
Load Entity Bindings
↓
Subscribe Operational State
↓
Resolve Projection
↓
Resolve Asset
↓
Create Runtime Object
↓
Continuously Update
```

同一 `machine-001`：
- Web → Three.js Object
- Unity → GameObject
- Unreal → Actor

业务身份保持不变。


---

# 15. Studio 最终模块

CIAP Studio 应升级为：

1. **World Designer**
   - 厂房
   - 区域
   - 设备
   - 货架
   - 库位
   - 路网
   - 安全区域

2. **Template Designer**
   - Machine Template
   - Rack Template
   - AGV Template
   - Worker Template

3. **Process Designer**
   - 工艺路线
   - Operation
   - Resource Requirement

4. **Policy Designer**
   - Routing
   - Dispatch
   - Queue
   - Charging
   - Scheduling

5. **Flow Designer**
   - 业务过程

6. **Scene Designer**
   - Projection
   - Layer
   - Interaction
   - Camera
   - 2D Overlay

7. **Scenario Designer**
   - Orders
   - Inventory
   - Failure Rate
   - Fleet
   - Policy Selection
   - Duration
   - Random Seed

8. **Experiment Manager**
   - 多 Scenario 对比
   - KPI 比较


---

# 16. 汽车工厂验证案例

建议先做“缩小版汽车工厂”，而不是一开始完整复制汽车主机厂。

World：
```text
Raw Material Warehouse
Body Station
Assembly Station
Quality Station
Finished Goods
```

Resources：
- 3~5 AGV
- 1 Forklift
- Body Equipment
- Assembly Equipment
- Inspection Equipment
- Buffers

AGV 策略：
```text
Routing: A*
Dispatch: Nearest Available + Battery Constraint
Traffic: Segment Reservation
Queue: FIFO
Charging: SOC < 20%
```

订单：
```text
100 SUV
```

执行链：
```text
Production Order
↓
Flow Engine
↓
Scheduler
↓
Machine Assignment
↓
Warehouse Reserve
↓
Transport Task
↓
Dispatcher
↓
AGV Selection
↓
Path Planner
↓
Traffic Manager
↓
AGV State Machine
↓
Simulation Kernel / Live Connector
↓
Operational State
↓
Event
↓
Scene Projection
↓
Web / Unity / Unreal
```


---

# 17. Core 与 Plugin 边界

为了避免 CIAP 变成“什么都自己实现”，Core 必须保持小。

## Core
- Identity
- Contract
- Module
- World Model
- Operational State
- Flow
- Clock
- Event
- Policy Interface
- Simulation Kernel Interface
- Scene Projection Interface
- Runtime Lifecycle

## Plugin
- A*
- Dijkstra
- CBS
- ORCA
- MILP
- Genetic Algorithm
- RL
- OPC UA
- MQTT
- Unity Renderer
- Unreal Renderer

算法和协议实现应可替换。


---

# 18. 推荐工程结构

```text
packages/
├── core
├── contracts
├── module-sdk
├── world-model
├── operational-state
├── process-model
├── behavior-model
├── policy-sdk
├── flow-engine
├── simulation-kernel
├── decision-engine
├── runtime-core
├── scene-runtime
├── asset-runtime
├── connector-sdk
├── product-sdk
└── cli

apps/
├── platform-api
├── studio-web
└── runtime-web

plugins/
├── routing-a-star
├── dispatch-nearest
├── queue-fifo
├── traffic-reservation
├── connector-mqtt
└── connector-opcua
```


---

# 19. MVP 必须克制

第一阶段只实现：

Routing：
- A*

Dispatch：
- Nearest Available

Traffic：
- Single Segment Reservation

Queue：
- FIFO
- Priority

Scheduling：
- FIFO
- EDD

Simulation：
- Discrete Event
- Deterministic + Basic Distribution

不要第一阶段就实现复杂 MILP、RL、多 Runtime 和完整 Marketplace。


---

# 20. 新的阶段 Gate

## Gate 0 — Static World
可创建工厂、设备、货架、路线和参数。

## Gate 1 — Single Resource Simulation
Machine 可完成：
`Idle → Processing → Complete`

## Gate 2 — Material Flow
Material 可完成：
`Warehouse → AGV → Machine`

## Gate 3 — Multi-agent Logistics
多 AGV：
- 能调度；
- 能排队；
- 不发生基本路段冲突；
- 能完成任务。

## Gate 4 — Production Flow
完整订单经过多个工位完成。

## Gate 5 — Simulation / Live Abstraction
同一 Product 可切换 Simulated Provider 和 Live Provider，而不修改 Domain Flow。

## Gate 6 — Product Composition
Warehouse + Production Module 组成新 Product：
`0 Domain Fork`


---

# 21. 最终平台定义

CIAP 建议正式定义为：

> **CIAP 是一套面向工业软件的可组合应用与工业世界运行平台。它通过 Capability、Module、Industrial World Model、Process、Behavior、Policy、Flow、Simulation 与 Scene Projection，使企业能够创建、组合、运行、仿真并连接真实工业系统，并在 Web、Unity、Unreal 等 Runtime 中保持一致业务语义。**

最终边界必须长期保持：

- **Module**：拥有业务状态与能力；
- **World Model**：拥有静态世界、布局、空间关系；
- **Process**：描述制造/物流工艺；
- **Flow**：描述跨 Capability 的业务过程；
- **Behavior**：描述实体如何改变状态；
- **Policy**：描述“如何选择”；
- **Simulation**：推进虚拟时间并产生虚拟事件；
- **Live Connector**：将真实世界转换为同样的事件和状态；
- **Operational State**：描述此刻正在发生什么；
- **Scene**：只负责表现与交互；
- **Runtime**：协调上述对象运行。

只要这些边界不混淆，CIAP 才能真正发展为大型工业软件生成平台。
