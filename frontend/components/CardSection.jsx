import '@/styles/CardSection.css';
import { Button } from './ui/button';
import Card from './Card';
import { FaChevronRight } from 'react-icons/fa6';
import { generateTrips } from '@/mocks/mockTrips';
import DestinyCard from './DestinyCard';
export default function CardSection() {
	const trips = generateTrips(12);
	return (
		<>
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
				{trips.map((trips) => (
					<Card
						key={trips.id}
						title={trips.title}
						location={trips.location}
						days={trips.days}
						rating={trips.rating}
						price={trips.price}
						image={trips.image}
						discount={trips.discount}
						categories={trips.category}
					/>
				))}
				<DestinyCard />
			</div>
		</>
	);
}
