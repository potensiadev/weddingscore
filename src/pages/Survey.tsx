import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MobileContainer } from "@/components/MobileContainer";
import { Header } from "@/components/Header";

interface Answer {
  questionId: string;
  questionText: string;
  answerText: string;
  answerValue: string;
}

interface Question {
  id: string;
  text: string;
  options: { value: string; label: string }[];
  condition?: (answers: Answer[]) => boolean;
}

const questions: Question[] = [
  {
    id: "salary",
    text: "현재 본인의 연봉 수준은?",
    options: [
      { value: "under-3000", label: "3,000만 원 미만" },
      { value: "3000-3999", label: "3,000만 ~ 3,999만 원" },
      { value: "4000-4999", label: "4,000만 ~ 4,999만 원" },
      { value: "5000-6999", label: "5,000만 ~ 6,999만 원" },
      { value: "7000-8999", label: "7,000만 ~ 8,999만 원" },
      { value: "over-9000", label: "9,000만 원 이상" },
    ],
  },
  {
    id: "job",
    text: "현재 직업에 가장 가까운 유형은?",
    options: [
      { value: "professional", label: "전문직 (의사·변호사·회계사)" },
      { value: "big-corp", label: "대기업 정규직" },
      { value: "public", label: "공무원 / 공기업" },
      { value: "business-owner", label: "사업가 (법인·규모형)" },
      { value: "mid-corp", label: "중견기업 정규직" },
      { value: "startup", label: "성장형 스타트업 핵심 인력" },
      { value: "freelance", label: "프리랜서 (전문직 계열)" },
      { value: "self-employed", label: "자영업" },
      { value: "contract", label: "계약직 / 비정규 / 알바" },
      { value: "unemployed", label: "무직 / 준비 중" },
    ],
  },
  {
    id: "education",
    text: "최종 학력은?",
    options: [
      { value: "graduate", label: "대학원 이상" },
      { value: "university", label: "4년제 졸업" },
      { value: "college", label: "전문대" },
      { value: "high-school", label: "고졸 이하" },
    ],
  },
  {
    id: "school",
    text: "출신 학교는 어디에 해당하나요?",
    options: [
      { value: "sky", label: "SKY" },
      { value: "kaist-postech", label: "KAIST / POSTECH" },
      { value: "top-tier", label: "서성한" },
      { value: "mid-tier", label: "중경외시" },
      { value: "seoul-other", label: "기타 인서울 4년제" },
      { value: "metro", label: "수도권 4년제" },
      { value: "regional", label: "지방 4년제" },
    ],
    condition: (answers) => {
      const edu = answers.find((a) => a.questionId === "education");
      return edu?.answerValue === "graduate" || edu?.answerValue === "university";
    },
  },
  {
    id: "housing",
    text: "본인 명의 주택(자가)을 보유하고 있나요?",
    options: [
      { value: "yes", label: "있음" },
      { value: "no", label: "없음" },
    ],
  },
  {
    id: "car",
    text: "본인 명의 차량이 있나요?",
    options: [
      { value: "yes", label: "있음" },
      { value: "no", label: "없음" },
    ],
  },
  {
    id: "car-type",
    text: "어떤 차량인가요?",
    options: [
      { value: "foreign", label: "외제차" },
      { value: "domestic", label: "국산차" },
    ],
    condition: (answers) => {
      const car = answers.find((a) => a.questionId === "car");
      return car?.answerValue === "yes";
    },
  },
  {
    id: "gender",
    text: "성별은?",
    options: [
      { value: "male", label: "남성" },
      { value: "female", label: "여성" },
    ],
  },
];

const Survey = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Get visible questions based on conditions
  const getVisibleQuestions = (currentAnswers: Answer[]) => {
    return questions.filter((q) => {
      if (!q.condition) return true;
      return q.condition(currentAnswers);
    });
  };

  const visibleQuestions = getVisibleQuestions(answers);
  const currentQuestion = visibleQuestions[currentQuestionIndex];
  const totalQuestions = getVisibleQuestions(answers).length;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [answers, currentQuestionIndex]);

  const handleSelect = (option: { value: string; label: string }) => {
    if (isTransitioning || !currentQuestion) return;

    setIsTransitioning(true);

    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.text,
      answerText: option.label,
      answerValue: option.value,
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    setTimeout(() => {
      const nextVisibleQuestions = getVisibleQuestions(updatedAnswers);
      const nextIndex = currentQuestionIndex + 1;

      if (nextIndex >= nextVisibleQuestions.length) {
        navigate("/analyzing", { state: { answers: updatedAnswers } });
      } else {
        setCurrentQuestionIndex(nextIndex);
      }
      setIsTransitioning(false);
    }, 400);
  };

  return (
    <MobileContainer>
      <Header title="연애·결혼 시장 테스트" />

      <main className="flex-1 px-4 py-4 flex flex-col overflow-y-auto">
        {/* Progress */}
        <div className="text-xs text-muted-foreground mb-4">
          {currentQuestionIndex + 1} / {totalQuestions}
        </div>

        {/* Chat history */}
        <div className="flex flex-col gap-3">
          {answers.map((answer, index) => (
            <div key={index} className="flex flex-col gap-2">
              {/* Question bubble (left) */}
              <div className="flex justify-start">
                <div className="max-w-[85%] px-4 py-3 bg-card text-card-foreground rounded-lg text-[15px] leading-relaxed">
                  {answer.questionText}
                </div>
              </div>
              {/* Answer bubble (right) */}
              <div className="flex justify-end">
                <div className="max-w-[85%] px-4 py-3 bg-primary text-primary-foreground rounded-lg text-[15px] leading-relaxed">
                  {answer.answerText}
                </div>
              </div>
            </div>
          ))}

          {/* Current question */}
          {currentQuestion && (
            <div className="flex flex-col gap-3">
              {/* Question bubble (left) */}
              <div className="flex justify-start">
                <div className="max-w-[85%] px-4 py-3 bg-card text-card-foreground rounded-lg text-[15px] leading-relaxed chat-appear">
                  {currentQuestion.text}
                </div>
              </div>

              {/* Answer options (right aligned) */}
              <div className="flex flex-col gap-2 items-end">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(option)}
                    disabled={isTransitioning}
                    className="max-w-[85%] px-4 py-3 bg-card text-card-foreground rounded-lg text-[15px] leading-relaxed text-right active:bg-primary active:text-primary-foreground transition-colors chat-appear disabled:opacity-50"
                    style={{ animationDelay: `${(index + 1) * 50}ms` }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>
      </main>
    </MobileContainer>
  );
};

export default Survey;
