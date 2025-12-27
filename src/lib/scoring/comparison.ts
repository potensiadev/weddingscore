export interface PeerComparisonData {
    score_band: string;
    gender: 'male' | 'female';
    avg_salary: number;
    job_top3: { label: string; percent: number }[];
    education: {
        four_year_plus: number;
        graduate_plus: number;
    };
    university: {
        sky_sungsuhang: number;
        other_seoul: number;
    };
    assets: {
        home_ownership: number;
        car_ownership: number;
        car_type: {
            foreign: number;
            domestic: number;
        };
    };
    region: {
        metro_area: number;
    };
    notice: string;
}

/**
 * Seeded pseudo-random number generator (LCG)
 * Ensures deterministic output based on a string seed.
 */
class SeededRandom {
    private seed: number;
    constructor(seedStr: string) {
        let hash = 0;
        for (let i = 0; i < seedStr.length; i++) {
            hash = ((hash << 5) - hash) + seedStr.charCodeAt(i);
            hash |= 0;
        }
        this.seed = hash;
    }

    next(): number {
        this.seed = (this.seed * 1664525 + 1013904223) % 4294967296;
        return (this.seed >>> 0) / 4294967296;
    }

    between(min: number, max: number): number {
        return Math.floor(this.next() * (max - min + 1) + min);
    }
}

export function getPeerComparison(score: number, gender: 'male' | 'female'): PeerComparisonData {
    const targetGender = gender === 'male' ? 'female' : 'male';
    const scoreLower = Math.max(0, score - 3);
    const scoreUpper = Math.min(100, score + 3);
    const scoreBand = `${scoreLower}–${scoreUpper}`;

    // Deterministic seed: gender + band
    const rng = new SeededRandom(`${targetGender}-${scoreBand}`);

    // Base factor (0.0 to 1.0) based on score
    const scoreFactor = score / 100;

    // 1. Average Salary (45M - 90M KRW)
    // Scaled by score factor (with some deterministic randomness)
    const salaryBase = 45000000 + (scoreFactor * 40000000);
    const avg_salary = Math.floor((salaryBase * (0.95 + rng.next() * 0.1)) / 10000) * 10000;

    // 2. Job Top 3 (Deterministic based on gender and score)
    const maleJobs = ['대기업', '전문직', '공기업', 'IT/기술직', '금융권'];
    const femaleJobs = ['대기업', '전문직', '교사/공무원', '금융권', '디자인/예술'];
    const jobPool = targetGender === 'male' ? maleJobs : femaleJobs;

    // Shuffle partially using rng
    const shuffledJobs = [...jobPool].sort(() => rng.next() - 0.5);
    const job_top3 = [
        { label: shuffledJobs[0], percent: rng.between(20, 30) },
        { label: shuffledJobs[1], percent: rng.between(15, 25) },
        { label: shuffledJobs[2], percent: rng.between(10, 20) }
    ];

    // 3. Education (55% - 85%)
    const fourYearBase = 55 + (scoreFactor * 25);
    const four_year_plus = Math.min(85, Math.floor(fourYearBase + rng.next() * 10));
    const graduate_plus = Math.floor(four_year_plus * (0.1 + (scoreFactor * 0.3) + rng.next() * 0.1));

    // 4. University
    const skyBase = 5 + (scoreFactor * 40);
    const sky_sungsuhang = Math.min(60, Math.floor(skyBase + rng.next() * 10));
    const other_seoul = Math.floor((100 - sky_sungsuhang) * (0.2 + rng.next() * 0.2));

    // 5. Assets
    const homeBase = 15 + (scoreFactor * 35);
    const home_ownership = Math.min(55, Math.floor(homeBase + rng.next() * 10));

    const carBase = 35 + (scoreFactor * 40);
    const car_ownership = Math.min(80, Math.floor(carBase + rng.next() * 10));

    const foreignCarSharePercent = rng.between(10, 35); // Percent of car owners
    const foreign = Math.floor(car_ownership * (foreignCarSharePercent / 100));
    const domestic = car_ownership - foreign;

    // 6. Region
    const metro_area = rng.between(60, 90);

    return {
        score_band: scoreBand,
        gender: targetGender,
        avg_salary,
        job_top3,
        education: {
            four_year_plus,
            graduate_plus
        },
        university: {
            sky_sungsuhang,
            other_seoul
        },
        assets: {
            home_ownership,
            car_ownership,
            car_type: {
                foreign,
                domestic
            }
        },
        region: {
            metro_area
        },
        notice: "모든 수치는 통계 시뮬레이션입니다."
    };
}
