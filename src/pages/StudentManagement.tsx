import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/contexts/authContext';
import { useTheme } from '@/hooks/useTheme';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

// 学生数据类型定义
interface Student {
  id: number;
  name: string;
  age: number;
  gender: '男' | '女' | '其他';
  major: string;
  student_id: string;
  created_at: string;
  updated_at: string;
}

// Mock数据
const mockStudents: Student[] = [
  {
    id: 1,
    name: '张三',
    age: 20,
    gender: '男',
    major: '计算机科学',
    student_id: '20210001',
    created_at: '2023-09-01 08:00:00',
    updated_at: '2023-09-01 08:00:00'
  },
  {
    id: 2,
    name: '李四',
    age: 21,
    gender: '女',
    major: '电子工程',
    student_id: '20210002',
    created_at: '2023-09-01 09:00:00',
    updated_at: '2023-09-01 09:00:00'
  },
  {
    id: 3,
    name: '王五',
    age: 22,
    gender: '男',
    major: '数学',
    student_id: '20210003',
    created_at: '2023-09-02 10:00:00',
    updated_at: '2023-09-02 10:00:00'
  }
];

export default function StudentManagement() {
  const { logout } = useContext(AuthContext);
  const { theme, toggleTheme, isDark } = useTheme();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Partial<Student>>({});
  const [formData, setFormData] = useState<Partial<Student>>({
    name: '',
    age: 0,
    gender: '男',
    major: '',
    student_id: ''
  });

  // 获取学生列表
  const fetchStudents = async () => {
    setLoading(true);
    try {
      // 尝试调用实际API
      const response = await fetch('/api/students');
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      } else {
        // API调用失败时使用mock数据
        throw new Error('API调用失败，使用mock数据');
      }
    } catch (error) {
      // 网络错误或API不可用时使用mock数据
      console.log('使用mock数据:', error);
      setStudents(mockStudents);
    } finally {
      setLoading(false);
    }
  };

  // 初始化数据
  useEffect(() => {
    fetchStudents();
  }, []);

  // 处理搜索
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // 过滤学生列表
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.student_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.major.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 处理表单输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) : value
    }));
  };

  // 处理添加学生
  const handleAddStudent = () => {
    setFormData({
      name: '',
      age: 0,
      gender: '男',
      major: '',
      student_id: ''
    });
    setShowAddModal(true);
  };

  // 处理编辑学生
  const handleEditStudent = (student: Student) => {
    setCurrentStudent(student);
    setFormData({
      name: student.name,
      age: student.age,
      gender: student.gender,
      major: student.major,
      student_id: student.student_id
    });
    setShowEditModal(true);
  };

  // 提交添加学生
  const submitAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 表单验证
    if (!formData.name || !formData.age || !formData.gender || !formData.major || !formData.student_id) {
      toast.error('请填写所有必填字段');
      return;
    }

    try {
      // 尝试调用实际API
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newStudent = await response.json();
        setStudents(prev => [...prev, newStudent]);
        toast.success('学生添加成功');
      } else {
        throw new Error('添加失败');
      }
    } catch (error) {
      // API调用失败时使用前端模拟添加
      console.log('API调用失败，使用前端模拟添加:', error);
      const newStudent: Student = {
        id: students.length + 1,
        name: formData.name as string,
        age: formData.age as number,
        gender: formData.gender as '男' | '女' | '其他',
        major: formData.major as string,
        student_id: formData.student_id as string,
        created_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
        updated_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
      };
      setStudents(prev => [...prev, newStudent]);
      toast.success('学生添加成功（离线模式）');
    } finally {
      setShowAddModal(false);
    }
  };

  // 提交编辑学生
  const submitEditStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 表单验证
    if (!formData.name || !formData.age || !formData.gender || !formData.major || !formData.student_id) {
      toast.error('请填写所有必填字段');
      return;
    }

    try {
      // 尝试调用实际API
      const response = await fetch(`/api/students/${(currentStudent as Student).id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedStudent = await response.json();
        setStudents(prev => prev.map(student => 
          student.id === updatedStudent.id ? updatedStudent : student
        ));
        toast.success('学生信息更新成功');
      } else {
        throw new Error('更新失败');
      }
    } catch (error) {
      // API调用失败时使用前端模拟更新
      console.log('API调用失败，使用前端模拟更新:', error);
      const updatedStudent: Student = {
        ...(currentStudent as Student),
        name: formData.name as string,
        age: formData.age as number,
        gender: formData.gender as '男' | '女' | '其他',
        major: formData.major as string,
        student_id: formData.student_id as string,
        updated_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
      };
      setStudents(prev => prev.map(student => 
        student.id === (currentStudent as Student).id ? updatedStudent : student
      ));
      toast.success('学生信息更新成功（离线模式）');
    } finally {
      setShowEditModal(false);
    }
  };

  // 处理删除学生
  const handleDeleteStudent = async (id: number) => {
    if (window.confirm('确定要删除这个学生吗？')) {
      try {
        // 尝试调用实际API
        const response = await fetch(`/api/students/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setStudents(prev => prev.filter(student => student.id !== id));
          toast.success('学生删除成功');
        } else {
          throw new Error('删除失败');
        }
      } catch (error) {
        // API调用失败时使用前端模拟删除
        console.log('API调用失败，使用前端模拟删除:', error);
        setStudents(prev => prev.filter(student => student.id !== id));
        toast.success('学生删除成功（离线模式）');
      }
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      {/* 导航栏 */}
      <nav className={`sticky top-0 z-10 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md p-4 flex justify-between items-center`}>
        <h1 className="text-xl font-bold flex items-center">
          <i className="fa-solid fa-graduation-cap mr-2 text-blue-500"></i>
          学生管理系统
        </h1>
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleTheme} 
            className={`p-2 rounded-full ${isDark ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-700'}`}
            aria-label={isDark ? '切换到亮色模式' : '切换到暗色模式'}
          >
            {isDark ? <i className="fa-solid fa-sun"></i> : <i className="fa-solid fa-moon"></i>}
          </button>
          <button 
            onClick={logout} 
            className="flex items-center space-x-1 px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>退出</span>
          </button>
        </div>
      </nav>

      {/* 侧边栏和内容区域 */}
      <div className="flex">
        {/* 侧边栏 */}
        <aside className={`w-64 ${isDark ? 'bg-gray-800' : 'bg-white'} h-[calc(100vh-64px)] sticky top-16 shadow-md overflow-y-auto`}>
          <div className="py-4">
            <Link 
              to="/" 
              className={`flex items-center px-6 py-3 mx-4 mb-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} font-medium`}
            >
              <i className="fa-solid fa-home w-6"></i>
              <span className="ml-2">首页</span>
            </Link>
            <Link 
              to="/students" 
              className={`flex items-center px-6 py-3 mx-4 mb-2 rounded-lg ${isDark ? 'bg-gray-700 text-blue-400' : 'bg-blue-50 text-blue-600'} font-medium`}
            >
              <i className="fa-solid fa-users w-6"></i>
              <span className="ml-2">学生管理</span>
            </Link>
            <Link 
              to="/teachers" 
              className={`flex items-center px-6 py-3 mx-4 mb-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} font-medium`}
            >
              <i className="fa-solid fa-chalkboard-user w-6"></i>
              <span className="ml-2">教师管理</span>
            </Link>
          </div>
        </aside>

        {/* 主内容区域 */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">学生管理</h2>
              <button 
                onClick={handleAddStudent}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                <i className="fa-solid fa-plus"></i>
                <span>添加学生</span>
              </button>
            </div>
            
            {/* 搜索框 */}
            <div className="mb-6">
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <i className="fa-solid fa-search"></i>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="搜索学生姓名、学号或专业..."
                  className={`block w-full pl-10 pr-3 py-3 rounded-lg ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'} border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                />
              </div>
            </div>
            
            {/* 学生列表 */}
            {loading ? (
              <div className={`p-8 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'} flex flex-col items-center justify-center`}>
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-gray-500 dark:text-gray-400">加载中...</p>
              </div>
            ) : filteredStudents.length === 0 ? (
              <div className={`p-8 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'} flex flex-col items-center justify-center`}>
                <i className="fa-solid fa-search-minus text-4xl text-gray-400 mb-4"></i>
                <p className="text-gray-500 dark:text-gray-400">没有找到匹配的学生</p>
              </div>
            ) : (
              <div className={`rounded-xl shadow-md overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
                      <tr>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          学号
                        </th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          姓名
                        </th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          年龄
                        </th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          性别
                        </th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          专业
                        </th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          创建时间
                        </th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          操作
                        </th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y divide-gray-200 dark:divide-gray-700 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                      {filteredStudents.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {student.student_id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {student.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {student.age}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {student.gender}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {student.major}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {student.created_at}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditStudent(student)}
                                className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                              >
                                <i className="fa-solid fa-pen-to-square"></i>
                              </button>
                              <button
                                onClick={() => handleDeleteStudent(student.id)}
                                className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* 添加学生模态框 */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50 dark:bg-opacity-70" onClick={() => setShowAddModal(false)}></div>
          <div className={`relative w-full max-w-md mx-4 p-6 rounded-xl shadow-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <button
              type="button"
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              onClick={() => setShowAddModal(false)}
            >
              <i className="fa-solid fa-times"></i>
            </button>
            <h3 className="text-lg font-semibold mb-4">添加学生</h3>
            <form onSubmit={submitAddStudent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">姓名</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`block w-full px-3 py-2 rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'} border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">学号</label>
                <input
                  type="text"
                  name="student_id"
                  value={formData.student_id}
                  onChange={handleInputChange}
                  className={`block w-full px-3 py-2 rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'} border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">年龄</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-2 rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'} border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">性别</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-2 rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'} border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                    required
                  >
                    <option value="男">男</option>
                    <option value="女">女</option>
                    <option value="其他">其他</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">专业</label>
                <input
                  type="text"
                  name="major"
                  value={formData.major}
                  onChange={handleInputChange}
                  className={`block w-full px-3 py-2 rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'} border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                  required
                />
              </div>
              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                  onClick={() => setShowAddModal(false)}
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                >
                  保存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 编辑学生模态框 */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50 dark:bg-opacity-70" onClick={() => setShowEditModal(false)}></div>
          <div className={`relative w-full max-w-md mx-4 p-6 rounded-xl shadow-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <button
              type="button"
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              onClick={() => setShowEditModal(false)}
            >
              <i className="fa-solid fa-times"></i>
            </button>
            <h3 className="text-lg font-semibold mb-4">编辑学生</h3>
            <form onSubmit={submitEditStudent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">姓名</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`block w-full px-3 py-2 rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'} border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">学号</label>
                <input
                  type="text"
                  name="student_id"
                  value={formData.student_id}
                  onChange={handleInputChange}
                  className={`block w-full px-3 py-2 rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'} border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">年龄</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-2 rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'} border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">性别</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-2 rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'} border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                    required
                  >
                    <option value="男">男</option>
                    <option value="女">女</option>
                    <option value="其他">其他</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">专业</label>
                <input
                  type="text"
                  name="major"
                  value={formData.major}
                  onChange={handleInputChange}
                  className={`block w-full px-3 py-2 rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'} border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                  required
                />
              </div>
              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                  onClick={() => setShowEditModal(false)}
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                >
                  更新
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}