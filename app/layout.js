import { Inter } from "next/font/google";
import "./globals.css";
import { AlertProvider } from "@/app/context/AlertContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EthDash",
  description: "Ethereum Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="shortcut icon" href="/images/favicon.png" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/images/favicon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/images/favicon.png"
      />

      <body className={inter.className}>
        <AlertProvider>{children}</AlertProvider>
      </body>
    </html>
  );
}
