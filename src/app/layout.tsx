import type { Metadata } from "next";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Dropdown,
  DropdownHeader,
  DropdownItem,
  DropdownDivider,
  Avatar,
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

export default function RootLayout({
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
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
              }
            >
              <DropdownHeader>
                <span className="block text-sm">Matt Shelley</span>
                <span className="block truncate text-sm font-medium">matt.scripted@gmail.com</span>
              </DropdownHeader>
              <DropdownDivider />
              <DropdownItem>Sign out</DropdownItem>
            </Dropdown>

            <NavbarToggle />
          </div>
          <NavbarCollapse>
            <NavbarLink href="/">Dashboard</NavbarLink>
            <NavbarLink href="/apply">Apply</NavbarLink>
            <NavbarLink href="/practice">Practice</NavbarLink>
            <NavbarLink href="/interview">Interview</NavbarLink>
            <NavbarLink href="/cheat-sheets">Cheat Sheets</NavbarLink>
            <NavbarLink href="/resources">Resources</NavbarLink>
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
