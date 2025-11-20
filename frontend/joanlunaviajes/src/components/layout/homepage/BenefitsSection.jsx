import { Check, Star, Person } from '@mui/icons-material';
import BenefitCard from '../../cards/BenefitCard';
import SectionHeader from '../../layout/homepage/SectionHeader';
import '../../../styles/layout/BenefitsSection.css';

export default function BenefitsSection() {
	return (
		<section className='benefits-section'>
			<div className='benefit-subtitle-container'>
				<SectionHeader title='Beneficios de viajar con Joanlunaviajes®' />
				<p className='benefits-description'>
					Descubre por qué somos la mejor opción para planificar tus viajes.
				</p>
			</div>
			<div className='benefit-cards-grid'>
				<BenefitCard
					icon={<Check className='icon' />}
					title='Experiencias Personalizadas'
					text='Creamos viajes a medida que se adaptan a tus gustos y necesidades, asegurando una experiencia única.'
				/>
				<BenefitCard
					icon={<Star className='icon' />}
					title='Calidad y confiabilidad'
					text='Trabajamos con los mejores proveedores para garantizar la calidad y seguridad en cada viaje.'
				/>
				<BenefitCard
					icon={<Person className='icon' />}
					title='Soporte 24/7'
					text='Nuestro equipo de soporte está disponible las 24 horas para ayudarte en cualquier momento y lugar.'
				/>
			</div>
		</section>
	);
}
