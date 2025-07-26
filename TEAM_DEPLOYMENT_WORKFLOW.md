# 团队协作部署工作流程

## 🏗 项目结构
- **主仓库**: https://github.com/skysyseth/PolyAgentMarket
- **您的 Fork**: https://github.com/PolarTechJordan/PolyAgentMarket

## 🚀 接下来的步骤

### 步骤 1: Fork 主仓库（必须先做）

1. **访问主仓库**: https://github.com/skysyseth/PolyAgentMarket
2. **点击右上角 "Fork" 按钮**
3. **选择您的账户**: @PolarTechJordan

### 步骤 2: 推送分支到您的 Fork

```bash
# 推送当前分支到您的 fork
git push fork feature/cloudflare-pages-deployment
```

### 步骤 3: 在您的 Cloudflare 账户测试部署

1. **登录 Cloudflare**: https://dash.cloudflare.com
2. **创建新 Pages 项目**
   - 点击 "Pages" → "Create a project" 
   - 选择 "Connect to Git"
3. **连接您的 fork**: `PolarTechJordan/PolyAgentMarket`
4. **配置构建设置**:
   ```
   项目名称: polyagent-market-test
   分支: feature/cloudflare-pages-deployment
   根目录: frontend
   构建命令: npm run build
   构建输出目录: build
   ```

### 步骤 4: 创建 Pull Request

1. **访问您的 fork**: https://github.com/PolarTechJordan/PolyAgentMarket
2. **创建 PR**: `feature/cloudflare-pages-deployment` → `skysyseth:main`

## 🛠 本地测试

```bash
# 测试构建
cd frontend
npm install
npm run build

# 确认文件存在
ls -la build/_redirects
```

## 📞 注意事项

- 必须先 Fork 主仓库才能推送
- 测试部署使用您自己的 Cloudflare 账户  
- 生产部署由团队管理员处理
