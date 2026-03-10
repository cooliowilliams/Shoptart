import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  // 🔥 Load user from localStorage on first load
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("shoptartUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // 🔥 Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("shoptartUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("shoptartUser");
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}