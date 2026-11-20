import { createContext, ReactNode, useContext, useState } from "react";
import {
  AuthContextType,
  AuthResponse,
  LoginCredentials,
  RegisterData,
  User,
} from "../types";
import { authService } from "../services/auth.service";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() =>
    authService.getCurrentUser(),
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    authService.isAuthenticated(),
  );

  const login = async (
    credentials: LoginCredentials,
  ): Promise<AuthResponse> => {
    const response = await authService.login(credentials);

    setUser(authService.getCurrentUser());
    setIsAuthenticated(authService.isAuthenticated());

    return response;
  };

  const register = async (data: RegisterData): Promise<AuthResponse> => {
    const response = await authService.register(data);

    setUser(authService.getCurrentUser());
    setIsAuthenticated(authService.isAuthenticated());

    return response;
  };

  const logout = (): void => {
    authService.logout();

    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }

  return context;
}
