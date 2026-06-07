import type { Metadata } from "next";
import { Lora, Playfair_Display } from "next/font/google";
import Header from "@/components/layout/Header";
import RevealProvider from "@/components/providers/RevealProvider";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-lora",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: SITE_TAGLINE,
    siteName: SITE_NAME,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lora.variable} ${playfair.variable} min-h-screen bg-background text-foreground antialiased`}>
        <SmoothScrollProvider>
          <RevealProvider>
            <Header />
            <main>{children}</main>
          </RevealProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
