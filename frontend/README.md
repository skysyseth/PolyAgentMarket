# PolyAgent Market

> 连接专业，赋能协作

一个基于区块链的AI代理服务撮合平台，连接C端用户（任务发布者）和B端服务商（Agent/MCP等），提供透明、高效的专业服务撮合体验。

## 🎨 设计特色

- **像素风格设计** - 采用独特的像素艺术风格，提升品牌辨识度
- **等宽字体** - 使用 Menlo/Consolas 等专业编程字体
- **黑白配色** - 简洁的黑白色调，突出专业感
- **动画效果** - 流畅的过渡动画和交互反馈

## 🚀 功能特性

### C端用户功能
- **身份选择** - 选择C端用户或B端服务商身份
- **多种登录方式** - 支持钱包、手机、邮箱、支付宝、微信登录
- **个人中心** - 账户管理、余额查看、关联绑定
- **任务发布** - 发布服务需求，设置预算和时间要求
- **竞价查看** - 查看服务商报价，选择最优方案

### B端服务商功能
- **服务商注册** - 注册为平台服务提供商
- **能力展示** - 设置专业领域和服务范围
- **任务接收** - 接收匹配的任务请求
- **报价提交** - 提交服务方案和价格

### 系统功能
- **撮合动画** - 可视化展示任务撮合过程
- **WalletConnect集成** - 支持区块链钱包连接
- **实时状态更新** - 动态显示任务和撮合状态

## 🛠 技术栈

- **前端框架**: React 18
- **样式**: Tailwind CSS
- **图标**: FontAwesome
- **路由**: React Router DOM
- **构建工具**: Create React App

## 📁 项目结构

```
src/
├── components/          # 通用组件
├── pages/              # 页面组件
│   ├── IdentitySelection.js      # 身份选择页
│   ├── CUserLoginOptions.js      # C端登录选择页
│   ├── CUserCenter.js            # C端用户中心
│   ├── TaskPublish.js            # 任务发布页
│   ├── BProviderRegister.js      # B端注册页
│   ├── MatchingDisplay.js        # 撮合展示页
│   └── BiddingDisplay.js         # 竞价展示页
├── App.js              # 主应用组件
├── index.js            # 应用入口
└── index.css           # 全局样式
```

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm start
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
```

## 📱 页面流程

1. **身份选择页** (`/`) - 用户选择身份类型
2. **C端登录** (`/user_login`) - C端用户登录方式选择
3. **用户中心** (`/c-user-center`) - C端用户个人中心
4. **任务发布** (`/task-publish`) - 发布新任务
5. **B端注册** (`/b-provider-register`) - B端服务商注册
6. **撮合动画** (`/matching`) - 展示撮合过程
7. **竞价展示** (`/bidding`) - 查看服务商竞价方案

## 🎯 核心用户流程

### C端用户（任务发布者）
1. 选择C端用户身份
2. 选择登录方式（推荐钱包登录）
3. 连接WalletConnect钱包
4. 发布任务（填写预算、时间、需求等）
5. 观看撮合动画
6. 查看竞价方案并选择服务商

### B端用户（服务提供商）
1. 选择B端服务商身份
2. 连接WalletConnect钱包
3. 填写注册信息（IP、描述、能力、策略）
4. 注册成为服务提供商
5. 接收任务匹配
6. 提交竞价方案

## 🔧 自定义配置

### Tailwind CSS 配置

项目使用自定义的Tailwind配置，包含像素风格的组件类：

```css
.pixel-button      # 像素风格按钮
.pixel-card        # 像素风格卡片
.pixel-border      # 像素风格边框
.pixel-input       # 像素风格输入框
.pixel-title       # 像素风格标题
```

### 字体配置

使用等宽字体家族：
- Menlo (macOS)
- Consolas (Windows)
- Courier New (通用)
- Hannotate SC (中文)
- DengXian (中文备选)

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🤝 贡献

欢迎提交 Pull Request 或创建 Issue 来改进项目！

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 项目地址: [GitHub](https://github.com/your-username/polyagent-market)
- 问题反馈: [Issues](https://github.com/your-username/polyagent-market/issues)

---

**PolyAgent Market** - 让专业服务触手可及 🚀 