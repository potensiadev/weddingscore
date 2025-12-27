import { useNavigate, useLocation } from "react-router-dom";
import { MobileContainer } from "@/components/MobileContainer";
import { Header } from "@/components/Header";
import { ChatBubble } from "@/components/ChatBubble";
import { ScoreResult } from "@/lib/scoring/types";

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state?.result as (ScoreResult & { ai_summary: string }) | undefined;
  const input = location.state?.input;

  const handleComparisonTier = () => {
    navigate("/comparison", { state: { score: result?.score, gender: input?.gender } });
  };

  const handleSimilarAverage = () => {
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

  return (
    <MobileContainer>
      <Header title="연애·결혼 시장 테스트" />

      <main className="flex-1 px-4 py-6 flex flex-col gap-3 overflow-y-auto">
        {/* Result summary bubble */}
        <div className="flex justify-start">
          <div className="bg-card rounded-lg px-5 py-4 chat-appear">
            <p className="text-xs text-muted-foreground mb-2">당신의 결과</p>
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-4xl font-bold text-card-foreground">{result.score}점</span>
              <span className="px-2 py-1 bg-secondary text-secondary-foreground text-sm rounded-lg font-medium">
                {result.tier}
              </span>
            </div>
            <p className="text-[15px] text-card-foreground">{result.characterLabel}</p>
          </div>
        </div>

        {/* AI Interpretation bubble */}
        <div className="flex justify-start chat-appear" style={{ animationDelay: "200ms" }}>
          <div className="max-w-[85%] bg-card rounded-lg px-4 py-3">
            <p className="text-xs text-muted-foreground mb-1">한 줄 해석</p>
            <p className="text-[15px] text-card-foreground leading-relaxed whitespace-pre-wrap">
              {result.ai_summary}
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground px-1 chat-appear" style={{ animationDelay: "400ms" }}>
          본 결과는 재미·자기이해 목적의 참고용입니다.
        </p>

        {/* CTA bubbles */}
        <div className="mt-4 flex flex-col gap-2">
          <ChatBubble variant="right" delay={600} onClick={handleComparisonTier}>
            나와 비슷한 이성은 어떤 스펙일까?
          </ChatBubble>

          <ChatBubble variant="right" delay={1000} onClick={handleRealisticMatch}>
            현실적으로 가능한 상대 보기
          </ChatBubble>
        </div>
      </main>
    </MobileContainer>
  );
};

export default Result;
