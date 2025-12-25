interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
}

export const Header = ({ title, showBack, onBack }: HeaderProps) => {
  return (
    <header className="h-14 flex items-center justify-center px-4 bg-background border-b border-border relative">
      {showBack && (
        <button 
          onClick={onBack}
          className="absolute left-4 text-foreground text-lg"
        >
          ←
        </button>
      )}
      <h1 className="text-base font-semibold text-foreground">{title}</h1>
    </header>
  );
};
