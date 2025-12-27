import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { trackEvent, getEntrySource, incrementAttemptIndex } from "@/lib/analytics";

const Index = () => {
  const navigate = useNavigate();
  const [participantCount, setParticipantCount] = useState(1240);

  useEffect(() => {
    // Track landing view
    trackEvent('landing_view', { entry_source: getEntrySource() });

    const interval = setInterval(() => {
      setParticipantCount(prev => prev + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleStart = (ctaLocation: string) => {
    incrementAttemptIndex();
    trackEvent('start_test', { cta_location: ctaLocation });
    navigate("/survey");
  };

  return (
    <div className="min-h-screen mesh-gradient text-foreground overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/50 backdrop-blur-md border-b border-border/50">
        <div className="max-w-[600px] mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-sm font-bold tracking-tight text-foreground/80">WeddingScore</span>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
              {participantCount.toLocaleString()}명 참여 중
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-[600px] mx-auto px-6 pt-32 pb-20 flex flex-col items-center text-center">
        {/* Hero Section */}
        <div className="animate-float mb-10">
          <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary-foreground text-[13px] font-bold rounded-full border border-primary/20 mb-6">
            2026년 최신 결정사 데이터 반영
          </div>
          <h1 className="text-4xl md:text-5xl font-black leading-[1.3] tracking-tight text-foreground mb-6">
            나는 <br />
            <span className="text-primary bg-black px-2 py-0.5 inline-block my-1">결혼정보회사</span>에서 <br />
            몇 점일까?
          </h1>
          <p className="text-lg text-muted-foreground font-medium leading-relaxed">
            연봉, 직업, 학벌, 자산... <br />
            냉혹한 시장 가치를 5초 만에 분석해드려요.
          </p>
        </div>

        {/* Glass Card */}
        <div className="glass-card w-full rounded-[32px] p-8 mb-12 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl" />

          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-primary rounded-full" />
            왜 내 점수를 알아야 할까요?
          </h2>

          <ul className="space-y-5">
            {[
              "가입 전에 내 객관적인 위치 파악",
              "불필요한 상담 비용과 시간 낭비 방지",
              "나와 비슷한 점수대의 이성 스펙 확인",
              "100% 익명, 개인정보 입력 없음"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 group">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold mt-0.5 group-hover:bg-primary group-hover:text-black transition-colors">
                  {i + 1}
                </div>
                <span className="text-[15px] font-semibold text-foreground/80">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <div className="w-full sticky bottom-8 z-40">
          <button
            onClick={() => handleStart('hero')}
            className="w-full py-5 bg-primary text-primary-foreground rounded-2xl text-lg font-black shadow-[0_20px_40px_-10px_rgba(254,229,0,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all animate-pulse-glow"
          >
            내 점수 무료로 확인하기
          </button>
          <p className="text-[13px] text-muted-foreground font-bold mt-4">
            현재까지 총 84,291명이 참여했습니다
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-[600px] mx-auto px-6 py-12 border-t border-border/30 text-center">
        <p className="text-[12px] text-muted-foreground leading-relaxed font-medium">
          본 테스트는 실제 결혼정보회사 평가와 차이가 있을 수 있으며, <br />
          재미 및 자기이해 목적의 참고 자료입니다. <br />
          © 2026 WeddingScore. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Index;
