import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/db.js';
import studentRoutes from './routes/studentRoutes.js';
import teacherRoutes from './routes/teacherRoutes.js';

// 加载环境变量
dotenv.config();

// 创建Express应用
const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 路由
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);

// 测试路由
app.get('/', (req, res) => {
  res.send('学生管理系统后端API运行中');
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 启动服务器
const PORT = process.env.SERVER_PORT || 3001;
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
  console.log(`API地址: http://localhost:${PORT}/api`);
});