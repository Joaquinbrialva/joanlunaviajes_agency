'use client';

import Link from 'next/link';
import '@/styles/Navbar.css';
import { Logo } from '@/components/Logo';
import { ModeToggle } from '@/components/ui/mode-toggle';

export default function Navbar() {
	return (
		<header className='navbar'>
			<div className='navbar-container'>
				<nav className='navbar-links'>
					<Link href='/ofertas'>Ofertas</Link>
					<Link href='#'>Destino</Link>
					<Link href='#'>Contacto</Link>
				</nav>

				<Link href='/' className='navbar-logo'>
					<Logo className='navbar-logo-icon' />
				</Link>

				<div className='navbar-actions'>
					<Link href='/login' className='navbar-login'>
						Iniciar sesión
					</Link>
					<ModeToggle />
				</div>
			</div>
		</header>
	);
}
