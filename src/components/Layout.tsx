import Footer from "@/components/Footer";
import Header from "@/components/Header";

import { Inter } from "next/font/google";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={`flex flex-col min-h-screen ${inter.className}`}>
      <Header />
      <main className="flex-1 px-3 2xl:px-0 mt-20 sm:mt-28">{children}</main>
      <Footer />
    </div>
  );
}
