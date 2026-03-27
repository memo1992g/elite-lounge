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
    default: "Elite Lounge | Escorts en El Salvador y compañía VIP",
    template: "%s | Elite Lounge",
  },
  description:
    "Elite Lounge: escorts en El Salvador, compañía VIP y experiencias privadas con reserva discreta por WhatsApp en San Salvador.",
  keywords: [
    "escort el salvador",
    "escorts en el salvador",
    "scort el salvador",
    "compañía el salvador",
    "compañía vip san salvador",
    "reservas privadas el salvador",
    "elite lounge",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_SV",
    url: SITE_URL,
    siteName: "Elite Lounge",
    title: "Elite Lounge | Escorts en El Salvador y compañía VIP",
    description:
      "Servicio premium de compañía en San Salvador. Perfiles verificados, atención personalizada y reservas discretas.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elite Lounge | Escorts en El Salvador y compañía VIP",
    description:
      "Reserva compañía VIP en El Salvador con atención discreta por WhatsApp.",
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
