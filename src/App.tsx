import { Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import StudentManagement from "@/pages/StudentManagement";
import TeacherManagement from "@/pages/TeacherManagement";
import { useState, useEffect } from "react";
import { AuthContext } from '@/contexts/authContext';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 检查本地存储中是否有token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  // 受保护的路由组件
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/students" 
          element={
            <ProtectedRoute>
              <StudentManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/teachers" 
          element={
            <ProtectedRoute>
              <TeacherManagement />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </AuthContext.Provider>
  );
}
