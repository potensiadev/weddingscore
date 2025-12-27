export function getTier(score: number): string {
    if (score >= 96) return 'S+';
    if (score >= 91) return 'S';
    if (score >= 86) return 'A+';
    if (score >= 81) return 'A';
    if (score >= 76) return 'A-';
    if (score >= 71) return 'B+';
    if (score >= 66) return 'B';
    if (score >= 61) return 'B-';
    if (score >= 51) return 'C';
    return 'D';
}

export function getCharacterLabel(score: number, gender: 'male' | 'female'): string {
    if (score >= 96) return '결정사 프리패스! 전설의 천상계';
    if (score >= 91) return '상위 1% 압도적 다이아몬드';
    if (score >= 86) return '모든 걸 다 갖춘 육각형 완성형';
    if (score >= 81) return '상위권 1등 ' + (gender === 'male' ? '신랑' : '신부') + '감';
    if (score >= 76) return '현실판 ' + (gender === 'male' ? '엄친아' : '엄친딸') + '의 정석';
    if (score >= 71) return '매력 터지는 훈' + (gender === 'male' ? '남' : '녀') + '의 표본';
    if (score >= 66) return '안정적이고 탄탄한 표준형';
    if (score >= 61) return '알고 보면 진국, 평범함 속의 보석';
    if (score >= 51) return '가공하면 빛날 가능성 가득한 원석';
    return '자신만의 길을 걷는 자유로운 영혼';
}
