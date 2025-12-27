import { ScoreInput, ScoreResult } from './types';
import { SALARY_POINTS, JOB_POINTS, AGE_POINTS, EDU_POINTS, UNI_POINTS, ASSET_POINTS, REGION_POINTS } from './constants';
import { getTier, getCharacterLabel } from './tiers';

export function calculateScore(input: ScoreInput): ScoreResult {
    const salaryScore = SALARY_POINTS[input.salary] || 5;
    const jobScore = JOB_POINTS[input.job] || 10;
    const ageScore = (AGE_POINTS[input.gender] && AGE_POINTS[input.gender][input.age]) || 1;

    let eduScore = EDU_POINTS[input.education] || 10;
    if (['phd', 'master', 'bachelor'].includes(input.education)) {
        eduScore += UNI_POINTS[input.university] || 1;
    }

    let assetScore = 0;
    if (input.homeOwnership) assetScore += ASSET_POINTS.HOME;
    if (input.carOwnership) {
        assetScore += ASSET_POINTS.CAR;
        if (input.carType === '외제차') assetScore += ASSET_POINTS.CAR_TYPE_FOREIGN;
    }
    assetScore = Math.min(assetScore, ASSET_POINTS.MAX);

    const regionScore = REGION_POINTS[input.region] || 5;

    let totalScore = salaryScore + jobScore + ageScore + eduScore + assetScore + regionScore;
    totalScore = Math.max(0, Math.min(100, totalScore));

    const tier = getTier(totalScore);
    const characterLabel = getCharacterLabel(totalScore, input.gender);

    const MAX_SCORES = {
        salary: 35,
        job: 25,
        age: 30,
        education: 25,
        assets: 20,
        region: 10
    };

    const ratios = [
        { category: 'salary', ratio: Math.min(1, salaryScore / MAX_SCORES.salary), label: '연봉' },
        { category: 'job', ratio: Math.min(1, jobScore / MAX_SCORES.job), label: '직업' },
        { category: 'age', ratio: Math.min(1, ageScore / MAX_SCORES.age), label: '나이' },
        { category: 'education', ratio: Math.min(1, eduScore / MAX_SCORES.education), label: '학력' },
        { category: 'assets', ratio: Math.min(1, assetScore / MAX_SCORES.assets), label: '자산' },
        { category: 'region', ratio: Math.min(1, regionScore / MAX_SCORES.region), label: '거주지' }
    ];

    ratios.sort((a, b) => b.ratio - a.ratio);

    let strengths: string[] = [];
    let weaknesses: string[] = [];

    const maxRatio = ratios[0].ratio;
    const minRatio = ratios[ratios.length - 1].ratio;

    if (maxRatio - minRatio < 0.10) {
        strengths = ["전반적으로 균형형"];
        weaknesses = [];
    } else {
        strengths = ratios.slice(0, 2).map(r => r.label);
        weaknesses = ratios.slice(-2).reverse().map(r => r.label);
    }

    return {
        score: totalScore,
        tier,
        characterLabel,
        breakdown: {
            salary: salaryScore,
            job: jobScore,
            age: ageScore,
            education: eduScore,
            assets: assetScore,
            region: regionScore
        },
        strengths,
        weaknesses
    };
}
