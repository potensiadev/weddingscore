import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MobileContainer } from "@/components/MobileContainer";
import { Header } from "@/components/Header";

const Analyzing = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/result", { state: location.state });
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate, location.state]);

  return (
    <MobileContainer>
      <Header title="연애·결혼 시장 테스트" />

      <main className="flex-1 px-4 py-6 flex items-center justify-center">
        <div className="bg-card rounded-lg px-6 py-5 text-center chat-appear">
          <div className="flex items-center justify-center gap-1 mb-3">
            <span 
              className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
              style={{ animationDelay: "0ms", animationDuration: "0.6s" }}
            />
            <span 
              className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
              style={{ animationDelay: "150ms", animationDuration: "0.6s" }}
            />
            <span 
              className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
              style={{ animationDelay: "300ms", animationDuration: "0.6s" }}
            />
          </div>
          <p className="text-[15px] text-card-foreground mb-1">조건을 분석 중이에요…</p>
          <p className="text-xs text-muted-foreground">연봉 · 직업 · 학력 정리 중</p>
        </div>
      </main>
    </MobileContainer>
  );
};

export default Analyzing;
