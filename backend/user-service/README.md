# User Service

用户管理服务，提供用户注册、账号信息绑定、请求历史记录和代理响应记录功能。

## 功能特点

- **用户注册与认证** - 支持邮箱和用户名注册
- **账号信息绑定** - 绑定钱包地址、社交媒体账号等
- **请求历史记录** - 记录用户与代理的所有交互请求
- **响应记录展示** - 展示代理响应历史和统计数据
- **分页查询** - 支持分页浏览历史记录

## 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 数据库初始化
```bash
npm run db:push
npm run db:seed  # 可选：添加测试数据
```

### 3. 启动服务
```bash
npm run dev
```

服务将在 http://localhost:3003 启动

## API 文档

### 用户相关接口

#### 注册用户
```http
POST /api/users/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "exampleuser",
  "password": "securepassword",
  "displayName": "Example User"
}
```

#### 获取所有用户
```http
GET /api/users
```

#### 获取用户信息
```http
GET /api/users/:id
```

#### 更新用户信息
```http
PUT /api/users/:id
Content-Type: application/json

{
  "displayName": "New Name",
  "walletAddress": "0x123...",
  "twitter": "@username",
  "github": "username",
  "website": "https://example.com"
}
```

### 请求相关接口

#### 创建请求
```http
POST /api/requests
Content-Type: application/json

{
  "userId": "user_id",
  "agentId": "agent_id",
  "content": "请问如何使用这个代理？",
  "type": "text"
}
```

#### 获取所有请求
```http
GET /api/requests
```

#### 获取用户请求历史
```http
GET /api/requests/user/:userId?limit=10&offset=0
```

### 响应相关接口

#### 创建响应
```http
POST /api/responses
Content-Type: application/json

{
  "requestId": "request_id",
  "agentId": "agent_id",
  "userId": "user_id",
  "content": "这个代理的使用方法是...",
  "type": "text",
  "metadata": {
    "confidence": 0.95,
    "processingTime": 1200
  }
}
```

#### 获取代理响应记录
```http
GET /api/responses/agent/:agentId?limit=10&offset=0
```

#### 获取用户响应记录
```http
GET /api/responses/user/:userId?limit=10&offset=0
```

#### 获取代理统计数据
```http
GET /api/responses/stats/:agentId
```

## 数据模型

### User 用户
- `id`: 唯一标识符
- `email`: 邮箱地址（唯一）
- `username`: 用户名（唯一）
- `displayName`: 显示名称
- `avatar`: 头像URL
- `bio`: 个人简介
- `walletAddress`: 钱包地址
- `twitter`: Twitter账号
- `github`: GitHub账号
- `website`: 个人网站

### Request 请求
- `id`: 唯一标识符
- `userId`: 用户ID
- `agentId`: 代理ID
- `content`: 请求内容
- `type`: 请求类型（text, json等）
- `status`: 请求状态
- `createdAt`: 创建时间

### Response 响应
- `id`: 唯一标识符
- `requestId`: 关联的请求ID
- `agentId`: 代理ID
- `userId`: 用户ID
- `content`: 响应内容
- `type`: 响应类型
- `metadata`: 元数据（JSON格式）
- `createdAt`: 创建时间

## 使用示例

### 完整用户注册流程
```bash
# 注册用户
curl -X POST http://localhost:3003/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@example.com",
    "username": "demouser",
    "password": "demopassword",
    "displayName": "Demo User"
  }'

# 更新用户信息
curl -X PUT http://localhost:3003/api/users/user_id \
  -H "Content-Type: application/json" \
  -d '{
    "walletAddress": "0x1234567890abcdef",
    "twitter": "@demouser"
  }'

# 创建请求
curl -X POST http://localhost:3003/api/requests \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_id",
    "agentId": "agent_id",
    "content": "请帮我生成一段Python代码"
  }'

# 记录代理响应
curl -X POST http://localhost:3003/api/responses \
  -H "Content-Type: application/json" \
  -d '{
    "requestId": "request_id",
    "agentId": "agent_id",
    "userId": "user_id",
    "content": "```python\\nprint(\"Hello World\")\\n```",
    "type": "markdown",
    "metadata": {"language": "python", "confidence": 0.9}
  }'
```

## 开发

### 数据库管理
```bash
# 查看数据库
npm run db:studio

# 重置数据库
npm run db:push --force-reset

# 生成测试数据
node scripts/seed.js
```

### 测试
```bash
npm test
```

## 健康检查
```bash
curl http://localhost:3003/health
```

响应示例：
```json
{
  "status": "ok",
  "service": "user-service"
}
```