import type { Metadata } from "next";
import {} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";
import localFont from "next/font/local";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/footer";

const codecPro = localFont({
  src: "./fonts/codec-pro.regular.ttf",
  variable: "--font-codecPro-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider>
        <body className={`${codecPro.variable} font-codecPro antialiased`}>
          <ThemeProvider
            enableSystem
            disableTransitionOnChange
            defaultTheme="system"
            attribute="class"
          >
            <Navbar />
            {children}
            <Footer />
            <Toaster richColors />
          </ThemeProvider>
        </body>
      </SessionProvider>
    </html>
  );
}
