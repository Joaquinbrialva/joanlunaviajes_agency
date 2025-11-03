import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import AdminDashboard from './pages/admin/dashboard/AdminDashboard';
import HomeDashboard from './pages/admin/dashboard/HomeDashboard';
import Offers from './pages/admin/dashboard/Offers';
import Destinations from './pages/admin/dashboard/Destinations';
import Testimonials from './pages/admin/dashboard/Testimonials';
import Clients from './pages/admin/dashboard/Clients';
import Agents from './pages/admin/dashboard/Agents';
import Permissions from './pages/admin/dashboard/Permissions';
import Settings from './pages/admin/dashboard/Settings';

function App() {
	return (
		<Routes>
			<Route index element={<Homepage />} />
			<Route path='dashboard' element={<AdminDashboard />}>
				<Route index element={<HomeDashboard />} />
				<Route path='ofertas' element={<Offers />} />
				<Route path='destinos' element={<Destinations />} />
				<Route path='testimonios' element={<Testimonials />} />
				<Route path='clientes' element={<Clients />} />
				<Route path='agentes' element={<Agents />} />
				<Route path='permisos' element={<Permissions />} />
				<Route path='configuracion' element={<Settings />} />
			</Route>
		</Routes>
	);
}

export default App;
