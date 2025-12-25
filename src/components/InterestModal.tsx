import { useState } from "react";

interface InterestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InterestModal = ({ isOpen, onClose }: InterestModalProps) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setEmail("");
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-foreground/40 flex items-center justify-center z-50 px-6"
      onClick={handleClose}
    >
      <div 
        className="w-full max-w-[340px] bg-card rounded-lg p-5 chat-appear"
        onClick={(e) => e.stopPropagation()}
      >
        {!submitted ? (
          <>
            <p className="text-[15px] text-card-foreground leading-relaxed mb-4">
              이 점수대 기준 소개/연결 서비스가 생기면 알림을 받아볼까요?
            </p>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="선택사항"
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-[15px] text-card-foreground placeholder:text-muted-foreground mb-4 outline-none focus:border-primary"
            />

            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg text-[15px] font-medium active:opacity-90 transition-opacity"
              >
                관심 있어요
              </button>
              <button
                onClick={handleClose}
                className="px-4 py-3 text-muted-foreground text-[15px]"
              >
                닫기
              </button>
            </div>
          </>
        ) : (
          <p className="text-[15px] text-card-foreground text-center py-4">
            관심 표시가 완료되었어요 🙂
          </p>
        )}
      </div>
    </div>
  );
};
