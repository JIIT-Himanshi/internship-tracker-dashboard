"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { STORAGE_KEYS, getStorageItem, setStorageItem } from "@/lib/storage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getStorageItem(STORAGE_KEYS.CURRENT_USER, null);
    setCurrentUser(user);
    setLoading(false);
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      loading,
      signup: ({ fullName, email, password }) => {
        const users = getStorageItem(STORAGE_KEYS.USERS, []);
        const normalized = email.toLowerCase();
        const exists = users.some((user) => user.email.toLowerCase() === normalized);

        if (exists) {
          return { ok: false, message: "Account already exists with this email" };
        }

        const newUser = {
          id: `user_${Date.now()}`,
          fullName,
          email,
          password,
        };

        const updatedUsers = [...users, newUser];
        setStorageItem(STORAGE_KEYS.USERS, updatedUsers);
        setStorageItem(STORAGE_KEYS.CURRENT_USER, newUser);
        setCurrentUser(newUser);

        return { ok: true };
      },
      login: ({ email, password }) => {
        const users = getStorageItem(STORAGE_KEYS.USERS, []);
        const normalized = email.toLowerCase();
        const user = users.find((item) => item.email.toLowerCase() === normalized);

        if (!user || user.password !== password) {
          return { ok: false, message: "Invalid email or password" };
        }

        setStorageItem(STORAGE_KEYS.CURRENT_USER, user);
        setCurrentUser(user);
        return { ok: true };
      },
      logout: () => {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
        setCurrentUser(null);
      },
    }),
    [currentUser, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
