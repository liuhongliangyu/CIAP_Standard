---
document_id: CIAP-2003
title: Action Contract Specification
version: 0.2.0
status: Draft
owner: Architecture Committee
type: Specification
---

# CIAP-2003 — Action Contract Specification

## 1. Semantics

Action 表示调用者请求某个 Capability 执行一个命令。

推荐：

```text
warehouse.inventory.reserve
warehouse.inventory.release
production.workorder.create
device.machine.start
```

## 2. Required contract

Stable Action MUST 定义：

```yaml
action:
  id: warehouse.inventory.reserve
  version: 1
module: warehouse.inventory
input: {}
output: {}
errors: []
permission: warehouse.inventory.reserve
idempotency:
  supported: true
timeout:
  milliseconds: 10000
```

## 3. Input

Input MUST：

- 可 Schema 验证；
- 使用稳定领域词汇；
- 不泄漏数据库结构；
- 不包含 Runtime-specific Object Reference。

禁止 DOM selector、Three.js UUID、Unity GameObject reference、SQL row pointer。

## 4. Output

Output MUST：

- 可序列化；
- 可 Schema 验证；
- 不返回内部对象引用；
- 不直接暴露私有 ORM/DB Entity。

## 5. Errors

Stable Error SHOULD 使用稳定 `code`。

Consumer SHOULD 依赖 Error Code，而不是错误文本。

## 6. Permission

Permission MUST 是 Action Contract 的一部分。

UI 隐藏按钮不能替代执行授权。

## 7. Idempotency

可能发生网络重试、Flow 重放或重复投递的命令 SHOULD 明确幂等策略。

## 8. Timeout

Action MUST 定义 Timeout Policy。

无限等待不是合法默认值。

## 9. Retry vs Compensation

Retry 是重新尝试；Compensation 是业务抵消。

二者 MUST NOT 混为同一语义。

## 10. Versioning

Breaking Change MUST 使用新 Contract Version 或新 Action ID。

## 11. Runtime neutrality

Action MUST NOT 描述 Page、Camera、Animation、UI Component 或 Runtime Object。

## 12. Review checklist

- [ ] 是命令语义吗？
- [ ] Input/Output 有 Schema 吗？
- [ ] Permission 明确吗？
- [ ] Error Code 稳定吗？
- [ ] Timeout 明确吗？
- [ ] 是否需要幂等？
- [ ] 是否需要 Compensation？
- [ ] 是否 Runtime-neutral？
