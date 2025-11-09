import '../../styles/cards/DestinationCard.css';

export default function DestinationCard({
	title,
	description,
	image,
	alt_text,
}) {
	return (
		<div className='destination-card-container'>
			<div className='destination-card-img-container'>
				<img src={image} alt={alt_text} />
			</div>
			<div className='destination-card-info-container'>
				<div className='destination-card-title-container'>
					<p className='destination-card-title'>{title}</p>
				</div>
				<div className='destination-card-description-container'>
					<p className='destination-card-description'>{description}</p>
				</div>
			</div>
		</div>
	);
}
