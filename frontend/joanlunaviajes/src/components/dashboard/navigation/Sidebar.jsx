import { NavLink } from 'react-router-dom';
import {
	Home,
	Percent,
	Public,
	Feedback,
	Group,
	AdminPanelSettings,
	VerifiedUser,
	Settings,
} from '@mui/icons-material';
import '../../../styles/dashboard/navigation/Sidebar.css';

function Sidebar() {
	const items = [
		{
			name: 'Inicio',
			path: '/dashboard',
			icon: <Home className='sidebar-icon' />,
		},
		{
			name: 'Ofertas',
			path: '/dashboard/ofertas',
			icon: <Percent className='sidebar-icon' />,
		},
		{
			name: 'Destinos',
			path: '/dashboard/destinos',
			icon: <Public className='sidebar-icon' />,
		},
		{
			name: 'Testimonios',
			path: '/dashboard/testimonios',
			icon: <Feedback className='sidebar-icon' />,
		},
		{
			name: 'Clientes',
			path: '/dashboard/clientes',
			icon: <Group className='sidebar-icon' />,
		},
		{
			name: 'Agentes',
			path: '/dashboard/agentes',
			icon: <AdminPanelSettings className='sidebar-icon' />,
		},
		{
			name: 'Permisos',
			path: '/dashboard/permisos',
			icon: <VerifiedUser className='sidebar-icon' />,
		},
		{
			name: 'Configuración',
			path: '/dashboard/configuracion',
			icon: <Settings className='sidebar-icon' />,
		},
	];

	return (
		<aside className='sidebar'>
			<div className='sidebar-header'>
				<h2>JoanlunaViajes</h2>
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
								// CORRECCIÓN: Aplicar 'end' a *todos* los NavLink.
								// Esto asegura que cada ítem solo sea activo cuando la ruta coincida exactamente.
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
