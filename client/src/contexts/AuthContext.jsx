import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(authService.getCurrentUser());

  const login = async (data) => {
    const res = await authService.login(data);
    setUser(res.user);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  useEffect(() => {
    const storedUser = authService.getCurrentUser();
    if (storedUser) setUser(storedUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
