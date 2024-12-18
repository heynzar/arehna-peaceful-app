import { Poppins, Aref_Ruqaa } from "next/font/google";

export const poppins = Poppins({
  variable: "--poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const ruqaa = Aref_Ruqaa({
  variable: "--ruqaa",
  subsets: ["arabic"],
  weight: ["400"],
});
