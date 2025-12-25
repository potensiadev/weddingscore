import { useNavigate } from "react-router-dom";
import { MobileContainer } from "@/components/MobileContainer";
import { Header } from "@/components/Header";
import { ChatBubble } from "@/components/ChatBubble";

const Index = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/survey");
  };

  return (
    <MobileContainer>
      <Header title="결혼정보회사 기준 점수 테스트" />
      
      <main className="flex-1 px-4 py-6 flex flex-col gap-3 overflow-y-auto">
        <ChatBubble delay={0}>
          결혼정보 회사에서는{"\n"}사람마다 스펙 점수를 매겨요.
        </ChatBubble>

        <ChatBubble delay={150}>
          연봉, 직업, 학벌,{"\n"}자산 같은 걸 기준으로요.
        </ChatBubble>

        <ChatBubble delay={300}>
          문제는…
        </ChatBubble>

        <ChatBubble delay={450}>
          내 점수가 얼마인지는{"\n"}보통 가입하고,{"\n"}돈을 내야 알 수 있다는 거죠.
        </ChatBubble>

        <div className="h-2" />

        <ChatBubble delay={650}>
          그래서 이렇게 생각했어요.
        </ChatBubble>

        <ChatBubble delay={800}>
          결혼정보회사에 등록하기 전에,{"\n"}내 점수가 어느 정도인지{"\n"}미리 알 수 있으면 좋지 않을까?
        </ChatBubble>

        <div className="h-1" />

        <ChatBubble delay={1000}>
          결혼정보회사 기준으로{"\n"}당신의 현재 점수를{"\n"}미리 알려드릴게요.
        </ChatBubble>

        <ChatBubble delay={1150}>
          10초면 끝나요.{"\n"}회원가입도 없어요.
        </ChatBubble>

        <div className="mt-4">
          <ChatBubble variant="right" delay={1350} onClick={handleStart}>
            내 점수 먼저 알아볼게
          </ChatBubble>
        </div>

        <p 
          className="text-xs text-muted-foreground px-1 mt-2 chat-appear"
          style={{ animationDelay: "1500ms" }}
        >
          ※ 본 테스트는 참고용이며 실제 평가와는 차이가 있을 수 있습니다.
        </p>
      </main>
    </MobileContainer>
  );
};

export default Index;
