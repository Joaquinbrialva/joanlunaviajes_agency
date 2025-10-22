import { Link } from 'react-router-dom';
import '../styles/HeroSection.css';

export default function HeroSection() {
	return (
		<div className='hero-container'>
			<div className='hero-img'></div>

			<div className='hero-content'>
				<h1>Descubre el mundo con Joanlunaviajes</h1>
				<p>
					Planifica tu próxima aventura con nosotros. Ofrecemos experiencias
					únicas y personalizadas para cada viajero.
				</p>
				<Link to='/solicitud-viaje' className='hero-button'>Solicitar un viaje</Link>
			</div>
		</div>
	);
}
