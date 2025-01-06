import type { Metadata } from "next";
import { poppins } from "@/app/font";
import bg from "@/assets/bg.jpeg";

import "./globals.css";
export const metadata: Metadata = {
  title: "Arehna Peaceful App",
  description:
    "Arehna - A relaxing and peaceful web app designed to help users unwind, find calm, and enhance their well-being.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="1gdzJ54Nkkts333q1oMVKv-c54NiQV0cSRV7rPny3Ow"
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
