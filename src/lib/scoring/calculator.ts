import { ScoreInput, ScoreResult } from './types';
import { SALARY_POINTS, JOB_POINTS, EDU_POINTS, UNI_POINTS, ASSET_POINTS, REGION_POINTS } from './constants';
import { getTier, getCharacterLabel } from './tiers';

export function calculateScore(input: ScoreInput): ScoreResult {
    const salaryScore = SALARY_POINTS[input.salary] || 5;
    const jobScore = JOB_POINTS[input.job] || 10;

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

    let totalScore = salaryScore + jobScore + eduScore + assetScore + regionScore;
    totalScore = Math.max(0, Math.min(100, totalScore));

    const tier = getTier(totalScore);
    const characterLabel = getCharacterLabel(totalScore, input.gender);

    const MAX_SCORES = {
        salary: 25,
        job: 25,
        education: 20,
        assets: 20,
        region: 10
    };

    const ratios = [
        { category: 'salary', ratio: salaryScore / MAX_SCORES.salary, label: '연봉' },
        { category: 'job', ratio: jobScore / MAX_SCORES.job, label: '직업' },
        { category: 'education', ratio: eduScore / MAX_SCORES.education, label: '학력' },
        { category: 'assets', ratio: assetScore / MAX_SCORES.assets, label: '자산' },
        { category: 'region', ratio: regionScore / MAX_SCORES.region, label: '거주지' }
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
            education: eduScore,
            assets: assetScore,
            region: regionScore
        },
        strengths,
        weaknesses
    };
}
