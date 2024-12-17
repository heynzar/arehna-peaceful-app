import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import bg from "@/assets/bg.jpg";

const poppins = Poppins({
  variable: "--poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

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
