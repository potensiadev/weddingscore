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
          <span className="text-base font-medium text-landing-foreground">결혼정보회사 기준 점수 테스트</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-[960px] mx-auto px-6 py-16 md:py-24">
        <div className="max-w-[640px]">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight text-landing-foreground mb-6">
            나.. 결혼 잘 할 수 있을까?
          </h1>

          <h2 className="text-lg md:text-xl text-landing-secondary mb-8">
            결혼정보회사에서는 <br className="hidden md:block" />
            스펙에 따라 점수를 매겨요.
          </h2>

          <div className="text-base md:text-lg text-landing-muted leading-relaxed mb-8 space-y-4">
            <p>
              연봉, 직업, 학벌, 자산.
              <br />
              사실 우리는 이미
              <br />다 계산되는 시장에 살고 있어요.
            </p>
            <p>
              다만 문제는,
              <br />
              내 점수가 얼마인지는
              <br />
              결혼정보회사에 가입해야만 알 수 있죠...
            </p>
          </div>

          <p className="text-base md:text-lg font-semibold text-landing-foreground mb-8">
            결혼정보회사 등록 전에 <br className="hidden md:block" />내 점수를 먼저 알아보세요.
          </p>

          <button
            onClick={handleStart}
            className="px-8 py-4 bg-landing-button text-landing-button-foreground rounded-lg text-base font-medium hover:opacity-90 transition-opacity"
          >
            내 점수 확인하기
          </button>

          <p className="text-sm text-landing-muted mt-4">회원가입 없음 · 개인정보 불필요</p>
        </div>
      </section>

      {/* Section: Empathy */}
      <section className="bg-landing-section">
        <div className="max-w-[960px] mx-auto px-6 py-16 md:py-20">
          <div className="max-w-[640px]">
            <h2 className="text-xl md:text-2xl font-semibold text-landing-foreground mb-8">
              결혼정보회사 등록, <br />왜 이렇게 망설여질까요?
            </h2>

            <ul className="space-y-4 text-base md:text-lg text-landing-secondary">
              <li className="flex items-start gap-3">
                <span className="text-landing-muted mt-1">•</span>
                <span>가입 전에 내 위치를 알 수 없다</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-landing-muted mt-1">•</span>
                <span>비용과 상담이 부담스럽다</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-landing-muted mt-1">•</span>
                <span>개인정보를 넘기는 게 찜찜하다</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-landing-muted mt-1">•</span>
                <span>그래도… 내 점수는 솔직히 궁금하다</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section: Solution */}
      <section className="max-w-[960px] mx-auto px-6 py-16 md:py-20">
        <div className="max-w-[640px]">
          <h2 className="text-xl md:text-2xl font-semibold text-landing-foreground mb-8">
            그래서 이 테스트는 이렇게 만듭니다
          </h2>

          <ul className="space-y-4 text-base md:text-lg text-landing-secondary">
            <li className="flex items-start gap-3">
              <span className="text-landing-muted mt-1">•</span>
              <span>결혼정보회사에서 실제로 보는 기준을 기반으로</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-landing-muted mt-1">•</span>
              <span>점수와 티어로 현재 위치를 요약해서</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-landing-muted mt-1">•</span>
              <span>가입·결제 없이</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-landing-muted mt-1">•</span>
              <span>사전 참고용으로만 보여드립니다</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Section: Outcome */}
      <section className="bg-landing-section">
        <div className="max-w-[960px] mx-auto px-6 py-16 md:py-20">
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
                <span>나 정도면 어떤 급인지에 대한 현실적인 해석</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-landing-muted mt-1">•</span>
                <span>나와 비슷한 점수대 사람들의 평균 조건</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section: Disclaimer */}
      <section className="max-w-[960px] mx-auto px-6 py-8">
        <div className="max-w-[640px]">
          <p className="text-sm text-landing-muted leading-relaxed">
            본 테스트는 실제 결혼정보회사 평가와 차이가 있을 수 있으며, 재미 및 자기이해 목적의 참고 자료입니다.
          </p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="max-w-[960px] mx-auto px-6 py-16 md:py-20">
        <div className="max-w-[640px]">
          <p className="text-xl md:text-2xl font-semibold text-landing-foreground mb-8">
            나 정도면, 결혼 시장에서 어디쯤일까?
          </p>

          <button
            onClick={handleStart}
            className="px-8 py-4 bg-landing-button text-landing-button-foreground rounded-lg text-base font-medium hover:opacity-90 transition-opacity"
          >
            내 점수 확인하기
          </button>
        </div>
      </section>

      {/* Footer spacing */}
      <div className="h-8" />
    </div>
  );
};

export default Index;
