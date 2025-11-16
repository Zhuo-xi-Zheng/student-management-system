import Student from '../models/Student.js';

// 获取所有学生
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (error) {
    console.error('获取学生列表失败:', error);
    res.status(500).json({ error: '获取学生列表失败' });
  }
};

// 获取单个学生
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ error: '未找到该学生' });
    }
  } catch (error) {
    console.error('获取学生信息失败:', error);
    res.status(500).json({ error: '获取学生信息失败' });
  }
};

// 添加学生
export const addStudent = async (req, res) => {
  try {
    const { name, age, gender, major, student_id } = req.body;
    
    // 验证必要字段
    if (!name || !age || !gender || !major || !student_id) {
      return res.status(400).json({ error: '请填写所有必填字段' });
    }
    
    // 检查学号是否已存在
    const existingStudent = await Student.findOne({ where: { student_id } });
    if (existingStudent) {
      return res.status(400).json({ error: '该学号已存在' });
    }
    
    const student = await Student.create({
      name,
      age,
      gender,
      major,
      student_id,
      created_at: new Date(),
      updated_at: new Date(),
    });
    
    res.status(201).json(student);
  } catch (error) {
    console.error('添加学生失败:', error);
    res.status(500).json({ error: '添加学生失败' });
  }
};

// 更新学生
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, gender, major, student_id } = req.body;
    
    // 验证必要字段
    if (!name || !age || !gender || !major || !student_id) {
      return res.status(400).json({ error: '请填写所有必填字段' });
    }
    
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({ error: '未找到该学生' });
    }
    
    // 检查学号是否已被其他学生使用
    if (student_id !== student.student_id) {
      const existingStudent = await Student.findOne({ where: { student_id } });
      if (existingStudent) {
        return res.status(400).json({ error: '该学号已被其他学生使用' });
      }
    }
    
    await student.update({
      name,
      age,
      gender,
      major,
      student_id,
      updated_at: new Date(),
    });
    
    res.json(student);
  } catch (error) {
    console.error('更新学生信息失败:', error);
    res.status(500).json({ error: '更新学生信息失败' });
  }
};

// 删除学生
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByPk(id);
    
    if (!student) {
      return res.status(404).json({ error: '未找到该学生' });
    }
    
    await student.destroy();
    res.json({ message: '学生删除成功' });
  } catch (error) {
    console.error('删除学生失败:', error);
    res.status(500).json({ error: '删除学生失败' });
  }
};