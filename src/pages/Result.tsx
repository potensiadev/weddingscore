import { useNavigate } from "react-router-dom";
import { MobileContainer } from "@/components/MobileContainer";
import { Header } from "@/components/Header";
import { ChatBubble } from "@/components/ChatBubble";

const Result = () => {
  const navigate = useNavigate();

  // Mock result - in real app this would be calculated from answers
  const percentile = 73;

  const handleRestart = () => {
    navigate("/");
  };

  return (
    <MobileContainer>
      <Header title="연애·결혼 시장 테스트" />

      <main className="flex-1 px-4 py-6 flex flex-col gap-3">
        <ChatBubble delay={0}>
          결과가 나왔어요! 🎉
        </ChatBubble>

        <ChatBubble delay={300}>
          한국 연애·결혼 시장에서{"\n"}당신의 위치는...
        </ChatBubble>

        {/* Result card */}
        <div 
          className="bg-card rounded-lg p-6 text-center mt-4 chat-appear"
          style={{ animationDelay: "600ms" }}
        >
          <div className="text-muted-foreground text-sm mb-2">상위</div>
          <div className="text-5xl font-bold text-foreground mb-2">
            {percentile}%
          </div>
          <div className="text-muted-foreground text-sm">
            동일 성별·연령대 기준
          </div>
        </div>

        <div 
          className="chat-appear"
          style={{ animationDelay: "900ms" }}
        >
          <ChatBubble delay={0}>
            연봉, 학력, 자산을 종합한 결과예요.{"\n"}더 자세한 분석이 궁금하시면{"\n"}곧 업데이트될 예정이에요!
          </ChatBubble>
        </div>

        <div className="mt-4">
          <ChatBubble variant="right" delay={1200} onClick={handleRestart}>
            처음으로 돌아가기
          </ChatBubble>
        </div>
      </main>
    </MobileContainer>
  );
};

export default Result;
