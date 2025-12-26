'use client';

import '@/styles/Navbar.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { ModeToggle } from './ui/mode-toggle';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';

export default function Navbar() {
	const [isSticky, setIsSticky] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const triggerPoint = 64;
			setIsSticky(window.scrollY > triggerPoint);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);
	const navbarItems = [
		{
			item: 'Ofertas',
			href: '#',
		},
		{
			item: 'Destino',
			href: '#',
		},
		{
			item: 'Contacto',
			href: '#',
		},
	];

	return (
		<nav className={`navbar ${isSticky ? 'navbar--sticky' : ''}`}>
			<div className='navbar-container'>
				<div className='navbar-logo'>
					<Link href='/' className='logo-link'>
						<Logo className='logo' />
					</Link>
				</div>

				<div className='navbar-navigation'>
					<NavigationMenu>
						<NavigationMenuList>
							{navbarItems.map(({ item, href }) => (
								<NavigationMenuItem key={item}>
									<NavigationMenuLink asChild>
										<Link href={href}>{item}</Link>
									</NavigationMenuLink>
								</NavigationMenuItem>
							))}
						</NavigationMenuList>
					</NavigationMenu>
				</div>

				<div className='navbar-actions'>
					<Button variant='outline' asChild>
						<Link href='/login'>Iniciar sesión</Link>
					</Button>
					<ModeToggle />
				</div>
			</div>
		</nav>
	);
}
