# CCB 文档与社区站点

Cataclysm: Cleanwater Bomb（CCB）的官方文档与社区网站，基于 [Docusaurus](https://docusaurus.io/) 构建，部署于 GitHub Pages。

## 站点内容

- **新人教程** — 从下载安装到活过第一天
- **开发者教程** — 从源码编译、贡献代码流程
- **贡献指南** — 代码 / 像素图 / 翻译 / 内容四种贡献方式
- **开发路线** — 项目愿景与当前进度
- **工作状态** — 开发日志与上游同步记录
- **社区** — Discord、Reddit、QQ 群

## 本地开发

```bash
npm install
npm start
```

启动后在浏览器打开 http://localhost:3000/CCB-SITE/，大部分改动会实时刷新。

## 构建

```bash
npm run build
```

静态文件输出到 `build/` 目录。

## 部署

站点通过 `gh-pages` 分支发布到 GitHub Pages：

```bash
npm run deploy
```

需要提前配置好 Git SSH 或设置 `GIT_USER` 环境变量。
