import Sidebar from '../../../components/dashboard/navigation/Sidebar';
import { Outlet } from 'react-router-dom';
import '../../../styles/dashboard/pages/AdminDashboard.css';

function AdminDashboard() {
	return (
		<div className='dashboard-container'>
			<Sidebar />
			<main className='dashboard-main'>
				<Outlet />
			</main>
		</div>
	);
}

export default AdminDashboard;
