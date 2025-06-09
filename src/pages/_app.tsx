import Head from "next/head";
import type { AppProps } from "next/app";
import { Geist, Geist_Mono } from "next/font/google";
import { SessionProvider } from "next-auth/react"
import Navbar from "@/components/layout/Navbar";
import { Footer, FooterCopyright } from "flowbite-react";

import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      {/*
        * Title should be define in _app, not _document:
        * https://nextjs.org/docs/messages/no-document-title
      */}
      <Head>
        <title>Job Search dashboard</title>
        <meta name="description" content="Get help finding your next job as a software developer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <main className="container mx-auto px-4 prose dark:prose-invert">
          <Component {...pageProps} />
        </main>
        <Footer container className="border-none shadow-none">
          <FooterCopyright href="#" by="Matt Shelley" year={2025} />
        </Footer>
      </div>
    </SessionProvider>
  )
}
