# CIAP Platform Architecture

## Dependency direction

```text
@ciap/core
  ↑
@ciap/contracts
  ↑
├── @ciap/world-model
├── @ciap/operational-state
├── @ciap/process-model
├── @ciap/behavior-model
└── @ciap/policy-sdk
        ↑
        ├── @ciap/simulation-kernel
        └── @ciap/decision-engine
                ↑
                └── @ciap/runtime-core
                        ↑
                        ├── @ciap/scene-runtime
                        ├── @ciap/connector-sdk
                        └── @ciap/product-sdk
```

## Forbidden dependencies

- `world-model -> scene-runtime`
- `behavior-model -> Three.js`
- `policy-sdk -> warehouse/product-specific code`
- `runtime-core -> automotive domain`
- `simulation-kernel -> Vue`
- `connector-sdk -> Studio`

## Source of Truth

| Information | Owner |
|---|---|
| Domain state | Module |
| Layout/spatial | World Model |
| Runtime entity state | Operational State |
| Process instance | Flow Engine |
| Simulation time | Simulation Kernel |
| Decision | Policy/Decision Engine |
| Visual object | Scene Projection |
| Product composition | Product Recipe |
