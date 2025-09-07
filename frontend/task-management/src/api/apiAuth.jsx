import apiClient, { setToken } from "./apiClient";

// Login API
export const loginUser = async (email, password) => {
  const res = await apiClient.post("/auth/login", { email, password });
  if (res.data.token) {
    setToken(res.data.token);
  }
  return res.data;
};

// Signup API
export const signupUser = async (userData) => {
  const res = await apiClient.post("/auth/signup", userData);
  return res.data;
};

