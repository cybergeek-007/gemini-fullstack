// backend/controllers/geminiController.js
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export const generateFromGemini = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const response = await client.responses.create({
      model: "openai/gpt-oss-20b",
      input: prompt,
    });

    const text = response.output_text;

    return res.json({ output: text });

  } catch (error) {
    console.error("Groq API Error:", error);
    return res.status(500).json({ error: "Failed to generate response" });
  }
};
