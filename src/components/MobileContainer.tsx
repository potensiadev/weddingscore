import { cn } from "@/lib/utils";

interface MobileContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileContainer = ({ children, className }: MobileContainerProps) => {
  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className={cn("w-full max-w-mobile min-h-screen flex flex-col", className)}>
        {children}
      </div>
    </div>
  );
};
