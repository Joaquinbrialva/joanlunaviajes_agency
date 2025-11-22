import HeroSection from '../components/layout/homepage/HeroSection';
import CardsSection from '../components/layout/homepage/CardsSection';
import '../styles/layout/Homepage.css';
import BenefitsSection from '../components/layout/homepage/BenefitsSection';
import { useFetchOffers } from '../hooks/offer/useFetchOffers';
import FooterSection from '../components/layout/homepage/FooterSection';
import OfferCard from '../components/cards/offerCard/OfferCard';

export default function Homepage() {
	const { offers, loading } = useFetchOffers();
	return (
		<>
			<main className='home-container'>
				<section className='home-hero'>
					<HeroSection />
				</section>

				<section className='home-cards'>
					<CardsSection
						title='Ofertas Destacadas'
						cards={offers}
						CardComponent={OfferCard}
						showArrow
						arrowText='Ver todas las ofertas'
						loading={loading}
						rows={2}
					/>
				</section>

				<section className='home-feedback'>
					{/* <ClientTestimonialsSection testimonials={} /> */}
				</section>

				<section className='home-benefits'>
					<BenefitsSection />
				</section>
			</main>

			<footer>
				<FooterSection />
			</footer>
		</>
	);
}
