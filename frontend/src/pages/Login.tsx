import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Simple validation
    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    
    try {
      setLoading(true);
      await AuthService.login({ email, password });
      const user = await AuthService.getProfile();
      
      // Redirect based on user role
      if (user.roles.includes('ADMIN')) {
        navigate('/admin');
      } else if (user.roles.includes('TEACHER')) {
        navigate('/teacher');
      } else if (user.roles.includes('STUDENT')) {
        navigate('/student');
      } else if (user.roles.includes('GUARDIAN')) {
        navigate('/guardian');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || '로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="login-container">
      <h2>로그인</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? '로그인 중...' : '로그인'}
        </button>
      </form>
    </div>
  );
};

export default Login;