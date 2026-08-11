import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Semana do Plástico | Falcão Bauer",
  description:
    "Uma semana de encontros, conhecimento e novas perspectivas na Falcão Bauer.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
