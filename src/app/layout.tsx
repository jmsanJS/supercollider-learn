import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import TopNavbar from "@/components/TopNavbar/TopNavbar";
import Footer from "@/components/Footer/Footer";
import { ProgressProvider } from "@/context/ProgressContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { LangProvider } from "@/context/LangContext";

const JetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap"
});


export const metadata: Metadata = {
  title: { default: "SC learn", template: "%s | SC Learn" },
  description:
    "Learn SuperCollider with practical, progressive exercises directly in your browser",
  keywords:
    "SuperCollider, audio, sound, algorithmic music, live coding, exercises",
  authors: { name: "Juan Sanchez" },
  openGraph: {
    siteName: "SC Learn",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("sc_theme");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`,
          }}
        />
      </head>
      <body className={JetBrainsMono.variable}>
        <ThemeProvider>
          <LangProvider>
            <ProgressProvider>
              <TopNavbar />
              <main>{children}</main>
              <Footer />
            </ProgressProvider>
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
