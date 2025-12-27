import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MobileContainer } from "@/components/MobileContainer";
import { Header } from "@/components/Header";
import { InterestModal } from "@/components/InterestModal";
import { api } from "@/services/api";
import { SimulationStats } from "@/lib/scoring/simulation";
import { TrendingUp, GraduationCap, Building2, Home, Car, Users } from "lucide-react";

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

  if (!stats) return null;

  const StatCard = ({ icon: Icon, title, children, delay }: any) => (
    <div
      className="glass-card rounded-2xl p-5 chat-appear"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <Icon size={20} />
        </div>
        <h3 className="text-[15px] font-bold text-foreground/90">{title}</h3>
      </div>
      {children}
    </div>
  );

  return (
    <MobileContainer>
      <Header title="결혼 시장 통계 분석" />

      <main className="flex-1 px-4 py-6 flex flex-col gap-4 overflow-y-auto bg-[#F7F7F7]">
        <div className="flex items-center gap-2 px-1 mb-2">
          <Users size={16} className="text-primary" />
          <p className="text-sm font-bold text-muted-foreground">나와 비슷한 점수대 이성 기준</p>
        </div>

        {/* Income stats */}
        <StatCard icon={TrendingUp} title="경제력 지표" delay={100}>
          <p className="text-2xl font-black text-foreground mb-3">
            평균 {(stats.salaryMean / 10000).toLocaleString()}만 원
          </p>
          <div className="space-y-2">
            {stats.jobTop3.map((job, i) => (
              <div key={i} className="flex items-center justify-between text-sm font-medium">
                <span className="text-muted-foreground">{job.jobType}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 bg-secondary/30 rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${job.percent}%` }} />
                  </div>
                  <span className="text-foreground/80 w-8 text-right">{job.percent}%</span>
                </div>
              </div>
            ))}
          </div>
        </StatCard>

        {/* Education stats */}
        <StatCard icon={GraduationCap} title="학력 및 배경" delay={300}>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-white/50 border border-black/5">
              <p className="text-xs font-bold text-muted-foreground uppercase mb-1">4년제 이상</p>
              <p className="text-lg font-black text-foreground">{stats.educationDist.uni4yrPlus + stats.educationDist.gradPlus}%</p>
            </div>
            <div className="p-3 rounded-xl bg-white/50 border border-black/5">
              <p className="text-xs font-bold text-muted-foreground uppercase mb-1">대학원 이상</p>
              <p className="text-lg font-black text-foreground">{stats.educationDist.gradPlus}%</p>
            </div>
          </div>
          <div className="mt-3 p-3 rounded-xl bg-white/50 border border-black/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 size={14} className="text-primary" />
              <span className="text-sm font-bold text-foreground/80">SKY·서성한 비율</span>
            </div>
            <span className="text-sm font-black text-primary">{stats.universityDist.skySungsuhang}%</span>
          </div>
        </StatCard>

        {/* Assets stats */}
        <StatCard icon={Home} title="자산 및 라이프" delay={500}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Home size={16} className="text-muted-foreground" />
                <span className="text-sm font-semibold text-foreground/80">자가 보유율</span>
              </div>
              <span className="text-sm font-black text-foreground">{stats.homeOwnershipRate}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Car size={16} className="text-muted-foreground" />
                <span className="text-sm font-semibold text-foreground/80">차량 보유율</span>
              </div>
              <span className="text-sm font-black text-foreground">{stats.carOwnershipRate}%</span>
            </div>
            <div className="pl-6 flex gap-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">외제차</span>
                <span className="text-sm font-bold text-primary">{stats.carTypeDist.foreign}%</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">국산차</span>
                <span className="text-sm font-bold text-foreground/60">{stats.carTypeDist.domestic}%</span>
              </div>
            </div>
          </div>
        </StatCard>

        <p className="text-[11px] text-muted-foreground text-center px-4 mt-2 leading-relaxed font-medium">
          ※ 위 통계는 입력하신 점수대를 기반으로 한 <br />
          시뮬레이션 데이터이며 실제와 다를 수 있습니다.
        </p>

        {/* CTA Button */}
        <div className="mt-6 mb-10">
          <button
            onClick={() => setShowModal(true)}
            className="w-full py-4 bg-black text-white rounded-2xl text-[15px] font-black shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            이 점수대 사람들과 매칭 시작하기
          </button>
        </div>
      </main>

      <InterestModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </MobileContainer>
  );
};

export default Comparison;
