import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://billpromax.com"),
  title: "Bill Pro Max — Scaffolding Rental Management Platform",
  description:
    "Automated billing, challan tracking, PDF statements, client portals, and business analytics for scaffolding rental businesses. All in one terminal-inspired platform.",
  keywords: [
    "scaffolding rental management",
    "billing software",
    "challan tracking",
    "rental business management",
    "GST billing",
    "inventory management",
    "scaffolding business",
    "rental billing platform",
  ],
  openGraph: {
    title: "Bill Pro Max — Scaffolding Rental Management Platform",
    description:
      "Automated billing, challan tracking, PDF statements, client portals, and business analytics for scaffolding rental businesses.",
    url: "https://billpromax.com",
    siteName: "Bill Pro Max",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bill Pro Max — Scaffolding Rental Management Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bill Pro Max — Scaffolding Rental Management Platform",
    description:
      "Automated billing, challan tracking, PDF statements, and business analytics for scaffolding rental businesses.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Bill Pro Max",
                url: "https://billpromax.com",
                description:
                  "Scaffolding rental management platform with automated billing, challan tracking, and business analytics.",
              },
              {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                name: "Bill Pro Max",
                applicationCategory: "BusinessApplication",
                operatingSystem: "Web",
                description:
                  "Automated billing, challan tracking, PDF statements, client portals, and business analytics for scaffolding rental businesses.",
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "INR",
                  description: "Free to start",
                },
              },
            ]),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
