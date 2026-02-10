import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mopic - Create Beautiful Photobooks",
  description: "Design and print custom photobooks with professional quality",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
