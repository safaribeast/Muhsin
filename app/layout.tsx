import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muhsin Adam Mnaro | Young-graphix - Graphic Designer",
  description:
    "Creative graphic designer based in Arusha, Tanzania. Specializing in brand identity, logo design, posters, and visual storytelling. Let's create something beautiful together.",
  keywords: [
    "graphic designer",
    "Arusha",
    "Tanzania",
    "logo design",
    "branding",
    "Young-graphix",
    "Muhsin Adam Mnaro",
    "visual design",
    "creative design",
  ],
  authors: [{ name: "Muhsin Adam Mnaro" }],
  openGraph: {
    title: "Muhsin Adam Mnaro | Young-graphix",
    description:
      "Creative graphic designer based in Arusha, Tanzania. Transforming ideas into visual stories.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhsin Adam Mnaro | Young-graphix",
    description:
      "Creative graphic designer based in Arusha, Tanzania. Transforming ideas into visual stories.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${dmSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
