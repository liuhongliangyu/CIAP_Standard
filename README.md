# CIAP Standard

**CIAP — Composable Intelligent Application Platform**

CIAP Standard 是 CIAP 平台的规范、架构、治理和参考实现文档仓库。

本仓库坚持：

> **Markdown 是唯一文档源（Single Source of Truth）。**

所有 Word、PDF、HTML、PPT、文档站内容都应从本仓库的 Markdown、Schema、Diagram 和 Reference Artifact 派生。

---

## 文档层级

```text
CIAP-0000 Meta Model
        ↓
CIAP-0001 Constitution
        ↓
CIAP-0002 Terminology
        ↓
CIAP-0003 Product Boundary
        ↓
CIAP-0004 Design Principles
        ↓
Architecture
        ↓
Specification
        ↓
SDK / Runtime / Platform / Studio
        ↓
Reference Implementation
```

若下层文档与上层文档发生冲突，应以上层文档为准。

---

## 当前版本

**Repository Version:** v0.1.0  
**Status:** Draft  
**Focus:** Foundation Freeze

第一版优先冻结五份根文档：

- `CIAP-0000` Meta Model
- `CIAP-0001` Constitution
- `CIAP-0002` Terminology
- `CIAP-0003` Product Boundary
- `CIAP-0004` Design Principles

---

## 本地预览

```bash
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS / Linux
source .venv/bin/activate

pip install -r requirements.txt
mkdocs serve
```

打开：

```text
http://127.0.0.1:8000
```

---

## 构建静态站点

```bash
mkdocs build --strict
```

输出：

```text
site/
```

---

## 初始化 GitHub 仓库

如果下载的是 ZIP：

```bash
git init
git add .
git commit -m "chore: initialize CIAP Standard repository"
git branch -M main

git remote add origin https://github.com/<org>/ciap-standard.git
git push -u origin main
```

---

## 修改流程

普通内容修改：

```text
Issue
→ Branch
→ Pull Request
→ Review
→ Merge
```

涉及以下内容必须先走 RFC / ADR：

- 核心对象新增或删除
- Meta Model 关系变化
- Constitution 修改
- Runtime Contract 修改
- Flow DSL 核心语义修改
- Product Recipe 核心结构修改
- Event Envelope 修改
- 跨团队公共 Contract Breaking Change

---

## 仓库目录

```text
docs/            文档正文
schemas/         JSON Schema
diagrams/        Mermaid / PlantUML / SVG
examples/        参考示例
templates/       文档与设计模板
scripts/         构建与校验脚本
.github/          GitHub Actions / Issue / PR 模板
```

---

## 核心开发原则

> Contract First  
> Composition Before Duplication  
> Runtime Neutrality  
> Single Source of Truth  
> AI Under Governance  
> Backward Compatibility by Default
