import '@/styles/Footer.css';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { Logo } from './Logo';
import { Separator } from '@heroui/react';

export default function Footer() {
	return (
		<footer className='footer-wrapper'>
			<div className='footer-container'>
				<div className='footer-column logo-column'>
					<Logo className='footer-logo' />
					<p className='footer-description'>
						Hacemos realidad tus sueños de viaje con las mejores ofertas y un
						servicio personalizado.
					</p>
					<div className='social-networks'>
						<div className='icon-container'>
							<FaFacebook className='icon' />
						</div>
						<div className='icon-container'>
							<FaInstagram className='icon' />
						</div>
					</div>
				</div>
				<div className='footer-column'>
					<h4 className='footer-title'>Compañía</h4>
					<ul className='footer-links'>
						<li>
							<a href='#'>Sobre Nosotros</a>
						</li>
						<li>
							<a href='#'>Carreras</a>
						</li>
						<li>
							<a href='#'>Blog</a>
						</li>
						<li>
							<a href='#'>Prensa</a>
						</li>
					</ul>
				</div>
				<div className='footer-column'>
					<h4 className='footer-title'>Soporte</h4>
					<ul className='footer-links'>
						<li>
							<a href='#'>Centro de Ayuda</a>
						</li>
						<li>
							<a href='#'>Términos y Condiciones</a>
						</li>
						<li>
							<a href='#'>Política de Privacidad</a>
						</li>
						<li>
							<a href='#'>Política de Reembolso</a>
						</li>
					</ul>
				</div>
				<div className='footer-column contact-column'>
					<h4 className='footer-title'>Contacto</h4>
					<div className='contact-info'>
						<div className='contact-item'>
							<FaMapMarkerAlt className='contact-icon' />
							<span>Av. Reforma 222, CDMX, México</span>
						</div>
						<div className='contact-item'>
							<FaPhone className='contact-icon' />
							<span>+52 55 1234 5678</span>
						</div>
						<div className='contact-item'>
							<FaEnvelope className='contact-icon' />
							<span>contacto@viajesmundo.com</span>
						</div>
					</div>
				</div>
			</div>
			<Separator className='separator' />
			<div className='footer-bottom'>
				<p className='copyright'>
					© 2025 Viajes Mundo. Todos los derechos reservados.
				</p>
				<div className='footer-bottom-links'>
					<a href='#'>Privacidad</a>
					<a href='#'>Términos</a>
					<a href='#'>Cookies</a>
				</div>
			</div>
		</footer>
	);
}
