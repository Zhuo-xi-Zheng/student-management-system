import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

// 定义教师模型
const Teacher = sequelize.define('Teacher', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM('男', '女', '其他'),
    allowNull: false,
  },
  department: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  teacher_id: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
}, {
  tableName: 'teachers',
  timestamps: false, // 不自动添加createdAt和updatedAt字段
});

export default Teacher;