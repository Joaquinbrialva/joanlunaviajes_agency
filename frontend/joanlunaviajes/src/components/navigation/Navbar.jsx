import { NavLink } from 'react-router-dom';
import '../../styles/navigation/Navbar.css';
import logo from '../../assets/logo.jpg';

export default function Navbar() {
	const items = [
		{ name: 'Inicio', path: '/' },
		{ name: 'Ofertas', path: '/ofertas' },
		{ name: 'Destinos', path: '/destinos' },
		{ name: 'Contacto', path: '/contacto' },
		{ name: 'Solicitar Viaje', path: '/solicitud-viaje' },
		{ name: 'Iniciar Sesión', path: '/login', variant: 'cta' },
	];

	return (
		<nav className='navbar' aria-label='Navegación principal'>
			<div className='navbar-inner'>
				<NavLink to='/' className='logo-link'>
					<img src={logo} alt='Joanlunaviajes Logo' className='logo-img' />
				</NavLink>

				<div className='nav-buttons'>
					{items.map((item) => (
						<NavLink
							key={item.name}
							to={item.path}
							className={`nav-button ${
								item.variant === 'cta' ? 'nav-cta' : ''
							}`}
						>
							{item.name}
						</NavLink>
					))}
				</div>
			</div>
		</nav>
	);
}
