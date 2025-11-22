import styles from '../../../styles/cards/offerCard/offerCard.module.css';

import { OfferCardImage } from './OfferCardImage';
import { OfferCardHeader } from './OfferCardHeader';
import { OfferCardDetails } from './OfferCardDetails';
import { OfferCardPrice } from './OfferCardPrice';
import { OfferCardFooter } from './OfferCardFooter';

import {
	getImageSrc,
	dateFormatter,
	priceFormatter,
	avgRating,
} from '../../../utils/helpers-cards';

export default function OfferCard({
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
	reviews = [],
	included = [],

	// Control de qué secciones mostrar
	showImage = true,
	showHeader = true,
	showDetails = true,
	showPrice = true,
	showFooter = true,
}) {
	// =========================
	// PROCESADO DE DATOS
	// =========================
	const imageSrc = getImageSrc(images);
	const dateFormatted = dateFormatter(startDate, endDate);
	const formattedPrice = priceFormatter(price, currency);
	const avgRatingValue = avgRating(reviews);

	return (
		<div className={styles.card}>
			{/* Imagen */}
			{showImage && (
				<OfferCardImage
					image={imageSrc}
					title={title}
					category={category}
					highlighted={highlighted}
				/>
			)}

			{/* Contenido */}
			<div className={styles.content}>
				{/* Header: título y destino */}
				{showHeader && (
					<OfferCardHeader title={title} destination={destination} />
				)}

				{/* Detalles: fechas, noches, reviews, incluidos */}
				{showDetails && (
					<OfferCardDetails
						dateFormatted={dateFormatted}
						nights={nights}
						avgRatingValue={avgRatingValue}
						reviews={reviews}
						included={included}
					/>
				)}

				{/* Precio */}
				{showPrice && <OfferCardPrice priceFormatted={formattedPrice} />}
			</div>

			{/* Footer */}
			{showFooter && <OfferCardFooter availability={availability} />}
		</div>
	);
}
