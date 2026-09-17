# CIAP Master Technical Blueprint v0.1

## 1. Goal

本蓝图把 CIAP Master Architecture 落成第一批可开发模块。

第一阶段核心包：

```text
@ciap/core
@ciap/contracts
@ciap/world-model
@ciap/operational-state
@ciap/process-model
@ciap/behavior-model
@ciap/policy-sdk
@ciap/flow-engine
@ciap/simulation-kernel
@ciap/decision-engine
@ciap/runtime-core
@ciap/scene-runtime
@ciap/connector-sdk
@ciap/product-sdk
@ciap/cli
```

第一阶段目标不是实现所有能力，而是实现一个完整 Vertical Slice：

```text
Product
↓
World
↓
Order
↓
Flow
↓
Scheduler
↓
AGV Dispatch
↓
A* Route
↓
Machine Processing
↓
Simulation Event
↓
Operational State
↓
Scene Projection
```

---

## 2. Dependency Rules

推荐依赖方向：

```text
core
↑
contracts
↑
world-model
↑
operational-state
↑
process-model
↑
behavior-model
↑
policy-sdk
↑
flow-engine
↑
simulation-kernel
↑
decision-engine
↑
runtime-core
↑
scene-runtime
↑
product-sdk
```

更准确地说：

```text
@ciap/core
  ↑
@ciap/contracts
  ↑
@ciap/world-model
@ciap/operational-state
@ciap/process-model
@ciap/behavior-model
@ciap/policy-sdk
  ↑
@ciap/flow-engine
@ciap/simulation-kernel
@ciap/decision-engine
  ↑
@ciap/runtime-core
  ↑
@ciap/scene-runtime
@ciap/connector-sdk
  ↑
@ciap/product-sdk
```

禁止：

```text
world-model -> scene-runtime
behavior-model -> three.js
policy-sdk -> product-specific module
simulation-kernel -> web runtime
runtime-core -> warehouse domain
```

---

# 3. @ciap/core

职责：

- Identity
- Version
- Metadata
- Lifecycle
- Time abstraction
- Result/Error
- Base validation types

核心接口：

```ts
export type CIAPId = string;
export type ISODateTime = string;

export interface Versioned {
  version: string;
}

export interface Owned {
  owner: string;
}

export interface Identified {
  id: CIAPId;
}

export interface Metadata {
  name?: string;
  description?: string;
  tags?: string[];
}

export type LifecycleStatus =
  | "Draft"
  | "Experimental"
  | "Stable"
  | "Deprecated"
  | "Retired";

export interface Clock {
  now(): number;
}
```

---

# 4. @ciap/contracts

职责：

- Action
- Event
- Permission
- Query
- Interaction
- Common envelope

Action：

```ts
export interface ActionContract<I = unknown, O = unknown> {
  id: string;
  version: number;
  inputSchema: unknown;
  outputSchema: unknown;
  permission?: string;
  timeoutMs?: number;
  idempotent?: boolean;
}
```

Event：

```ts
export interface DomainEvent<T = unknown> {
  id: string;
  version: number;
  eventId: string;
  occurredAt: number;
  source: string;
  correlationId?: string;
  payload: T;
}
```

---

# 5. @ciap/world-model

职责：

> 描述工业世界有什么、在哪里、如何连接。

核心对象：

```ts
export interface World {
  id: string;
  coordinateSystem: "metric";
  entities: WorldEntity[];
  zones: Zone[];
  topologies: NavigationTopology[];
}

export interface WorldEntity {
  id: string;
  type: string;
  templateId?: string;
  spatial?: SpatialComponent;
  attributes?: Record<string, unknown>;
}

export interface SpatialComponent {
  position: [number, number, number];
  rotation?: [number, number, number];
  size?: [number, number, number];
}

export interface Zone {
  id: string;
  type: string;
  polygon: Array<[number, number]>;
  rules?: ZoneRule[];
}
```

Navigation Graph：

