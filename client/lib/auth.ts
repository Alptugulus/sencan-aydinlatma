// Auth API Mock - Production'da gerçek API ile değiştirilecek

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: {
    full: string;
    city: string;
    postalCode: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Mock users (localStorage'da saklanacak)
const MOCK_USERS_KEY = "sencan_mock_users";
const AUTH_TOKEN_KEY = "sencan_auth_token";
const AUTH_USER_KEY = "sencan_auth_user";

// Initialize mock users
const initializeMockUsers = () => {
  if (typeof window === "undefined") return;
  
  const existing = localStorage.getItem(MOCK_USERS_KEY);
  if (!existing) {
    // Demo user
    const demoUsers = [
      {
        id: "1",
        email: "demo@sencan.com",
        password: "demo123", // Production'da hash'lenmiş olmalı
        name: "Demo Kullanıcı",
        phone: "0532 642 4816",
      },
    ];
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(demoUsers));
  }
};

// Get mock users
const getMockUsers = (): Array<{ id: string; email: string; password: string; name: string; phone?: string }> => {
  if (typeof window === "undefined") return [];
  const users = localStorage.getItem(MOCK_USERS_KEY);
  return users ? JSON.parse(users) : [];
};

// Save mock user
const saveMockUser = (userData: RegisterData) => {
  const users = getMockUsers();
  const newUser = {
    id: Date.now().toString(),
    email: userData.email,
    password: userData.password, // Production'da hash'lenmiş olmalı
    name: userData.name,
    phone: userData.phone,
  };
  users.push(newUser);
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
  return newUser;
};

// Auth API Functions
export const authAPI = {
  // Initialize
  init: () => {
    if (typeof window !== "undefined") {
      initializeMockUsers();
    }
  },

  // Login
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getMockUsers();
        const user = users.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        );

        if (user) {
          const { password, ...userWithoutPassword } = user;
          const token = `mock_token_${Date.now()}_${user.id}`;
          
          // Save to localStorage
          localStorage.setItem(AUTH_TOKEN_KEY, token);
          localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userWithoutPassword));

          resolve({
            user: userWithoutPassword as User,
            token,
          });
        } else {
          reject(new Error("E-posta veya şifre hatalı"));
        }
      }, 500); // Simulate API delay
    });
  },

  // Register
  register: async (data: RegisterData): Promise<AuthResponse> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getMockUsers();
        
        // Check if user exists
        if (users.some((u) => u.email === data.email)) {
          reject(new Error("Bu e-posta adresi zaten kullanılıyor"));
          return;
        }

        // Check password match
        if (data.password !== data.confirmPassword) {
          reject(new Error("Şifreler eşleşmiyor"));
          return;
        }

        // Create user
        const newUser = saveMockUser(data);
        const { password, ...userWithoutPassword } = newUser;
        const token = `mock_token_${Date.now()}_${newUser.id}`;

        // Save to localStorage
        localStorage.setItem(AUTH_TOKEN_KEY, token);
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userWithoutPassword));

        resolve({
          user: userWithoutPassword as User,
          token,
        });
      }, 500);
    });
  },

  // Logout
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    }
  },

  // Get current user from localStorage
  getCurrentUser: (): User | null => {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem(AUTH_USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },

  // Get token from localStorage
  getToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!authAPI.getToken() && !!authAPI.getCurrentUser();
  },

  // Update user profile
  updateProfile: async (updates: Partial<User>): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentUser = authAPI.getCurrentUser();
        if (!currentUser) {
          throw new Error("Kullanıcı bulunamadı");
        }

        const updatedUser = { ...currentUser, ...updates };
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(updatedUser));
        resolve(updatedUser);
      }, 300);
    });
  },
};

// Initialize on module load
if (typeof window !== "undefined") {
  authAPI.init();
}

