---
document_id: CIAP-2008
title: Flow DSL Specification
version: 0.2.0
status: Draft
owner: Architecture Committee
type: Specification
---

# CIAP-2008 — Flow DSL Specification

## 1. Purpose

Flow DSL 描述跨 Capability 的业务过程。

Flow 是声明式 Process Model，不是 Runtime Script。

## 2. V1 node types

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

## 3. Core rules

- 一个 Flow MUST 有且只有一个 Start。
- Action MUST 引用 Registry 中的 Action Contract。
- Decision SHOULD 使用可静态分析表达式。
- V1 MUST NOT 默认支持任意 JavaScript/Python Script Node。
- HumanTask MUST 可持久化等待。
- WaitEvent MUST 支持重启恢复和 correlation。
- 生产 Timer MUST 是可恢复 Timer。
- SubFlow MUST 明确版本。
- Domain State 仍由 Module 拥有。

## 4. Mapping

Action Input 可来自：

- Flow Input；
- Context；
- prior output；
- Event；
- HumanTask Result。

Mapping MUST 可静态分析。

## 5. Retry / Compensation

```yaml
retry:
  maxAttempts: 2
  backoff: exponential

compensation:
  action: warehouse.inventory.release
```

Retry 与 Compensation MUST 保持独立语义。

## 6. Persistence

Flow Engine MUST 至少持久化：

```text
flowInstanceId
flowId
flowVersion
currentNode
status
context
history
wait state
```

## 7. Static validation

发布前 MUST 检查：

- single start；
- unique node ids；
- reference resolution；
- unreachable nodes；
- dead ends；
- invalid edges；
- incompatible versions。

## 8. Runtime neutrality

Flow MUST NOT 引用 Vue Component、DOM Selector、Three.js Object、Unity GameObject 或 Unreal Actor。

## 9. Example

```yaml
flow:
  id: factory-logistics.main
  version: 1.0.0

nodes:
  - id: start
    type: start
  - id: reserve
    type: action
    action: warehouse.inventory.reserve
  - id: select-machine
    type: humanTask
    interaction:
      id: machine.select
      version: 1
  - id: start-machine
    type: action
    action: device.machine.start
  - id: wait-machine
    type: waitEvent
    event:
      id: device.machine.completed
      version: 1
  - id: end
    type: end
```

## 10. Review checklist

- [ ] 是否是业务过程而非 UI 跳转？
- [ ] 引用是否均来自 Registry？
- [ ] 是否包含 Runtime-specific code？
- [ ] HumanTask/WaitEvent 是否可恢复？
- [ ] Failure path 是否明确？
