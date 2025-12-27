export function getTier(score: number): string {
    if (score >= 95) return 'S';
    if (score >= 90) return 'A+';
    if (score >= 85) return 'A';
    if (score >= 80) return 'A-';
    if (score >= 70) return 'B+';
    if (score >= 60) return 'B';
    if (score >= 50) return 'C';
    return 'D';
}

export function getCharacterLabel(score: number, gender: 'male' | 'female'): string {
    if (score >= 90) return '상위 1% 다이아몬드';
    if (score >= 80) return '경쟁 가능한 상위 안정권';
    if (score >= 70) return '노력하면 가능한 잠재력';
    return '현실적인 전략이 필요한 단계';
}
