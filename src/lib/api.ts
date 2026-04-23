// src/lib/api.ts
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const getApiUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`;
