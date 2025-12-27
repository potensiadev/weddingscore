import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MobileContainer } from "@/components/MobileContainer";
import { Header } from "@/components/Header";
import { api } from "@/services/api";
import { trackEvent } from "@/lib/analytics";

const Analyzing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  const statusMessages = [
    "데이터베이스 연결 중...",
    "연봉 및 직업 가치 분석 중...",
    "학벌 및 자산 가중치 계산 중...",
    "거주지 선호도 필터링 중...",
    "비슷한 스펙의 이성 데이터 매칭 중...",
    "최종 결혼 시장 점수 산출 중..."
  ];

  const isCompletedRef = useRef(false);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    // Track analyzing view
    trackEvent('analyzing_view', {
      answered_count: location.state?.input ? 10 : 0 // Assuming approx 10 questions
    });

    const processResult = async () => {
      if (!location.state?.input) {
        navigate("/");
        return;
      }

      // Progress animation
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 1;
        });
      }, 30);

      // Status message rotation
      const statusInterval = setInterval(() => {
        setStatusIndex(prev => (prev + 1) % statusMessages.length);
      }, 600);

      try {
        const result = await api.submitScore(location.state.input);

        const elapsed = Date.now() - startTimeRef.current;
        const remaining = Math.max(0, 3500 - elapsed); // Longer loading for "premium" feel

        setTimeout(() => {
          clearInterval(progressInterval);
          clearInterval(statusInterval);
          isCompletedRef.current = true;
          navigate("/result", { state: { result, input: location.state.input } });
        }, remaining);
      } catch (error) {
        console.error("Error calculating score:", error);
        navigate("/");
      }

      return () => {
        clearInterval(progressInterval);
        clearInterval(statusInterval);
      };
    };

    processResult();

    return () => {
      // Track exit if not completed
      if (!isCompletedRef.current) {
        const durationSec = Math.floor((Date.now() - startTimeRef.current) / 1000);
        trackEvent('analyzing_exit', { duration_sec: durationSec });
      }
    };
  }, [navigate, location.state]);

  return (
    <MobileContainer>
      <Header title="연애·결혼 시장 테스트" />

      <main className="flex-1 px-6 py-10 flex flex-col items-center justify-center bg-[#F7F7F7]">
        <div className="w-full max-w-[300px] aspect-square relative flex items-center justify-center mb-12">
          {/* Circular Progress Background */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              className="stroke-secondary/30 fill-none"
              strokeWidth="8"
            />
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              className="stroke-primary fill-none transition-all duration-100 ease-linear"
              strokeWidth="8"
              strokeDasharray="283%"
              strokeDashoffset={`${283 - (283 * progress) / 100}%`}
              strokeLinecap="round"
            />
          </svg>

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-black text-foreground tracking-tighter">
              {progress}%
            </span>
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mt-2">
              Analyzing...
            </span>
          </div>

          {/* Scanning Effect */}
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <div className="w-full h-1/2 bg-gradient-to-b from-primary/20 to-transparent absolute top-0 animate-[scan_2s_linear_infinite]" />
          </div>
        </div>

        <div className="text-center space-y-3">
          <div className="h-6">
            <p className="text-[17px] font-bold text-foreground/90 animate-pulse">
              {statusMessages[statusIndex]}
            </p>
          </div>
          <p className="text-sm text-muted-foreground font-medium">
            잠시만 기다려주세요. <br />
            정밀한 분석을 위해 데이터를 처리 중입니다.
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 grid grid-cols-3 gap-8 opacity-40">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: `${i * 200}ms` }} />
              <div className="w-8 h-1 bg-secondary rounded-full" />
            </div>
          ))}
        </div>
      </main>

      <style>{`
        @keyframes scan {
          from { transform: translateY(-100%); }
          to { transform: translateY(200%); }
        }
      `}</style>
    </MobileContainer>
  );
};

export default Analyzing;
