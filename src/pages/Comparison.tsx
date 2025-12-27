import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MobileContainer } from "@/components/MobileContainer";
import { Header } from "@/components/Header";
import { ChatBubble } from "@/components/ChatBubble";
import { InterestModal } from "@/components/InterestModal";
import { api } from "@/services/api";
import { PeerComparisonData } from "@/lib/scoring/comparison";

const Comparison = () => {
  const [showModal, setShowModal] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState<PeerComparisonData | null>(null);

  const { score, gender } = location.state || {};

  useEffect(() => {
    const fetchData = async () => {
      if (score === undefined || !gender) {
        navigate("/");
        return;
      }

      try {
        const result = await api.getCompareData(score, gender);
        setData(result);
      } catch (e) {
        console.error("Failed to fetch comparison data:", e);
      }
    };

    fetchData();
  }, [score, gender, navigate]);

  useEffect(() => {
    if (data) {
      const timer = setTimeout(() => setShowButton(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [data]);

  if (!data) return null;

  const targetLabel = data.gender === "male" ? "남성" : "여성";

  return (
    <MobileContainer>
      <Header title="결혼 시장 통계 분석" />

      <main className="flex-1 px-4 py-6 flex flex-col gap-4 overflow-y-auto bg-[#F7F7F7]">
        <ChatBubble delay={100}>
          {`당신과 비슷한 점수대(${data.score_band}점)의 ${targetLabel}들은\n어떤 스펙을 가지고 있을까요?`}
        </ChatBubble>

        <ChatBubble delay={400}>
          {`분석 결과, 이들의 평균 연봉은\n약 ${(data.avg_salary / 10000).toLocaleString()}만 원 수준입니다.`}
        </ChatBubble>

        <ChatBubble delay={700}>
          {`${data.job_top3[0].label}, ${data.job_top3[1].label} 등 탄탄한 직군이 많으며,\nSKY 및 주요 대학 졸업자가 ${data.university.sky_sungsuhang}%에 달합니다.`}
        </ChatBubble>

        <ChatBubble delay={1000}>
          {`자가 보유율은 ${data.assets.home_ownership}%이며,\n차량 보유자의 약 ${Math.round((data.assets.car_type.foreign / data.assets.car_ownership) * 100)}%는 외제차를 운행하고 있네요.`}
        </ChatBubble>

        <ChatBubble delay={1300}>
          {`시장 내에서 현실적으로 마주하게 될 ${targetLabel}의 지표입니다.\n실제 매칭 가능성을 확인해보시겠어요?`}
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
          ※ {data.notice}
        </p>
      </main>

      <InterestModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        score={score}
        gender={gender}
      />
    </MobileContainer>
  );
};

export default Comparison;
