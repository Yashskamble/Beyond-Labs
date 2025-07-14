import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/organisms/Header";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
});

export const metadata = {
  title: "Backlink-Marketplace",
  description: "Backlink Marketplace Assignment",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} bg-[#FDFCFF] antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