```ts
export interface NavNode {
  id: string;
  position: [number, number, number];
}

export interface NavEdge {
  id: string;
  from: string;
  to: string;
  distance: number;
  speedLimit?: number;
  capacity?: number;
  bidirectional?: boolean;
}

export interface NavigationTopology {
  id: string;
  nodes: NavNode[];
  edges: NavEdge[];
}
```

---

# 6. @ciap/operational-state

职责：

> 描述当前正在发生什么。

不负责静态布局。

核心模型：

```ts
export interface EntityState<T = unknown> {
  entityId: string;
  entityType: string;
  timestamp: number;
  state: T;
  source: "simulation" | "live" | "hybrid" | "replay";
}

export interface OperationalStateStore {
  get<T>(entityId: string): EntityState<T> | undefined;
  set<T>(next: EntityState<T>): void;
  subscribe(
    entityId: string,
    handler: (state: EntityState) => void
  ): () => void;
}
```

典型 Machine State：

```ts
export type MachineStatus =
  | "OFFLINE"
  | "IDLE"
  | "SETUP"
  | "READY"
  | "PROCESSING"
  | "BLOCKED"
  | "STARVED"
  | "FAULT"
  | "MAINTENANCE";
```

AGV：

```ts
export type AGVStatus =
  | "IDLE"
  | "ASSIGNED"
  | "MOVING_TO_PICKUP"
  | "LOADING"
  | "TRANSPORTING"
  | "UNLOADING"
  | "CHARGING"
  | "BLOCKED"
  | "FAULT";
```

---

# 7. @ciap/process-model

职责：

> 描述产品/物料需要经历什么制造或物流工艺。

```ts
export interface ProcessDefinition {
  id: string;
  version: string;
  operations: ProcessOperation[];
  transitions: ProcessTransition[];
}

export interface ProcessOperation {
  id: string;
  requiredCapabilities: string[];
  requiredResources?: ResourceRequirement[];
  durationModel: DurationModel;
}

export interface ResourceRequirement {
  resourceType: string;
  count: number;
}

export type DurationModel =
  | { type: "deterministic"; valueMs: number }
  | { type: "normal"; meanMs: number; stddevMs: number }
  | { type: "exponential"; meanMs: number };
```

---

# 8. @ciap/behavior-model

职责：

> 描述实体收到事件后如何变化。

```ts
export interface StateTransition<S extends string = string> {
  from: S;
  event: string;
  to: S;
  guard?: string;
  effect?: string;
}

export interface StateMachineDefinition<S extends string = string> {
  id: string;
  initialState: S;
  states: S[];
  transitions: StateTransition<S>[];
}
```

Behavior 不负责决定“选哪台机器”。

它只负责单个实体自身如何响应。

---

# 9. @ciap/policy-sdk

职责：

> 定义可插拔策略接口。

## Path Planning

```ts
export interface PathPlanningRequest {
  agentId: string;
  topologyId: string;
  startNodeId: string;
  goalNodeId: string;
  constraints?: Record<string, unknown>;
}

export interface Route {
  nodeIds: string[];
  edgeIds: string[];
  cost: number;
}

export interface PathPlanner {
  id: string;
  plan(request: PathPlanningRequest): Promise<Route>;
}
```

## Dispatch

```ts
export interface TransportTask {
  id: string;
  pickupEntityId: string;
  dropoffEntityId: string;
  priority?: number;
}

export interface MobileAgentSnapshot {
  id: string;
  status: string;
  nodeId?: string;
  soc?: number;
  capacity?: number;
}

export interface DispatchPolicy {
  id: string;
  assign(
    tasks: TransportTask[],
    agents: MobileAgentSnapshot[]
  ): Promise<Array<{ taskId: string; agentId: string }>>;
}
```

## Queue

```ts
export interface QueueItem {
  id: string;
  priority?: number;
  createdAt: number;
  dueAt?: number;
  processingTimeMs?: number;
}

export interface QueuePolicy {
  id: string;
  order(items: QueueItem[]): QueueItem[];
}
```

## Scheduler

```ts
export interface Scheduler {
  id: string;
  schedule(input: SchedulingInput): Promise<SchedulingPlan>;
}
```

---

# 10. @ciap/simulation-kernel

职责：

> 推动虚拟时间，并按离散事件执行工业世界。

