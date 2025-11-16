import OfferCardOffersPage from '../components/cards/OfferCardOffersPage';
import OfferCardHomepage from '../components/cards/OfferCardHomepage';
import CardsSection from '../components/layout/homepage/CardsSection';
import SectionHeader from '../components/layout/homepage/SectionHeader';
import { useFetchOffers } from '../hooks/offer/useFetchOffers';
import '../styles/pages/OffersPage.css';

export default function OffersPage() {
	const { offers, loading } = useFetchOffers();
	return (
		<div className='offers-page-container'>
			<CardsSection
				title='Ofertas de viaje'
				cards={offers}
				CardComponent={OfferCardOffersPage}
				arrowText='Ver todas las ofertas'
				loading={loading}
			/>
		</div>
	);
}
