export interface ScoreInput {
    salary: number; // 0-6 (bucket index)
    job: string; // job type key
    education: string; // education level key
    university: string; // university tier key
    homeOwnership: boolean;
    carOwnership: boolean;
    carType: '외제차' | '국산차' | null;
    region: string; // region key
    age: string; // age range key
    gender: 'male' | 'female';
}

export interface ScoreResult {
    score: number;
    tier: string;
    characterLabel: string;
    breakdown: {
        salary: number;
        job: number;
        age: number;
        education: number;
        assets: number;
        region: number;
    };
    strengths: string[];
    weaknesses: string[];
}