核心接口：

```ts
export type SimulationMode =
  | "SIMULATION"
  | "LIVE"
  | "HYBRID"
  | "REPLAY";

export interface SimulationEvent {
  id: string;
  time: number;
  type: string;
  payload?: unknown;
}

export interface SimulationClock {
  now(): number;
  setSpeed(multiplier: number): void;
  pause(): void;
  resume(): void;
}

export interface SimulationKernel {
  schedule(event: SimulationEvent): void;
  cancel(eventId: string): void;
  step(): Promise<void>;
  runUntil(time: number): Promise<void>;
}
```

核心实现建议：

```text
Priority Queue
按 event.time 排序
```

第一版不要使用 frame-based simulation 驱动业务过程。

---

# 11. @ciap/decision-engine

职责：

> 把“需要做什么”转成“具体谁来做、何时做、走哪里”。

典型决策链：

```text
Transport Requested
↓
Dispatcher
↓
Agent Selected
↓
Path Planner
↓
Route
↓
Traffic Reservation
```

Decision Engine 本身不内置复杂算法。

它协调 Policy Plugin。

---

# 12. Traffic Manager

第一版必须支持基本路段预约。

```ts
export interface SegmentReservation {
  edgeId: string;
  agentId: string;
  fromTime: number;
  toTime: number;
}

export interface TrafficManager {
  reserve(request: SegmentReservation): boolean;
  releaseByAgent(agentId: string): void;
  canEnter(edgeId: string, agentId: string, time: number): boolean;
}
```

后续再扩展：

- Intersection Reservation
- Deadlock Detection
- Time Window Routing
- CBS

---

# 13. @ciap/flow-engine

职责：

> 执行跨 Capability 的业务流程。

第一版 Node：

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

Flow 不负责：
- 最优资源选择；
- AGV 寻路；
- 机器内部状态机。

---

# 14. @ciap/runtime-core

职责：

> 统一协调 Product 的运行。

```ts
export interface RuntimeContext {
  mode: SimulationMode;
  clock: Clock;
  world: WorldService;
  state: OperationalStateStore;
  events: EventBus;
  actions: ActionExecutor;
  decisions: DecisionEngine;
}

export interface CIAPRuntime {
  loadProduct(productId: string): Promise<void>;
  start(): Promise<void>;
  stop(): Promise<void>;
}
```

Runtime Core 不允许出现：
- warehouse-specific logic
- automotive-specific logic
- three.js-specific logic

---

# 15. @ciap/scene-runtime

职责：

> 把 World + Operational State 投影为 Runtime Object。

```ts
export interface ProjectionContext {
  runtimeType: string;
  worldEntity: WorldEntity;
  operationalState?: EntityState;
}

export interface ProjectionAdapter<T = unknown> {
  entityType: string;
  create(ctx: ProjectionContext): Promise<T>;
  update(object: T, ctx: ProjectionContext): Promise<void>;
  dispose(object: T): Promise<void>;
}
```

Web 版可以返回：
- Vue Component
- Three.js Object3D

Unity/Unreal 后续实现相同语义接口。

---

# 16. @ciap/connector-sdk

职责：

> 把真实外部系统转换为 CIAP Canonical Event / State。

```ts
export interface Connector {
  id: string;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  health(): Promise<"UP" | "DOWN" | "DEGRADED">;
}
```

首批 Connector：
- REST
- MQTT
- OPC UA（后续）
- File Replay

---

# 17. @ciap/product-sdk

Product Recipe 应引用：

```text
Modules
World
Processes
Flows
Policies
Scenario
Scene
Runtime Target
```

第一版：

```ts
export interface ProductRecipe {
  id: string;
  version: string;
  runtimeTarget: "web";
  modules: string[];
  worldId: string;
  processIds: string[];
  flowIds: string[];
  policyBindings: Record<string, string>;
  sceneId: string;
  scenarioId?: string;
}
```

---

# 18. Policy Binding

不要把 A* 写死在 Product。

Product 通过 Policy Binding 指定：

