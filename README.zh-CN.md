# Remix 全栈应用程序

[English](./README.md) | 简体中文

一个使用 Remix, React, TypeScript 和 shadcn/ui 构建的全栈 Web 应用程序。

## 快速入门

### 前提条件
- Node.js >= 20.0.0
- npm

### 安装

```sh
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 可用脚本

```sh
npm run dev       # 启动开发服务器
npm run build     # 构建生产版本
npm run start     # 运行生产服务器
npm run lint      # 运行 ESLint
npm run typecheck # 运行 TypeScript 类型检查
npm run test      # 运行测试
```

## 项目结构

```
app/
├── routes/           # Remix 路由 (页面 + API 接口)
│   ├── _index.tsx    # 首页 (/)
│   ├── $.tsx         # 404 兜底页面
│   └── api.health.tsx # API 接口示例 (/api/health)
├── components/       # React 组件
│   ├── ui/           # shadcn/ui 组件
│   └── ...           # 自定义组件
├── lib/              # 工具函数
├── hooks/            # 自定义 React hooks
├── root.tsx          # 根布局组件
└── tailwind.css      # 全局样式
```

## 技术栈

- **框架**: [Remix](https://remix.run/) - 全栈 React 框架
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI 组件**: [shadcn/ui](https://ui.shadcn.dev/)
- **构建工具**: Vite

## 后端 API 路由

通过在 `app/routes/` 中添加带有 `api.` 前缀的文件来创建 API 路由：

```tsx
// app/routes/api.example.tsx
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

// GET /api/example
export async function loader({ request }: LoaderFunctionArgs) {
  return json({ message: "Hello from API" });
}

// POST /api/example
export async function action({ request }: ActionFunctionArgs) {
  const data = await request.json();
  return json({ received: data });
}
```

## 添加 UI 组件

使用 shadcn/ui CLI 添加组件：

```sh
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
# 等等
```

## 部署

构建并运行生产服务器：

```sh
npm run build
npm run start
```

应用程序在生产模式下运行在 `http://localhost:3000`。
