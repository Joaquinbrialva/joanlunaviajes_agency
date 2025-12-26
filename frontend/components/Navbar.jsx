'use client';
import '@/styles/Navbar.css';
import Link from 'next/link';
import logo from '@/public/logo.png';
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { ModeToggle } from './ui/mode-toggle';
import Image from 'next/image';

export default function Navbar() {
	return (
		<div className='container'>
			<div className='logo-container'>
				<Image src={logo} alt='logo' width={180} className='logo' />
			</div>
			<div className='navigation-links'>
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuLink
								asChild
								className={navigationMenuTriggerStyle()}
							>
								<Link href='#'>Ofertas</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuLink
								asChild
								className={navigationMenuTriggerStyle()}
							>
								<Link href='#'>Destinos</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuLink
								asChild
								className={navigationMenuTriggerStyle()}
							>
								<Link href='#'>Contacto</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</div>
			<div className='theme-toggle'>
				<ModeToggle />
			</div>
		</div>
	);
}
