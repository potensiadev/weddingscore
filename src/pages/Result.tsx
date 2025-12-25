import { useNavigate } from "react-router-dom";
import { MobileContainer } from "@/components/MobileContainer";
import { Header } from "@/components/Header";
import { ChatBubble } from "@/components/ChatBubble";

const Result = () => {
  const navigate = useNavigate();

  const handleComparisonTier = () => {
    navigate("/comparison");
  };

  const handleSimilarAverage = () => {
    navigate("/comparison");
  };

  const handleRealisticMatch = () => {
    navigate("/comparison");
  };

  return (
    <MobileContainer>
      <Header title="연애·결혼 시장 테스트" />

      <main className="flex-1 px-4 py-6 flex flex-col gap-3 overflow-y-auto">
        {/* Result summary bubble */}
        <div className="flex justify-start">
          <div className="bg-card rounded-lg px-5 py-4 chat-appear">
            <p className="text-xs text-muted-foreground mb-2">당신의 결과</p>
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-4xl font-bold text-card-foreground">82점</span>
              <span className="px-2 py-1 bg-secondary text-secondary-foreground text-sm rounded-lg font-medium">
                A-
              </span>
            </div>
            <p className="text-[15px] text-card-foreground">경쟁 가능한 상위 안정권</p>
          </div>
        </div>

        {/* AI Interpretation bubble */}
        <div className="flex justify-start chat-appear" style={{ animationDelay: "200ms" }}>
          <div className="max-w-[85%] bg-card rounded-lg px-4 py-3">
            <p className="text-xs text-muted-foreground mb-1">한 줄 해석</p>
            <p className="text-[15px] text-card-foreground leading-relaxed">
              안정적인 조건을 갖춘 현실형 타입입니다. 일부 요소를 보완하면 상위 티어로 이동할 수 있어요.
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
            현실적으로 가능한 상대 알아보기
          </ChatBubble>
        </div>
      </main>
    </MobileContainer>
  );
};

export default Result;
