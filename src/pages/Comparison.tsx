import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MobileContainer } from "@/components/MobileContainer";
import { Header } from "@/components/Header";
import { ChatBubble } from "@/components/ChatBubble";
import { InterestModal } from "@/components/InterestModal";
import { api } from "@/services/api";
import { SimulationStats } from "@/lib/scoring/simulation";

const Comparison = () => {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [stats, setStats] = useState<SimulationStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const { score, gender } = location.state || {};
      if (score === undefined || !gender) {
        navigate("/");
        return;
      }

      try {
        const data = await api.getCompareStats(score, gender);
        setStats(data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchStats();
  }, [location.state, navigate]);

  if (!stats) return null; // Or loading spinner

  return (
    <MobileContainer>
      <Header title="결혼 시장 테스트" />

      <main className="flex-1 px-4 py-6 flex flex-col gap-3 overflow-y-auto">
        {/* Intro bubble */}
        <ChatBubble delay={0}>나와 비슷한 점수대 이성 기준이에요.</ChatBubble>

        {/* Income stats */}
        <div className="flex justify-start chat-appear" style={{ animationDelay: "200ms" }}>
          <div className="max-w-[85%] bg-card rounded-lg px-4 py-3">
            <p className="text-[15px] text-card-foreground font-medium mb-2">평균 연봉: {(stats.salaryMean / 10000).toLocaleString()}만 원</p>
            <div className="flex flex-col gap-1 text-[14px] text-card-foreground">
              {stats.jobTop3.map((job, i) => (
                <p key={i}>{job.jobType} {job.percent}%</p>
              ))}
            </div>
          </div>
        </div>

        {/* Education stats */}
        <div className="flex justify-start chat-appear" style={{ animationDelay: "400ms" }}>
          <div className="max-w-[85%] bg-card rounded-lg px-4 py-3">
            <div className="flex flex-col gap-1 text-[14px] text-card-foreground">
              <p>4년제 이상 {stats.educationDist.uni4yrPlus + stats.educationDist.gradPlus}%</p>
              <p>대학원 이상 {stats.educationDist.gradPlus}%</p>
            </div>
          </div>
        </div>

        {/* University stats */}
        <div className="flex justify-start chat-appear" style={{ animationDelay: "600ms" }}>
          <div className="max-w-[85%] bg-card rounded-lg px-4 py-3">
            <div className="flex flex-col gap-1 text-[14px] text-card-foreground">
              <p>SKY·서성한 {stats.universityDist.skySungsuhang}%</p>
              <p>기타 인서울 {stats.universityDist.otherSeoul}%</p>
            </div>
          </div>
        </div>

        {/* Assets stats */}
        <div className="flex justify-start chat-appear" style={{ animationDelay: "800ms" }}>
          <div className="max-w-[85%] bg-card rounded-lg px-4 py-3">
            <div className="flex flex-col gap-1 text-[14px] text-card-foreground">
              <p>자가 보유 {stats.homeOwnershipRate}%</p>
              <p>차량 보유 {stats.carOwnershipRate}%</p>
              <p className="pl-3 text-muted-foreground">외제차 {stats.carTypeDist.foreign}%</p>
              <p className="pl-3 text-muted-foreground">국산차 {stats.carTypeDist.domestic}%</p>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-xs text-muted-foreground px-1 chat-appear" style={{ animationDelay: "1000ms" }}>
          통계 시뮬레이션 예시에요.
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
