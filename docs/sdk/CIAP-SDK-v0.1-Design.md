# CIAP SDK v0.1 Design

## Goal

Convert CIAP architecture concepts into developer usable interfaces.

Core objects:

- Capability
- Module
- Contract
- Flow
- Scene
- Product
- Runtime
- Adapter

## Package Layout

```
@ciap/core
@ciap/manifest
@ciap/contract
@ciap/module
@ciap/flow
@ciap/scene
@ciap/product
@ciap/runtime
@ciap/adapter
@ciap/cli
```

## Dependency

```
Product
 |
Flow / Scene / Module
 |
Contract
 |
Core
```

Runtime executes Product but does not own business logic.
