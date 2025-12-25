interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <header className="h-14 flex items-center justify-center px-4 bg-background border-b border-border">
      <h1 className="text-base font-semibold text-foreground">{title}</h1>
    </header>
  );
};
