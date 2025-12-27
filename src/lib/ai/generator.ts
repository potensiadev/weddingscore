import { GoogleGenerativeAI } from "@google/generative-ai";
import { ScoreResult } from "../scoring/types";

// Initialize Gemini API
// Note: In production, you should use a backend proxy to hide the API key.
// For this demo/MVP, we use the key from environment variables.
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "dummy");

export async function generateAiSummary(result: ScoreResult): Promise<string> {
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
        console.warn("Gemini API Key missing");
        return "AI 분석을 위해서는 API 키가 필요합니다. (기본 분석: 당신은 " + result.characterLabel + "입니다.)";
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `
      결혼 점수 테스트 결과:
      점수: ${result.score}점
      등급: ${result.tier}
      특징: ${result.characterLabel}
      강점: ${result.strengths.join(", ")}
      약점: ${result.weaknesses.join(", ")}
      
      이 사람에 대한 한 줄 결혼 시장 평가를 해줘. 냉철하지만 위트있게. 100자 이내. 반말 모드.
    `;

        const chat = await model.generateContent(prompt);
        const response = await chat.response;
        return response.text();
    } catch (error) {
        console.error("Gemini Error:", error);
        return "AI 분석 중 오류가 발생했습니다.";
    }
}
