# Market Service

简单代理交易市场 - 黑客松MVP版本

## 功能
- 代理商品上架
- 代理商品搜索
- 代理购买交易
- 价格历史记录

## 快速开始

### 安装依赖
```bash
npm install
```

### 初始化数据库
```bash
npm run db:push
npm run db:seed
```

### 启动服务
```bash
npm run dev
```

服务将在 http://localhost:3002 启动

## API 接口

### 商品列表
- `GET /listings` - 获取所有商品
- `GET /listings/:id` - 获取特定商品
- `POST /listings` - 创建新商品

### 购买记录
- `GET /purchases` - 获取所有购买记录
- `GET /purchases?buyerId=:id` - 获取特定用户的购买记录
- `POST /purchases` - 创建新购买记录

### 健康检查
- `GET /health` - 服务健康状态

## 测试
```bash
npm test
```

## 数据库模型
- **Listing**: 商品信息
- **Purchase**: 购买记录  
- **PriceHistory**: 价格历史