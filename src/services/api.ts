import { ScoreInput, ScoreResult } from "@/lib/scoring/types";
import { calculateScore } from "@/lib/scoring/calculator";
import { generateAiSummary } from "@/lib/ai/generator";
import { getSimulationStats, SimulationStats } from "@/lib/scoring/simulation";

export const api = {
    submitScore: async (input: ScoreInput): Promise<ScoreResult & { ai_summary: string }> => {
        // 1. Calculate Score (Deterministic)
        const result = calculateScore(input);

        // 2. Generate AI Summary
        const ai_summary = await generateAiSummary(result);

        return { ...result, ai_summary };
    },

    getCompareStats: async (score: number, gender: 'male' | 'female'): Promise<SimulationStats> => {
        return getSimulationStats(score, gender);
    },

    logEvent: async (event_name: string, event_data?: any) => {
        console.log("Event:", event_name, event_data);
        // TODO: Implement Supabase logging
    },

    submitMatchInterest: async (data: { score: number; gender: string; email?: string }) => {
        console.log("Match Interest:", data);
        // TODO: Implement Supabase logging
    }
};
