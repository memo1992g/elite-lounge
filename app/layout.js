import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://elite-lounge.sv";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Elite Lounge | Compañía VIP en El Salvador | Premium companionship",
    template: "%s | Elite Lounge",
  },
  description:
    "Elite Lounge ofrece compañía VIP en El Salvador y premium companionship para visitantes internacionales. Atención discreta en San Salvador para adultos 35+.",
  keywords: [
    "compañía el salvador",
    "compañía vip san salvador",
    "escorts en el salvador",
    "scort el salvador",
    "companionship el salvador",
    "premium companionship san salvador",
    "english speaking companion el salvador",
    "vip company for travelers",
    "elite lounge",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "es-SV": "/",
      "en-US": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_SV",
    alternateLocale: "en_US",
    url: SITE_URL,
    siteName: "Elite Lounge",
    title: "Elite Lounge | Compañía VIP en El Salvador | Premium companionship",
    description:
      "Private, discreet and premium companionship in San Salvador for local and international guests aged 35+.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elite Lounge | Premium companionship in El Salvador",
    description:
      "Bilingual VIP companionship in San Salvador. Discreet booking for international guests 35+.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-SV">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
