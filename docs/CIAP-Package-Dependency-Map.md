# CIAP Package Dependency Map v0.1

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
        ├── @ciap/flow-engine
        ├── @ciap/simulation-kernel
        └── @ciap/decision-engine
                ↑
                └── @ciap/runtime-core
                        ↑
                        ├── @ciap/scene-runtime
                        ├── @ciap/connector-sdk
                        └── @ciap/product-sdk
```

## Forbidden dependency examples

- world-model -> scene-runtime
- behavior-model -> three
- policy-sdk -> warehouse module
- runtime-core -> automotive domain
- simulation-kernel -> Vue
- connector-sdk -> Studio
