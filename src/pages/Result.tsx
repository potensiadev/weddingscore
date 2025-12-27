import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MobileContainer } from "@/components/MobileContainer";
import { Header } from "@/components/Header";
import { ChatBubble } from "@/components/ChatBubble";
import { ScoreResult } from "@/lib/scoring/types";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer
} from "recharts";

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state?.result as (ScoreResult & { ai_summary: string }) | undefined;
  const input = location.state?.input;

  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    if (result?.score) {
      let start = 0;
      const end = result.score;
      const duration = 1500;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayScore(end);
          clearInterval(timer);
        } else {
          setDisplayScore(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [result?.score]);

  const handleComparisonTier = () => {
    navigate("/comparison", { state: { score: result?.score, gender: input?.gender } });
  };

  const handleRealisticMatch = () => {
    navigate("/comparison", { state: { score: result?.score, gender: input?.gender } });
  };

  if (!result) {
    return (
      <MobileContainer>
        <Header title="연애·결혼 시장 테스트" />
        <main className="flex-1 px-4 py-6 flex flex-col gap-3 overflow-y-auto">
          <p>결과를 찾을 수 없습니다.</p>
          <button onClick={() => navigate("/")} className="text-primary">다시 하기</button>
        </main>
      </MobileContainer>
    );
  }

  const chartData = [
    { subject: '연봉', A: result.breakdown.salary, fullMark: 35 },
    { subject: '직업', A: result.breakdown.job, fullMark: 25 },
    { subject: '나이', A: result.breakdown.age, fullMark: 30 },
    { subject: '학력', A: result.breakdown.education, fullMark: 25 },
    { subject: '자산', A: result.breakdown.assets, fullMark: 20 },
    { subject: '거주지', A: result.breakdown.region, fullMark: 10 },
  ];

  return (
    <MobileContainer>
      <Header title="연애·결혼 시장 테스트" />

      <main className="flex-1 px-4 py-6 flex flex-col gap-5 overflow-y-auto">
        {/* Result summary bubble */}
        <div className="flex justify-start">
          <div className="w-full bg-card rounded-2xl px-6 py-6 shadow-sm chat-appear border border-border/50">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">당신의 결혼 시장 점수</p>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-primary tracking-tighter">{displayScore}</span>
                <span className="text-xl font-bold text-muted-foreground">점</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="px-3 py-1 bg-primary/10 text-primary text-lg rounded-full font-black">
                  {result.tier} TIER
                </span>
              </div>
            </div>
            <p className="text-lg font-bold text-card-foreground leading-tight">{result.characterLabel}</p>
          </div>
        </div>

        {/* Radar Chart Breakdown */}
        <div className="bg-card rounded-2xl p-4 shadow-sm chat-appear border border-border/50" style={{ animationDelay: "150ms" }}>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">상세 분석 리포트</p>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} />
                <Radar
                  name="Score"
                  dataKey="A"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="flex flex-col gap-3 chat-appear" style={{ animationDelay: "300ms" }}>
          <div className="flex flex-wrap gap-2">
            {result.strengths.map((s, i) => (
              <span key={i} className="px-3 py-1.5 bg-green-500/10 text-green-600 text-xs font-bold rounded-lg border border-green-500/20">
                # 강점: {s}
              </span>
            ))}
            {result.weaknesses.map((w, i) => (
              <span key={i} className="px-3 py-1.5 bg-red-500/10 text-red-600 text-xs font-bold rounded-lg border border-red-500/20">
                # 보완: {w}
              </span>
            ))}
          </div>
        </div>

        {/* AI Interpretation bubble */}
        <div className="flex justify-start chat-appear" style={{ animationDelay: "450ms" }}>
          <div className="w-full bg-primary/5 rounded-2xl px-5 py-4 border border-primary/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
            <p className="text-xs font-bold text-primary mb-2 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              AI 한 줄 코멘트
            </p>
            <p className="text-[15px] text-card-foreground font-medium leading-relaxed whitespace-pre-wrap italic">
              "{result.ai_summary}"
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-[11px] text-muted-foreground/60 text-center px-4 chat-appear" style={{ animationDelay: "600ms" }}>
          * 본 결과는 통계적 시뮬레이션에 기반한 참고용이며, 실제 결혼 시장의 가치는 수치화될 수 없는 다양한 매력 요소에 의해 결정됩니다.
        </p>

        {/* CTA bubbles */}
        <div className="mt-2 flex flex-col gap-3 pb-8">
          <button
            onClick={handleComparisonTier}
            className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-[15px] shadow-lg shadow-primary/20 active:scale-[0.98] transition-transform chat-appear"
            style={{ animationDelay: "800ms" }}
          >
            나와 비슷한 이성 스펙 확인하기
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full py-4 bg-secondary text-secondary-foreground rounded-2xl font-bold text-[15px] active:scale-[0.98] transition-transform chat-appear"
            style={{ animationDelay: "1000ms" }}
          >
            테스트 다시 하기
          </button>
        </div>
      </main>
    </MobileContainer>
  );
};

export default Result;