```yaml
policies:
  routing: routing.a-star
  dispatch: dispatch.nearest-available
  queue: queue.fifo
  traffic: traffic.segment-reservation
  charging: charging.soc-threshold
```

这样后续换算法不需要改 Domain。

---

# 19. 运行模式切换

Product 与 Module 不应根据模式 Fork。

由 Provider 切换：

```text
SIMULATION
  -> SimulatedMachineProvider
  -> SimulatedAGVProvider

LIVE
  -> OPCUAMachineProvider
  -> FleetManagerConnector

HYBRID
  -> Mixed Provider

REPLAY
  -> EventLogProvider
```

---

# 20. 第一版汽车工厂 Reference Model

建议用 Mini Automotive Factory。

World：

```text
Raw Warehouse
Body Station
Assembly Station
Quality Station
Finished Warehouse
Charging Area
```

设备：

```text
body-01
assembly-01
quality-01
agv-01
agv-02
agv-03
forklift-01
```

路线：

```text
N-WH
N-BODY
N-ASSEMBLY
N-QUALITY
N-FG
N-CHARGE
```

---

# 21. Mini Factory 核心流程

```text
OrderCreated
↓
PlanJob
↓
ReserveMaterial
↓
CreateTransportTask
↓
DispatchAGV
↓
MoveMaterialToBody
↓
BodyProcessing
↓
MoveToAssembly
↓
AssemblyProcessing
↓
MoveToQuality
↓
Inspection
↓
MoveToFinishedGoods
↓
OrderCompleted
```

---

# 22. 第一版仿真参数

Body：

```text
processingTime = 60s
```

Assembly：

```text
processingTime = 90s
```

Quality：

```text
processingTime = 45s
```

AGV：

```text
maxSpeed = 1.5m/s
battery = 20kWh
initialSOC = 100%
energyConsumption = 0.15kWh/km
```

第一版全部 deterministic。

第二版再引入概率分布。

---

# 23. Sprint 0

目标：

> 把架构变成可以编译的 Monorepo。

交付：

```text
pnpm workspace
tsconfig base
eslint
prettier
vitest
changesets
GitHub Actions

packages/core
packages/contracts
packages/world-model
packages/operational-state
packages/policy-sdk
```

验收：

- 所有 package 可 build；
- 依赖方向正确；
- TypeScript public API 可引用；
- 单元测试运行。

---

# 24. Sprint 1

Vertical Slice：

```text
World
+
Machine State
+
Simulation Clock
+
Single Machine Processing
+
Scene Projection
```

验收：

```text
IDLE
→ PROCESSING
→ IDLE
```

并能在 Web Runtime 中显示状态变化。

---

# 25. Sprint 2

加入：

```text
AGV
A*
Nearest Dispatch
Segment Reservation
FIFO Queue
```

完成：

```text
Warehouse → AGV → Machine
```

---

# 26. Sprint 3

加入：

```text
Process
Flow
Scheduler
Multiple Machines
Multiple AGVs
```

完成一个订单贯穿 Mini Automotive Factory。

---

# 27. Sprint 4

加入：

```text
Product Recipe
Scenario
Experiment
Web Runtime
Basic Studio Viewer
```

形成第一个真正可展示 CIAP Demo。

---

# 28. 第一阶段明确不做

Sprint 0~4 不做：

- Unity Runtime
- Unreal Runtime
- Marketplace
- 完整拖拽 Studio
- RL
- MILP
- CBS
- ORCA
- 大规模微服务
- Kafka
- Service Mesh

这些都必须等 Vertical Slice 成功后再引入。

---

# 29. Definition of Success

第一版工程真正成功的标准不是代码量。

而是：

1. World 可加载；
2. Machine 可按状态机运行；
3. AGV 能被派遣；
4. AGV 能寻路；
5. 多 AGV 不发生基本路段冲突；
6. Material 能被运输；
7. Order 能经过多个工位；
8. 仿真时间可加速；
9. Scene 只投影状态，不驱动业务；
10. Product 可切换策略实现；
11. 后续可替换 Live Provider；
12. Domain 无需依赖 Web/Three.js。

这 12 条通过，CIAP 才真正进入平台工程阶段。
