import '../../styles/cards/OfferCard.css';
import { FaPlaneDeparture } from 'react-icons/fa';

export default function OfferCard({
	title,
	origin,
	destination,
	description,
	image,
	alt_text,
	price,
}) {
	return (
		<div className='offer-card-container'>
			<div className='offer-card-img-container'>
				<img src={image} alt={alt_text || title} />
				<span className={price && 'offer-card-price'}>
					{price && `USD ${price}`}
				</span>
			</div>

			<div className='offer-card-info-container'>
				<p className='offer-card-route'>
					<span>{origin}</span>
					<FaPlaneDeparture className='offer-card-icon' />
					<span>{destination}</span>
				</p>

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
