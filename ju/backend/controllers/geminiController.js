// backend/controllers/geminiController.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn("Warning: GEMINI_API_KEY is not set in environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);

export const generateFromGemini = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // choose model (flash/pro)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // recommended usage: pass prompt (SDK variations exist; keep this style)
    // note: some SDK versions accept generateContent({ contents: [...] }) — either is OK.
    const result = await model.generateContent(prompt);

    // Use the stable helper to get text (fallbacks in case structure varies)
    let text = "";
    try {
      if (result?.response?.text) {
        // if SDK offers text() method or response.text fallback
        text = typeof result.response.text === "function"
          ? result.response.text()
          : result.response.text;
      } else if (result?.response?.candidates?.[0]?.content?.parts?.[0]?.text) {
        text = result.response.candidates[0].content.parts[0].text;
      } else if (result?.candidates?.[0]?.output?.text) {
        text = result.candidates[0].output.text;
      } else {
        text = JSON.stringify(result).slice(0, 1000); // fallback - short debug string
      }
    } catch (e) {
      console.warn("Failed to parse Gemini response, returning raw response:", e);
      text = JSON.stringify(result).slice(0, 1000);
    }

    return res.json({ output: text });

  } catch (error) {
    console.error("Gemini 2.0 API Error:", error);
    return res.status(500).json({ error: "Failed to generate response from Gemini" });
  }
};
