# Digital Twin Architecture


## Four Runtime Modes


## SIMULATION


Source:

Simulation Kernel


Flow:

Simulation Event

↓

Operational State

↓

Scene



---


## LIVE


Source:

PLC / MES / WMS / IoT


Flow:


External Data

↓

Connector

↓

Canonical Event

↓

Operational State

↓

Scene



---


## HYBRID


Example:


Real:

MES Order


Virtual:

AGV Fleet


Mixed State:

Operational State



---


## REPLAY


Source:

Event Log


Used for:

- Analysis
- Training
- Debugging
