import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/survey");
  };

  return (
    <div className="min-h-screen bg-landing-background text-landing-foreground">
      {/* Header */}
      <header className="w-full border-b border-landing-border">
        <div className="max-w-[960px] mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-base font-medium text-landing-foreground">
            결혼정보회사 기준 점수 테스트
          </span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-[960px] mx-auto px-6 py-16 md:py-24">
        <div className="max-w-[640px]">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight text-landing-foreground mb-6">
            결혼정보회사에서는{" "}
            <br className="hidden md:block" />
            스펙에 따라 점수를 매깁니다.
          </h1>
          
          <p className="text-lg md:text-xl text-landing-muted mb-6">
            하지만 내 점수를 확인하려면{" "}
            <br className="hidden md:block" />
            사실상 유료 가입이 필요합니다.
          </p>
          
          <p className="text-base md:text-lg text-landing-secondary leading-relaxed mb-6">
            연봉, 직업, 학벌, 자산 등{" "}
            <br className="hidden md:block" />
            결혼정보회사에서 실제로 보는 기준으로{" "}
            <br className="hidden md:block" />
            당신의 현재 점수를{" "}
            <br className="hidden md:block" />
            등록 전에 미리 알려드립니다.
          </p>
          
          <p className="text-base md:text-lg font-semibold text-landing-foreground mb-8">
            10초면 끝납니다.
          </p>
          
          <button
            onClick={handleStart}
            className="px-8 py-4 bg-landing-button text-landing-button-foreground rounded-lg text-base font-medium hover:opacity-90 transition-opacity"
          >
            내 점수 먼저 확인하기
          </button>
          
          <p className="text-sm text-landing-muted mt-4">
            회원가입 없음 · 개인정보 저장 안 함 · 참고용 테스트
          </p>
        </div>
      </section>

      {/* Section 2: Why this exists */}
      <section className="bg-landing-section">
        <div className="max-w-[960px] mx-auto px-6 py-16 md:py-20">
          <div className="max-w-[640px]">
            <h2 className="text-xl md:text-2xl font-semibold text-landing-foreground mb-8">
              왜 이 테스트가 필요한가요?
            </h2>
            
            <ul className="space-y-4 text-base md:text-lg text-landing-secondary mb-8">
              <li className="flex items-start gap-3">
                <span className="text-landing-muted mt-1">•</span>
                <span>결혼정보회사 점수는 가입 전에는 알 수 없음</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-landing-muted mt-1">•</span>
                <span>실제 기준은 공개되지 않음</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-landing-muted mt-1">•</span>
                <span>등록 후에야 내 위치를 알게 됨</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-landing-muted mt-1">•</span>
                <span>비용과 개인정보 부담이 큼</span>
              </li>
            </ul>
            
            <p className="text-base md:text-lg text-landing-secondary">
              이 테스트는 그 과정을 건너뛰기 위한{" "}
              <br className="hidden md:block" />
              사전 확인용 도구입니다.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: What you get */}
      <section className="max-w-[960px] mx-auto px-6 py-16 md:py-20">
        <div className="max-w-[640px]">
          <h2 className="text-xl md:text-2xl font-semibold text-landing-foreground mb-8">
            이 테스트로 알 수 있는 것
          </h2>
          
          <ul className="space-y-4 text-base md:text-lg text-landing-secondary">
            <li className="flex items-start gap-3">
              <span className="text-landing-muted mt-1">•</span>
              <span>결혼정보회사 기준 예상 점수</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-landing-muted mt-1">•</span>
              <span>내 위치에 대한 현실적인 해석</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-landing-muted mt-1">•</span>
              <span>나와 비슷한 점수대 사람들의 평균 조건</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Section 4: Disclaimer */}
      <section className="max-w-[960px] mx-auto px-6 py-8">
        <div className="max-w-[640px]">
          <p className="text-sm text-landing-muted leading-relaxed">
            본 테스트는 실제 결혼정보회사 평가와{" "}
            차이가 있을 수 있으며,{" "}
            재미 및 자기이해 목적의 참고 자료입니다.
          </p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="max-w-[960px] mx-auto px-6 py-16 md:py-20">
        <div className="max-w-[640px]">
          <button
            onClick={handleStart}
            className="px-8 py-4 bg-landing-button text-landing-button-foreground rounded-lg text-base font-medium hover:opacity-90 transition-opacity"
          >
            내 점수 먼저 확인하기
          </button>
        </div>
      </section>

      {/* Footer spacing */}
      <div className="h-8" />
    </div>
  );
};

export default Index;
