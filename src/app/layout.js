import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/organisms/Header";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "Backlink-Marketplace",
  description: "Backlink Marketplace Assignment",
  icons: {
    icon: "/logo.png"
  },

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} antialiased bg-[#FDFCFF]`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
