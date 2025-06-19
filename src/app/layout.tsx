import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { NavigationWrapper } from "@/components/layout/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Modu Mail",
  description: "Email builder for modern businesses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Providers>
          <NavigationWrapper />
          <div className="flex flex-col flex-1">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
