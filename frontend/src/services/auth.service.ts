import api from './api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
}

export const AuthService = {
  login: async (credentials: LoginCredentials): Promise<string> => {
    const response = await api.post('/auth/login', credentials);
    const { token } = response.data;
    localStorage.setItem('token', token);
    return token;
  },

  logout: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get('/auth/profile');
    const user = response.data;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },

  hasRole: (role: string): boolean => {
    const user = AuthService.getCurrentUser();
    return !!user && user.roles.includes(role);
  }
};

export default AuthService;