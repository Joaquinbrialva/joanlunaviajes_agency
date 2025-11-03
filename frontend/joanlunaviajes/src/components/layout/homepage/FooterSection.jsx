import { FaFacebook, FaInstagram } from 'react-icons/fa6';
import '../../../styles/layout/FooterSection.css';
export default function FooterSection() {
	return (
		<div className='footer-section-container'>
			<div className='footer-content'>
				<div className='footer-terms'>
					<p>Política de Privacidad</p>
					<p>Contacto</p>
					<p>Términos de Servicio</p>
				</div>
				<div className='footer-social'>
					<FaInstagram className='footer-icon' />
					<FaFacebook className='footer-icon' />
				</div>
				<div className='footer-rights'>
					<p>© 2024 Joanluna VIAJES. Todos los derechos reservados.</p>
				</div>
			</div>
		</div>
	);
}
