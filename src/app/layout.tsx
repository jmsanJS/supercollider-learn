import type { Metadata } from "next";
import { JetBrains_Mono, Oxanium } from "next/font/google";
import "./globals.css";

const JetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const oxanium = Oxanium({
  variable: "--font-oxanium",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: 'SC learn', template: '%s | SC Learn' },
  description:
    "Aprende SuperCollider con ejercicios prácticos y progresivos desde el navegador",
  keywords:
    "SuperCollider, audio, sound, algorithmic music, live coding, exercises",
  authors: { name: "Juan Sanchez" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${JetBrainsMono.variable} ${oxanium.variable}`}>
        {children}
      </body>
    </html>
  );
}
