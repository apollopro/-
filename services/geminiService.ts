import { GoogleGenAI } from "@google/genai";
import { Player, Round } from "../types";

// Helper to check if key exists - always true as we use process.env.API_KEY
export const hasApiKey = (): boolean => {
  return true;
};

export const analyzeGame = async (players: Player[], rounds: Round[]): Promise<string> => {
  try {
    // API Key must be obtained exclusively from process.env.API_KEY
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // Format data for AI
    const scoreboard = players.map(p => `${p.name}: ${p.totalScore}`).join(', ');
    const history = rounds.map((r, i) => 
      `Round ${i+1}: ${Object.entries(r.scores).map(([pid, score]) => {
          const p = players.find(pl => pl.id === pid);
          return `${p?.name || pid}=${score}`;
      }).join(', ')}`
    ).join('\n');

    const prompt = `You are a witty and sarcastic commentator for a game of "Gong Zhu" (Chase the Pig). 
    
    Game Rules Context:
    - Pig (Q♠) = -100 points (Bad)
    - Sheep (J♦) = +100 points (Good)
    - Hearts = Negative points
    - Transformer (10♣) = Doubles score
    - Full Red / Grand Slam = Massive positive points

    Current Standings:
    ${scoreboard}

    Match History (Newest first):
    ${history}

    Please provide a brief, fun analysis:
    1. Who is eating the Pig too often?
    2. Who is the "Sheep" master?
    3. Any risky plays observed (e.g. someone trying for Grand Slam but failing)?
    4. Prediction for the winner.
    
    Keep it under 150 words. Use emojis.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text || "Could not generate analysis.";
  } catch (error) {
    console.error("Error analyzing game:", error);
    throw error;
  }
};