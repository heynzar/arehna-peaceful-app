import { poppins } from "@/app/font";
import bg from "@/assets/bg.jpg";
import { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Arehna - Your Calm Companion",
  description:
    "A peaceful web app that combines natural sounds with beautiful Quran recitations to help you find moments of calm.",
  authors: [{ name: "nzar.dev" }],
  keywords: [
    "Arehna",
    "calm app",
    "relaxation",
    "Quran recitation",
    "natural sounds",
    "mindfulness",
    "Islamic app",
    "al Quran",
    "Quran online",
    "Koran",
    "recitation",
    "Quran Audio",
    "tilawat Quran",
    "relaxing Quran",
    "calming",
    "relaxing",
    "rain sounds",
    "peaceful",
  ],
  openGraph: {
    title: "Arehna - Your Calm Companion",
    description:
      "A peaceful web app that combines natural sounds with beautiful Quran recitations to help you find moments of calm.",
    url: "https://arehna.org",
    siteName: "Arehna",
    images: [
      {
        url: "/cover.png",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arehna - Your Calm Companion",
    description:
      "A peaceful web app that combines natural sounds with beautiful Quran recitations to help you find moments of calm.",
    images: ["/cover.png"],
  },
  alternates: {
    canonical: "https://arehna.org",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#09090b" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="google-site-verification"
          content="RLlamPjG0TyaAmgW-qkvzSVXJMw_g6S3sDuEWUwnvCo"
        />
      </head>
      <body
        className={`${poppins.className} antialiased h-screen w-screen overflow-x-hidden relative`}
      >
        <div
          style={{
            backgroundImage: `url(${bg.src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "bottom",
            filter: "brightness(50%)",
          }}
          className="absolute inset-0 -z-10"
        ></div>

        {children}
      </body>
    </html>
  );
}
