import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MobileContainer } from "@/components/MobileContainer";
import { Header } from "@/components/Header";
import { trackEvent } from "@/lib/analytics";

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
    text: "현재 나의 연 소득은?",
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
    text: "현재 나의 직업은?",
    options: [
      { value: "professional", label: "전문직 (의사·변호사·회계사)" },
      { value: "big-corp", label: "대기업" },
      { value: "public", label: "공무원 / 공기업" },
      { value: "business-owner", label: "사업가 (법인)" },
      { value: "mid-corp", label: "중견기업 정규직" },
      { value: "startup", label: "성장형 스타트업 핵심 인력" },
      { value: "freelance", label: "프리랜서 (전문직 계열)" },
      { value: "self-employed", label: "자영업" },
      { value: "contract", label: "계약직 / 비정규 / 알바" },
      { value: "unemployed", label: "무직 / 준비 중" },
    ],
  },
  {
    id: "age",
    text: "현재 나의 연령대는?",
    options: [
      { value: "20-24", label: "20~24세" },
      { value: "25-29", label: "25~29세" },
      { value: "30-34", label: "30~34세" },
      { value: "35-39", label: "35~39세" },
      { value: "40-44", label: "40~44세" },
      { value: "45-49", label: "45~49세" },
      { value: "50+", label: "50세 이상" },
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
      { value: "overseas", label: "해외대" },
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
    id: "region",
    text: "현재 거주 지역은?",
    options: [
      { value: "seoul", label: "서울" },
      { value: "gyeonggi", label: "경기도" },
      { value: "other", label: "그 외 지역" },
    ],
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
  const isFinishedRef = useRef(false);

  const getVisibleQuestions = (currentAnswers: Answer[]) => {
    return questions.filter((q) => {
      if (!q.condition) return true;
      return q.condition(currentAnswers);
    });
  };

  const visibleQuestions = getVisibleQuestions(answers);
  const currentQuestion = visibleQuestions[currentQuestionIndex];
  const totalQuestions = visibleQuestions.length;

  useEffect(() => {
    // Track question view
    if (currentQuestion) {
      trackEvent('survey_question_view', {
        question_id: currentQuestion.id,
        question_order: currentQuestionIndex + 1
      });
    }
  }, [currentQuestionIndex, currentQuestion?.id]);

  useEffect(() => {
    // Drop-off tracking
    return () => {
      if (!isFinishedRef.current && currentQuestion) {
        trackEvent('survey_drop', {
          last_question_id: currentQuestion.id,
          last_question_order: currentQuestionIndex + 1,
          answered_count: answers.length
        });
      }
    };
  }, [currentQuestionIndex, currentQuestion?.id, answers.length]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [answers, currentQuestionIndex]);

  const handleSelect = (option: { value: string; label: string }) => {
    if (isTransitioning || !currentQuestion) return;

    // Track answer select
    trackEvent('survey_answer_select', {
      question_id: currentQuestion.id,
      question_order: currentQuestionIndex + 1,
      answer_value: option.value
    });

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
        isFinishedRef.current = true;
        // Map answers to ScoreInput
        const getValue = (id: string) => updatedAnswers.find(a => a.questionId === id)?.answerValue;

        const mapSalary = (val?: string) => {
          if (val === 'under-3000') return 0;
          if (val === '3000-3999') return 1;
          if (val === '4000-4999') return 2;
          if (val === '5000-6999') return 3;
          if (val === '7000-8999') return 4;
          return 5; // over-9000
        };

        const mapJob = (val?: string) => {
          if (val === 'professional') return 'professional';
          if (val === 'big-corp') return 'large_corp';
          if (val === 'public') return 'public';
          if (val === 'mid-corp') return 'mid_corp';
          if (val === 'startup') return 'sme';
          if (val === 'freelance') return 'freelance';
          return 'other';
        };

        const mapEdu = (val?: string) => {
          if (val === 'graduate') return 'master';
          if (val === 'university') return 'bachelor';
          if (val === 'college') return 'college';
          return 'highschool';
        };

        const mapUni = (val?: string) => {
          if (val === 'sky' || val === 'kaist-postech') return 'top_tier';
          if (val === 'top-tier' || val === 'overseas') return 'seoul_major';
          if (val === 'mid-tier' || val === 'seoul-other') return 'seoul_other';
          if (val === 'metro') return 'regional_national';
          return 'regional_private';
        };

        const mapRegion = (val?: string) => {
          if (val === 'seoul') return 'seoul_favored';
          if (val === 'gyeonggi') return 'gyeonggi_new';
          return 'other';
        };

        const input = {
          salary: mapSalary(getValue('salary')),
          job: mapJob(getValue('job')),
          age: getValue('age') || '30-34',
          education: mapEdu(getValue('education')),
          university: mapUni(getValue('school')),
          homeOwnership: getValue('housing') === 'yes',
          carOwnership: getValue('car') === 'yes',
          carType: getValue('car-type') === 'foreign' ? '외제차' : (getValue('car-type') === 'domestic' ? '국산차' : null),
          region: mapRegion(getValue('region')),
          gender: (getValue('gender') || 'male') as 'male' | 'female'
        };

        navigate("/analyzing", { state: { input } });
      } else {
        // Track next question transition
        trackEvent('survey_next', {
          from_question: currentQuestion.id,
          to_question: nextVisibleQuestions[nextIndex].id
        });
        setCurrentQuestionIndex(nextIndex);
      }
      setIsTransitioning(false);
    }, 400);
  };

  return (
    <MobileContainer>
      <Header title="연애·결혼 시장 테스트" />

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-secondary/30 sticky top-0 z-10">
        <div
          className="h-full bg-gradient-to-r from-primary/50 to-primary transition-all duration-500 ease-out"
          style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      <main className="flex-1 px-4 py-6 flex flex-col overflow-y-auto bg-[#F7F7F7]">
        <div className="flex flex-col gap-5">
          {answers.map((answer, index) => (
            <div key={index} className="flex flex-col gap-3">
              <div className="flex justify-start">
                <div className="max-w-[85%] px-4 py-3 bg-white rounded-2xl rounded-tl-none shadow-sm text-[15px] font-medium text-foreground/90 border border-black/5">
                  {answer.questionText}
                </div>
              </div>
              <div className="flex justify-end">
                <div className="max-w-[85%] px-4 py-3 bg-primary text-primary-foreground rounded-2xl rounded-tr-none shadow-md shadow-primary/20 text-[15px] font-bold">
                  {answer.answerText}
                </div>
              </div>
            </div>
          ))}

          {currentQuestion && (
            <div className="flex flex-col gap-4">
              <div className="flex justify-start">
                <div className="max-w-[85%] px-4 py-3 bg-white rounded-2xl rounded-tl-none shadow-sm text-[15px] font-medium text-foreground/90 border border-black/5 chat-appear">
                  {currentQuestion.text}
                </div>
              </div>

              <div className="flex flex-col gap-2 items-end">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(option)}
                    disabled={isTransitioning}
                    className="max-w-[85%] px-5 py-3.5 bg-white rounded-2xl shadow-sm text-[15px] font-bold text-foreground/80 text-right border border-black/5 hover:bg-primary/5 hover:border-primary/20 active:scale-[0.98] transition-all chat-appear disabled:opacity-50"
                    style={{ animationDelay: `${(index + 1) * 80}ms` }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={chatEndRef} className="h-10" />
        </div>
      </main>
    </MobileContainer>
  );
};

export default Survey;
