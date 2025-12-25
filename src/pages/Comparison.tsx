import { useState } from "react";
import { MobileContainer } from "@/components/MobileContainer";
import { Header } from "@/components/Header";
import { ChatBubble } from "@/components/ChatBubble";
import { InterestModal } from "@/components/InterestModal";

const Comparison = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <MobileContainer>
      <Header title="연애·결혼 시장 테스트" />

      <main className="flex-1 px-4 py-6 flex flex-col gap-3 overflow-y-auto">
        {/* Intro bubble */}
        <ChatBubble delay={0}>
          나와 비슷한 점수대 이성 기준이에요.
        </ChatBubble>

        {/* Income stats */}
        <div 
          className="flex justify-start chat-appear"
          style={{ animationDelay: "200ms" }}
        >
          <div className="max-w-[85%] bg-card rounded-lg px-4 py-3">
            <p className="text-[15px] text-card-foreground font-medium mb-2">평균 연봉: 6,800만 원</p>
            <div className="flex flex-col gap-1 text-[14px] text-card-foreground">
              <p>대기업 정규직 32%</p>
              <p>공무원/공기업 21%</p>
              <p>전문직 15%</p>
            </div>
          </div>
        </div>

        {/* Education stats */}
        <div 
          className="flex justify-start chat-appear"
          style={{ animationDelay: "400ms" }}
        >
          <div className="max-w-[85%] bg-card rounded-lg px-4 py-3">
            <div className="flex flex-col gap-1 text-[14px] text-card-foreground">
              <p>4년제 이상 78%</p>
              <p>대학원 이상 24%</p>
            </div>
          </div>
        </div>

        {/* University stats */}
        <div 
          className="flex justify-start chat-appear"
          style={{ animationDelay: "600ms" }}
        >
          <div className="max-w-[85%] bg-card rounded-lg px-4 py-3">
            <div className="flex flex-col gap-1 text-[14px] text-card-foreground">
              <p>SKY·서성한 31%</p>
              <p>기타 인서울 27%</p>
            </div>
          </div>
        </div>

        {/* Assets stats */}
        <div 
          className="flex justify-start chat-appear"
          style={{ animationDelay: "800ms" }}
        >
          <div className="max-w-[85%] bg-card rounded-lg px-4 py-3">
            <div className="flex flex-col gap-1 text-[14px] text-card-foreground">
              <p>자가 보유 36%</p>
              <p>차량 보유 62%</p>
              <p className="pl-3 text-muted-foreground">외제차 22%</p>
              <p className="pl-3 text-muted-foreground">국산차 40%</p>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p 
          className="text-xs text-muted-foreground px-1 chat-appear"
          style={{ animationDelay: "1000ms" }}
        >
          통계 시뮬레이션 예시입니다.
        </p>

        {/* CTA bubble */}
        <div className="mt-4">
          <ChatBubble variant="right" delay={1200} onClick={() => setShowModal(true)}>
            이 점수대 사람들과 실제로 연결될 수 있을까?
          </ChatBubble>
        </div>
      </main>

      <InterestModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </MobileContainer>
  );
};

export default Comparison;
