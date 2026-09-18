# Migration Map

## Move

src/machine.ts

-->

packages/behavior-model/src/machine-state-machine.ts


## Create

packages/mobile-agent/

packages/flow-engine/

packages/experiment-engine/

packages/asset-runtime/


## Plugin Restructure

Before:

plugins/
  routing-a-star
  dispatch-nearest
  queue-fifo


After:

plugins/

  routing/
    a-star/

  dispatch/
    nearest/

  queue/
    fifo/

  scheduling/

  connector/

  renderer/


## Root cleanup

Remove:

src/

Keep:

packages/
apps/
plugins/
examples/
docs/
schemas/
tools/
templates/
