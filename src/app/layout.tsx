import type { Metadata } from "next";
import { JetBrains_Mono, Oxanium } from "next/font/google";
import "./globals.css";
import TopNavbar from "@/components/TopNavbar/TopNavbar";

const JetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap"
});

const oxanium = Oxanium({
  variable: "--font-oxanium",
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: { default: "SC learn", template: "%s | SC Learn" },
  description:
    "Aprende SuperCollider con ejercicios prácticos y progresivos desde el navegador",
  keywords:
    "SuperCollider, audio, sound, algorithmic music, live coding, exercises",
  authors: { name: "Juan Sanchez" },
  openGraph: {
    siteName: "SC Learn",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${JetBrainsMono.variable} ${oxanium.variable} antialiased`}>
        <TopNavbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
