import { createContext, useState, useEffect } from "react";
import { getToken, setToken, clearToken } from "../api/apiClient"; // ✅ central token helpers

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on startup
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (data) => {
    // assuming backend returns { token, user: { name, email, role } }
    setUser(data.user);
    setToken(data.token); // ✅ save token
    localStorage.setItem("user", JSON.stringify(data.user));
  };

  const logout = () => {
    setUser(null);
    clearToken(); // ✅ remove token
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null, // ✅ expose role
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
