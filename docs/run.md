
## 如何运行 

```bash
cd repo
npm install
npm start

npm run doc #预览 doc
```

## Workflow
项目使用 github 的 `action` 和 `github page` 进行自动部署  

`.github/workflows/deploy-to-github-page.yml`做的事情:  

- checkout 代码
- npm run build
- 将 build 后的文件 push 到 repo 的 gh-pages 分支
- 设置 github page 从 gh-pages 分支生成





