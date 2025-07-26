# Agent Registry Service

## 概述
Agent Registry Service 是 PolyAgentMarket 平台的核心服务之一，负责代理的注册、发现和管理。

## 技术栈
- **后端框架**: Express.js
- **数据库**: SQLite
- **ORM**: Prisma
- **语言**: Node.js

## 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 数据库初始化
```bash
npx prisma generate
npx prisma db push
```

### 3. 启动服务
```bash
npm run dev
```

服务将在 http://localhost:3001 启动

## API 端点

### 1. 注册新代理
```http
POST /api/agents
Content-Type: application/json

{
  "name": "智能助手",
  "description": "一个智能对话代理",
  "version": "1.0.0",
  "author": "张三",
  "email": "zhangsan@example.com",
  "repository": "https://github.com/user/smart-agent",
  "tags": "对话,智能,助手",
  "capabilities": "自然语言处理,任务执行",
  "endpoint": "https://api.example.com/agent",
  "ipAddress": "192.168.1.100",
  "port": 3000,
  "publicKey": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...\n-----END PUBLIC KEY-----"
}
```

### 2. 获取所有代理
```http
GET /api/agents
```

### 3. 获取特定代理
```http
GET /api/agents/:id
```

### 4. 更新代理信息
```http
PUT /api/agents/:id
Content-Type: application/json

{
  "description": "更新后的描述",
  "version": "1.1.0"
}
```

### 5. 停用代理
```http
DELETE /api/agents/:id
```

## 数据模型

### Agent 实体

| 字段 | 类型 | 描述 |
|------|------|------|
| id | String | 唯一标识符 |
| name | String | 代理名称 |
| description | String? | 代理描述 |
| version | String | 版本号 (默认: 1.0.0) |
| author | String | 作者名称 |
| email | String | 作者邮箱 |
| repository | String? | 代码仓库地址 |
| tags | String | 标签 (逗号分隔) |
| capabilities | String | 能力描述 (逗号分隔) |
| endpoint | String | API端点 |
| isActive | Boolean | 是否激活 (默认: true) |
| rating | Float | 评分 (默认: 0.0) |
| totalRating | Int | 总评分次数 (默认: 0) |
| createdAt | DateTime | 创建时间 |
| updatedAt | DateTime | 更新时间 |

## 开发指南

### 数据库操作

查看数据库内容：
```bash
npx prisma studio
```

重置数据库：
```bash
npx prisma db push --force-reset
```

### 环境变量

在 `.env` 文件中配置：
```
DATABASE_URL="file:./dev.db"
PORT=3001
```

## 示例使用

### 使用 curl 测试

1. 注册代理：
```bash
curl -X POST http://localhost:3001/api/agents \
  -H "Content-Type: application/json" \
  -d '{"name":"测试代理","author":"开发者","email":"dev@example.com","endpoint":"http://localhost:3000","tags":"测试,示例","capabilities":"API调用","ipAddress":"192.168.1.100","port":3000,"publicKey":"-----BEGIN PUBLIC KEY-----\\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...\\n-----END PUBLIC KEY-----"}'
```

2. 获取所有代理：
```bash
curl http://localhost:3001/api/agents
```

3. 获取特定代理：
```bash
curl http://localhost:3001/api/agents/代理ID
```

## 项目结构

```
backend/agent-registry/
├── src/
│   ├── app.js          # 主应用文件
│   └── routes/
│       └── agents.js   # 代理路由
├── prisma/
│   └── schema.prisma   # 数据库模式
├── .env                # 环境变量
├── package.json        # 项目配置
└── README.md          # 本文档
```
