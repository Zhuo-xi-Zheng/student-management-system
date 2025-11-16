import { useState, useContext } from 'react';
import { AuthContext } from '@/contexts/authContext';
import { useTheme } from '@/hooks/useTheme';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function Login() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const { theme, toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error('请输入用户名和密码');
      return;
    }

    setLoading(true);

    // 模拟登录请求（实际应用中应该调用API）
    setTimeout(() => {
      // 使用mock数据进行验证
       // 使用mock数据进行验证
       if (username === 'admin' && password === '123456') {
         setIsAuthenticated(true);
         // 在实际应用中，这里应该存储从服务器返回的JWT token
         localStorage.setItem('token', 'mock-jwt-token');
        toast.success('登录成功');
        navigate('/');
      } else {
        toast.error('用户名或密码错误');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className={`w-full max-w-md p-8 rounded-2xl shadow-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold flex items-center">
            <i className="fa-solid fa-graduation-cap mr-2 text-blue-500"></i>
            学生管理系统
          </h1>
          <button 
            onClick={toggleTheme} 
            className={`p-2 rounded-full ${isDark ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-700'}`}
            aria-label={isDark ? '切换到亮色模式' : '切换到暗色模式'}
          >
            {isDark ? <i className="fa-solid fa-sun"></i> : <i className="fa-solid fa-moon"></i>}
          </button>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium">用户名</label>
            <div className="relative">
              <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <i className="fa-solid fa-user"></i>
              </div>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`block w-full pl-10 pr-3 py-3 rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                placeholder="请输入用户名"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">密码</label>
            <div className="relative">
              <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <i className="fa-solid fa-lock"></i>
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`block w-full pl-10 pr-3 py-3 rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                placeholder="请输入密码"
                required
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className={`h-4 w-4 rounded ${isDark ? 'bg-gray-700 border-gray-600 text-blue-500' : 'bg-gray-50 border-gray-200 text-blue-500'} focus:ring-blue-500`}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-500 dark:text-gray-400">
                记住我
              </label>
            </div>
            
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                忘记密码?
              </a>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium ${
              loading 
                ? 'bg-blue-400 text-white cursor-not-allowed' 
                : 'bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            } transition-all`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                登录中...
              </>
            ) : (
              <>
                <i className="fa-solid fa-right-to-bracket mr-2"></i>
                登录
              </>
            )}
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            还没有账号? <a href="#" className="font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">联系管理员</a>
          </p>
        </div>
        
        <div className={`mt-8 pt-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="text-center text-xs text-gray-500 dark:text-gray-400">
            <p>&copy; 2025 学生管理系统. 保留所有权利.</p>
            <p className="mt-1">使用React+TypeScript+Tailwind CSS构建</p>
          </div>
        </div>
      </div>
    </div>
  );
}