import React from 'react';
import { Route, BrowserRouter as Router, Routes, Navigate, useLocation } from 'react-router-dom';
import Header from './component/Header';
import Keyword from './page/Keyword';
import User from './page/User';
import Email from './page/Email';
import AppInfo from './page/AppInfo';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './page/Login';

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation();
  const isLoggedIn = sessionStorage.getItem('token'); // Kiểm tra token trong sessionStorage

  // Tạo một component để bảo vệ các route
  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) {
      // Chuyển hướng về login nếu không có token
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
  };

  return (
    <>
      {isLoggedIn && location.pathname !== '/login' && <Header />}
      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/keyword" element={<ProtectedRoute><Keyword /></ProtectedRoute>} />
        <Route path="/user" element={<ProtectedRoute><User /></ProtectedRoute>} />
        <Route path="/email" element={<ProtectedRoute><Email /></ProtectedRoute>} />
        <Route path="/appinfo" element={<ProtectedRoute><AppInfo /></ProtectedRoute>} />
        <Route path="/" element={<ProtectedRoute><Keyword /></ProtectedRoute>} />
      </Routes>
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;