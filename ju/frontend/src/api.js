// frontend/src/api.js
import axios from "axios";

// Vite env vars must start with VITE_
// Set VITE_BACKEND_URL to your backend URL in Vercel env (e.g. https://your-backend.onrender.com)
// If not set, fallback to empty string (so relative URL is used).
const BASE = import.meta.env.VITE_BACKEND_URL || "";

export const generate = async (prompt) => {
  const url = `${BASE}/api/generate`;
  const res = await axios.post(url, { prompt });
  return res.data.output;
};
