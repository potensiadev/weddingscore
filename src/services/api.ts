import { ScoreInput, ScoreResult } from "@/lib/scoring/types";
import { calculateScore } from "@/lib/scoring/calculator";
import { getPeerComparison, PeerComparisonData } from "@/lib/scoring/comparison";

export const api = {
    submitScore: async (input: ScoreInput): Promise<ScoreResult> => {
        // 1. Calculate Score (Deterministic)
        const result = calculateScore(input);

        return result;
    },

    /**
     * Peer Comparison - Opposite Gender
     * Returns deterministic simulated statistics for the opposite gender
     * based on the provided score.
     */
    getCompareData: async (score: number, gender: 'male' | 'female'): Promise<PeerComparisonData> => {
        // Artificial delay for better UX feel
        await new Promise(resolve => setTimeout(resolve, 500));
        return getPeerComparison(score, gender);
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
