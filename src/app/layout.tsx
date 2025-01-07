import { poppins } from "@/app/font";
import bg from "@/assets/bg.jpeg";

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Arehna - Your Calm Companion</title>
        <meta
          name="description"
          content="A peaceful web app that combines natural sounds with beautiful Quran recitations to help you find moments of calm."
        />
        <meta
          name="keywords"
          content="Arehna, calm app, relaxation, Quran recitation, natural sounds, mindfulness, Islamic app, Arehna, al Quran, Quran online, Koran, recitation, Quran Audio, tilawat Quran, relaxing Quran, calming, relaxing, rain sounds, peaceful"
        />
        <meta name="author" content="nzar.dev" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Arehna - Your Calm Companion" />
        <meta
          property="og:description"
          content="A peaceful web app that combines natural sounds with beautiful Quran recitations to help you find moments of calm."
        />
        <meta property="og:image" content="/cover.png" />
        <meta property="og:url" content="https://your-app-domain.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Arehna - Your Calm Companion" />
        <meta
          name="twitter:description"
          content="A peaceful web app that combines natural sounds with beautiful Quran recitations to help you find moments of calm."
        />
        <meta name="twitter:image" content="/cover.png" />
        <link rel="canonical" href="https://arehna.nzar.dev" />
        <meta
          name="google-site-verification"
          content="GVMliRgOaC5BVnMhXqDy1r-RIP0utMUGGkf38orLpNo"
        />
      </head>
      <meta name="theme-color" content="#09090b" />
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
