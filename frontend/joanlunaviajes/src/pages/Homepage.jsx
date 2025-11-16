import HeroSection from '../components/layout/homepage/HeroSection';
import CardsSection from '../components/layout/homepage/CardsSection';
import OfferCardHomepage from '../components/cards/OfferCardHomepage';
import ClientTestimonialsSection from '../components/layout/homepage/ClientTestimonialsSection';
import '../styles/layout/Homepage.css';
import BenefitsSection from '../components/layout/homepage/BenefitsSection';
import { useFetchOffers } from '../hooks/offer/useFetchOffers';
export default function Homepage() {
	const { offers, loading } = useFetchOffers();
	return (
		<main className='home-container'>
			<section className='home-hero'>
				<HeroSection />
			</section>

			<section className='home-cards'>
				<CardsSection
					title='Ofertas Destacadas'
					cards={offers}
					CardComponent={OfferCardHomepage}
					showArrow
					arrowText='Ver todas las ofertas'
					loading={loading}
					rows={1}
					variant='offers' // 👈 grid más grande
				/>
			</section>

			<section className='home-feedback'>
				{/* <ClientTestimonialsSection testimonials={} /> */}
			</section>

			<section className='home-benefits'>
				<BenefitsSection />
			</section>
		</main>
	);
}
