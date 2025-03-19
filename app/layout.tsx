import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BottomNavigation from "./BottomNavigation";

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
        <div className="device pb-16">
          {children}
          {modal}
          <div
            className="border-t"
            style={{
              width: "100dvw",
              position: "fixed",
              bottom: 0,
              height: "4rem",
            }}
          >
            <BottomNavigation />
          </div>
        </div>
      </body>
    </html>
  );
}
