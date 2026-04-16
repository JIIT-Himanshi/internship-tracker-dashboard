"use client";

export const STORAGE_KEYS = {
  USERS: "interntrack_users",
  CURRENT_USER: "interntrack_current_user",
  APPLICATIONS: "interntrack_applications",
  SAVED: "interntrack_saved_opportunities",
  BULLETS: "interntrack_resume_bullets",
  PROFILE: "interntrack_profile",
};

function safeParse(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function getStorageItem(key, fallback) {
  if (typeof window === "undefined") return fallback;
  const raw = localStorage.getItem(key);
  return safeParse(raw, fallback);
}

export function setStorageItem(key, value) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeStorageItem(key) {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
}

export function generateId(prefix = "item") {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
}
