# Cloudflare Pages 前端部署指南

## 🎯 仅部署前端项目

此分支专门用于 Cloudflare Pages 前端部署，不影响 backend 和 contracts 开发。

## 📋 Cloudflare Pages 配置

### 构建设置
```
项目名称: polyagent-market
生产分支: feature/cloudflare-pages-deployment
框架预设: React (Create React App)
构建命令: cd frontend && npm ci && npm run build
构建输出目录: frontend/build
根目录: (留空)
Node.js版本: 18
```

### 环境变量（可选）
```
NODE_VERSION=18
NPM_CONFIG_PRODUCTION=false
```

## 🚀 部署方式

### 方式一：使用构建脚本（推荐）
```
构建命令: ./build-frontend.sh
```

### 方式二：直接命令
```
构建命令: cd frontend && npm ci && npm run build
```

## 🔧 解决子模块问题

本配置通过以下方式避免 Git 子模块问题：
1. 构建命令只进入 frontend 目录
2. 不初始化或更新 Git 子模块
3. 专用构建脚本忽略 contracts 目录

## 📝 注意事项

- 此分支只用于前端部署
- 不修改 backend 或 contracts 代码
- 与团队开发分支保持隔离
- 定期从 main 分支合并更新

## 🔄 更新流程

1. 从 main 分支拉取最新的 frontend 更改
2. 推送到此部署分支
3. Cloudflare Pages 自动部署

```bash
git checkout main
git pull origin main
git checkout feature/cloudflare-pages-deployment
git merge main --strategy-option=ours frontend/
git push origin feature/cloudflare-pages-deployment
``` 