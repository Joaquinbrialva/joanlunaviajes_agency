import { useState } from 'react';
import '../../../styles/dashboard/pages/Offers.css';
import Form from '../../../components/dashboard/layout/Form';
import CTAButton from '../../../components/layout/CTAButton';
import Table from '../../../components/dashboard/layout/Table';
import Divider from '@mui/material/Divider';
import { useFetchOffers } from '../../../hooks/offer/useFetchOffers';
import { Modal } from '@mui/material';

function Offers() {
	const [isOpen, setIsOpen] = useState(false);
	const { offers, setOffers, loading, error, refetch } = useFetchOffers();

	const handleOfferCreate = (newOffer) => {
		setOffers((prev) => [newOffer, ...prev]); // agrega el nuevo viaje al principio
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
					data={offers}
					loading={loading}
					onRefresh={refetch}
					onError={error ? { message: error } : null}
				/>
			</div>

			{/* MODAL */}
			<Modal
				open={isOpen}
				onClose={isOpen}
				disableEscapeKeyDown
				className='modal'
			>
				<Form
					mode='offer'
					onClose={() => setIsOpen(false)}
					onNewItem={handleOfferCreate}
				/>
			</Modal>
		</div>
	);
}

export default Offers;
