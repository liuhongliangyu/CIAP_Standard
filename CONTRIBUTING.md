# Contributing to CIAP Standard

## 1. Branch

```text
main
feature/*
docs/*
fix/*
rfc/*
adr/*
```

## 2. Document changes

普通文档变更可直接 PR。

下列变更必须附带 RFC 或 ADR：

- 修改 CIAP-0000～CIAP-0004
- 新增核心概念
- 修改核心对象关系
- 修改公开 Contract
- 引入 Breaking Change
- 修改 Runtime 生命周期
- 修改 Flow DSL 核心语义

## 3. Normative language

规范性文档使用：

- MUST / 必须
- MUST NOT / 禁止
- SHOULD / 应当
- SHOULD NOT / 不应
- MAY / 可以

避免使用无法验证的表述，例如：

- “尽量”
- “通常可以”
- “最好”
- “看情况”

## 4. Definition of Done

文档合并前至少满足：

- [ ] 术语来自 CIAP-0002
- [ ] 未与 CIAP-0000 Meta Model 冲突
- [ ] 未与 CIAP-0001 Constitution 冲突
- [ ] Markdown 可构建
- [ ] Mermaid 可解析
- [ ] 内部链接有效
- [ ] 若涉及 Breaking Change，已有 RFC / ADR
