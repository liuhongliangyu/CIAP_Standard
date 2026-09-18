# Runtime Architecture


运行链：


Product

↓

Product Loader

↓

World Loader

↓

Runtime Core

↓

Simulation Kernel

↓

Operational State

↓

Scene Runtime

↓

Web Renderer



原则：

Renderer 不产生状态。

Runtime 不读取 UI。

Studio 不修改运行对象。
