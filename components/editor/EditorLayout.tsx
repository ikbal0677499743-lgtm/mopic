// Editor Layout - Full-screen flex container

interface EditorLayoutProps {
  children: React.ReactNode;
}

export default function EditorLayout({ children }: EditorLayoutProps) {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-gray-100">
      {children}
    </div>
  );
}
