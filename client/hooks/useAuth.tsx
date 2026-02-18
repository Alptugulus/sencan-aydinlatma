import { create } from "zustand";
import { authAPI, User, LoginCredentials, RegisterData } from "@/lib/auth";
import { toast } from "sonner";

interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  checkAuth: () => void;
}

export const useAuth = create<AuthStore>((set, get) => ({
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,

  // Check authentication on mount
  checkAuth: () => {
    const token = authAPI.getToken();
    const user = authAPI.getCurrentUser();
    
    set({
      token,
      user,
      isAuthenticated: !!token && !!user,
      isLoading: false,
    });
  },

  // Login
  login: async (credentials: LoginCredentials) => {
    try {
      set({ isLoading: true });
      const response = await authAPI.login(credentials);
      
      set({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
      });

      toast.success("Giriş başarılı!");
    } catch (error) {
      set({ isLoading: false });
      const message = error instanceof Error ? error.message : "Giriş yapılamadı";
      toast.error(message);
      throw error;
    }
  },

  // Register
  register: async (data: RegisterData) => {
    try {
      set({ isLoading: true });
      const response = await authAPI.register(data);
      
      set({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
      });

      toast.success("Kayıt başarılı! Hoş geldiniz!");
    } catch (error) {
      set({ isLoading: false });
      const message = error instanceof Error ? error.message : "Kayıt yapılamadı";
      toast.error(message);
      throw error;
    }
  },

  // Logout
  logout: () => {
    authAPI.logout();
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
    toast.success("Çıkış yapıldı");
  },

  // Update profile
  updateProfile: async (updates: Partial<User>) => {
    try {
      set({ isLoading: true });
      const updatedUser = await authAPI.updateProfile(updates);
      
      set({
        user: updatedUser,
        isLoading: false,
      });

      toast.success("Profil güncellendi");
    } catch (error) {
      set({ isLoading: false });
      const message = error instanceof Error ? error.message : "Profil güncellenemedi";
      toast.error(message);
      throw error;
    }
  },
}));

