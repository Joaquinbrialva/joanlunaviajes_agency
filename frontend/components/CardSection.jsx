import '@/styles/CardSection.css';
import { Button } from './ui/button';
import Card from './Card';
import { FaChevronRight } from 'react-icons/fa6';
import { generateTrips } from '@/mocks/mockTrips';
import DestinyCard from './DestinyCard';

export default function CardSection() {
	const trips = generateTrips(6);

	return (
		<div className='section-container'>
			<div className='section-header'>
				<div className='section-title'>
					<h3>Mejores Ofertas Destacadas</h3>
				</div>
				<div className='section-arrow'>
					<Button>
						Ver todas las ofertas
						<FaChevronRight />
					</Button>
				</div>
			</div>
			<div className="cards">
				{trips.map((trip) => (
					<Card
						key={trip.id}
						title={trip.title}
						location={trip.location}
						days={trip.days}
						rating={trip.rating}
						price={trip.price}
						image={trip.image}
						discount={trip.discount}
						categories={trip.category}
					/>
				))}
			</div>
			{/* Implementar carousel */}
			<div className="destiny-section">
				{trips.map((destiny) => (
					<DestinyCard
						key={destiny.id}
						location={destiny.location}
						price={destiny.price}
					/>
				))}
			</div>
		</div>
	);
}