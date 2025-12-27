export const SALARY_POINTS = [5, 10, 15, 20, 25, 30, 35]; // 0-6 buckets

export const JOB_POINTS: Record<string, number> = {
    'professional': 25,
    'large_corp': 22,
    'public': 20,
    'mid_corp': 18,
    'sme': 15,
    'freelance': 12,
    'other': 10
};

export const EDU_POINTS: Record<string, number> = {
    'phd': 20,
    'master': 18,
    'bachelor': 15,
    'college': 12,
    'highschool': 10
};

export const UNI_POINTS: Record<string, number> = {
    'top_tier': 5, // SKY etc
    'seoul_major': 4,
    'seoul_other': 3,
    'regional_national': 3,
    'regional_private': 2,
    'other': 1
};

export const ASSET_POINTS = {
    HOME: 15,
    CAR: 5,
    CAR_TYPE_FOREIGN: 1,
    CAR_TYPE_DOMESTIC: 0,
    MAX: 20
};

export const REGION_POINTS: Record<string, number> = {
    'gangnam': 10,
    'seoul_favored': 9,
    'seoul_other': 8,
    'gyeonggi_new': 7,
    'metropolitan': 6,
    'other': 5
};
