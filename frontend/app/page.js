import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import CardSection from '@/components/CardSection';
import Card from '@/components/Card';
import { generateTrips } from '@/mocks/mockTrips';
import DestinyCard from '@/components/DestinyCard';
import { CarouselDemo } from '@/components/Carousel';

export default function Home() {
	const trips = generateTrips(10)
	return (
		<div>
			<main>
				<Hero />
				<CardSection title='Mejores Ofertas'>
					{trips.map((trip) => (
						<Card key={trip.id} {...trip} />
					))}
				</CardSection>
				<CardSection title='Próximos Viajes' variant='carousel'>
					<CarouselDemo />
				</CardSection>
				<Footer />
			</main>
		</div>
	);
}
