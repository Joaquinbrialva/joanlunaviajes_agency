import '@/styles/NewsletterSection.css';
import { IoMdMail } from 'react-icons/io';
import { InputGroup, TextField, Description } from '@heroui/react';
import { Button } from './ui/button';

export default function NewsletterSection() {
	return (
		<section className='newsletter-section'>
			<div className='newsletter-section_header'>
				<IoMdMail className='newsletter-section_icon' />
				<h2>No te pierdas ninguna oferta</h2>
				<p>
					Suscríbete a nuestro boletín y recibe descuentos exclusivos
					directamente en tu bandeja de entrada.
				</p>
			</div>
			<div className='email-form'>
				<TextField name='email'>
					<InputGroup>
						<InputGroup.Prefix>
							<IoMdMail className='form-icon' />
						</InputGroup.Prefix>
						<InputGroup.Input
							className='w-full'
							placeholder='Tu correo electrónico'
						/>
					</InputGroup>
				</TextField>
				<Button>Suscribirse</Button>
			</div>
			<div>
				<Description className='email-form_terms'>
					Respetamos tu privacidad. Puedes darte de baja en cualquier momento.
				</Description>
			</div>
		</section>
	);
}
