# CIAP Sprint 0–4 Plan

## Sprint 0 — Engineering Foundation

交付：
- pnpm workspace
- Turborepo
- TS config
- ESLint
- Prettier
- Vitest
- Changesets
- CI
- packages/core
- packages/contracts
- packages/world-model
- packages/operational-state
- packages/policy-sdk

## Sprint 1 — Single Machine Vertical Slice

交付：
- Simulation Clock
- Event Queue
- Machine State Machine
- Processing event
- Web state viewer

验收：
`IDLE -> PROCESSING -> IDLE`

## Sprint 2 — Material + AGV

交付：
- Transport Task
- A*
- Nearest Dispatch
- Segment Reservation
- FIFO
- AGV State Machine

验收：
`Warehouse -> AGV -> Machine`

## Sprint 3 — Production Process

交付：
- Process Model
- Flow Engine
- Scheduler
- Multi-machine
- Multi-AGV
- Buffers

验收：
一个订单穿过 Body -> Assembly -> Quality。

## Sprint 4 — Productization

交付：
- Product Recipe
- Scenario
- Scene Runtime
- Web Runtime
- Basic Studio Viewer
- Experiment result summary

验收：
能够选择 Scenario，运行并得到 throughput / lead time / utilization / energy 基础结果。
