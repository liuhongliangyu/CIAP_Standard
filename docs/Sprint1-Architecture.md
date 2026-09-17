# Sprint 1 Architecture

Machine 状态：

IDLE
 |
 start(job)
 |
 v
PROCESSING
 |
 processing.completed
 |
 v
IDLE


事件链：

Machine.start()
 -> machine.processing.started
 -> SimulationKernel.schedule()
 -> 时间推进
 -> machine.processing.completed
 -> OperationalState 更新
 -> Scene Runtime 刷新


原则：

Machine 不知道 Three.js / Unity / Vue。
Machine 只负责业务状态。
