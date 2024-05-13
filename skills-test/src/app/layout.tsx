import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "CDL Skills Test",
  description: "Test applicant skills to acquire a CDL in the State of Kansas",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <ToastContainer theme="dark" position="bottom-center" />
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
