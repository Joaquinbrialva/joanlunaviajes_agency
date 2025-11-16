import '../../styles/cards/OfferCardHomepage.css';
import { avgRating } from '../../utils/avgRating';
import { dateFormatter } from '../../utils/dateFormatter-user';
export default function OfferCard({ props }) {
	const {
		title,
		price,
		currency,
		nights,
		startDate,
		endDate,
		availability,
		images,
		destination,
		category,
		highlighted,
		reviews,
		included,
	} = props;

	const avgRatingValue = reviews ? avgRating(reviews) : null;

	const dateFormatted = dateFormatter(startDate, endDate);

	return (
		<div className='offer-card'>
			<div className='offer-image'>
				<img src={images?.[0]} alt={title} />

				<span className='badge-category'>{category?.name}</span>

				{highlighted && <span className='badge-highlighted'>Destacado</span>}
			</div>

			<div className='offer-content'>
				<h3 className='offer-title'>{title}</h3>

				<p className='offer-destination'>
					{destination?.name}, {destination?.country}
				</p>

				<p className='offer-dates'>
					{dateFormatted} • {nights} noches
				</p>

				{avgRatingValue && (
					<div className='offer-rating'>
						⭐ <span>{avgRatingValue}</span>
						<small>({reviews.length} opiniones)</small>
					</div>
				)}

				<p className='offer-price'>
					{currency} ${price.toLocaleString('es-AR')}
				</p>

				<ul className='offer-included'>
					{included.slice(0, 3).map((item, i) => (
						<li key={i}>{item}</li>
					))}
					{included.length > 3 && <li className='more'>+ más</li>}
				</ul>
			</div>

			<div className='offer-footer'>
				<span className='availability'>{availability} lugares</span>
				<button className='details-btn'>Ver detalles</button>
			</div>
		</div>
	);
}
