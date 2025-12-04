// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { generateFromGemini } from "./controllers/geminiController.js";

const app = express();

// CORS: allow only the frontend origin in production.
// Set ALLOWED_ORIGIN in Render to your Vercel domain (e.g. https://your-app.vercel.app)
const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN || "*", // use "*" for quick testing; lock down in prod
};

app.use(cors(corsOptions));
app.use(express.json());

// health check
app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));

// main API route
app.post("/api/generate", generateFromGemini);

// use env PORT so render/cloudrun can bind
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
