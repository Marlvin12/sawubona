import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "@/components/ClientLayout";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sawubona — Free CS, AI & Robotics Education",
  description:
    "A Southern African initiative rooted in hunhu · ubuntu. Free technology education, taught by the diaspora — for young people back home.",
  icons: {
    icon: "/sawubona-icon.svg",
    shortcut: "/sawubona-icon.svg",
    apple: "/sawubona-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
