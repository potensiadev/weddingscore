import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileContainer } from "@/components/MobileContainer";
import { Header } from "@/components/Header";
import { ChatBubble } from "@/components/ChatBubble";

interface SurveyOption {
  value: string;
  label: string;
}

interface SurveyStep {
  question: string;
  options: SurveyOption[];
}

const surveySteps: SurveyStep[] = [
  {
    question: "성별이 어떻게 되세요?",
    options: [
      { value: "male", label: "남성" },
      { value: "female", label: "여성" },
    ],
  },
  {
    question: "나이대가 어떻게 되세요?",
    options: [
      { value: "20s-early", label: "20대 초반" },
      { value: "20s-mid", label: "20대 중반" },
      { value: "20s-late", label: "20대 후반" },
      { value: "30s-early", label: "30대 초반" },
      { value: "30s-mid", label: "30대 중반" },
      { value: "30s-late", label: "30대 후반" },
      { value: "40s+", label: "40대 이상" },
    ],
  },
  {
    question: "현재 연봉이 어느 정도인가요?",
    options: [
      { value: "under-3000", label: "3천만원 미만" },
      { value: "3000-5000", label: "3천~5천만원" },
      { value: "5000-7000", label: "5천~7천만원" },
      { value: "7000-1억", label: "7천~1억" },
      { value: "over-1억", label: "1억 이상" },
    ],
  },
  {
    question: "최종 학력이 어떻게 되세요?",
    options: [
      { value: "high-school", label: "고졸" },
      { value: "college", label: "전문대졸" },
      { value: "university", label: "4년제 대졸" },
      { value: "top-university", label: "명문대 졸" },
      { value: "graduate", label: "대학원 이상" },
    ],
  },
  {
    question: "현재 보유 자산은 어느 정도인가요?",
    options: [
      { value: "under-5000", label: "5천만원 미만" },
      { value: "5000-1억", label: "5천~1억" },
      { value: "1억-3억", label: "1억~3억" },
      { value: "3억-5억", label: "3억~5억" },
      { value: "over-5억", label: "5억 이상" },
    ],
  },
];

const Survey = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const currentQuestion = surveySteps[currentStep];
  const progress = ((currentStep + 1) / surveySteps.length) * 100;

  const handleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentStep]: value }));
    
    if (currentStep < surveySteps.length - 1) {
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 300);
    } else {
      setTimeout(() => {
        navigate("/result", { state: { answers } });
      }, 300);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      navigate("/");
    }
  };

  return (
    <MobileContainer>
      <Header 
        title="연애·결혼 시장 테스트" 
        showBack 
        onBack={handleBack}
      />
      
      {/* Progress bar */}
      <div className="h-1 bg-secondary">
        <div 
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <main className="flex-1 px-4 py-6 flex flex-col">
        <div className="mb-2 text-xs text-muted-foreground">
          {currentStep + 1} / {surveySteps.length}
        </div>

        <ChatBubble key={currentStep} delay={0}>
          {currentQuestion.question}
        </ChatBubble>

        <div className="mt-6 flex flex-col gap-2">
          {currentQuestion.options.map((option, index) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="w-full px-4 py-3 bg-card text-card-foreground text-left text-[15px] rounded-lg active:bg-secondary transition-colors chat-appear"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </main>
    </MobileContainer>
  );
};

export default Survey;
