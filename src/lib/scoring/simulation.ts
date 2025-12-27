export interface SimulationStats {
    salaryMean: number;
    jobTop3: { jobType: string; percent: number }[];
    educationDist: { uni4yrPlus: number; gradPlus: number };
    universityDist: { skySungsuhang: number; otherSeoul: number };
    homeOwnershipRate: number;
    carOwnershipRate: number;
    carTypeDist: { foreign: number; domestic: number };
}

export function getSimulationStats(score: number, gender: 'male' | 'female'): SimulationStats {
    const seed = score * (gender === 'male' ? 1.1 : 1.0);

    const rand = (n: number) => {
        const x = Math.sin(seed + n) * 10000;
        return x - Math.floor(x);
    };

    const baseSalary = 3000 + (score * 100);
    const salaryMean = Math.floor(baseSalary * (0.9 + rand(1) * 0.2)) * 10000;

    return {
        salaryMean,
        jobTop3: [
            { jobType: '대기업', percent: Math.floor(20 + rand(2) * 20) },
            { jobType: '전문직', percent: Math.floor(10 + rand(3) * 10) },
            { jobType: '공기업', percent: Math.floor(10 + rand(4) * 10) }
        ],
        educationDist: {
            uni4yrPlus: Math.floor(60 + rand(5) * 30),
            gradPlus: Math.floor(10 + rand(6) * 20)
        },
        universityDist: {
            skySungsuhang: Math.floor(10 + rand(7) * 30),
            otherSeoul: Math.floor(20 + rand(8) * 20)
        },
        homeOwnershipRate: Math.floor(10 + rand(9) * 50),
        carOwnershipRate: Math.floor(30 + rand(10) * 60),
        carTypeDist: {
            foreign: Math.floor(10 + rand(11) * 30),
            domestic: Math.floor(40 + rand(12) * 40)
        }
    };
}
