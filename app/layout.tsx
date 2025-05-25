import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BottomNavigationBar from "./bottom-navigation-bar";
import ReduxProvider from "@/providers/ReduxProvider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Connect",
  description: "Time Management and Payroll",
  appleWebApp: {
    title: "Connect HR",
  },
};
export const viewport: Viewport = {
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <div
            className="device"
            style={{
              paddingBottom: "calc(4rem + env(safe-area-inset-bottom))",
            }}
          >
            {children}
            {modal}
            <div
              className="border-t bg-background/80 backdrop-blur-md bg-blend-luminosity"
              style={{
                width: "100dvw",
                position: "fixed",
                bottom: 0,
                paddingBottom: "env(safe-area-inset-bottom)",
              }}
            >
              <BottomNavigationBar />
            </div>
            <Toaster />
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
