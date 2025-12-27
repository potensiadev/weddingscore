import { GoogleGenerativeAI } from "@google/generative-ai";
import { ScoreInput, ScoreResult } from "../scoring/types";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "dummy");

export async function generateAiSummary(input: ScoreInput, result: ScoreResult): Promise<string> {
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
        console.warn("Gemini API Key missing");
        return "AI 분석을 위해서는 API 키가 필요합니다. (기본 분석: 당신은 " + result.characterLabel + "입니다.)";
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
            당신은 대한민국 최고의 결혼정보회사(결정사) 베테랑 커플 매니저입니다.
            사용자의 데이터를 바탕으로 현실적인 결혼 시장 위치를 분석하고, 뼈 때리는 조언을 해주세요.

            [사용자 데이터]
            - 성별: ${input.gender === 'male' ? '남성' : '여성'}
            - 연봉: ${input.salary}구간 (0-6)
            - 직업: ${input.job}
            - 학력: ${input.education} (${input.university})
            - 자산: 자가(${input.homeOwnership ? '있음' : '없음'}), 차량(${input.carOwnership ? input.carType : '없음'})
            - 거주지: ${input.region}
            - 점수: ${result.score}점 (${result.tier} 등급)
            - 특징: ${result.characterLabel}

            [요청사항]
            1. 결혼정보회사 기준에서 이 사람의 현실적인 위치를 분석할 것.
            2. 위트있지만 현실은 냉정하게, 뼈 때리는 조언을 포함할 것.
            3. 반드시 '딱 2줄'로만 작성할 것. (한 줄당 50자 내외)
            4. 반말 모드로 친근하면서도 권위 있게 말할 것.
        `;

        const chat = await model.generateContent(prompt);
        const response = await chat.response;
        return response.text().trim();
    } catch (error) {
        console.error("Gemini Error:", error);
        return "AI 분석 중 오류가 발생했습니다. (잠시 후 다시 시도해주세요)";
    }
}
