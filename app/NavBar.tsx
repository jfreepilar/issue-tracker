'use client';

import React from 'react'
import Link from 'next/link'
import { FaBug } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import classnames from 'classnames'
import { Box, Flex, Container, DropdownMenu, Avatar, Text } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';

const NavBar = () => {
    const links = [
        {label: "Dashboard" , href: "/" },
        {label: "Issues" , href: "/issues/list" }
    ];

    const currentPath = usePathname();
    const { status, data: session } = useSession();

  return (
    <nav className='border-b mb-5 px-5 py-3'>
        <Container>
            <Flex align='center' justify='between'>
                <Flex align='center'  gap='3'>
                    <Link href="/"><FaBug /></Link>
                    <ul className='flex space-x-6'>
                        {links.map(link => (
                            <li key={link.href}>
                                <Link href={link.href}
                                    className={classnames({
                                        'text-zinc-900' : link.href === currentPath,
                                        'text-zinc-500' : link.href !== currentPath,
                                        'hover:text-zinc-800 transition-colors text-lg' : true
                                    })}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Flex>
                <Box>
                    {status === 'authenticated' && (
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                                <Avatar 
                                    src={session.user!.image!}
                                    fallback='?'
                                    size='2'
                                    radius='full'
                                    className='cursor-pointer'
                                />
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content align='end' >
                                <DropdownMenu.Label>
                                    <Text size='2'>
                                        {session.user!.email}
                                    </Text>
                                </DropdownMenu.Label>
                                <DropdownMenu.Item>
                                    <Link href='/api/auth/signout'>Log out</Link>                                    
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    )}
                    {status === 'unauthenticated' && (
                        <Link href='/api/auth/signin'>Log in</Link>
                    )}      
                </Box>
            </Flex>
        </Container>
    </nav>
  )
}

export default NavBar