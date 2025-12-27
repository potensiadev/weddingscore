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
  const [showButton, setShowButton] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [stats, setStats] = useState<SimulationStats | null>(null);

  const { score, gender } = location.state || {};
  const targetGender = gender === "male" ? "female" : "male";

  useEffect(() => {
    const fetchStats = async () => {
      if (score === undefined || !gender) {
        navigate("/");
        return;
      }

      try {
        // Fetch stats for the OPPOSITE gender
        const data = await api.getCompareStats(score, targetGender);
        setStats(data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchStats();
  }, [score, gender, targetGender, navigate]);

  useEffect(() => {
    if (stats) {
      const timer = setTimeout(() => setShowButton(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [stats]);

  if (!stats) return null;

  const getTargetLabel = () => targetGender === "male" ? "남성" : "여성";

  return (
    <MobileContainer>
      <Header title="결혼 시장 통계 분석" />

      <main className="flex-1 px-4 py-6 flex flex-col gap-4 overflow-y-auto bg-[#F7F7F7]">
        <ChatBubble delay={100}>
          {`당신과 비슷한 점수대의 ${getTargetLabel()}분들은\n어떤 스펙을 가지고 있을까요?`}
        </ChatBubble>

        <ChatBubble delay={400}>
          {`분석 결과, 이들의 평균 연봉은\n약 ${(stats.salaryMean / 10000).toLocaleString()}만 원 수준입니다.`}
        </ChatBubble>

        <ChatBubble delay={700}>
          {`${stats.jobTop3[0].jobType}, ${stats.jobTop3[1].jobType} 등 탄탄한 직군이 많으며,\nSKY 및 주요 대학 졸업자가 ${stats.universityDist.skySungsuhang}%에 달합니다.`}
        </ChatBubble>

        <ChatBubble delay={1000}>
          {`자가 보유율은 ${stats.homeOwnershipRate}%이며,\n차량 보유자의 ${stats.carTypeDist.foreign}%는 외제차를 운행하고 있네요.`}
        </ChatBubble>

        <ChatBubble delay={1300}>
          {`실제로 연결될 수 있는 현실적인 매칭 풀입니다.\n지금 바로 확인해보시겠어요?`}
        </ChatBubble>

        {showButton && (
          <div className="mt-4 pb-10">
            <ChatBubble 
              variant="right" 
              delay={0}
              onClick={() => setShowModal(true)}
            >
              내 점수대에 맞는 이성 추천받기
            </ChatBubble>
          </div>
        )}

        <p className="text-[11px] text-muted-foreground/60 text-center px-4 mt-2 leading-relaxed font-medium chat-appear" style={{ animationDelay: "1800ms" }}>
          ※ 위 데이터는 시뮬레이션 기반의 통계이며 <br />
          실제와 다를 수 있음을 알려드립니다.
        </p>
      </main>

      <InterestModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </MobileContainer>
  );
};

export default Comparison;
