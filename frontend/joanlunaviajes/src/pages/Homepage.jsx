import HeroSection from '../components/layout/homepage/HeroSection';
import CardsSection from '../components/layout/homepage/CardsSection';
import OfferCard from '../components/cards/OfferCard';
import cardsData from '../utils/cards-data.json';
import DestinationCard from '../components/cards/DestinationCard';
import ClientTestimonialsSection from '../components/layout/homepage/ClientTestimonialsSection';
import '../styles/layout/Homepage.css';
import BenefitsSection from '../components/layout/homepage/BenefitsSection';
import { useFetchOffers } from '../hooks/useFetchOffers';
export default function Homepage() {
	const { trips, loading } = useFetchOffers();
	const destinations = cardsData?.destinations ?? [];
	const testimonials = cardsData?.testimonials ?? [];

	return (
		<main className='home-container'>
			<section className='home-hero'>
				<HeroSection />
			</section>

			<section className='home-cards'>
				<CardsSection
					title='Ofertas Destacadas'
					cards={trips}
					CardComponent={OfferCard}
					showArrow
					arrowText='Ver todas las ofertas'
					loading={loading}
					rows={1}
					variant='offers' // 👈 grid más grande
				/>

				<CardsSection
					title='Destinos Destacados'
					cards={destinations}
					CardComponent={DestinationCard}
					showArrow
					arrowText='Ver todos los destinos'
					variant='destinations' // 👈 grid más compacto
				/>
			</section>

			<section className='home-feedback'>
				<ClientTestimonialsSection testimonials={testimonials} />
			</section>

			<section className='home-benefits'>
				<BenefitsSection />
			</section>
		</main>
	);
}
