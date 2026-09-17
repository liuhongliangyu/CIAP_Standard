# CIAP Platform Bootstrap v0.1

> **Composable Industrial Application Platform**

这是 CIAP 平台工程仓库的第一版代码骨架。

当前目标不是实现完整平台，而是完成 **Sprint 0: Engineering Foundation**，确保核心 package 边界、类型接口和依赖方向可以真正开始编码。

## 当前包含

```text
packages/
├── core
├── contracts
├── world-model
├── operational-state
├── process-model
├── behavior-model
├── policy-sdk
├── simulation-kernel
├── decision-engine
├── runtime-core
├── scene-runtime
├── connector-sdk
└── product-sdk

plugins/
├── routing-a-star
├── dispatch-nearest
└── queue-fifo

apps/
└── runtime-web

examples/
└── mini-auto-factory
```

## 安装

```bash
corepack enable
pnpm install
```

## Build

```bash
pnpm build
```

## Type Check

```bash
pnpm typecheck
```

## Test

```bash
pnpm test
```

## Sprint 0 验收

- [x] Monorepo 结构
- [x] pnpm workspace
- [x] Turborepo
- [x] TypeScript strict mode
- [x] Vitest
- [x] Changesets
- [x] GitHub Actions
- [x] `@ciap/core`
- [x] `@ciap/contracts`
- [x] `@ciap/world-model`
- [x] `@ciap/operational-state`
- [x] `@ciap/policy-sdk`
- [x] 其余核心 package scaffold
- [x] Mini Automotive Factory reference data

下一步：Sprint 1 — Single Machine Vertical Slice。
