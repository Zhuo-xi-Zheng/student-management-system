<<<<<<< HEAD
# 学生管理系统

这是一个基于React+TypeScript+Node.js+Express+MySQL的学生管理系统，支持学生和教师的增删改查功能。

## 技术栈

### 前端
- React 18+
- TypeScript
- Tailwind CSS
- React Router
- Vite

### 后端
- Node.js
- Express
- MySQL
- Sequelize ORM

## 功能特性

- 登录认证
- 学生信息管理（增删改查）
- 教师信息管理（增删改查）
- 数据可视化Dashboard
- 响应式设计
- 亮色/暗色主题切换
- 离线模式支持（使用mock数据）

## 环境配置

### 前提条件
- Node.js (v16+)
- MySQL (v5.7+)
- pnpm (推荐) 或 npm/yarn

### 数据库配置

1. 创建数据库
```sql
CREATE DATABASE student_management_system;
```

2. 导入数据表结构
```sql
USE student_management_system;

CREATE TABLE students (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  age INT NOT NULL,
  gender ENUM('男','女','其他') NOT NULL,
  major VARCHAR(50) NOT NULL,
  student_id VARCHAR(20) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE teachers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  age INT NOT NULL,
  gender ENUM('男','女','其他') NOT NULL,
  department VARCHAR(50) NOT NULL,
  teacher_id VARCHAR(20) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 后端配置

1. 复制环境配置文件
```bash
cd server
cp .env.example .env
```

2. 编辑`.env`文件，填入您的数据库信息
```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=student_management_system
DB_USER=root
DB_PASSWORD=your_password
SERVER_PORT=3001
```

## 启动步骤

### 安装依赖

1. 安装前端依赖
```bash
pnpm install
```

2. 安装后端依赖
```bash
cd server
pnpm install
cd ..
```

### 启动应用

#### 方法1：分别启动前后端

1. 启动后端服务器
```bash
cd server
pnpm dev
```

2. 启动前端开发服务器
```bash
pnpm dev:client
```

#### 方法2：使用npm脚本启动（仅开发环境）

目前的脚本配置可能需要调整，建议使用方法1分别启动。

## 访问系统

- 前端应用：http://localhost:3000
- 后端API：http://localhost:3001

## 登录信息

- 用户名：admin
- 密码：123456

## 项目结构

### 前端结构
```
src/
├── App.tsx            # 主应用组件和路由配置
├── components/        # 通用组件
├── contexts/          # React Context
├── hooks/             # 自定义Hooks
├── lib/               # 工具函数
├── pages/             # 页面组件
│   ├── Home.tsx       # Dashboard页面
│   ├── Login.tsx      # 登录页面
│   ├── StudentManagement.tsx # 学生管理页面
│   └── TeacherManagement.tsx # 教师管理页面
├── main.tsx           # 应用入口
└── index.css          # 全局样式
```

### 后端结构
```
server/
├── app.js             # 后端应用入口
├── config/            # 配置文件
│   └── db.js          # 数据库配置
├── controllers/       # 控制器
│   ├── studentController.js # 学生相关控制器
│   └── teacherController.js # 教师相关控制器
├── models/            # 数据模型
│   ├── Student.js     # 学生模型
│   └── Teacher.js     # 教师模型
├── routes/            # 路由配置
│   ├── studentRoutes.js # 学生相关路由
│   └── teacherRoutes.js # 教师相关路由
└── package.json       # 后端依赖配置
```

## 注意事项

1. 系统默认配置了代理，前端请求会自动转发到后端API
2. 当后端API不可用时，系统会自动切换到离线模式，使用mock数据
3. 数据可视化部分使用了recharts库，展示学生专业分布和性别比例
4. 登录状态使用localStorage保存，关闭浏览器后需要重新登录

## 开发说明

1. 前端支持热重载，修改代码后会自动刷新页面
2. 后端使用nodemon，修改代码后会自动重启服务器
3. 建议使用VSCode进行开发，并安装推荐的插件

## License

MIT
=======
# student-management-system
homework
>>>>>>> 5daab4fb05a117d4c51d9f7ad93416dd2299d97e
