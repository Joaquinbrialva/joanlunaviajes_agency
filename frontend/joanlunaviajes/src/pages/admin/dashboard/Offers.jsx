import OfferForm from '../../../components/dashboard/layout/OfferForm';
import '../../../styles/dashboard/pages/Offers.css';

function Offers() {
	return (
		<div className="offers-container">
			<h2 className="offers-title">Gestión de Ofertas</h2>
			<OfferForm />
		</div>
	)
}

export default Offers;
