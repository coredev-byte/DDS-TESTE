import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { site } from "@/config/site";
import { RevealScript } from "@/components/ui/reveal";
import { Analytics } from "@/components/analytics/analytics";
import { MotionController } from "@/components/motion/motion-controller";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const title = "DDS Reformas | Construção, reformas e retrofit em Alphaville e região";
const description =
  "Empresa de reformas em Alphaville e região: reformas residenciais e comerciais, construção, retrofit, alvenaria, drywall, pintura, pisos e revestimentos, elétrica e hidráulica. Solicite seu orçamento pelo WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s | ${site.name}`,
  },
  description,
  applicationName: site.name,
  keywords: [
    "reformas em Alphaville",
    "empresa de reformas em Alphaville",
    "reforma residencial Alphaville",
    "reforma comercial Alphaville",
    "construção e reformas",
    "retrofit",
    "alvenaria",
    "pintura residencial",
    "drywall",
    "pisos e revestimentos",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title,
    description:
      "Seu projeto, nossa execução. Construção, reformas e retrofit para espaços residenciais e comerciais em Alphaville e região.",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "Construção, reformas e retrofit para espaços residenciais e comerciais em Alphaville e região.",
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
  category: "construction",
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} ${inter.variable}`} suppressHydrationWarning>
      <body>
        {children}
        <RevealScript />
        <MotionController />
        <Analytics />
      </body>
    </html>
  );
}
