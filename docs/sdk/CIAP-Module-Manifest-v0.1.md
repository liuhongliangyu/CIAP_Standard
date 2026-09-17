# CIAP Module Manifest v0.1

Every Module requires module.yaml.

Example:

```yaml
module:
  id: warehouse.inventory
  version: 1.0.0

capability:
  id: warehouse.inventory

owner:
  team: warehouse

runtimeSupport:
  web: true
  unity: true
  unreal: false
```

Manifest is consumed by Registry, Compiler, Runtime and AI Agents.
