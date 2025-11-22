import OfferCard from '../components/cards/offerCard/OfferCard';
import CardsSection from '../components/layout/homepage/CardsSection';
import { useFetchOffers } from '../hooks/offer/useFetchOffers';
import styles from '../styles/pages/OffersPage.module.css';

export default function OffersPage() {
	const { offers, loading } = useFetchOffers();
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<CardsSection
					title='Ofertas'
					cards={offers}
					CardComponent={OfferCard}
					arrowText='Ver todas las ofertas'
					loading={loading}
				/>
			</div>
		</div>
	);
}
