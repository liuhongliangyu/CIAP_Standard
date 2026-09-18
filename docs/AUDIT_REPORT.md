# CIAP_Standard Audit Report v0.1

## 当前主要问题

### 1. 根目录 src

问题：
Monorepo 已存在 packages，但仍存在顶层 src。

处理：

REMOVE:
src/

MOVE:
machine.ts

TO:
packages/behavior-model/src/


---

### 2. 缺少 Flow Engine

新增：

packages/flow-engine

职责：

- Flow Definition
- Flow Instance
- Node Executor
- Event Driven Execution


---

### 3. 缺少 Mobile Agent

新增：

packages/mobile-agent

负责：

- AGV
- AMR
- Forklift
- Human


---

### 4. 缺少 Experiment Engine

新增：

packages/experiment-engine

负责：

- Scenario
- Experiment Run
- KPI
- Result


---

### 5. Scene 与 Asset 分离

新增：

packages/asset-runtime

负责：

- CAD
- glTF
- Model metadata


scene-runtime:

负责：

Entity -> Visual Projection


---

## 目标

形成：

World
+
Process
+
Flow
+
Runtime
+
Simulation
+
Scene

完整平台边界。
