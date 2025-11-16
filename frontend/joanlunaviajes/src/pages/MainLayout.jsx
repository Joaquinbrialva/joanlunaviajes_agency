import { Outlet } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar';
import FooterSection from '../components/layout/homepage/FooterSection';
import '../styles/layout/MainLayout.css';

export default function MainLayout() {
	return (
		<div>
			<header>
				<Navbar />
			</header>

			<main>
				<Outlet /> {/* Aquí se renderizan las páginas hijas */}
			</main>

			<footer>
				<FooterSection />
			</footer>
		</div>
	);
}
