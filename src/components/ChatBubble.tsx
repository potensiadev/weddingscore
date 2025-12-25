import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  children: React.ReactNode;
  variant?: "left" | "right";
  delay?: number;
  onClick?: () => void;
}

export const ChatBubble = ({ 
  children, 
  variant = "left", 
  delay = 0,
  onClick 
}: ChatBubbleProps) => {
  const isRight = variant === "right";

  return (
    <div 
      className={cn(
        "flex w-full",
        isRight ? "justify-end" : "justify-start"
      )}
    >
      <div
        onClick={onClick}
        className={cn(
          "chat-appear max-w-[85%] px-4 py-3 rounded-lg text-[15px] leading-relaxed whitespace-pre-line",
          isRight 
            ? "bg-primary text-primary-foreground cursor-pointer active:opacity-90 transition-opacity" 
            : "bg-card text-card-foreground",
        )}
        style={{ animationDelay: `${delay}ms` }}
      >
        {children}
      </div>
    </div>
  );
};
