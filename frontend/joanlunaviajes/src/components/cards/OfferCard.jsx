import '../../styles/cards/OfferCard.css';
import { FaPlaneDeparture } from 'react-icons/fa';

export default function OfferCard({
	title,
	origin,
	destination,
	description,
	imageUrl,
	alt_text,
	price,
}) {
	console.log(imageUrl);
	return (
		<div className='offer-card-container'>
			<div className='offer-card-img-container'>
				<img src={imageUrl} alt={alt_text || title} />
				<span className={price && 'offer-card-price'}>
					{price && `USD ${price}`}
				</span>
			</div>

			<div className='offer-card-info-container'>
				<div className='offer-card-route'>
					<FaPlaneDeparture className='offer-card-icon' />
					<p>
						{origin} → {destination}
					</p>
				</div>

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
