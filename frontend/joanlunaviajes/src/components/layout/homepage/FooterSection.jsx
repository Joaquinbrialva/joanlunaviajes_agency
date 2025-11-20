import { WhatsApp, Instagram, Facebook } from '@mui/icons-material';
import '../../../styles/layout/FooterSection.css';
export default function FooterSection() {
	return (
		<div className='footer-section-container'>
			<div className='footer-content'>
				<div className='footer-social'>
					<p>Contacto:</p>
					<WhatsApp className='footer-icon' />
					<Instagram className='footer-icon' />
					<Facebook className='footer-icon' />
				</div>
				<div className='footer-rights'>
					<p>Avenida Corrientes 2174 | LOCAL 192 - CABA</p>
					<p>Teléfonos: 1158139420 | 1127403575</p>
				</div>
			</div>
		</div>
	);
}
