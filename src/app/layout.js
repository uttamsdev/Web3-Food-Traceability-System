
import { Toaster } from "sonner";
import localFont from "next/font/local";
import "./globals.css";
import { Web3ContextProvider } from "@/context/Web3Context";

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
  title: "Food Traceability System",
  description: "This is fully web3 based food traceability system",
};
import { Urbanist } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
const urbanist = Urbanist({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={urbanist.className}
      >
        <AntdRegistry>
          <Toaster position="top-right" richColors closeButton />
          <Web3ContextProvider>
            {children}
          </Web3ContextProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
