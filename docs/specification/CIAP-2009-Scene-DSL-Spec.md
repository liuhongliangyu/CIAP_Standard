---
document_id: CIAP-2009
title: Scene DSL Specification
version: 0.2.0
status: Draft
owner: Architecture Committee
type: Specification
---

# CIAP-2009 — Scene DSL Specification

## 1. Purpose

Scene DSL 描述 Product 的 2D/3D 可视化组合结构。

它不替代 Blender、Unity Editor 或 Unreal Editor。

## 2. Core objects

```text
World
Slot
Layer
Entity Projection
Asset Binding
Interaction Binding
Camera Request
Overlay
```

## 3. Slot

推荐标准 Slot：

```text
MainWorld
LeftPanel
RightPanel
BottomPanel
FloatingUI
Overlay
Modal
```

不同 Runtime 可用不同技术实现。

## 4. Layer

Layer 是可独立挂载/卸载的视觉单元。

```yaml
- id: machine-layer
  slot: MainWorld
  provider: device.machine
```

## 5. Entity Projection

Scene MUST 使用稳定 `entityId`。

业务身份不能依赖 Three.js UUID、Unity InstanceID 或 Unreal Actor Pointer。

## 6. Asset Binding

Scene 引用逻辑 Asset ID；Runtime Resolver 解析 Web/Unity/Unreal Variant。

## 7. Interaction

Interaction 描述用户行为语义，而不是鼠标、手柄或触屏具体实现。

## 8. Camera

Scene SHOULD 使用：

```text
focus entity
frame area
switch preset
follow entity
```

MUST NOT 将 Runtime-specific camera script 写进核心 DSL。

## 9. Anti-patterns

Scene MUST NOT：

- 成为 Domain State Source of Truth；
- 包含设备控制规则；
- 直接访问数据库；
- 承担核心业务流程；
- 引用私有 Runtime Object ID。

## 10. Example

```yaml
scene:
  id: factory.main
  version: 1
  type: world

world: factory-world

layers:
  - id: warehouse-layer
    slot: MainWorld
    provider: warehouse.inventory

  - id: machine-layer
    slot: MainWorld
    provider: device.machine
    asset: factory.machine-001

  - id: quality-overlay
    slot: Overlay
    provider: quality.inspection
```

## 11. Review checklist

- [ ] Entity 使用稳定 ID 吗？
- [ ] Layer Provider 明确吗？
- [ ] 是否 Runtime-neutral？
- [ ] 是否把 Domain State 放进 Scene？
- [ ] Asset 是否可按 Runtime 解析？
