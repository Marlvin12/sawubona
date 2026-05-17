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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://sawubona.org");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sawubona — Free CS, AI & Robotics Education",
    template: "%s — Sawubona",
  },
  description:
    "A Southern African initiative rooted in hunhu · ubuntu. Free technology education — CS, AI, robotics, and more — taught by the diaspora for young people back home.",
  keywords: [
    "free coding education Africa",
    "Southern Africa technology education",
    "ubuntu programming",
    "Zimbabwe coding",
    "diaspora mentorship",
    "AI education Africa",
    "robotics education",
    "computer science Africa",
    "hunhu",
    "Sawubona",
  ],
  authors: [{ name: "Sawubona Foundation" }],
  creator: "Sawubona Foundation",
  publisher: "Sawubona Foundation",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    siteName: "Sawubona",
    url: siteUrl,
    title: "Sawubona — Free CS, AI & Robotics Education",
    description:
      "Free technology education for Southern African youth, taught by the diaspora. CS, AI, robotics, web development — rooted in ubuntu.",
    images: [
      {
        url: "/students.jpg",
        width: 1200,
        height: 630,
        alt: "Two young students sharing a laptop, sitting against an orange wall.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sawubona — Free CS, AI & Robotics Education",
    description:
      "Free technology education for Southern African youth, taught by the diaspora. CS, AI, robotics, web development — rooted in ubuntu.",
    images: ["/students.jpg"],
  },
  icons: {
    icon: "/sawubona-icon.svg",
    shortcut: "/sawubona-icon.svg",
    apple: "/sawubona-icon.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": `${siteUrl}/#organization`,
      name: "Sawubona Foundation",
      url: siteUrl,
      logo: `${siteUrl}/sawubona-icon.svg`,
      description:
        "A Southern African initiative rooted in hunhu · ubuntu providing free CS, AI and robotics education for young people, taught by the diaspora.",
      sameAs: [],
      areaServed: ["Zimbabwe", "South Africa", "Zambia", "Botswana", "Malawi"],
      knowsAbout: [
        "Computer Science",
        "Artificial Intelligence",
        "Robotics",
        "Web Development",
        "Game Development",
        "Data Science",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Sawubona",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
