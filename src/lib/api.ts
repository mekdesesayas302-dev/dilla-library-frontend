// src/lib/api.ts
// Replace your old line with this one:
const API_BASE_URL = import.meta.env.VITE_API_URL || "https://dilla-library-backend.onrender.com";

export const getApiUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`;
