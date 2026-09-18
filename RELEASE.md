# Release v0.1

## Added

- flow-engine scaffold
- mobile-agent scaffold
- experiment-engine scaffold
- asset-runtime scaffold
- studio-web boundary
- runtime-web boundary
- designer module definitions
- runtime loading contracts
- scene projection workflow
- connector-runtime boundary
- twin-sync architecture
- live provider abstraction
- hybrid runtime mode
- 
## Changed

- machine state responsibility moved to behavior-model
- plugin structure prepared for category grouping
- repository boundary clarified


## Architecture

Studio modifies definitions.

Runtime executes definitions.

Scene displays state.

Studio never directly controls runtime objects.

## Rules

External systems never directly modify Domain objects.

All external data must pass:

Connector

↓

Canonical Event

↓

Operational State

↓

Runtime

