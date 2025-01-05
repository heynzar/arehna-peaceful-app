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
          content="Jc5y6LRT3HgaYzV07OPxQoH3i5wgGBTQk18Taxw1sm8"
        />
      </head>
      <body
        className={`${poppins.className} antialiased h-screen w-screen overflow-hidden relative`}
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
