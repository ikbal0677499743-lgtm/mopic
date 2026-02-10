// Editor Layout - Full-screen flex container

interface EditorLayoutProps {
  children: React.ReactNode;
}

export default function EditorLayout({ children }: EditorLayoutProps) {
  return (
    <div className="h-screen flex flex-col bg-editor-workspace overflow-hidden">
      {children}
    </div>
  );
}
