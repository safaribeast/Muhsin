import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Young_graphic123 | Cinematic Vanguard Portfolio",
  description:
    "Pushing the boundaries of digital aesthetics through high-octane branding and editorial design systems.",
  keywords: [
    "graphic designer",
    "branding",
    "logo design",
    "social media design",
    "poster design",
    "print design",
    "visual identity",
    "Young_graphic123",
    "Young-graphix",
    "Muhsin Adam Mnaro",
  ],
  authors: [{ name: "Young_graphic123" }],
  openGraph: {
    title: "Young_graphic123 | Cinematic Vanguard Portfolio",
    description:
      "Pushing the boundaries of digital aesthetics through high-octane branding and editorial design systems.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Young_graphic123 | Cinematic Vanguard Portfolio",
    description:
      "Pushing the boundaries of digital aesthetics through high-octane branding and editorial design systems.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600&family=Alex+Brush&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
