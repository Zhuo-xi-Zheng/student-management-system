import Teacher from '../models/Teacher.js';

// 获取所有教师
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.findAll();
    res.json(teachers);
  } catch (error) {
    console.error('获取教师列表失败:', error);
    res.status(500).json({ error: '获取教师列表失败' });
  }
};

// 获取单个教师
export const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findByPk(req.params.id);
    if (teacher) {
      res.json(teacher);
    } else {
      res.status(404).json({ error: '未找到该教师' });
    }
  } catch (error) {
    console.error('获取教师信息失败:', error);
    res.status(500).json({ error: '获取教师信息失败' });
  }
};

// 添加教师
export const addTeacher = async (req, res) => {
  try {
    const { name, age, gender, department, teacher_id } = req.body;
    
    // 验证必要字段
    if (!name || !age || !gender || !department || !teacher_id) {
      return res.status(400).json({ error: '请填写所有必填字段' });
    }
    
    // 检查工号是否已存在
    const existingTeacher = await Teacher.findOne({ where: { teacher_id } });
    if (existingTeacher) {
      return res.status(400).json({ error: '该工号已存在' });
    }
    
    const teacher = await Teacher.create({
      name,
      age,
      gender,
      department,
      teacher_id,
      created_at: new Date(),
      updated_at: new Date(),
    });
    
    res.status(201).json(teacher);
  } catch (error) {
    console.error('添加教师失败:', error);
    res.status(500).json({ error: '添加教师失败' });
  }
};

// 更新教师
export const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, gender, department, teacher_id } = req.body;
    
    // 验证必要字段
    if (!name || !age || !gender || !department || !teacher_id) {
      return res.status(400).json({ error: '请填写所有必填字段' });
    }
    
    const teacher = await Teacher.findByPk(id);
    if (!teacher) {
      return res.status(404).json({ error: '未找到该教师' });
    }
    
    // 检查工号是否已被其他教师使用
    if (teacher_id !== teacher.teacher_id) {
      const existingTeacher = await Teacher.findOne({ where: { teacher_id } });
      if (existingTeacher) {
        return res.status(400).json({ error: '该工号已被其他教师使用' });
      }
    }
    
    await teacher.update({
      name,
      age,
      gender,
      department,
      teacher_id,
      updated_at: new Date(),
    });
    
    res.json(teacher);
  } catch (error) {
    console.error('更新教师信息失败:', error);
    res.status(500).json({ error: '更新教师信息失败' });
  }
};

// 删除教师
export const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findByPk(id);
    
    if (!teacher) {
      return res.status(404).json({ error: '未找到该教师' });
    }
    
    await teacher.destroy();
    res.json({ message: '教师删除成功' });
  } catch (error) {
    console.error('删除教师失败:', error);
    res.status(500).json({ error: '删除教师失败' });
  }
};