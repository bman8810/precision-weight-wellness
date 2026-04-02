import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.precisionweightwellness.com"),
  title: {
    default:
      "Precision Weight + Wellness | Medical Weight Loss NYC | Dr. Libby Rhee",
    template: "%s | Precision Weight + Wellness",
  },
  description:
    "Medically supervised weight management in NYC. Board-certified physician Dr. Libby Rhee offers personalized Semaglutide and Tirzepatide programs at Liora.",
  keywords: [
    "medical weight loss",
    "GLP-1",
    "semaglutide",
    "tirzepatide",
    "Wegovy",
    "Mounjaro",
    "Ozempic",
    "weight management NYC",
    "Dr. Libby Rhee",
    "obesity medicine",
  ],
  openGraph: {
    title: "Precision Weight + Wellness",
    description:
      "Medically supervised weight management in NYC with Dr. Libby Rhee.",
    url: "https://www.precisionweightwellness.com",
    siteName: "Precision Weight + Wellness",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Precision Weight + Wellness | Medical Weight Loss NYC",
    description:
      "Medically supervised weight management in NYC with Dr. Libby Rhee. Personalized GLP-1 medication programs.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased bg-white text-neutral-900">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              "@id": "https://www.precisionweightwellness.com",
              name: "Precision Weight + Wellness at Liora",
              description:
                "Medically supervised weight management program led by Dr. Libby Rhee, DO, MS, FAAD in New York City.",
              url: "https://www.precisionweightwellness.com",
              telephone: "+1-212-433-4569",
              email: "hello@precisionww.com",
              priceRange: "$$-$$$",
              address: {
                "@type": "PostalAddress",
                streetAddress: "110 E 60th Street, Suite 800",
                addressLocality: "New York",
                addressRegion: "NY",
                postalCode: "10022",
                addressCountry: "US",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 40.7636,
                longitude: -73.9683,
              },
              founder: {
                "@type": "Physician",
                name: "Dr. Libby Rhee",
                jobTitle: "Board-Certified Dermatologist",
                medicalSpecialty: ["Dermatology", "Obesity Medicine"],
                description:
                  "DO, MS, FAAD — Board-certified dermatologist specializing in medical weight management with GLP-1 medications.",
              },
            }),
          }}
        />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
