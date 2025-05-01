import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();
  
  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };
  
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">CheckUS</Link>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">홈</Link>
          </li>
          {user ? (
            <>
              {AuthService.hasRole('ADMIN') && (
                <li>
                  <Link to="/admin">관리자</Link>
                </li>
              )}
              {AuthService.hasRole('TEACHER') && (
                <li>
                  <Link to="/teacher">교사</Link>
                </li>
              )}
              {AuthService.hasRole('STUDENT') && (
                <li>
                  <Link to="/student">학생</Link>
                </li>
              )}
              {AuthService.hasRole('GUARDIAN') && (
                <li>
                  <Link to="/guardian">보호자</Link>
                </li>
              )}
              <li>
                <Link to="/profile">내 정보</Link>
              </li>
              <li>
                <button onClick={handleLogout}>로그아웃</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">로그인</Link>
              </li>
              <li>
                <Link to="/register">회원가입</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;