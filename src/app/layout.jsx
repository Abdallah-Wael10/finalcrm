import localFont from "next/font/local";
import "./globals.css";
import { LeadDataProvider } from "./context/leadData/page";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "E-protect-CRM",
  description: "CRM",
};

export default function RootLayout({ children, userId }) { // Accept userId as a prop
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <LeadDataProvider> {/* Pass userId to LeadDataProvider */}
          {children}
        </LeadDataProvider>
      </body>
    </html>
  );
}
