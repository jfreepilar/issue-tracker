"use client";

import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import classnames from "classnames";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";
import { Skeleton } from "./components";

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container className="bg-">
        <Flex align="center" justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <FaBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  const currentPath = usePathname();

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={classnames({
              "nav-link": true,
              "!text-zinc-900": link.href === currentPath,
            })}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading")
    return <Skeleton width="2rem" height="2rem" circle={true} />;

  if (status === "unauthenticated")
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Log in
      </Link>
    );

  return (
    <Box>
      {status === "authenticated" && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              src={session.user!.image!}
              fallback="?"
              size="2"
              radius="full"
              className="cursor-pointer"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="end">
            <DropdownMenu.Label>
              <Text size="2">{session.user!.email}</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item onClick={() => signOut({ callbackUrl: "/" })}>
              <Link href="/api/auth/signout">Log out</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </Box>
  );
};

export default NavBar;
