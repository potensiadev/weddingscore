import { ScoreInput, ScoreResult } from "@/lib/scoring/types";
import { calculateScore } from "@/lib/scoring/calculator";
import { getPeerComparison, PeerComparisonData } from "@/lib/scoring/comparison";
import { supabase } from "@/lib/supabase";

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
        // Implement Supabase logging
        try {
            await supabase.from('events').insert([{
                event_name,
                event_data,
                created_at: new Date().toISOString()
            }]);
        } catch (e) {
            console.error("Failed to log event:", e);
        }
    },

    submitMatchInterest: async (data: { score: number; gender: string; email?: string; name?: string }) => {
        console.log("Submitting Match Interest:", data);

        const { error } = await supabase
            .from('match_interest')
            .insert([{
                ...data,
                created_at: new Date().toISOString()
            }]);

        if (error) {
            console.error("Error saving match interest:", error);
            throw error;
        }

        return { success: true };
    }
};
