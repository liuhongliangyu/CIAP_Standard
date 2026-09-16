# Apply CIAP v0.2.0 patch

把本 ZIP 内容覆盖到 `CIAP_Standard` 仓库根目录。

然后执行：

```bash
git checkout -b docs/v0.2.0-core-architecture
git add .
git commit -m "docs: add core architecture and DSL specifications v0.2.0"
git push -u origin docs/v0.2.0-core-architecture
```

随后在 GitHub 创建 Pull Request。

> 本补丁只新增/更新文档，不包含你现有仓库的其他文件。
> 合并后请手工把这些文档加入现有 `mkdocs.yml` 导航，或使用下一批提供的导航更新。
