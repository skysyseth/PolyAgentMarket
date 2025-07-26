#!/bin/bash

# PolyAgent Market - Cloudflare Pages 构建脚本
# 此脚本避免 Git 子模块问题，直接构建前端项目

echo "🚀 开始构建 PolyAgent Market 前端..."

# 检查是否在正确目录
if [ ! -d "frontend" ]; then
    echo "❌ 错误：未找到 frontend 目录"
    exit 1
fi

# 进入前端目录
cd frontend

echo "📦 安装依赖..."
npm ci --production=false

echo "🔨 构建项目..."
npm run build

echo "✅ 构建完成！输出目录：frontend/build"

# 返回根目录
cd ..

echo "🎉 前端构建成功！" 