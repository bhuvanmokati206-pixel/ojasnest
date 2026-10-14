import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem('ojas_user') || 'null'),
  token: localStorage.getItem('ojas_token'),
  setAuth: (user, token) => {
    localStorage.setItem('ojas_user', JSON.stringify(user));
    localStorage.setItem('ojas_token', token);
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem('ojas_user');
    localStorage.removeItem('ojas_token');
    set({ user: null, token: null });
  },
}));