import type { Metadata } from "next";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Footer,
  FooterCopyright
} from "flowbite-react";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Job Search Dashboard",
  description: "Get help finding your next job as a software developer",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar fluid rounded>
          <NavbarBrand as={Link} href="/">
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Job Search Dashboard</span>
          </NavbarBrand>
          <NavbarToggle />
          <NavbarCollapse>
            <NavbarLink href="/behavioural-interviews">Behavioural Interviews</NavbarLink>
          </NavbarCollapse>
        </Navbar>
        <main className="container mx-auto px-4 prose dark:prose-invert">
          {children}
        </main>
        <Footer container className="border-none shadow-none">
          <FooterCopyright href="#" by="Matt Shelley" year={2025} />
        </Footer>
      </body>
    </html>
  );
}
