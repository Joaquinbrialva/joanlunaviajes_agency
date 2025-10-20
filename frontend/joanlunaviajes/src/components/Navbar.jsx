import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/logo.jpg';

export default function Navbar() {
	const items = [
		{ name: 'Inicio', path: '/' },
		{ name: 'Ofertas', path: '/offers' },
		{ name: 'Destinos', path: '/destinations' },
		{ name: 'Contacto', path: '/contact' },
		{ name: 'Solicitar Viaje', path: '/request-form' },
		{ name: 'Iniciar Sesión', path: '/login', variant: 'cta' },
	];

	return (
		<nav className='navbar' aria-label='Navegación principal'>
			<div className='navbar-inner'>
				<Link to='/' className='logo-link'>
					<img src={logo} alt='Joanlunaviajes Logo' className='logo-img' />
				</Link>

				<div className='nav-buttons'>
					{items.map((item) => (
						<Link
							key={item.name}
							to={item.path}
							className={`nav-button ${
								item.variant === 'cta' ? 'nav-cta' : ''
							}`}
						>
							{item.name}
						</Link>
					))}
				</div>
			</div>
		</nav>
	);
}
