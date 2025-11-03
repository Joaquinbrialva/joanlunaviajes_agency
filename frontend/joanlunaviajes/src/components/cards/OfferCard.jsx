import React from 'react';
import '../../styles/cards/OfferCard.css';

export default function OfferCard({ title, description, imageUrl, alt_text }) {
	return (
		<div className='offer-card-container'>
			<div className='offer-card-img-container'>
				<img src={imageUrl} alt={alt_text} />
			</div>
			<div className='offer-card-info-container'>
				<div className='offer-card-title-container'>
					<p className='offer-card-title'>{title}</p>
				</div>
				<div className='offer-card-description-container'>
					<p className='offer-card-description'>{description}</p>
				</div>
			</div>
		</div>
	);
}
