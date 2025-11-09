import { useState } from 'react';
import '../../../styles/dashboard/pages/Offers.css';
import FormModal from '../../../components/dashboard/layout/FormModal';
import CTAButton from '../../../components/layout/CTAButton';
import Table from '../../../components/dashboard/layout/Table';
import Divider from '@mui/material/Divider';
import { useFetchOffers } from '../../../hooks/useFetchOffers';

function Offers() {
	const [isOpen, setIsOpen] = useState(false);
	const { trips, setTrips, loading, error, refetch } = useFetchOffers();

	const handleTripCreated = (newTrip) => {
		setTrips((prev) => [newTrip, ...prev]); // agrega el nuevo viaje al principio
	};

	return (
		<div className='offers-container'>
			{/* HEADER */}
			<div className='offers-header'>
				<h2 className='offers-title'>Gestión de Ofertas</h2>
				<CTAButton
					text='Añadir oferta'
					onClick={() => setIsOpen(true)}
					className='cta-button-offer__add'
				/>
			</div>
			<Divider variant='middle' />

			{/* TABLE SECTION */}
			<div className='offers-table-container'>
				<Table
					data={trips}
					loading={loading}
					onRefresh={refetch}
					onError={error ? { message: error } : null}
				/>
			</div>

			{/* MODAL */}
			{isOpen && (
				<FormModal
					mode='offer'
					onClose={() => setIsOpen(false)}
					onNewItem={handleTripCreated} // Solo actualiza datos
				/>
			)}
		</div>
	);
}

export default Offers;
