import { useState } from "react";

interface InterestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InterestModal = ({ isOpen, onClose }: InterestModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!name.trim() || !email.trim()) return;
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setName("");
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
            <p className="text-[15px] font-bold text-card-foreground leading-relaxed mb-4">
              이 점수대 기준 소개/연결 서비스가 생기면 알림을 받아볼까요?
            </p>

            <div className="space-y-3 mb-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름"
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-[15px] text-card-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
                autoFocus
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일 주소"
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-[15px] text-card-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                disabled={!name.trim() || !email.trim()}
                className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg text-[15px] font-black active:opacity-90 transition-all disabled:opacity-50 disabled:grayscale-[0.5]"
              >
                관심 있어요
              </button>
              <button
                onClick={handleClose}
                className="px-4 py-3 text-muted-foreground text-[15px] font-medium"
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
