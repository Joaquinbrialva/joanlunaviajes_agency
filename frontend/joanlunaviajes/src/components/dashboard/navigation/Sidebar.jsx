import { NavLink } from 'react-router-dom';
import {
	FaPercent,
	FaGlobe,
	FaBullhorn,
	FaUserFriends,
	FaUserTie,
	FaShieldAlt,
	FaCog,
	FaHome,
} from 'react-icons/fa';
import '../../../styles/layout/dashboard/Sidebar.css';

export function Sidebar() {
	const items = [
		{
			name: 'Inicio',
			path: '/dashboard',
			icon: <FaHome className='sidebar-icon' />,
		},
		{
			name: 'Ofertas',
			path: '/dashboard/ofertas',
			icon: <FaPercent className='sidebar-icon' />,
		},
		{
			name: 'Destinos',
			path: '/dashboard/destinos',
			icon: <FaGlobe className='sidebar-icon' />,
		},
		{
			name: 'Testimonios',
			path: '/dashboard/testimonios',
			icon: <FaBullhorn className='sidebar-icon' />,
		},
		{
			name: 'Clientes',
			path: '/dashboard/clientes',
			icon: <FaUserFriends className='sidebar-icon' />,
		},
		{
			name: 'Agentes',
			path: '/dashboard/agentes',
			icon: <FaUserTie className='sidebar-icon' />,
		},
		{
			name: 'Permisos',
			path: '/dashboard/permisos',
			icon: <FaShieldAlt className='sidebar-icon' />,
		},
		{
			name: 'Configuración',
			path: '/dashboard/configuracion',
			icon: <FaCog className='sidebar-icon' />,
		},
	];

	return (
		<aside className='sidebar'>
			<div className='sidebar-header'>
				<h2>Joanluna VIAJES</h2>
				<span className='sidebar-admin'>Admin</span>
			</div>
			<nav className='sidebar-navigation'>
				<ul>
					{items.map((item) => (
						<li key={item.name} className='sidebar-nav-item'>
							<NavLink
								to={item.path}
								className={({ isActive }) =>
									isActive ? 'sidebar-link active' : 'sidebar-link'
								}
								end
							>
								<div className='sidebar-item-icon'>
									{item.icon}
									<span>{item.name}</span>
								</div>
							</NavLink>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);
}

export default Sidebar;
