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
      <Header title="寃고샎 ?쒖옣 ?뚯뒪?? />

      <main className="flex-1 px-4 py-6 flex flex-col gap-3 overflow-y-auto">
        {/* Intro bubble */}
        <ChatBubble delay={0}>?섏? 鍮꾩듂???먯닔? ?댁꽦 湲곗??댁뿉??</ChatBubble>

        {/* Income stats */}
        <div className="flex justify-start chat-appear" style={{ animationDelay: "200ms" }}>
          <div className="max-w-[85%] bg-card rounded-lg px-4 py-3">
            <p className="text-[15px] text-card-foreground font-medium mb-2">?됯퇏 ?곕큺: {(stats.salaryMean / 10000).toLocaleString()}留???/p>
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
              <p>4?꾩젣 ?댁긽 {stats.educationDist.uni4yrPlus + stats.educationDist.gradPlus}%</p>
              <p>??숈썝 ?댁긽 {stats.educationDist.gradPlus}%</p>
            </div>
          </div>
        </div>

        {/* University stats */}
        <div className="flex justify-start chat-appear" style={{ animationDelay: "600ms" }}>
          <div className="max-w-[85%] bg-card rounded-lg px-4 py-3">
            <div className="flex flex-col gap-1 text-[14px] text-card-foreground">
              <p>SKY쨌?쒖꽦??{stats.universityDist.skySungsuhang}%</p>
              <p>湲고? ?몄꽌??{stats.universityDist.otherSeoul}%</p>
            </div>
          </div>
        </div>

        {/* Assets stats */}
        <div className="flex justify-start chat-appear" style={{ animationDelay: "800ms" }}>
          <div className="max-w-[85%] bg-card rounded-lg px-4 py-3">
            <div className="flex flex-col gap-1 text-[14px] text-card-foreground">
              <p>?먭? 蹂댁쑀 {stats.homeOwnershipRate}%</p>
              <p>李⑤웾 蹂댁쑀 {stats.carOwnershipRate}%</p>
              <p className="pl-3 text-muted-foreground">?몄젣李?{stats.carTypeDist.foreign}%</p>
              <p className="pl-3 text-muted-foreground">援?궛李?{stats.carTypeDist.domestic}%</p>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-xs text-muted-foreground px-1 chat-appear" style={{ animationDelay: "1000ms" }}>
          ?듦퀎 ?쒕??덉씠???덉떆?먯슂.
        </p>

        {/* CTA bubble */}
        <div className="mt-4">
          <ChatBubble variant="right" delay={1200} onClick={() => setShowModal(true)}>
            ???먯닔? ?щ엺?ㅺ낵 ?ㅼ젣濡??곌껐?????덉쓣源?
          </ChatBubble>
        </div>
      </main>

      <InterestModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </MobileContainer>
  );
};

export default Comparison;
