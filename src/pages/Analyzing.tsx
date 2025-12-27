import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MobileContainer } from "@/components/MobileContainer";
import { Header } from "@/components/Header";

import { api } from "@/services/api";

const Analyzing = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const processResult = async () => {
      if (!location.state?.input) {
        navigate("/");
        return;
      }

      try {
        // Minimum loading time for UX
        const startTime = Date.now();

        const result = await api.submitScore(location.state.input);

        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 2000 - elapsed); // Ensure at least 2s loading

        setTimeout(() => {
          navigate("/result", { state: { result, input: location.state.input } });
        }, remaining);
      } catch (error) {
        console.error("Error calculating score:", error);
        // Handle error (maybe show toast or redirect)
        navigate("/");
      }
    };

    processResult();
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
          <p className="text-xs text-muted-foreground">점수 계산 중...</p>
        </div>
      </main>
    </MobileContainer>
  );
};

export default Analyzing;
