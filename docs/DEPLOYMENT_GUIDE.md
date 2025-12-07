# Evolution Body System - 部署与配置指南

本文档将指导您如何在本地运行 **Evolution Body System**，以及如何将其部署到公网。

## 1. 快速开始 (本地开发)

在您的本机电脑上运行系统，适合开发和测试。

### 前置要求
- **Node.js**: 版本 18.17 或更高 (推荐使用 LTS)
- **Git**: 用于版本控制

### 步骤
1.  **克隆代码仓库**
    ```bash
    git clone https://github.com/ParkerLLL/EvolutionBodySystem.git
    cd fitness_system
    ```

2.  **安装依赖**
    ```bash
    npm install
    ```

3.  **启动开发服务器**
    ```bash
    npm run dev
    ```

4.  **访问**
    打开浏览器访问 `http://localhost:3000`。

---

## 2. 部署到生产环境 (推荐 Vercel)

我们强烈推荐使用 **Vercel** 进行部署。它是 Next.js 的官方开发商，提供零配置的自动化部署。

### 步骤
1.  **准备 GitHub 仓库**
    确保您的代码已经推送到自己的 GitHub 仓库中。

2.  **登录 Vercel**
    访问 [vercel.com](https://vercel.com) 并使用 GitHub 账号登录。

3.  **导入项目**
    - 点击 Dashboard 上的 **"Add New..."** -> **"Project"**。
    - 在列表中找到 `EvolutionBodySystem` 仓库，点击 **"Import"**。

4.  **配置与部署**
    - **Framework Preset**: 保持默认 (Next.js)。
    - **Environment Variables** (环境变量): 
        * MVP 阶段: 不需要配置任何变量，系统会自动使用内置的模拟数据 (Mock Data)。
        * 生产阶段 (对接 Supabase): 需要填写 `NEXT_PUBLIC_SUPABASE_URL` 和 `NEXT_PUBLIC_SUPABASE_ANON_KEY` (见下节)。
    - 点击 **"Deploy"**。

5.  **等待构建**
    大约 1 分钟后，Vercel 会生成一个生产环境链接 (例如 `https://evolution-body-system.vercel.app`)。

---

## 3. 数据库配置 (Supabase Integration)

> **注意**: MVP版本目前默认使用模拟数据 (Mock Data) 以确保您可以立刻看到效果。如果您需要真实的数据持久化（保存用户数据），请执行以下步骤。

### 1. 创建 Supabase 项目
1. 访问 [supabase.com](https://supabase.com) 并创建新项目。
2. 设置数据库密码和区域。

### 2. 获取 API Keys
在 Supabase 项目面板中：
- 进入 `Settings` -> `API`。
- 复制 `Project URL`。
- 复制 `anon` / `public` Key。

### 3. 配置环境变量
在 **Vercel** 的项目设置 (`Settings` -> `Environment Variables`) 中添加：
- `NEXT_PUBLIC_SUPABASE_URL`: 您的 Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: 您的 anon Key

### 4. 初始化数据库结构
在 Supabase 的 `SQL Editor` 中，复制并运行我们项目中的 SQL 脚本：
- 文件路径: `supabase/migrations/20240101000000_initial_schema.sql` (构建表结构)
- 文件路径: `supabase/seed.sql` (填充基础动作库数据)

---

## 4. PWA (渐进式 Web 应用) 使用指南

本系统支持 PWA，意味着您可以像原生 App 一样将其安装到手机桌面，并支持离线访问部分功能。

### iOS (iPhone)
1. 在 Safari 中打开您的部署链接。
2. 点击底部的 **"分享"** 按钮。
3. 下滑找到并点击 **"添加到主屏幕" (Add to Home Screen)**。

### Android
1. 在 Chrome 中打开链接。
2. 浏览器通常会弹出 "添加到主屏幕" 的提示栏，点击添加即可。
3. 或者点击右上角菜单 -> **"安装应用"**。

---

## 5. 常见问题

**Q: 为什么我修改了代码，线上没有更新？**
A: Vercel 连接 GitHub 后是自动部署的。请确保您执行了 `git push` 将本地修改推送到 GitHub。

**Q: 如何修改动作库数据？**
A: 
- **Mock 模式**: 修改 `src/app/admin/exercises/page.tsx` 中的 `initialExercises` 数组。
- **Supabase 模式**: 直接在 Supabase Dashboard 的 `Table Editor` 中修改 `exercises` 表，或使用我们在系统里开发的 Admin Portal (`/admin`)。
