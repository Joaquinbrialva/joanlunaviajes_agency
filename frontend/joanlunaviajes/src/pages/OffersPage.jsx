import OfferCard from '../components/cards/OfferCard';
import CardsSection from '../components/layout/homepage/CardsSection';
import SectionHeader from '../components/layout/homepage/SectionHeader';
import { useFetchOffers } from '../hooks/useFetchOffers';
import '../styles/pages/OffersPage.css';

export default function OffersPage() {
	const { trips, loading, error } = useFetchOffers();

	return (
		<div>
			<SectionHeader title='Ofertas de Viaje' />
			<CardsSection
				cards={trips}
				CardComponent={OfferCard}
				arrowText='Ver todas las ofertas'
				loading={loading}
			/>
		</div>
	);
}
