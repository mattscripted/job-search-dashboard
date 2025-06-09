import Link from "next/link";
import {
  Navbar as BaseNavbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <BaseNavbar fluid rounded>
      <NavbarBrand as={Link} href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Job Search Dashboard</span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        {!session ? (
          <NavbarLink href="/api/auth/signin">Sign in</NavbarLink>
        ) : (
          <>
            <NavbarLink href="/behavioural-interviews">Behavioural Interviews</NavbarLink>
            <NavbarLink href="/api/auth/signout">Sign out</NavbarLink>
          </>
        )}
      </NavbarCollapse>
    </BaseNavbar>
  )
}
