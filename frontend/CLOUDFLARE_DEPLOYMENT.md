# Cloudflare Pages 部署指南

## 📋 项目信息
- **项目名称**: PolyAgent Market
- **框架**: React (Create React App)
- **构建目录**: frontend
- **输出目录**: build

## 🚀 部署到 Cloudflare Pages

### 方式一：通过 Cloudflare Dashboard（推荐）

1. **登录 Cloudflare Dashboard**
   - 访问: https://dash.cloudflare.com
   - 登录您的 Cloudflare 账户

2. **创建新项目**
   - 点击 "Pages" → "Create a project"
   - 选择 "Connect to Git"

3. **连接仓库**
   - 选择 GitHub
   - 授权访问仓库: `skysyseth/PolyAgentMarket`

4. **配置构建设置**
   ```
   项目名称: polyagent-market
   生产分支: main
   框架预设: Create React App
   根目录: frontend
   构建命令: npm run build
   构建输出目录: build
   Node.js版本: 18 (推荐)
   ```

5. **环境变量**（如需要）
   ```
   REACT_APP_API_URL=https://your-api-domain.com
   REACT_APP_CONTRACT_ADDRESS=0x...
   REACT_APP_NETWORK_ID=1
   ```

6. **开始部署**
   - 点击 "Save and Deploy"

### 方式二：通过 Wrangler CLI

```bash
# 1. 安装 Wrangler
npm install -g wrangler

# 2. 登录
wrangler login

# 3. 在 frontend 目录下构建和部署
cd frontend
npm run build
wrangler pages deploy build --project-name polyagent-market
```

## 🔧 团队协作部署

### Fork 工作流程

如果您需要在自己的账户下部署测试版本：

1. **Fork 仓库到您的账户**
   - 访问: https://github.com/skysyseth/PolyAgentMarket
   - 点击右上角 "Fork"

2. **在您的 Cloudflare 账户中部署**
   - 连接您 fork 的仓库: `PolarTechJordan/PolyAgentMarket`
   - 使用相同的构建配置

3. **开发和测试**
   - 在您的分支上开发功能
   - 部署到您的 Cloudflare Pages 测试
   - 确认功能正常后提交 PR 到主仓库

### 生产环境部署

- **主仓库**: `skysyseth/PolyAgentMarket`
- **生产域名**: 由团队统一管理
- **部署权限**: 需要仓库管理员设置

## 🛠 故障排除

### 常见问题

1. **构建失败**
   - 检查 Node.js 版本 (推荐 18.x)
   - 确保依赖正确安装

2. **路由问题**
   - 确认 `_redirects` 文件在 `public` 目录
   - 内容: `/*    /index.html   200`

3. **权限问题**
   - 确保 Cloudflare 有权限访问 GitHub 仓库
   - 检查组织/团队的权限设置

## 📞 联系团队

如有部署相关问题，请联系:
- 项目维护者: @skysyseth
- 或在项目 Issues 中提问
