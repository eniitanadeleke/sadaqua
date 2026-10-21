import { Fraunces, Nunito_Sans } from "next/font/google";
import "./globals.css";

// Both fonts are loaded with their "opsz" (optical size) axis, as Figma uses them:
// small text gets slightly wider, sturdier letters, so text widths match the design.
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-fraunces",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-nunito-sans",
});

export const metadata = {
  title: "Sadaqua",
  description: "The Place for Help",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${nunitoSans.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}