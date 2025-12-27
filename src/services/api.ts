import { ScoreInput, ScoreResult } from "@/lib/scoring/types";
import { calculateScore } from "@/lib/scoring/calculator";
export const api = {
    submitScore: async (input: ScoreInput): Promise<ScoreResult> => {
        // 1. Calculate Score (Deterministic)
        const result = calculateScore(input);

        return result;
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
