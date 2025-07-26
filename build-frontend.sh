#!/bin/bash

# PolyAgent Market - Cloudflare Pages 构建脚本
# 此脚本避免 Git 子模块问题，直接构建前端项目

echo "🚀 开始构建 PolyAgent Market 前端..."

# 忽略 Git 子模块错误
export GIT_STRATEGY=none

# 检查是否在正确目录
if [ ! -d "frontend" ]; then
    echo "❌ 错误：未找到 frontend 目录"
    echo "📁 当前目录内容："
    ls -la
    exit 1
fi

echo "📂 当前目录结构："
ls -la

# 进入前端目录
cd frontend

echo "📦 安装依赖..."
npm ci --production=false

echo "🔨 构建项目..."
npm run build

echo "✅ 构建完成！输出目录：frontend/build"

# 验证构建结果
if [ -d "build" ]; then
    echo "📁 构建文件："
    ls -la build/
else
    echo "❌ 构建失败：未找到 build 目录"
    exit 1
fi

# 返回根目录
cd ..

echo "🎉 前端构建成功！" 