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
      <Header title="연애·결혼 시장 테스트" />
      
      <main className="flex-1 px-4 py-6 flex flex-col gap-3">
        <ChatBubble delay={0}>
          한국 연애·결혼 시장에서{"\n"}나는 어느 정도일까?
        </ChatBubble>

        <ChatBubble delay={200}>
          연봉, 직업, 학력, 자산 기준으로{"\n"}지금 내 위치를 확인해볼 수 있어요.
        </ChatBubble>

        <ChatBubble delay={400}>
          30초면 끝나요.{"\n"}회원가입도 없어요 🙂
        </ChatBubble>

        <div className="mt-4">
          <ChatBubble variant="right" delay={600} onClick={handleStart}>
            내 위치 확인하기
          </ChatBubble>
        </div>
      </main>
    </MobileContainer>
  );
};

export default Index;
