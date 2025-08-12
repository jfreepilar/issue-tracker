'use client';

import React from 'react'
import Link from 'next/link'
import { FaBug } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import classnames from 'classnames'

const NavBar = () => {
    const links = [
        {label: "Dashboard" , href: "/" },
        {label: "Issues" , href: "/issues/list" }
    ];

    const currentPath = usePathname();

  return (
    <nav className='flex space-x-6 border-b mb-5 h-12 items-center px-6'>
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
    </nav>
  )
}

export default NavBar