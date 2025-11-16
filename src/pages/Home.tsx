import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/authContext';
import { useTheme } from '@/hooks/useTheme';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell
} from 'recharts';

// Mock数据用于图表
const studentData = [
  { name: '计算机科学', count: 85 },
  { name: '电子工程', count: 65 },
  { name: '数学', count: 45 },
  { name: '物理', count: 30 },
  { name: '化学', count: 25 },
];

const genderData = [
  { name: '男', value: 150 },
  { name: '女', value: 100 },
  { name: '其他', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export default function Home() {
  const { logout } = useContext(AuthContext);
  const { theme, toggleTheme, isDark } = useTheme();

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
              className={`flex items-center px-6 py-3 mx-4 mb-2 rounded-lg ${isDark ? 'bg-gray-700 text-blue-400' : 'bg-blue-50 text-blue-600'} font-medium`}
            >
              <i className="fa-solid fa-home w-6"></i>
              <span className="ml-2">首页</span>
            </Link>
            <Link 
              to="/students" 
              className={`flex items-center px-6 py-3 mx-4 mb-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} font-medium`}
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
            <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
            
            {/* 统计卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className={`p-6 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">总学生数</p>
                    <h3 className="text-3xl font-bold mt-1">260</h3>
                  </div>
                  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <i className="fa-solid fa-user-graduate text-xl"></i>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-green-500">
                  <i className="fa-solid fa-arrow-up mr-1"></i>
                  <span className="text-sm font-medium">12.5%</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">较上月</span>
                </div>
              </div>
              
              <div className={`p-6 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">总教师数</p>
                    <h3 className="text-3xl font-bold mt-1">45</h3>
                  </div>
                  <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                    <i className="fa-solid fa-chalkboard-user text-xl"></i>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-green-500">
                  <i className="fa-solid fa-arrow-up mr-1"></i>
                  <span className="text-sm font-medium">5.2%</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">较上月</span>
                </div>
              </div>
              
              <div className={`p-6 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">总专业数</p>
                    <h3 className="text-3xl font-bold mt-1">12</h3>
                  </div>
                  <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                    <i className="fa-solid fa-book text-xl"></i>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-gray-500 dark:text-gray-400">
                  <i className="fa-solid fa-minus mr-1"></i>
                  <span className="text-sm font-medium">0%</span>
                  <span className="text-xs ml-1">较上月</span>
                </div>
              </div>
            </div>
            
            {/* 图表区域 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 专业分布柱状图 */}
              <div className={`p-6 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className="text-lg font-semibold mb-4">专业学生分布</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={studentData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#444" : "#eee"} />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fill: isDark ? "#aaa" : "#666" }}
                        axisLine={{ stroke: isDark ? "#555" : "#ddd" }}
                      />
                      <YAxis 
                        tick={{ fill: isDark ? "#aaa" : "#666" }}
                        axisLine={{ stroke: isDark ? "#555" : "#ddd" }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: isDark ? "#333" : "#fff",
                          color: isDark ? "#fff" : "#333",
                          border: `1px solid ${isDark ? "#555" : "#ddd"}`
                        }} 
                      />
                      <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* 性别分布饼图 */}
              <div className={`p-6 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className="text-lg font-semibold mb-4">学生性别分布</h3>
                <div className="h-80 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={genderData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {genderData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: isDark ? "#333" : "#fff",
                          color: isDark ? "#fff" : "#333",
                          border: `1px solid ${isDark ? "#555" : "#ddd"}`
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            {/* 快速操作 */}
            <div className={`mt-8 p-6 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className="text-lg font-semibold mb-4">快速操作</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link 
                  to="/students" 
                  className={`p-4 rounded-lg ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-50 hover:bg-blue-100'} transition-colors flex flex-col items-center justify-center text-center`}
                >
                  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-3">
                    <i className="fa-solid fa-user-plus text-xl"></i>
                  </div>
                  <h4 className="font-medium">添加学生</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">创建新的学生记录</p>
                </Link>
                
                <Link 
                  to="/teachers" 
                  className={`p-4 rounded-lg ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-purple-50 hover:bg-purple-100'} transition-colors flex flex-col items-center justify-center text-center`}
                >
                  <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-3">
                    <i className="fa-solid fa-chalkboard-user text-xl"></i>
                  </div>
                  <h4 className="font-medium">添加教师</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">创建新的教师记录</p>
                </Link>
                
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-green-50 hover:bg-green-100'} transition-colors flex flex-col items-center justify-center text-center cursor-pointer`}>
                  <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-3">
                    <i className="fa-solid fa-file-export text-xl"></i>
                  </div>
                  <h4 className="font-medium">导出数据</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">导出学生和教师数据</p>
                </div>
                
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-yellow-50 hover:bg-yellow-100'} transition-colors flex flex-col items-center justify-center text-center cursor-pointer`}>
                  <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 mb-3">
                    <i className="fa-solid fa-cog text-xl"></i>
                  </div>
                  <h4 className="font-medium">系统设置</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">配置系统参数</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}